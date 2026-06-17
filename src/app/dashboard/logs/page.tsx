import { supabaseServer } from "@/lib/supabase-server";
import { decryptField } from "@/lib/crypto";
import LogsTable, { type LogRow } from "../LogsTable";

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
  const decrypted: LogRow[] = await Promise.all(
    rows.map(async (r) => {
      const anonymized = !!r.anonymized_at;
      const [name, email] = anonymized
        ? ["", ""]
        : await Promise.all([decryptField(r.consumer_name), decryptField(r.email)]);
      return {
        id: r.id,
        dateIso: r.timestamp_iso8601 || r.received_at,
        orderId: r.order_id,
        emailPlain: email,
        name,
        anonymized,
        sha256Hash: r.sha256_hash,
        tsaPending: r.tsa_pending,
      };
    })
  );

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return <LogsTable rows={decrypted} total={total} page={page} totalPages={totalPages} />;
}
