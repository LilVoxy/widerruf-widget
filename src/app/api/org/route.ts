/**
 * POST /api/org — create or update the caller's organization (dashboard).
 * RLS-scoped to the authenticated user; billing columns are never touched here
 * (those are mutated only by the billing webhook via the service role).
 */
import crypto from "node:crypto";
import { supabaseServer } from "@/lib/supabase-server";
import { sanitizeText } from "@/lib/sanitize";
import { json } from "@/lib/http";

export const runtime = "nodejs";

const SELECT = "id, name, api_key, domain_whitelist, impressum_text, subscription_status, subscription_plan, avv_accepted_at";

export async function POST(req: Request): Promise<Response> {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return json({ ok: false, error: "unauthorized" }, 401);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_json" }, 400);
  }

  const name = sanitizeText(String(body.name || "")).slice(0, 200);
  const impressum_text = String(body.impressum_text || "").slice(0, 8000);
  const domain_whitelist = Array.isArray(body.domain_whitelist)
    ? body.domain_whitelist.map((d: unknown) => sanitizeText(String(d)).toLowerCase()).filter(Boolean).slice(0, 50)
    : [];

  const { data: existing } = await supabase
    .from("organizations")
    .select("id")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  if (existing) {
    const { data, error } = await supabase
      .from("organizations")
      .update({ name, impressum_text, domain_whitelist })
      .eq("id", existing.id)
      .select(SELECT)
      .single();
    if (error) return json({ ok: false, error: error.message }, 500);
    return json({ ok: true, org: data });
  }

  const api_key = "wb_live_" + crypto.randomBytes(24).toString("hex");
  const { data, error } = await supabase
    .from("organizations")
    .insert({ owner_user_id: user.id, name, impressum_text, domain_whitelist, api_key })
    .select(SELECT)
    .single();
  if (error) return json({ ok: false, error: error.message }, 500);
  return json({ ok: true, org: data });
}
