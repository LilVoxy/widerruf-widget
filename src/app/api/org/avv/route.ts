/**
 * POST /api/org/avv — record AVV (DPA / Art. 28 DSGVO) acceptance.
 * Stores the exact ISO 8601 timestamp AND the anonymized IP of the shop for the
 * legal audit trail (not a mere boolean).
 */
import { supabaseServer } from "@/lib/supabase-server";
import { clientIp, anonymizeIp } from "@/lib/ip";
import { json } from "@/lib/http";

export const runtime = "nodejs";

export async function POST(req: Request): Promise<Response> {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return json({ ok: false, error: "unauthorized" }, 401);

  const avv_accepted_at = new Date().toISOString();
  const avv_accepted_ip_anonymized = anonymizeIp(clientIp(req));

  const { error } = await supabase
    .from("organizations")
    .update({ avv_accepted_at, avv_accepted_ip_anonymized })
    .eq("owner_user_id", user.id);
  if (error) return json({ ok: false, error: error.message }, 500);

  return json({ ok: true, avv_accepted_at });
}
