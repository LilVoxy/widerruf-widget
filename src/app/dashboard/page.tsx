import { supabaseServer } from "@/lib/supabase-server";
import { env } from "@/lib/env";
import type { OrgRow } from "./types";
import Overview, { type OverviewData } from "./Overview";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await supabaseServer();

  const { data: org } = await supabase
    .from("organizations")
    .select(
      "id, name, api_key, domain_whitelist, impressum_text, subscription_status, subscription_plan, avv_accepted_at"
    )
    .maybeSingle();

  const appUrl = env.appUrl();
  const orgRow = (org as OrgRow) || null;

  // Stats (RLS already scopes rows to the caller's org; filter explicitly too).
  let total = 0;
  let last30 = 0;
  let pending = 0;
  if (orgRow) {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const [totalRes, last30Res, pendingRes] = await Promise.all([
      supabase
        .from("withdrawal_requests")
        .select("id", { count: "exact", head: true })
        .eq("org_id", orgRow.id),
      supabase
        .from("withdrawal_requests")
        .select("id", { count: "exact", head: true })
        .eq("org_id", orgRow.id)
        .gte("received_at", since),
      supabase
        .from("withdrawal_requests")
        .select("id", { count: "exact", head: true })
        .eq("org_id", orgRow.id)
        .eq("tsa_pending", true),
    ]);
    total = totalRes.count ?? 0;
    last30 = last30Res.count ?? 0;
    pending = pendingRes.count ?? 0;
  }

  const data: OverviewData = {
    hasOrg: !!orgRow,
    orgId: orgRow?.id ?? "",
    orgName: orgRow?.name ?? "",
    apiKey: orgRow?.api_key ?? "",
    appUrl,
    subscriptionStatus: orgRow?.subscription_status ?? "",
    avvAcceptedAt: orgRow?.avv_accepted_at ?? null,
    total,
    last30,
    pending,
  };

  return <Overview data={data} />;
}
