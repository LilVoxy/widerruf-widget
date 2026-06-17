"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

/**
 * Platform-by-platform install guide. The same snippet is shown for every
 * platform; only the placement steps differ. Reused by the landing page (with a
 * YOUR_API_KEY placeholder) and the dashboard IntegrationCard (real api_key).
 */
export default function IntegrationGuide({
  appUrl,
  apiKey,
  isPlaceholder = false,
  variant = "light",
}: {
  appUrl: string;
  apiKey: string;
  isPlaceholder?: boolean;
  variant?: "light" | "dark";
}) {
  const t = useT();
  const platforms = t.integration.platforms;
  const [activeId, setActiveId] = useState(platforms[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  const dark = variant === "dark";

  const snippet = `<script src="${appUrl}/widget.min.js" data-api-key="${apiKey}" data-api="${appUrl}" defer></script>`;
  const active = platforms.find((p) => p.id === activeId) ?? platforms[0];

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div>
      <p className={`text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>{t.integration.beforeBody}</p>

      <div className="mt-3 overflow-hidden rounded-xl bg-slate-950 shadow-[var(--shadow-elevated)] ring-1 ring-inset ring-white/10">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
          <span aria-hidden className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </span>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? t.common.copied : t.common.copy}
          </button>
        </div>
        <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-slate-100">
          <code className="font-mono tracking-tight">{snippet}</code>
        </pre>
      </div>

      {isPlaceholder && (
        <p className={`mt-2 text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}>{t.integration.placeholderNote}</p>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {platforms.map((p) => {
          const isActive = p.id === active?.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              aria-pressed={isActive}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-brand-600 text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/15"
                  : dark
                    ? "bg-white/5 text-slate-400 ring-1 ring-inset ring-white/10 hover:bg-white/10 hover:text-slate-200 focus-visible:ring-offset-slate-950"
                    : "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200/60 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      {active && (
        <ol className="mt-5 space-y-3">
          {active.steps.map((step, i) => (
            <li key={i} className={`flex gap-3 text-sm ${dark ? "text-slate-300" : "text-slate-700"}`}>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums ring-1 ring-inset ${
                  dark
                    ? "bg-brand-600/15 text-brand-300 ring-brand-500/25"
                    : "bg-brand-50 text-brand-700 ring-brand-100"
                }`}
              >
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
