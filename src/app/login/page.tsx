"use client";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: "https://www.widerruf-widget.de/auth/callback?next=/dashboard" },
    });
    if (error) setErr(error.message);
    else setSent(true);
  }

  return (
    <main style={{ maxWidth: 400, margin: "64px auto", background: "#fff", padding: 32, borderRadius: 12 }}>
      <h1 style={{ fontSize: 22, marginTop: 0 }}>Dashboard-Login</h1>
      {sent ? (
        <p>Prüfen Sie Ihr Postfach — wir haben Ihnen einen Anmeldelink gesendet.</p>
      ) : (
        <form onSubmit={submit}>
          <label htmlFor="em" style={{ display: "block", fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
            E-Mail-Adresse
          </label>
          <input
            id="em"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #cbd5e1" }}
          />
          {err && <p style={{ color: "#b91c1c", fontSize: 13 }}>{err}</p>}
          <button
            type="submit"
            style={{ marginTop: 16, width: "100%", padding: 12, borderRadius: 8, border: 0, background: "#1d4ed8", color: "#fff", fontWeight: 600, cursor: "pointer" }}
          >
            Magic-Link senden
          </button>
        </form>
      )}
    </main>
  );
}
