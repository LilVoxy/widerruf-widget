"use client";
import { useState } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import type { OrgRow } from "./types";
import { useT, useLang } from "@/i18n/LanguageProvider";
import { fmt } from "@/i18n/format";

const CHECKOUT_BASE =
  "https://widerruf-widget.lemonsqueezy.com/checkout/buy/2f827963-4be2-42ea-9f5b-cfad3b504958";

const cardClass = "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm";
const labelClass = "mt-4 block text-sm font-medium text-slate-700";
const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";
const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60";

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

  const isActive = current?.subscription_status === "active";

  function fmtDate(iso: string): string {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleString(lang);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">{t.settings.title}</h1>
        <p className="mt-1 text-sm text-slate-500">{t.settings.subtitle}</p>
      </header>

      <form className={cardClass} onSubmit={save}>
        <h2 className="text-base font-semibold text-slate-900">{t.settings.masterData.title}</h2>

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
        <h2 className="text-base font-semibold text-slate-900">{t.settings.avv.title}</h2>
        {current?.avv_accepted_at ? (
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            {fmt(t.settings.avv.acceptedAt, { date: fmtDate(current.avv_accepted_at) })}
          </p>
        ) : (
          <>
            <label className="mt-3 flex items-start gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-0.5"
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
        <h2 className="text-base font-semibold text-slate-900">{t.settings.subscription.title}</h2>
        <p className="mt-2 text-sm text-slate-600">
          {t.settings.subscription.status}{" "}
          <strong className={isActive ? "text-emerald-700" : "text-amber-700"}>
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
          <p className="mt-2 text-sm text-slate-500">{t.settings.subscription.snippetHint}</p>
        )}
      </section>

      {msg && <p className="text-sm text-slate-600">{msg}</p>}
    </div>
  );
}
