import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import DashboardShell from "./DashboardShell";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return <DashboardShell email={user.email ?? ""}>{children}</DashboardShell>;
}
