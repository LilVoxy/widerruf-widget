/**
 * Extract and anonymize the client IP (GDPR Art. 5 / DSGVO). The last IPv4
 * octet is zeroed; for IPv6 only the /48 prefix is kept. The anonymized value
 * is what may be persisted (e.g. avv_accepted_ip_anonymized); raw IPs are used
 * transiently only for rate limiting and never stored.
 */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "0.0.0.0";
}

export function anonymizeIp(ip: string): string {
  if (!ip) return "0.0.0.0";
  if (ip.includes(":")) {
    // IPv6 → keep first 3 groups (/48), mask the rest.
    const groups = ip.split(":");
    return groups.slice(0, 3).join(":") + "::";
  }
  // IPv4 → zero the final octet.
  const parts = ip.split(".");
  if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  return "0.0.0.0";
}
