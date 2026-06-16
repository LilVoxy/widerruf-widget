"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const CHECKOUT_BASE =
  "https://widerruf-widget.lemonsqueezy.com/checkout/buy/2f827963-4be2-42ea-9f5b-cfad3b504958";

export default function IntegrationCard({
  isActive,
  apiKey,
  appUrl,
  orgId,
  subscriptionStatus,
}: {
  isActive: boolean;
  apiKey: string;
  appUrl: string;
  orgId: string;
  subscriptionStatus: string;
}) {
  const [copied, setCopied] = useState(false);
  const snippet = `<script src="${appUrl}/widget.min.js" data-api-key="${apiKey}" defer></script>`;

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
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-slate-900">Integration</h2>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          Abo: {subscriptionStatus || "—"}
        </span>
      </div>

      {isActive ? (
        <div className="mt-4">
          <p className="text-sm text-slate-600">
            Fügen Sie diesen Tag vor <code className="rounded bg-slate-100 px-1 py-0.5">&lt;/body&gt;</code> ein:
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <pre className="flex-1 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs leading-relaxed text-slate-100">
              <code>{snippet}</code>
            </pre>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Kopiert" : "Kopieren"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-sm text-amber-700">
            Das Snippet wird angezeigt, sobald ein aktives Abonnement vorliegt
            (subscription_status = &apos;active&apos;).
          </p>
          <a
            href={`${CHECKOUT_BASE}?checkout[custom][org_id]=${orgId}`}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Subscribe — €9/Monat
          </a>
        </div>
      )}
    </section>
  );
}
