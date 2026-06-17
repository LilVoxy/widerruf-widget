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

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{t.logs.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{t.logs.subtitle}</p>
        </div>
        {total > 0 && (
          <span className="text-sm text-slate-500">
            {fmt(t.logs.entries, { count: total })}
            {totalPages > 1 ? ` · ${fmt(t.logs.pageOf, { page, total: totalPages })}` : ""}
          </span>
        )}
      </header>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Inbox className="mx-auto h-10 w-10 text-slate-400" />
          <h2 className="mt-3 text-lg font-semibold text-slate-900">{t.logs.empty.title}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{t.logs.empty.text}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">{t.logs.th.date}</th>
                  <th className="px-4 py-3 font-medium">{t.logs.th.order}</th>
                  <th className="px-4 py-3 font-medium">{t.logs.th.email}</th>
                  <th className="px-4 py-3 font-medium">{t.logs.th.proof}</th>
                  <th className="px-4 py-3 font-medium">{t.logs.th.tsa}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                      {new Date(r.dateIso).toLocaleString(lang)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-700">{r.orderId}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {r.anonymized ? (
                        <span className="text-slate-400">{t.logs.anonymized}</span>
                      ) : (
                        <span title={r.name || undefined}>{r.emailPlain || "—"}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/verify/${r.sha256Hash}`}
                          className="inline-flex items-center gap-1 font-mono text-xs text-brand-600 hover:text-brand-700 hover:underline"
                          title={r.sha256Hash}
                        >
                          {r.sha256Hash.slice(0, 12)}…
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <a
                          href={`/api/export/${r.sha256Hash}`}
                          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
                        >
                          <Download className="h-3.5 w-3.5" />
                          {t.logs.zip}
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {r.tsaPending ? (
                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                          {t.logs.status.pending}
                        </span>
                      ) : (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
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
            <Link
              href={`/dashboard/logs?page=${page - 1}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              {t.logs.back}
            </Link>
          ) : (
            <span />
          )}
          {page < totalPages ? (
            <Link
              href={`/dashboard/logs?page=${page + 1}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
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
