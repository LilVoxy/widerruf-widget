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
}: {
  appUrl: string;
  apiKey: string;
  isPlaceholder?: boolean;
}) {
  const t = useT();
  const platforms = t.integration.platforms;
  const [activeId, setActiveId] = useState(platforms[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  const snippet = `<script src="${appUrl}/widget.min.js" data-api-key="${apiKey}" defer></script>`;
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
      <p className="text-sm text-slate-600">{t.integration.beforeBody}</p>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <pre className="flex-1 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
          <code>{snippet}</code>
        </pre>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? t.common.copied : t.common.copy}
        </button>
      </div>

      {isPlaceholder && (
        <p className="mt-2 text-xs text-slate-500">{t.integration.placeholderNote}</p>
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
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
            <li key={i} className="flex gap-3 text-sm text-slate-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
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
