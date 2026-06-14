import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 760, margin: "64px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 32 }}>Widerrufsbutton DACH</h1>
      <p style={{ fontSize: 18, color: "#475569" }}>
        § 356a BGB-konformer Widerrufs-Button als einbettbares Widget — mit
        manipulationssicherem kryptografischem Audit (SHA-256 → Merkle Tree →
        RFC 3161). DSGVO-konform, EU-Hosting (Frankfurt).
      </p>
      <p>
        <Link
          href="/dashboard"
          style={{ display: "inline-block", background: "#1d4ed8", color: "#fff", padding: "12px 20px", borderRadius: 8, textDecoration: "none", fontWeight: 600 }}
        >
          Zum Dashboard
        </Link>
      </p>
    </main>
  );
}
