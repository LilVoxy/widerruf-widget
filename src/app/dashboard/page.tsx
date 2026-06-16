import Link from "next/link";
import { FileText, CalendarClock, Clock3, ShieldCheck, ArrowRight } from "lucide-react";
import { supabaseServer } from "@/lib/supabase-server";
import { env } from "@/lib/env";
import type { OrgRow } from "./types";
import IntegrationCard from "./IntegrationCard";

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

  if (!orgRow) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-slate-900">Übersicht</h1>
          <p className="mt-1 text-sm text-slate-500">Willkommen bei Widerrufsbutton DACH.</p>
        </header>
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-brand-600" />
          <h2 className="mt-3 text-lg font-semibold text-slate-900">
            Organisation noch nicht angelegt
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Legen Sie zuerst Ihre Stammdaten an, um das Widget zu konfigurieren und
            Widerrufe rechtssicher zu protokollieren.
          </p>
          <Link
            href="/dashboard/settings"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Zu den Einstellungen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    );
  }

  const stats = [
    { label: "Widerrufe gesamt", value: total, icon: FileText },
    { label: "Letzte 30 Tage", value: last30, icon: CalendarClock },
    { label: "TSA ausstehend", value: pending, icon: Clock3 },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Übersicht</h1>
        <p className="mt-1 text-sm text-slate-500">{orgRow.name || "Ihre Organisation"}</p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">{label}</span>
              <Icon className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-2 text-3xl font-semibold text-slate-900 tabular-nums">{value}</div>
          </div>
        ))}
      </div>

      <IntegrationCard
        isActive={orgRow.subscription_status === "active"}
        apiKey={orgRow.api_key}
        appUrl={appUrl}
        orgId={orgRow.id}
        subscriptionStatus={orgRow.subscription_status}
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Auftragsverarbeitungsvertrag (AVV)
        </h2>
        {orgRow.avv_accepted_at ? (
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
            Akzeptiert am {new Date(orgRow.avv_accepted_at).toLocaleString("de")}
          </p>
        ) : (
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="text-sm text-amber-700">
              Noch nicht akzeptiert (Art. 28 DSGVO).
            </p>
            <Link
              href="/dashboard/settings"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              In den Einstellungen akzeptieren →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
