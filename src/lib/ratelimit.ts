import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "./env";

/**
 * Per-IP rate limit: max 5 requests / hour (sliding window). Backed by Upstash
 * Redis over REST so it works on the Edge runtime. If Upstash is not configured
 * (e.g. local dev), we fail OPEN but log — never block legitimate withdrawals
 * because of an infra gap (legal availability requirement).
 */
let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit | null {
  if (limiter) return limiter;
  const url = env.upstashUrl();
  const token = env.upstashToken();
  if (!url || !token) return null;
  limiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    prefix: "wb:rl",
    analytics: false,
  });
  return limiter;
}

export interface RateResult {
  success: boolean;
  reset: number; // epoch ms
  remaining: number;
}

export async function checkRateLimit(ip: string): Promise<RateResult> {
  const l = getLimiter();
  if (!l) {
    // Fail-CLOSED in production: a missing/misconfigured Upstash must not silently
    // disable abuse protection on the crypto audit log. In dev/test we fail-open.
    if (process.env.NODE_ENV === "production") {
      return { success: false, reset: Date.now() + 3600_000, remaining: 0 };
    }
    return { success: true, reset: 0, remaining: 5 };
  }
  const { success, reset, remaining } = await l.limit(ip);
  return { success, reset, remaining };
}
