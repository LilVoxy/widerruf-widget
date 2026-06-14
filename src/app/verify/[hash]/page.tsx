/**
 * Public Proof-URL: /verify/{hash}
 * Reveals only non-PII verification facts (existence, receipt time, notarization
 * status). The consumer's name/email are never shown here.
 */
import { serviceClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ hash: string }>;
}

export default async function VerifyPage({ params }: PageProps) {
  const { hash } = await params;
  const clean = (hash || "").toLowerCase().replace(/[^a-f0-9]/g, "").slice(0, 64);

  const db = serviceClient();
  const { data: rec } = await db
    .from("withdrawal_requests")
    .select("org_id, received_at, timestamp_iso8601, sha256_hash, tsa_pending")
    .eq("sha256_hash", clean)
    .maybeSingle();

  let notarized = false;
  let notarizedDate: string | null = null;
  if (rec) {
    const day = (rec.timestamp_iso8601 || rec.received_at).slice(0, 10);
    const { data: root } = await db
      .from("merkle_roots")
      .select("date, tsa_pending")
      .eq("org_id", rec.org_id)
      .eq("date", day)
      .maybeSingle();
    if (root && !root.tsa_pending) {
      notarized = true;
      notarizedDate = root.date;
    }
  }

  const card: React.CSSProperties = {
    maxWidth: 560,
    margin: "48px auto",
    background: "#fff",
    borderRadius: 12,
    padding: 32,
    boxShadow: "0 10px 40px rgba(0,0,0,.08)",
  };
  const rowS: React.CSSProperties = { padding: "8px 0", borderBottom: "1px solid #f1f5f9", fontSize: 14 };

  if (!rec) {
    return (
      <main style={card}>
        <h1 style={{ fontSize: 22, marginTop: 0 }}>Nachweis nicht gefunden</h1>
        <p style={{ color: "#475569" }}>
          Für diesen Hash wurde kein Widerruf gefunden. / No withdrawal found for this hash.
        </p>
        <code style={{ wordBreak: "break-all", color: "#64748b" }}>{clean}</code>
      </main>
    );
  }

  return (
    <main style={card}>
      <h1 style={{ fontSize: 22, marginTop: 0 }}>✓ Widerruf verifiziert</h1>
      <p style={{ color: "#475569" }}>
        Dieser kryptografische Nachweis bestätigt Eingang und Zeitpunkt eines Widerrufs.
      </p>
      <div style={rowS}>
        <strong>SHA-256:</strong>
        <div style={{ wordBreak: "break-all", color: "#334155" }}>{rec.sha256_hash}</div>
      </div>
      <div style={rowS}>
        <strong>Eingang (ISO 8601):</strong> {rec.timestamp_iso8601}
      </div>
      <div style={rowS}>
        <strong>RFC 3161 Notarisierung:</strong>{" "}
        {notarized ? (
          <span style={{ color: "#16a34a" }}>bestätigt ({notarizedDate})</span>
        ) : (
          <span style={{ color: "#d97706" }}>ausstehend (tsa_pending)</span>
        )}
      </div>
      <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 20 }}>
        Dauerhafter Datenträger gemäß § 126b BGB. Die personenbezogenen Daten werden hier nicht angezeigt.
      </p>
    </main>
  );
}
