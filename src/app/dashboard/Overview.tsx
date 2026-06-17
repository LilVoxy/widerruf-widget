"use client";

import Link from "next/link";
import { FileText, CalendarClock, Clock3, ShieldCheck, ArrowRight } from "lucide-react";
import { useT, useLang } from "@/i18n/LanguageProvider";
import { fmt } from "@/i18n/format";
import IntegrationCard from "./IntegrationCard";

export interface OverviewData {
  hasOrg: boolean;
  orgId: string;
  orgName: string;
  apiKey: string;
  appUrl: string;
  subscriptionStatus: string;
  avvAcceptedAt: string | null;
  total: number;
  last30: number;
  pending: number;
}

export default function Overview({ data }: { data: OverviewData }) {
  const t = useT();
  const { lang } = useLang();

  if (!data.hasOrg) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold text-slate-900">{t.overview.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{t.overview.welcome}</p>
        </header>
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-brand-600" />
          <h2 className="mt-3 text-lg font-semibold text-slate-900">{t.overview.noOrg.title}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{t.overview.noOrg.text}</p>
          <Link
            href="/dashboard/settings"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {t.overview.noOrg.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    );
  }

  const stats = [
    { label: t.overview.stats.total, value: data.total, icon: FileText },
    { label: t.overview.stats.last30, value: data.last30, icon: CalendarClock },
    { label: t.overview.stats.pending, value: data.pending, icon: Clock3 },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">{t.overview.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{data.orgName || t.overview.yourOrg}</p>
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
        isActive={data.subscriptionStatus === "active"}
        apiKey={data.apiKey}
        appUrl={data.appUrl}
        orgId={data.orgId}
        subscriptionStatus={data.subscriptionStatus}
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">{t.overview.avv.title}</h2>
        {data.avvAcceptedAt ? (
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
            {fmt(t.overview.avv.acceptedAt, {
              date: new Date(data.avvAcceptedAt).toLocaleString(lang),
            })}
          </p>
        ) : (
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <p className="text-sm text-amber-700">{t.overview.avv.notAccepted}</p>
            <Link
              href="/dashboard/settings"
              className="text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              {t.overview.avv.acceptInSettings}
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
