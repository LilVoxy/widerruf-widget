/**
 * POST /api/withdraw — withdrawal intake (UI step 3 → 4).
 * Runs on the Vercel Edge runtime, region fra1 (see vercel.json).
 *
 * Pipeline: rate-limit → validate (Zod, strict) → resolve org by API key →
 * CORS/whitelist → subscription gate → sanitize → canonical SHA-256 (pre-DB) →
 * encrypt PII → append-only INSERT → instant email receipt.
 */
import { WithdrawSchema } from "@/lib/schema";
import { serviceClient } from "@/lib/supabase";
import { withdrawalHash, encryptField } from "@/lib/crypto";
import { sanitizeText } from "@/lib/sanitize";
import { originAllowed, corsHeaders } from "@/lib/cors";
import { checkRateLimit } from "@/lib/ratelimit";
import { clientIp } from "@/lib/ip";
import { sendReceipt } from "@/lib/email";
import { json, errorJson } from "@/lib/http";
import { env } from "@/lib/env";

export const runtime = "edge";
export const preferredRegion = ["fra1"];

function cors(origin: string | null): Record<string, string> {
  return origin ? corsHeaders(origin) : {};
}

export async function OPTIONS(req: Request): Promise<Response> {
  const origin = req.headers.get("origin");
  return new Response(null, { status: 204, headers: cors(origin) });
}

export async function POST(req: Request): Promise<Response> {
  const origin = req.headers.get("origin");
  const ch = cors(origin);
  const apiKey = req.headers.get("x-api-key");

  try {
    if (!apiKey) return errorJson("invalid_api_key", 401, "Missing API key", ch);

    // 1) Rate limit (max 5 / hour / IP). Raw IP used transiently, never stored.
    const ip = clientIp(req);
    const rl = await checkRateLimit(ip);
    if (!rl.success) {
      const retry = Math.max(1, Math.ceil((rl.reset - Date.now()) / 1000));
      return errorJson("rate_limited", 429, "Too many requests", {
        ...ch,
        "Retry-After": String(retry),
      });
    }

    // 2) Parse + strict validation (rejects any extra field, e.g. a "reason").
    let raw: unknown;
    try {
      raw = await req.json();
    } catch {
      return errorJson("invalid_payload", 400, "Invalid JSON", ch);
    }
    const parsed = WithdrawSchema.safeParse(raw);
    if (!parsed.success) return errorJson("invalid_payload", 400, "Validation failed", ch);

    const name = sanitizeText(parsed.data.name);
    const orderId = sanitizeText(parsed.data.order_id);
    const email = parsed.data.email; // already trimmed + lowercased by schema

    // 3) Resolve the organization from the API key (service-role RPC).
    const db = serviceClient();
    const { data: orgs, error: orgErr } = await db.rpc("org_for_api_key", { p_api_key: apiKey });
    if (orgErr) return errorJson("internal_error", 500, "Org lookup failed", ch);
    const org = Array.isArray(orgs) ? orgs[0] : orgs;
    if (!org) return errorJson("invalid_api_key", 401, "Unknown API key", ch);

    // 4) CORS / domain whitelist.
    if (!originAllowed(origin, org.domain_whitelist || [])) {
      return errorJson("origin_not_allowed", 403, "Origin not whitelisted", ch);
    }

    // 5) Subscription gate (402 when not active).
    if (org.subscription_status !== "active") {
      return errorJson("payment_required", 402, "Subscription not active", ch);
    }

    // 6) Immutable server receipt time + canonical SHA-256 (BEFORE DB write).
    const receivedAtIso = new Date().toISOString();
    const { hash } = await withdrawalHash({
      email,
      order_id: orderId,
      shop_id: org.id,
      timestamp_iso8601: receivedAtIso,
    });
    const proofUrl = `${env.appUrl()}/verify/${hash}`;

    // 7) Encrypt PII at rest, then append-only INSERT.
    const [encName, encEmail] = await Promise.all([encryptField(name), encryptField(email)]);
    const { error: insErr } = await db.from("withdrawal_requests").insert({
      org_id: org.id,
      consumer_name: encName,
      email: encEmail,
      order_id: orderId,
      timestamp_iso8601: receivedAtIso,
      received_at: receivedAtIso,
      sha256_hash: hash,
      tsa_pending: true,
    });
    if (insErr) return errorJson("internal_error", 500, "Persist failed", ch);

    // 8) Instant receipt (durable medium). The record is already safe; if email
    //    delivery fails we still return the proof so the consumer can verify.
    const locale = (req.headers.get("x-lang") || "de").startsWith("en") ? "en" : "de";
    try {
      await sendReceipt(
        {
          name,
          orderId,
          email,
          receivedAtIso,
          hash,
          proofUrl,
          impressumText: org.impressum_text || "",
          locale,
        },
        undefined
      );
    } catch {
      return json(
        { ok: false, error: "email_unavailable", received_at: receivedAtIso, hash, proof_url: proofUrl },
        503,
        ch
      );
    }

    return json({ ok: true, received_at: receivedAtIso, hash, proof_url: proofUrl }, 200, ch);
  } catch {
    return errorJson("internal_error", 500, "Unexpected error", ch);
  }
}
