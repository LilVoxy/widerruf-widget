"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

const wrap: React.CSSProperties = {
  maxWidth: 400,
  margin: "64px auto",
  background: "#fff",
  padding: 32,
  borderRadius: 12,
};
const labelS: React.CSSProperties = { display: "block", fontWeight: 600, fontSize: 14, marginBottom: 6 };
const inputS: React.CSSProperties = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #cbd5e1",
};
const btnS: React.CSSProperties = {
  marginTop: 16,
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: 0,
  background: "#1d4ed8",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};

/**
 * Two-step e-mail OTP login.
 *
 * We deliberately use a typed 6-digit code instead of a click-through magic
 * link: one-time links get consumed by e-mail security scanners / prefetchers
 * (→ "otp_expired" on first real click) and depend on the PKCE verifier cookie
 * living on the exact same host. A typed code is verified in the same browser
 * session, so neither problem applies.
 */
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    setBusy(false);
    if (error) setErr(error.message);
    else setStep("code");
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code.trim(),
      type: "email",
    });
    setBusy(false);
    if (error) {
      setErr(error.message);
      return;
    }
    // Full navigation so the server component picks up the fresh session cookie.
    router.refresh();
    window.location.href = "/dashboard";
  }

  return (
    <main style={wrap}>
      <h1 style={{ fontSize: 22, marginTop: 0 }}>Dashboard-Login</h1>

      {step === "email" ? (
        <form onSubmit={sendCode}>
          <label htmlFor="em" style={labelS}>
            E-Mail-Adresse
          </label>
          <input
            id="em"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputS}
          />
          {err && <p style={{ color: "#b91c1c", fontSize: 13 }}>{err}</p>}
          <button type="submit" disabled={busy} style={{ ...btnS, opacity: busy ? 0.6 : 1 }}>
            {busy ? "Senden…" : "Code anfordern"}
          </button>
        </form>
      ) : (
        <form onSubmit={verify}>
          <p style={{ fontSize: 14, color: "#475569", marginTop: 0 }}>
            Wir haben einen 6-stelligen Code an <strong>{email}</strong> gesendet.
          </p>
          <label htmlFor="code" style={labelS}>
            Login-Code
          </label>
          <input
            id="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            style={{ ...inputS, letterSpacing: 4, fontSize: 18, textAlign: "center" }}
          />
          {err && <p style={{ color: "#b91c1c", fontSize: 13 }}>{err}</p>}
          <button type="submit" disabled={busy} style={{ ...btnS, opacity: busy ? 0.6 : 1 }}>
            {busy ? "Prüfen…" : "Anmelden"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setErr("");
            }}
            style={{
              marginTop: 10,
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Zurück
          </button>
        </form>
      )}
    </main>
  );
}
