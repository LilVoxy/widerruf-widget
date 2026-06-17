import { supabaseServer } from "@/lib/supabase-server";
import type { OrgRow } from "../types";
import Settings from "../Settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = await supabaseServer();

  const { data: org } = await supabase
    .from("organizations")
    .select(
      "id, name, api_key, domain_whitelist, impressum_text, subscription_status, subscription_plan, avv_accepted_at"
    )
    .maybeSingle();

  return <Settings org={(org as OrgRow) || null} />;
}
