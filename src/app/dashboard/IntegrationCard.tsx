"use client";

import { useT } from "@/i18n/LanguageProvider";
import IntegrationGuide from "@/components/IntegrationGuide";

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
  const t = useT();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-slate-900">{t.integrationCard.title}</h2>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isActive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {t.integrationCard.subscription}: {subscriptionStatus || "—"}
        </span>
      </div>

      {isActive ? (
        <div className="mt-4">
          <IntegrationGuide appUrl={appUrl} apiKey={apiKey} />
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-sm text-amber-700">{t.integrationCard.gateNote}</p>
          <a
            href={`${CHECKOUT_BASE}?checkout[custom][org_id]=${orgId}`}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            {t.integrationCard.subscribe}
          </a>
        </div>
      )}
    </section>
  );
}
