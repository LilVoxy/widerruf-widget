import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import Settings from "./Settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export interface OrgRow {
  id: string;
  name: string;
  api_key: string;
  domain_whitelist: string[];
  impressum_text: string;
  subscription_status: "active" | "past_due" | "canceled";
  subscription_plan: string | null;
  avv_accepted_at: string | null;
}

export default async function DashboardPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: org } = await supabase
    .from("organizations")
    .select("id, name, api_key, domain_whitelist, impressum_text, subscription_status, subscription_plan, avv_accepted_at")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";

  return (
    <main style={{ maxWidth: 760, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 26 }}>Widerrufsbutton — Dashboard</h1>
      <p style={{ color: "#475569" }}>Angemeldet als {user.email}</p>
      <Settings org={(org as OrgRow) || null} appUrl={appUrl} />
    </main>
  );
}
