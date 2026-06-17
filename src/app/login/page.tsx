"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-300";
const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition-shadow duration-200 placeholder:text-slate-500 focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/15";
const primaryBtn =
  "mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/15 transition-all duration-200 ease-out hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60 disabled:active:scale-100 motion-reduce:transform-none motion-reduce:transition-none";
const secondaryBtn =
  "mt-2.5 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 backdrop-blur transition-all duration-200 ease-out hover:border-white/25 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none";

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
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(37,99,235,0.28) 0%, rgba(2,6,23,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(35% 40% at 88% 25%, rgba(30,64,175,0.2) 0%, rgba(2,6,23,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(75% 65% at 50% 0%, black 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(75% 65% at 50% 0%, black 0%, transparent 80%)",
        }}
      />

      <main className="relative mx-auto w-full max-w-md px-4 py-16 sm:py-24">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_8px_32px_-12px_rgb(29_78_216/0.15)] ring-1 ring-inset ring-white/5 backdrop-blur-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Dashboard-Login</h1>

          {step === "email" ? (
            <form className="mt-6" onSubmit={sendCode}>
              <label htmlFor="em" className={labelClass}>
                E-Mail-Adresse
              </label>
              <input
                id="em"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
              {err && <p className="mt-3 text-sm text-red-400">{err}</p>}
              <button type="submit" disabled={busy} className={primaryBtn}>
                {busy ? "Senden…" : "Code anfordern"}
              </button>
            </form>
          ) : (
            <form className="mt-6" onSubmit={verify}>
              <p className="text-sm text-slate-400">
                Wir haben einen 6-stelligen Code an <strong className="text-white">{email}</strong>{" "}
                gesendet.
              </p>
              <label htmlFor="code" className={`${labelClass} mt-4`}>
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
                className={`${inputClass} text-center text-lg tracking-[0.25em]`}
              />
              {err && <p className="mt-3 text-sm text-red-400">{err}</p>}
              <button type="submit" disabled={busy} className={primaryBtn}>
                {busy ? "Prüfen…" : "Anmelden"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setCode("");
                  setErr("");
                }}
                className={secondaryBtn}
              >
                Zurück
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
