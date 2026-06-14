"use client";
import { useState } from "react";
import type { OrgRow } from "./page";

const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: 12,
  padding: 24,
  marginTop: 20,
  boxShadow: "0 4px 16px rgba(0,0,0,.05)",
};
const labelS: React.CSSProperties = { display: "block", fontWeight: 600, fontSize: 14, margin: "14px 0 6px" };
const inputS: React.CSSProperties = { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 14 };
const btnS: React.CSSProperties = { padding: "10px 16px", borderRadius: 8, border: 0, background: "#1d4ed8", color: "#fff", fontWeight: 600, cursor: "pointer" };

export default function Settings({ org, appUrl }: { org: OrgRow | null; appUrl: string }) {
  const [name, setName] = useState(org?.name || "");
  const [impressum, setImpressum] = useState(org?.impressum_text || "");
  const [domains, setDomains] = useState((org?.domain_whitelist || []).join(", "));
  const [avv, setAvv] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [current, setCurrent] = useState<OrgRow | null>(org);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/org", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        impressum_text: impressum,
        domain_whitelist: domains.split(",").map((d) => d.trim()).filter(Boolean),
      }),
    });
    const d = await res.json();
    setBusy(false);
    if (d.ok) {
      setCurrent(d.org);
      setMsg("Gespeichert.");
    } else setMsg("Fehler: " + (d.error || "unbekannt"));
  }

  async function acceptAvv() {
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/org/avv", { method: "POST" });
    const d = await res.json();
    setBusy(false);
    if (d.ok) {
      setCurrent((c) => (c ? { ...c, avv_accepted_at: d.avv_accepted_at } : c));
      setMsg("AVV akzeptiert am " + d.avv_accepted_at);
    } else setMsg("Fehler: " + (d.error || "unbekannt"));
  }

  const isActive = current?.subscription_status === "active";
  const snippet = current
    ? `<script src="${appUrl}/widget.min.js" data-api-key="${current.api_key}" defer></script>`
    : "";

  return (
    <>
      <form style={card} onSubmit={save}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Stammdaten</h2>
        <label style={labelS} htmlFor="nm">Shop-/Firmenname</label>
        <input id="nm" style={inputS} value={name} onChange={(e) => setName(e.target.value)} required />

        <label style={labelS} htmlFor="dm">Erlaubte Domains (CORS-Whitelist, kommagetrennt)</label>
        <input id="dm" style={inputS} value={domains} onChange={(e) => setDomains(e.target.value)} placeholder="shop.de, www.shop.de" />

        <label style={labelS} htmlFor="im">Impressum (erscheint im Quittungs-Footer) *</label>
        <textarea id="im" style={{ ...inputS, minHeight: 120 }} value={impressum} onChange={(e) => setImpressum(e.target.value)} required />

        <div style={{ marginTop: 18 }}>
          <button style={btnS} disabled={busy} type="submit">{org ? "Speichern" : "Organisation anlegen"}</button>
        </div>
      </form>

      <section style={card}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Auftragsverarbeitungsvertrag (AVV)</h2>
        {current?.avv_accepted_at ? (
          <p style={{ color: "#16a34a" }}>Akzeptiert am {current.avv_accepted_at}</p>
        ) : (
          <>
            <label style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14 }}>
              <input type="checkbox" checked={avv} onChange={(e) => setAvv(e.target.checked)} />
              <span>Ich akzeptiere den Auftragsverarbeitungsvertrag (Art. 28 DSGVO). Zeitpunkt und anonymisierte IP werden zu Auditzwecken gespeichert.</span>
            </label>
            <div style={{ marginTop: 14 }}>
              <button style={btnS} disabled={!avv || busy || !current} onClick={acceptAvv} type="button">AVV akzeptieren</button>
            </div>
            {!current && <p style={{ fontSize: 13, color: "#64748b" }}>Bitte zuerst die Organisation anlegen.</p>}
          </>
        )}
      </section>

      <section style={card}>
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Integrations-Snippet</h2>
        <p style={{ fontSize: 14, color: "#475569" }}>
          Abo-Status: <strong>{current?.subscription_status || "—"}</strong>
        </p>
        {isActive ? (
          <>
            <p style={{ fontSize: 14 }}>Fügen Sie diesen Tag vor <code>&lt;/body&gt;</code> ein:</p>
            <textarea readOnly style={{ ...inputS, fontFamily: "monospace", minHeight: 70 }} value={snippet} />
            <div style={{ marginTop: 12 }}>
              <button style={btnS} type="button" onClick={() => navigator.clipboard.writeText(snippet)}>Kopieren</button>
            </div>
          </>
        ) : (
          <p style={{ color: "#d97706", fontSize: 14 }}>
            Das Snippet wird angezeigt, sobald ein aktives Abonnement vorliegt (subscription_status = &apos;active&apos;).
          </p>
        )}
      </section>

      {msg && <p style={{ marginTop: 16, color: "#334155" }}>{msg}</p>}
    </>
  );
}
