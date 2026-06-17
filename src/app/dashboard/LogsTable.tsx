"use client";

import Link from "next/link";
import { Download, ExternalLink, Inbox } from "lucide-react";
import { useT, useLang } from "@/i18n/LanguageProvider";
import { fmt } from "@/i18n/format";

export interface LogRow {
  id: string;
  dateIso: string;
  orderId: string;
  emailPlain: string;
  name: string;
  anonymized: boolean;
  sha256Hash: string;
  tsaPending: boolean;
}

export default function LogsTable({
  rows,
  total,
  page,
  totalPages,
}: {
  rows: LogRow[];
  total: number;
  page: number;
  totalPages: number;
}) {
  const t = useT();
  const { lang } = useLang();

  const navBtn =
    "rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200 backdrop-blur transition-all duration-200 ease-out hover:border-white/25 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none";

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">{t.logs.title}</h1>
          <p className="mt-1 text-sm text-slate-400">{t.logs.subtitle}</p>
        </div>
        {total > 0 && (
          <span className="text-sm text-slate-500 tabular-nums">
            {fmt(t.logs.entries, { count: total })}
            {totalPages > 1 ? ` · ${fmt(t.logs.pageOf, { page, total: totalPages })}` : ""}
          </span>
        )}
      </header>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-12 text-center backdrop-blur-sm">
          <div className="relative mx-auto w-fit">
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-[1.5rem] bg-brand-500/20 blur-xl"
            />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-slate-400 ring-1 ring-inset ring-white/10">
              <Inbox className="h-7 w-7" />
            </span>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-white">{t.logs.empty.title}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">{t.logs.empty.text}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_8px_32px_-12px_rgb(29_78_216/0.12)] ring-1 ring-inset ring-white/5 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 z-10 border-b border-white/10 bg-slate-900/80 text-xs font-medium uppercase tracking-wide text-slate-400 backdrop-blur">
                <tr>
                  <th className="px-4 py-3 font-medium">{t.logs.th.date}</th>
                  <th className="px-4 py-3 font-medium">{t.logs.th.order}</th>
                  <th className="px-4 py-3 font-medium">{t.logs.th.email}</th>
                  <th className="px-4 py-3 font-medium">{t.logs.th.proof}</th>
                  <th className="px-4 py-3 font-medium">{t.logs.th.tsa}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((r) => (
                  <tr key={r.id} className="transition-colors hover:bg-white/[0.03]">
                    <td className="whitespace-nowrap px-4 py-3 text-slate-300 tabular-nums">
                      {new Date(r.dateIso).toLocaleString(lang)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs tracking-tight text-slate-300">{r.orderId}</td>
                    <td className="px-4 py-3 text-slate-300">
                      {r.anonymized ? (
                        <span className="text-slate-500">{t.logs.anonymized}</span>
                      ) : (
                        <span title={r.name || undefined}>{r.emailPlain || "—"}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/verify/${r.sha256Hash}`}
                          className="inline-flex items-center gap-1 font-mono text-xs tracking-tight text-brand-300 underline-offset-4 transition-colors hover:text-brand-200 hover:underline hover:decoration-brand-400"
                          title={r.sha256Hash}
                        >
                          {r.sha256Hash.slice(0, 12)}…
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <a
                          href={`/api/export/${r.sha256Hash}`}
                          className="inline-flex items-center gap-1 text-xs text-slate-500 underline-offset-4 transition-colors hover:text-brand-300 hover:underline hover:decoration-brand-400"
                        >
                          <Download className="h-3.5 w-3.5" />
                          {t.logs.zip}
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {r.tsaPending ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-300 ring-1 ring-inset ring-amber-500/20">
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                          {t.logs.status.pending}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20">
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {t.logs.status.anchored}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {totalPages > 1 && (
        <nav className="flex items-center justify-between">
          {page > 1 ? (
            <Link href={`/dashboard/logs?page=${page - 1}`} className={navBtn}>
              {t.logs.back}
            </Link>
          ) : (
            <span />
          )}
          {page < totalPages ? (
            <Link href={`/dashboard/logs?page=${page + 1}`} className={navBtn}>
              {t.logs.next}
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
