/**
 * CORS / Origin allow-listing. The intake endpoint is public (no Login-Wall),
 * so the only embedding control is the per-organization domain whitelist.
 */

function hostOf(origin: string): string | null {
  try {
    return new URL(origin).host.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * True if `origin` matches one of the whitelisted domains. A whitelist entry
 * may be a bare host ("shop.de"), which also matches its subdomains
 * ("www.shop.de"), or an explicit host.
 */
export function originAllowed(origin: string | null, whitelist: string[]): boolean {
  if (!origin || whitelist.length === 0) return false;
  const host = hostOf(origin);
  if (!host) return false;
  return whitelist.some((entry) => {
    const w = entry.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!w) return false;
    return host === w || host.endsWith("." + w);
  });
}

/** Headers echoed back on allowed cross-origin responses. */
export function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Api-Key",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}
