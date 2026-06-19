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

const cardClass =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_8px_32px_-12px_rgb(29_78_216/0.12)] ring-1 ring-inset ring-white/5 backdrop-blur-sm";

export default function Overview({ data }: { data: OverviewData }) {
  const t = useT();
  const { lang } = useLang();

  if (!data.hasOrg) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-white">{t.overview.title}</h1>
          <p className="mt-1 text-sm text-slate-400">{t.overview.welcome}</p>
        </header>
        <section className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center backdrop-blur-sm">
          <div className="relative mx-auto w-fit">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-[1.5rem] bg-brand-500/30 blur-xl"
            />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/20">
              <ShieldCheck className="h-7 w-7" />
            </span>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-white">{t.overview.noOrg.title}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">{t.overview.noOrg.text}</p>
          <Link
            href="/dashboard/settings"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/15 transition-all duration-200 ease-out hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none"
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
        <h1 className="text-2xl font-semibold tracking-tight text-white">{t.overview.title}</h1>
        <p className="mt-1 text-sm text-slate-400">{data.orgName || t.overview.yourOrg}</p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_8px_32px_-12px_rgb(29_78_216/0.1)] ring-1 ring-inset ring-white/5 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-500/20 hover:shadow-[0_12px_40px_-12px_rgb(29_78_216/0.28)] motion-reduce:transform-none motion-reduce:transition-none"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-500 ring-1 ring-inset ring-white/10 transition-colors duration-200 group-hover:bg-brand-600/15 group-hover:text-brand-300 group-hover:ring-brand-500/25">
                <Icon className="h-[18px] w-[18px]" />
              </span>
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight text-white tabular-nums">{value}</div>
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

      <section className={cardClass}>
        <h2 className="text-base font-semibold text-white">{t.overview.avv.title}</h2>
        {data.avvAcceptedAt ? (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20" suppressHydrationWarning>
            <ShieldCheck className="h-4 w-4" />
            {fmt(t.overview.avv.acceptedAt, {
              date: new Date(data.avvAcceptedAt).toLocaleString(lang),
            })}
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-300 ring-1 ring-inset ring-amber-500/20">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {t.overview.avv.notAccepted}
            </span>
            <Link
              href="/dashboard/settings"
              className="text-sm font-medium text-brand-300 underline-offset-4 transition-colors hover:text-brand-200 hover:underline hover:decoration-brand-400"
            >
              {t.overview.avv.acceptInSettings}
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
