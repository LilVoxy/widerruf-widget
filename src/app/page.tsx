"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Scale,
  Lock,
  Zap,
  BadgeEuro,
  Globe,
  FileSignature,
  Hash,
  Network,
  Stamp,
  ArrowRight,
  Check,
  X,
  HelpCircle,
} from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import IntegrationGuide from "@/components/IntegrationGuide";

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.example").replace(/\/$/, "");

const WHY_ICONS = [ShieldCheck, Scale, Lock, Zap, BadgeEuro, Globe];
const HOW_ICONS = [FileSignature, Hash, Network, Stamp];

export default function Home() {
  const t = useT();

  return (
    <div className="bg-white">
      {/* Dark header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="font-semibold text-white">{t.common.appName}</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
            <a href="#why" className="hover:text-white">{t.landing.nav.why}</a>
            <a href="#how" className="hover:text-white">{t.landing.nav.how}</a>
            <a href="#pricing" className="hover:text-white">{t.landing.nav.pricing}</a>
            <a href="#install" className="hover:text-white">{t.landing.nav.install}</a>
            <a href="#faq" className="hover:text-white">{t.landing.nav.faq}</a>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="dark" />
            <Link
              href="/dashboard"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              {t.common.goToDashboard}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero (dark) */}
      <section className="relative overflow-hidden bg-slate-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(37,99,235,0.25) 0%, rgba(2,6,23,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-brand-100">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t.landing.hero.badge}
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t.landing.hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            {t.landing.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-700"
            >
              {t.landing.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how"
              className="rounded-lg border border-white/20 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              {t.landing.hero.ctaSecondary}
            </a>
          </div>

          {/* Pipeline visual */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-sm">
            {t.landing.hero.pipeline.map((label, i) => (
              <span key={label} className="flex items-center gap-2">
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-medium text-slate-200">
                  {label}
                </span>
                {i < t.landing.hero.pipeline.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-brand-400" />
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section id="why" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{t.landing.why.title}</h2>
            <p className="mt-3 text-slate-600">{t.landing.why.subtitle}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.landing.why.items.map((item, i) => {
              const Icon = WHY_ICONS[i] ?? ShieldCheck;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{t.landing.how.title}</h2>
            <p className="mt-3 text-slate-600">{t.landing.how.subtitle}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.landing.how.steps.map((step, i) => {
              const Icon = HOW_ICONS[i] ?? FileSignature;
              return (
                <div
                  key={step.title}
                  className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before & after */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{t.landing.compare.title}</h2>
            <p className="mt-3 text-slate-600">{t.landing.compare.subtitle}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900">{t.landing.compare.beforeTitle}</h3>
              <ul className="mt-4 space-y-3">
                {t.landing.compare.before.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-slate-600">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-100 bg-brand-50/40 p-6">
              <h3 className="font-semibold text-slate-900">{t.landing.compare.afterTitle}</h3>
              <ul className="mt-4 space-y-3">
                {t.landing.compare.after.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{t.landing.pricing.title}</h2>
            <p className="mt-3 text-slate-600">{t.landing.pricing.subtitle}</p>
          </div>
          <div className="mx-auto mt-12 max-w-md">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                {t.landing.pricing.planName}
              </span>
              <div className="mt-5 flex items-end gap-1">
                <span className="text-5xl font-bold tracking-tight text-slate-900">
                  {t.landing.pricing.price}
                </span>
                <span className="pb-1 text-slate-500">{t.landing.pricing.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {t.landing.pricing.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-700"
              >
                {t.landing.pricing.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-center text-xs text-slate-500">{t.landing.pricing.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration guide */}
      <section id="install" className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">{t.landing.integration.title}</h2>
            <p className="mt-3 text-slate-600">{t.landing.integration.subtitle}</p>
          </div>
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <IntegrationGuide appUrl={APP_URL} apiKey="YOUR_API_KEY" isPlaceholder />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            {t.landing.faq.title}
          </h2>
          <div className="mt-10 space-y-3">
            {t.landing.faq.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-slate-900">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 shrink-0 text-brand-600" />
                    {item.q}
                  </span>
                  <span className="text-slate-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 pl-8 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-600">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">{t.landing.finalCta.title}</h2>
          <p className="max-w-xl text-brand-100">{t.landing.finalCta.subtitle}</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            {t.landing.finalCta.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-600 text-white">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            <span>{t.common.appName} · {t.landing.footer.tagline}</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-900">{t.landing.footer.impressum}</a>
            <a href="#" className="hover:text-slate-900">{t.landing.footer.datenschutz}</a>
            <span>{t.landing.footer.hosting}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
