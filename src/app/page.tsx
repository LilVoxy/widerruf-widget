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
import { env } from "@/lib/env";

// Single source of truth: NEXT_PUBLIC_APP_URL (falls back to localhost for dev).
const APP_URL = env.appUrl();

const WHY_ICONS = [ShieldCheck, Scale, Lock, Zap, BadgeEuro, Globe];
const HOW_ICONS = [FileSignature, Hash, Network, Stamp];

export default function Home() {
  const t = useT();

  return (
    <div className="bg-transparent">
      {/* Floating dark header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_4px_12px_-2px_rgb(29_78_216/0.5)] ring-1 ring-inset ring-white/20">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="font-semibold tracking-tight text-white">{t.common.appName}</span>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
            <a href="#why" className="transition-colors hover:text-white">{t.landing.nav.why}</a>
            <a href="#how" className="transition-colors hover:text-white">{t.landing.nav.how}</a>
            <a href="#pricing" className="transition-colors hover:text-white">{t.landing.nav.pricing}</a>
            <a href="#install" className="transition-colors hover:text-white">{t.landing.nav.install}</a>
            <a href="#faq" className="transition-colors hover:text-white">{t.landing.nav.faq}</a>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="dark" />
            <Link
              href="/dashboard"
              className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/15 transition-all duration-200 ease-out hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none"
            >
              {t.common.goToDashboard}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero (dark) */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Primary brand glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(37,99,235,0.28) 0%, rgba(2,6,23,0) 70%)",
          }}
        />
        {/* Secondary off-axis glow for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(40% 50% at 85% 20%, rgba(30,64,175,0.25) 0%, rgba(2,6,23,0) 70%)",
          }}
        />
        {/* Subtle grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(70% 60% at 50% 0%, black 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(70% 60% at 50% 0%, black 0%, transparent 75%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-brand-200 shadow-[var(--shadow-xs)] backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" />
            {t.landing.hero.badge}
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.02em] text-white sm:text-5xl">
            {t.landing.hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg text-slate-300">
            {t.landing.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/15 transition-all duration-200 ease-out hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none"
            >
              {t.landing.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition-colors hover:border-white/25 hover:bg-white/10"
            >
              {t.landing.hero.ctaSecondary}
            </a>
          </div>

          {/* Pipeline visual — connected nodes */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-2 text-sm">
            {t.landing.hero.pipeline.map((label, i) => (
              <span key={label} className="flex items-center gap-2">
                <span className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 font-medium text-slate-200 shadow-[var(--shadow-xs)] backdrop-blur ring-1 ring-inset ring-white/5">
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
      <section id="why" className="py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900">{t.landing.why.title}</h2>
            <p className="mt-3 text-pretty text-slate-600">{t.landing.why.subtitle}</p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {t.landing.why.items.map((item, i) => {
              const Icon = WHY_ICONS[i] ?? ShieldCheck;
              return (
                <div
                  key={item.title}
                  className="group rounded-2xl bg-gradient-to-b from-white to-slate-50/70 p-6 shadow-[var(--shadow-card)] ring-1 ring-slate-200/80 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] hover:ring-slate-300 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100 transition-colors duration-200 group-hover:bg-brand-100 group-hover:text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-slate-200/70 bg-slate-50 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900">{t.landing.how.title}</h2>
            <p className="mt-3 text-pretty text-slate-600">{t.landing.how.subtitle}</p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {t.landing.how.steps.map((step, i) => {
              const Icon = HOW_ICONS[i] ?? FileSignature;
              return (
                <div
                  key={step.title}
                  className="group relative rounded-2xl bg-gradient-to-b from-white to-slate-50/70 p-6 shadow-[var(--shadow-card)] ring-1 ring-slate-200/80 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] hover:ring-slate-300 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/15">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before & after */}
      <section className="py-24 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900">{t.landing.compare.title}</h2>
            <p className="mt-3 text-pretty text-slate-600">{t.landing.compare.subtitle}</p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
              <h3 className="font-semibold text-slate-700">{t.landing.compare.beforeTitle}</h3>
              <ul className="mt-5 space-y-3">
                {t.landing.compare.before.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-slate-500">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500 ring-1 ring-inset ring-rose-100">
                      <X className="h-3 w-3" />
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-brand-50/80 to-white p-6 shadow-[var(--shadow-card)] ring-1 ring-brand-200/60 sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/70 to-transparent"
              />
              <h3 className="font-semibold text-slate-900">{t.landing.compare.afterTitle}</h3>
              <ul className="mt-5 space-y-3">
                {t.landing.compare.after.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-slate-200/70 bg-slate-50 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900">{t.landing.pricing.title}</h2>
            <p className="mt-3 text-pretty text-slate-600">{t.landing.pricing.subtitle}</p>
          </div>
          <div className="mx-auto mt-14 max-w-md">
            {/* Gradient ring wrapper */}
            <div className="rounded-3xl bg-gradient-to-b from-brand-200/70 via-brand-100/40 to-transparent p-px shadow-[var(--shadow-elevated)]">
              <div className="relative overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-inset ring-white/60">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    background:
                      "radial-gradient(80% 50% at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)",
                  }}
                />
                <div className="relative">
                  <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">
                    {t.landing.pricing.planName}
                  </span>
                  <div className="mt-5 flex items-end gap-1.5">
                    <span className="text-5xl font-semibold tracking-tight text-slate-900 tabular-nums">
                      {t.landing.pricing.price}
                    </span>
                    <span className="pb-1.5 text-slate-500">{t.landing.pricing.period}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {t.landing.pricing.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm text-slate-700">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100">
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/dashboard"
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/15 transition-all duration-200 ease-out hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    {t.landing.pricing.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-4 text-center text-xs text-slate-500">{t.landing.pricing.note}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration guide */}
      <section id="install" className="py-24 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900">{t.landing.integration.title}</h2>
            <p className="mt-3 text-pretty text-slate-600">{t.landing.integration.subtitle}</p>
          </div>
          <div className="mt-12 rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-slate-200/70 sm:p-8">
            <IntegrationGuide appUrl={APP_URL} apiKey="YOUR_API_KEY" isPlaceholder />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-slate-200/70 bg-slate-50 py-24 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-balance text-center text-3xl font-semibold tracking-tight text-slate-900">
            {t.landing.faq.title}
          </h2>
          <div className="mt-12 space-y-3">
            {t.landing.faq.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl bg-gradient-to-b from-white to-slate-50/70 p-5 shadow-[var(--shadow-card)] ring-1 ring-slate-200/80 transition-colors open:ring-slate-300"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-slate-900">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 shrink-0 text-brand-600" />
                    {item.q}
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg leading-none text-slate-500 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">+</span>
                </summary>
                <p className="mt-3 pl-8 text-sm leading-relaxed text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(255,255,255,0.16) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white">{t.landing.finalCta.title}</h2>
          <p className="max-w-xl text-pretty text-brand-100">{t.landing.finalCta.subtitle}</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-700 shadow-[var(--shadow-elevated)] ring-1 ring-inset ring-white/60 transition-all duration-200 ease-out hover:bg-brand-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700 motion-reduce:transform-none motion-reduce:transition-none"
          >
            {t.landing.finalCta.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-brand-700 text-white ring-1 ring-inset ring-white/20">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            <span>{t.common.appName} · {t.landing.footer.tagline}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link href="/impressum" className="transition-colors hover:text-slate-900">{t.landing.footer.impressum}</Link>
            <Link href="/datenschutz" className="transition-colors hover:text-slate-900">{t.landing.footer.datenschutz}</Link>
            <a href={`mailto:${t.contact.email}`} className="underline-offset-4 transition-colors hover:text-slate-900 hover:underline hover:decoration-brand-400">
              {t.contact.email}
            </a>
            <span>{t.landing.footer.hosting}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
