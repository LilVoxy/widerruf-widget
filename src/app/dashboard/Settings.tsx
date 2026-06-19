"use client";
import { useState } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import type { OrgRow } from "./types";
import { useT, useLang } from "@/i18n/LanguageProvider";
import { fmt } from "@/i18n/format";

const CHECKOUT_BASE =
  "https://widerruf-widget.lemonsqueezy.com/checkout/buy/2f827963-4be2-42ea-9f5b-cfad3b504958";

const cardClass =
  "rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_8px_32px_-12px_rgb(29_78_216/0.12)] ring-1 ring-inset ring-white/5 backdrop-blur-sm";
const labelClass =
  "mt-4 block text-xs font-medium uppercase tracking-wide text-slate-500";
const inputClass =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none transition-shadow duration-200 focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/15";
const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/15 transition-all duration-200 ease-out hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60 disabled:active:scale-100 motion-reduce:transform-none motion-reduce:transition-none";

export default function Settings({ org }: { org: OrgRow | null }) {
  const t = useT();
  const { lang } = useLang();
  const [name, setName] = useState(org?.name || "");
  const [impressum, setImpressum] = useState(org?.impressum_text || "");
  const [domains, setDomains] = useState((org?.domain_whitelist || []).join(", "));
  const [avv, setAvv] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [current, setCurrent] = useState<OrgRow | null>(org);
  const [confirmCancel, setConfirmCancel] = useState(false);

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
      setMsg(t.settings.saved);
    } else setMsg(t.settings.error + (d.error || t.settings.unknown));
  }

  async function acceptAvv() {
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/org/avv", { method: "POST" });
    const d = await res.json();
    setBusy(false);
    if (d.ok) {
      setCurrent((c) => (c ? { ...c, avv_accepted_at: d.avv_accepted_at } : c));
      setMsg(t.settings.avvAcceptedAt + d.avv_accepted_at);
    } else setMsg(t.settings.error + (d.error || t.settings.unknown));
  }

  async function cancelSubscription() {
    setBusy(true);
    setMsg("");
    const res = await fetch("/api/org/cancel-subscription", { method: "POST" });
    const d = await res.json();
    setBusy(false);
    setConfirmCancel(false);
    if (d.ok) {
      setMsg(t.settings.subscription.cancelSuccess);
    } else {
      setMsg(t.settings.error + (d.error || t.settings.unknown));
    }
  }

  const isActive = current?.subscription_status === "active";

  function fmtDate(iso: string): string {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleString(lang);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-white">{t.settings.title}</h1>
        <p className="mt-1 text-sm text-slate-400">{t.settings.subtitle}</p>
      </header>

      <form className={cardClass} onSubmit={save}>
        <h2 className="text-base font-semibold text-white">{t.settings.masterData.title}</h2>

        <label className={labelClass} htmlFor="nm">
          {t.settings.masterData.name}
        </label>
        <input
          id="nm"
          className={inputClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className={labelClass} htmlFor="dm">
          {t.settings.masterData.domains}
        </label>
        <input
          id="dm"
          className={inputClass}
          value={domains}
          onChange={(e) => setDomains(e.target.value)}
          placeholder={t.settings.masterData.domainsPlaceholder}
        />

        <label className={labelClass} htmlFor="im">
          {t.settings.masterData.impressum}
        </label>
        <textarea
          id="im"
          className={`${inputClass} min-h-[120px]`}
          value={impressum}
          onChange={(e) => setImpressum(e.target.value)}
          required
        />

        <div className="mt-5">
          <button className={primaryBtn} disabled={busy} type="submit">
            {org ? t.settings.masterData.save : t.settings.masterData.create}
          </button>
        </div>
      </form>

      <section className={cardClass}>
        <h2 className="text-base font-semibold text-white">{t.settings.avv.title}</h2>
        {current?.avv_accepted_at ? (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20" suppressHydrationWarning>
            <CheckCircle2 className="h-4 w-4" />
            {fmt(t.settings.avv.acceptedAt, { date: fmtDate(current.avv_accepted_at) })}
          </p>
        ) : (
          <>
            <label className="mt-3 flex items-start gap-2.5 text-sm text-slate-300">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                checked={avv}
                onChange={(e) => setAvv(e.target.checked)}
              />
              <span>{t.settings.avv.consent}</span>
            </label>
            <div className="mt-4">
              <button
                className={primaryBtn}
                disabled={!avv || busy || !current}
                onClick={acceptAvv}
                type="button"
              >
                {t.settings.avv.accept}
              </button>
            </div>
            {!current && (
              <p className="mt-3 text-sm text-slate-500">{t.settings.avv.needOrg}</p>
            )}
          </>
        )}
      </section>

      <section className={cardClass}>
        <h2 className="text-base font-semibold text-white">{t.settings.subscription.title}</h2>
        <p className="mt-2 text-sm text-slate-400">
          {t.settings.subscription.status}{" "}
          <strong className={isActive ? "text-emerald-300" : "text-amber-300"}>
            {current?.subscription_status || "—"}
          </strong>
          {current?.subscription_plan ? ` · ${current.subscription_plan}` : ""}
        </p>
        {!isActive && current && (
          <a
            href={`${CHECKOUT_BASE}?checkout[custom][org_id]=${current.id}`}
            className={`${primaryBtn} mt-4`}
          >
            {t.settings.subscription.subscribe}
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
        {isActive && (
          <>
            <p className="mt-2 text-sm text-slate-500">{t.settings.subscription.snippetHint}</p>
            <div className="mt-5 border-t border-white/5 pt-5">
              {confirmCancel ? (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 ring-1 ring-inset ring-red-500/10">
                  <p className="mb-3 text-sm text-slate-300">{t.settings.subscription.cancelConfirm}</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={cancelSubscription}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow ring-1 ring-inset ring-white/10 transition-all duration-200 ease-out hover:bg-red-700 active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      {t.settings.subscription.cancelYes}
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => setConfirmCancel(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition-all duration-200 ease-out hover:bg-white/10 active:scale-[0.98] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none"
                    >
                      {t.settings.subscription.cancelNo}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmCancel(true)}
                  className="text-sm font-medium text-slate-400 underline-offset-4 hover:text-red-400 hover:underline transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {t.settings.subscription.cancel}
                </button>
              )}
            </div>
          </>
        )}
      </section>

      {msg && (
        <p className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300 ring-1 ring-inset ring-white/5">
          {msg}
        </p>
      )}
    </div>
  );
}
