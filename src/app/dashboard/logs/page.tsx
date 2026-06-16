import Link from "next/link";
import { Download, ExternalLink, Inbox } from "lucide-react";
import { supabaseServer } from "@/lib/supabase-server";
import { decryptField } from "@/lib/crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

interface WithdrawalRow {
  id: string;
  consumer_name: string | null;
  email: string | null;
  order_id: string;
  timestamp_iso8601: string;
  received_at: string;
  sha256_hash: string;
  tsa_pending: boolean;
  anonymized_at: string | null;
}

export default async function LogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page || "1", 10) || 1);
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = await supabaseServer();

  // RLS scopes these rows to the authenticated user's organization.
  const { data, count } = await supabase
    .from("withdrawal_requests")
    .select(
      "id, consumer_name, email, order_id, timestamp_iso8601, received_at, sha256_hash, tsa_pending, anonymized_at",
      { count: "exact" }
    )
    .order("received_at", { ascending: false })
    .range(from, to);

  const rows = (data as WithdrawalRow[]) || [];

  // Decrypt PII server-side (never sent to the client encrypted or otherwise
  // for anonymized rows).
  const decrypted = await Promise.all(
    rows.map(async (r) => {
      const anonymized = !!r.anonymized_at;
      const [name, email] = anonymized
        ? ["", ""]
        : await Promise.all([decryptField(r.consumer_name), decryptField(r.email)]);
      return { ...r, name, emailPlain: email, anonymized };
    })
  );

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Widerrufs-Log</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manipulationssicheres Protokoll aller eingegangenen Widerrufe.
          </p>
        </div>
        {total > 0 && (
          <span className="text-sm text-slate-500">
            {total} Einträge{totalPages > 1 ? ` · Seite ${page}/${totalPages}` : ""}
          </span>
        )}
      </header>

      {decrypted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <Inbox className="mx-auto h-10 w-10 text-slate-400" />
          <h2 className="mt-3 text-lg font-semibold text-slate-900">Noch keine Widerrufe</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Sobald über das Widget ein Widerruf eingeht, erscheint er hier mit
            kryptografischem Nachweis.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Datum</th>
                  <th className="px-4 py-3 font-medium">Order-ID</th>
                  <th className="px-4 py-3 font-medium">E-Mail</th>
                  <th className="px-4 py-3 font-medium">Nachweis (SHA-256)</th>
                  <th className="px-4 py-3 font-medium">TSA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {decrypted.map((r) => {
                  const date = r.timestamp_iso8601 || r.received_at;
                  return (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                        {new Date(date).toLocaleString("de")}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-700">{r.order_id}</td>
                      <td className="px-4 py-3 text-slate-700">
                        {r.anonymized ? (
                          <span className="text-slate-400">— (anonymisiert)</span>
                        ) : (
                          <span title={r.name || undefined}>{r.emailPlain || "—"}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/verify/${r.sha256_hash}`}
                            className="inline-flex items-center gap-1 font-mono text-xs text-brand-600 hover:text-brand-700 hover:underline"
                            title={r.sha256_hash}
                          >
                            {r.sha256_hash.slice(0, 12)}…
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                          <a
                            href={`/api/export/${r.sha256_hash}`}
                            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
                            title="Beweispaket (ZIP) herunterladen"
                          >
                            <Download className="h-3.5 w-3.5" />
                            ZIP
                          </a>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {r.tsa_pending ? (
                          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                            ausstehend
                          </span>
                        ) : (
                          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            verankert
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
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
              ← Zurück
            </Link>
          ) : (
            <span />
          )}
          {page < totalPages ? (
            <Link
              href={`/dashboard/logs?page=${page + 1}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Weiter →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
