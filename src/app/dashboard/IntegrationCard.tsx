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
    <section className="rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-slate-200/70">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-slate-900">{t.integrationCard.title}</h2>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
            isActive
              ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
              : "bg-amber-50 text-amber-700 ring-amber-100"
          }`}
        >
          <span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-amber-500"}`}
          />
          {t.integrationCard.subscription}: {subscriptionStatus || "—"}
        </span>
      </div>

      {isActive ? (
        <div className="mt-5">
          <IntegrationGuide appUrl={appUrl} apiKey={apiKey} />
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-sm text-amber-700">{t.integrationCard.gateNote}</p>
          <a
            href={`${CHECKOUT_BASE}?checkout[custom][org_id]=${orgId}`}
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/15 transition-all duration-200 ease-out hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
          >
            {t.integrationCard.subscribe}
          </a>
        </div>
      )}
    </section>
  );
}
