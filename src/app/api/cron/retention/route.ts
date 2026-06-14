/**
 * GET/POST /api/cron/retention — daily GDPR retention job (Art. 5(1)(e) DSGVO).
 *
 * Nullifies raw PII (email + consumer name) for withdrawals older than
 * DATA_RETENTION_DAYS while KEEPING the SHA-256 hash intact for legal audit.
 * Delegates to the SECURITY DEFINER RPC `anonymize_expired_withdrawals`.
 */
import { serviceClient } from "@/lib/supabase";
import { env } from "@/lib/env";
import { json, errorJson } from "@/lib/http";

export const runtime = "nodejs";

function authorized(req: Request): boolean {
  return req.headers.get("authorization") === `Bearer ${env.cronSecret()}`;
}

export async function GET(req: Request): Promise<Response> {
  return POST(req);
}

export async function POST(req: Request): Promise<Response> {
  if (!authorized(req)) return errorJson("invalid_api_key", 401, "Bad cron secret");

  const db = serviceClient();
  const { data, error } = await db.rpc("anonymize_expired_withdrawals", {
    p_retention_days: env.retentionDays(),
  });
  if (error) return errorJson("internal_error", 500, error.message);

  return json({ ok: true, retention_days: env.retentionDays(), anonymized: data });
}
