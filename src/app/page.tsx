"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
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
  Code2,
} from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import IntegrationGuide from "@/components/IntegrationGuide";
import Reveal from "@/components/Reveal";
import { env } from "@/lib/env";

// Single source of truth: NEXT_PUBLIC_APP_URL (falls back to localhost for dev).
const APP_URL = env.appUrl();

const WHY_ICONS = [ShieldCheck, Scale, Lock, Zap, BadgeEuro, Globe];
const HOW_ICONS = [FileSignature, Hash, Network, Stamp];

/** Per-card lighting — icon glow is always behind the mark, in its accent color. */
const WHY_CARD_LIGHT = [
  {
    iconGlow: "bg-brand-400/45",
    shadow:
      "shadow-[0_14px_44px_-14px_rgb(29_78_216/0.28),0_4px_14px_-4px_rgb(15_23_42/0.07)]",
    rim: "via-brand-300/50",
    surface: "from-white via-white to-brand-50/40",
    hoverShadow:
      "hover:shadow-[0_22px_50px_-16px_rgb(29_78_216/0.32),0_8px_20px_-6px_rgb(15_23_42/0.1)]",
  },
  {
    iconGlow: "bg-violet-400/40",
    shadow:
      "shadow-[0_12px_40px_-14px_rgb(124_58_237/0.2),0_4px_12px_-4px_rgb(15_23_42/0.06)]",
    rim: "via-violet-300/40",
    surface: "from-white via-violet-50/25 to-white",
    hoverShadow:
      "hover:shadow-[0_20px_48px_-16px_rgb(124_58_237/0.26),0_8px_18px_-6px_rgb(15_23_42/0.08)]",
  },
  {
    iconGlow: "bg-emerald-400/40",
    shadow:
      "shadow-[0_12px_38px_-14px_rgb(16_185_129/0.18),0_4px_12px_-4px_rgb(15_23_42/0.06)]",
    rim: "via-emerald-300/45",
    surface: "from-white via-emerald-50/25 to-white",
    hoverShadow:
      "hover:shadow-[0_20px_46px_-16px_rgb(16_185_129/0.24),0_8px_18px_-6px_rgb(15_23_42/0.08)]",
  },
  {
    iconGlow: "bg-amber-400/45",
    shadow:
      "shadow-[0_12px_38px_-14px_rgb(245_158_11/0.2),0_4px_12px_-4px_rgb(15_23_42/0.06)]",
    rim: "via-amber-300/45",
    surface: "from-white via-white to-slate-50/80",
    hoverShadow:
      "hover:shadow-[0_20px_46px_-16px_rgb(245_158_11/0.26),0_8px_18px_-6px_rgb(15_23_42/0.08)]",
  },
  {
    iconGlow: "bg-brand-400/40",
    shadow:
      "shadow-[0_12px_40px_-14px_rgb(37_99_235/0.2),0_4px_12px_-4px_rgb(15_23_42/0.06)]",
    rim: "via-brand-400/40",
    surface: "from-white via-brand-50/30 to-white",
    hoverShadow:
      "hover:shadow-[0_20px_48px_-16px_rgb(37_99_235/0.26),0_8px_18px_-6px_rgb(15_23_42/0.08)]",
  },
  {
    iconGlow: "bg-brand-400/45",
    shadow:
      "shadow-[0_14px_44px_-14px_rgb(29_78_216/0.28),0_4px_14px_-4px_rgb(15_23_42/0.07)]",
    rim: "via-brand-300/50",
    surface: "from-white via-white to-brand-50/40",
    hoverShadow:
      "hover:shadow-[0_22px_50px_-16px_rgb(29_78_216/0.32),0_8px_20px_-6px_rgb(15_23_42/0.1)]",
  },
] as const;

type WhyIcon = (typeof WHY_ICONS)[number];

/** Section header eyebrow — premium mark + colored glow (why / compare / install). */
function SectionEyebrow({
  variant,
  Icon,
}: {
  variant: "why" | "compare" | "install";
  Icon: LucideIcon;
}) {
  const shell =
    "relative mx-auto flex h-14 w-14 items-center justify-center";

  if (variant === "why") {
    return (
      <div className={shell}>
        <span
          aria-hidden
          className="absolute -inset-5 rounded-[1.6rem] bg-brand-400/40 blur-2xl"
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 shadow-[0_10px_28px_-8px_rgb(29_78_216/0.45)] ring-1 ring-inset ring-white/15"
        />
        <svg
          aria-hidden
          viewBox="0 0 56 56"
          className="absolute inset-0 h-full w-full text-brand-400/45"
        >
          <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
        </svg>
        <Icon className="relative h-7 w-7 text-white" strokeWidth={1.75} />
      </div>
    );
  }

  if (variant === "compare") {
    return (
      <div className={shell}>
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-brand-700 shadow-[0_8px_24px_-6px_rgb(124_58_237/0.35)] ring-1 ring-inset ring-white/20"
        />
        <svg aria-hidden viewBox="0 0 56 56" className="absolute inset-0 h-full w-full text-white/30">
          <line x1="10" y1="28" x2="46" y2="28" stroke="currentColor" strokeWidth="1.5" />
          <path d="M18 22 L18 34 M38 22 L38 34" stroke="currentColor" strokeWidth="1.25" />
        </svg>
        <Icon className="relative h-7 w-7 text-white" strokeWidth={1.75} />
      </div>
    );
  }

  return (
    <div className={shell}>
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-[0_8px_24px_-6px_rgb(15_23_42/0.4)] ring-1 ring-inset ring-white/10"
      />
      <svg aria-hidden viewBox="0 0 56 56" className="absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)] text-cyan-400/40">
        <path d="M14 20 L10 28 L14 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M42 20 L46 28 L42 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="20" y1="28" x2="36" y2="28" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
      </svg>
      <Icon className="relative h-7 w-7 text-cyan-100" strokeWidth={1.75} />
    </div>
  );
}

/** Unique visual mark per feature card — not a generic icon-in-a-square. */
function WhyFeatureMark({ index, Icon }: { index: number; Icon: WhyIcon }) {
  const shell =
    "relative flex h-14 w-14 shrink-0 items-center justify-center";

  if (index === 0) {
    return (
      <div className={shell}>
        <span
          aria-hidden
          className="absolute -inset-2 rounded-[1.35rem] bg-brand-500/25 blur-lg"
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 shadow-[0_8px_24px_-6px_rgb(15_23_42/0.5)] ring-1 ring-inset ring-white/15"
        />
        <svg
          aria-hidden
          viewBox="0 0 56 56"
          className="absolute inset-0 h-full w-full text-brand-400/40"
        >
          <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="28" cy="28" r="16" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
        </svg>
        <Icon className="relative h-6 w-6 text-white drop-shadow-sm" strokeWidth={1.75} />
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className={shell}>
        <span
          aria-hidden
          className="absolute -inset-3 rounded-[1.2rem] bg-violet-400/40 blur-xl"
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600 to-brand-700 shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/20"
        />
        <svg aria-hidden viewBox="0 0 56 56" className="absolute inset-0 h-full w-full text-white/25">
          <line x1="8" y1="28" x2="48" y2="28" stroke="currentColor" strokeWidth="1.5" />
          <line x1="28" y1="18" x2="28" y2="38" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
        <Icon className="relative h-6 w-6 text-white" strokeWidth={1.75} />
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className={shell}>
        <span
          aria-hidden
          className="absolute -inset-1.5 rounded-[1.2rem] bg-emerald-400/30 blur-md"
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-gradient-to-b from-emerald-50 to-white ring-1 ring-emerald-200/80"
        />
        <svg aria-hidden viewBox="0 0 56 56" className="absolute inset-1 h-[calc(100%-8px)] w-[calc(100%-8px)] text-emerald-500/30">
          <rect x="12" y="14" width="32" height="28" rx="4" fill="none" stroke="currentColor" strokeWidth="1.25" />
          <path d="M20 14 V10 a8 8 0 0 1 16 0 v4" fill="none" stroke="currentColor" strokeWidth="1.25" />
        </svg>
        <Icon className="relative h-6 w-6 text-emerald-700" strokeWidth={1.75} />
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className={shell}>
        <span
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 ring-1 ring-inset ring-white/10"
        />
        <svg aria-hidden viewBox="0 0 56 56" className="absolute inset-0 h-full w-full text-amber-400/30">
          <line x1="8" y1="32" x2="20" y2="28" stroke="currentColor" strokeWidth="1" />
          <line x1="8" y1="24" x2="18" y2="24" stroke="currentColor" strokeWidth="1" />
          <line x1="8" y1="16" x2="20" y2="20" stroke="currentColor" strokeWidth="1" />
          <circle cx="38" cy="28" r="10" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
        </svg>
        <Icon className="relative h-6 w-6 text-amber-300" strokeWidth={2} />
      </div>
    );
  }

  if (index === 4) {
    return (
      <div className={shell}>
        <span
          aria-hidden
          className="absolute inset-[-4px] rounded-full bg-brand-400/20 blur-md"
        />
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-100 to-white ring-1 ring-slate-200/90"
        />
        <svg aria-hidden viewBox="0 0 56 56" className="absolute inset-0 h-full w-full text-brand-500/35">
          <circle cx="28" cy="28" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="28" cy="28" r="14" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
        </svg>
        <Icon className="relative h-6 w-6 text-brand-700" strokeWidth={1.75} />
      </div>
    );
  }

  return (
    <div className={shell}>
      <span
        aria-hidden
        className="absolute -inset-2 rounded-[1.35rem] bg-brand-500/25 blur-lg"
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 shadow-[0_8px_24px_-6px_rgb(15_23_42/0.5)] ring-1 ring-inset ring-white/15"
      />
      <svg
        aria-hidden
        viewBox="0 0 56 56"
        className="absolute inset-0 h-full w-full text-brand-400/40"
      >
        <ellipse cx="28" cy="28" rx="20" ry="10" fill="none" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="28" cy="28" rx="10" ry="20" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.7" />
        <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.5" />
      </svg>
      <Icon className="relative h-6 w-6 text-white drop-shadow-sm" strokeWidth={1.75} />
    </div>
  );
}

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

      {/* Why choose us (light) */}
      <section id="why" className="relative overflow-hidden py-24 lg:py-28">
        {/* Layered atmosphere — mesh washes + line grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 40% at 10% 15%, rgb(191 219 254 / 0.55) 0%, transparent 60%), radial-gradient(45% 45% at 90% 80%, rgb(221 214 254 / 0.4) 0%, transparent 55%), radial-gradient(60% 50% at 50% 50%, rgb(236 253 245 / 0.25) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(148 163 184 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(85% 75% at 50% 35%, black 0%, transparent 88%)",
            WebkitMaskImage:
              "radial-gradient(85% 75% at 50% 35%, black 0%, transparent 88%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(rgb(148 163 184 / 0.4) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            maskImage:
              "radial-gradient(70% 60% at 50% 40%, black 0%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(70% 60% at 50% 40%, black 0%, transparent 85%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionEyebrow variant="why" Icon={ShieldCheck} />
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-slate-900">{t.landing.why.title}</h2>
            <p className="mt-3 text-pretty text-slate-600">{t.landing.why.subtitle}</p>
          </Reveal>

          {/* Glow vessel behind the entire card grid */}
          <div className="relative mt-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-4 -inset-y-8 rounded-[2.5rem] sm:-inset-x-8"
              style={{
                background:
                  "radial-gradient(65% 50% at 50% 42%, rgb(147 197 253 / 0.4) 0%, rgb(199 210 254 / 0.15) 40%, transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[min(520px,70vw)] w-[min(900px,95%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/12 blur-3xl"
            />

            <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {t.landing.why.items.map((item, i) => {
                const Icon = WHY_ICONS[i] ?? ShieldCheck;
                const light = WHY_CARD_LIGHT[i] ?? WHY_CARD_LIGHT[0];
                return (
                  <Reveal key={item.title} className="h-full" delay={(i % 3) * 80}>
                    <div
                      className={`group relative h-full overflow-hidden rounded-2xl bg-gradient-to-b ${light.surface} p-6 ${light.shadow} ring-1 ring-slate-200/70 transition-all duration-300 ease-out hover:-translate-y-1 ${light.hoverShadow} hover:ring-slate-300/90 motion-reduce:transform-none motion-reduce:transition-none`}
                    >
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${light.rim} to-transparent`}
                      />
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/70 via-transparent to-transparent opacity-80"
                      />

                      {/* Icon glow — centered behind mark; tuned per card */}
                      <div className="relative w-fit">
                        <span
                          aria-hidden
                          className={
                            i === 3
                              ? "pointer-events-none absolute left-1/2 top-1/2 h-[4.25rem] w-[4.25rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/28 blur-2xl"
                              : `pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl ${light.iconGlow}`
                          }
                        />
                        <WhyFeatureMark index={i} Icon={Icon} />
                      </div>
                      <h3 className="relative mt-6 font-semibold text-slate-900">{item.title}</h3>
                      <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How it works (dark) */}
      <section id="how" className="relative overflow-hidden bg-slate-950 py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 45%, rgba(37,99,235,0.18) 0%, rgba(2,6,23,0) 70%)",
          }}
        />
        {/* Distinct motif: dot-grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(70% 60% at 50% 40%, black 0%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(70% 60% at 50% 40%, black 0%, transparent 80%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span
              aria-hidden
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-brand-300 shadow-[var(--shadow-brand)] backdrop-blur"
            >
              <Network className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white">{t.landing.how.title}</h2>
            <p className="mt-3 text-pretty text-slate-400">{t.landing.how.subtitle}</p>
          </Reveal>
          <div className="relative mt-14">
            {/* Connector line linking the step icons */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[2.75rem] hidden h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent lg:block"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {t.landing.how.steps.map((step, i) => {
                const Icon = HOW_ICONS[i] ?? FileSignature;
                return (
                  <Reveal key={step.title} className="h-full" delay={(i % 4) * 80}>
                    <div className="group relative h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08] motion-reduce:transform-none motion-reduce:transition-none">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/15">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-5 font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Before & after (light) */}
      <section className="relative overflow-hidden py-24 lg:py-28">
        {/* Split atmosphere — rose left / emerald right, stronger washes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 55% at 8% 45%, rgb(254 205 211 / 0.55) 0%, transparent 58%), radial-gradient(45% 55% at 92% 50%, rgb(167 243 208 / 0.5) 0%, transparent 58%), radial-gradient(55% 45% at 50% 0%, rgb(219 234 254 / 0.45) 0%, transparent 62%), radial-gradient(40% 40% at 50% 100%, rgb(237 233 254 / 0.35) 0%, transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-55"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(148 163 184 / 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.14) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(85% 75% at 50% 42%, black 0%, transparent 88%)",
            WebkitMaskImage:
              "radial-gradient(85% 75% at 50% 42%, black 0%, transparent 88%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgb(148 163 184 / 0.4) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            maskImage:
              "radial-gradient(70% 60% at 50% 40%, black 0%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(70% 60% at 50% 40%, black 0%, transparent 85%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionEyebrow variant="compare" Icon={Scale} />
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-slate-900">{t.landing.compare.title}</h2>
            <p className="mt-3 text-pretty text-slate-600">{t.landing.compare.subtitle}</p>
          </Reveal>

          <div className="relative mt-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 -inset-y-6 rounded-[2rem] sm:-inset-x-10"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 50%, rgb(147 197 253 / 0.25) 0%, rgb(254 205 211 / 0.1) 35%, rgb(167 243 208 / 0.12) 65%, transparent 75%)",
              }}
            />
            <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
              {/* Vertical divider between the columns */}
              <div
              aria-hidden
              className="pointer-events-none absolute bottom-4 left-1/2 top-4 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-200 to-transparent md:block"
            />
            <Reveal className="h-full">
              <div className="h-full rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200/70 sm:p-8">
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
            </Reveal>
            <Reveal className="h-full" delay={90}>
              <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-b from-brand-50/80 to-white p-6 shadow-[var(--shadow-elevated)] ring-1 ring-brand-200/60 sm:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-400/20 blur-3xl"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/70 to-transparent"
                />
                <h3 className="relative font-semibold text-slate-900">{t.landing.compare.afterTitle}</h3>
                <ul className="relative mt-5 space-y-3">
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
            </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing (dark) */}
      <section id="pricing" className="relative overflow-hidden bg-slate-950 py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(45% 50% at 50% 35%, rgba(37,99,235,0.25) 0%, rgba(2,6,23,0) 70%)",
          }}
        />
        {/* Distinct motif: vertical light beam */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-brand-500/30 via-transparent to-transparent"
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span
              aria-hidden
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-brand-300 shadow-[var(--shadow-brand)] backdrop-blur"
            >
              <BadgeEuro className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white">{t.landing.pricing.title}</h2>
            <p className="mt-3 text-pretty text-slate-400">{t.landing.pricing.subtitle}</p>
          </Reveal>
          <Reveal className="mx-auto mt-14 max-w-md">
            {/* Glowing gradient ring */}
            <div className="relative rounded-3xl bg-gradient-to-b from-brand-400/40 via-brand-500/10 to-transparent p-px shadow-[0_0_60px_-15px_rgba(37,99,235,0.6)]">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-8 backdrop-blur">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-80"
                  style={{
                    background:
                      "radial-gradient(80% 50% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)",
                  }}
                />
                <div className="relative">
                  <span className="inline-flex rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-200 ring-1 ring-inset ring-brand-400/30">
                    {t.landing.pricing.planName}
                  </span>
                  <div className="mt-5 flex items-end gap-1.5">
                    <span className="text-5xl font-semibold tracking-tight text-white tabular-nums">
                      {t.landing.pricing.price}
                    </span>
                    <span className="pb-1.5 text-slate-400">{t.landing.pricing.period}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {t.landing.pricing.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm text-slate-300">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/dashboard"
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/15 transition-all duration-200 ease-out hover:bg-brand-700 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    {t.landing.pricing.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-4 text-center text-xs text-slate-500">{t.landing.pricing.note}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Integration guide (light) */}
      <section id="install" className="relative overflow-hidden py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 45% at 80% 15%, rgb(165 243 252 / 0.55) 0%, transparent 58%), radial-gradient(45% 50% at 15% 75%, rgb(191 219 254 / 0.45) 0%, transparent 55%), radial-gradient(50% 40% at 50% 100%, rgb(224 231 255 / 0.35) 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(148 163 184 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.12) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(80% 70% at 50% 40%, black 0%, transparent 88%)",
            WebkitMaskImage:
              "radial-gradient(80% 70% at 50% 40%, black 0%, transparent 88%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(rgb(148 163 184 / 0.38) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            maskImage:
              "radial-gradient(70% 60% at 50% 35%, black 0%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(70% 60% at 50% 35%, black 0%, transparent 85%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionEyebrow variant="install" Icon={Code2} />
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-slate-900">{t.landing.integration.title}</h2>
            <p className="mt-3 text-pretty text-slate-600">{t.landing.integration.subtitle}</p>
          </Reveal>
          <Reveal className="relative mt-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-[2rem]"
              style={{
                background:
                  "radial-gradient(65% 55% at 50% 45%, rgb(165 243 252 / 0.3) 0%, rgb(191 219 254 / 0.12) 50%, transparent 72%)",
              }}
            />
            <div className="relative rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-slate-200/70 sm:p-8">
              <IntegrationGuide appUrl={APP_URL} apiKey="YOUR_API_KEY" isPlaceholder />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ (dark) */}
      <section id="faq" className="relative overflow-hidden bg-slate-950 py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(40% 50% at 80% 0%, rgba(37,99,235,0.18) 0%, rgba(2,6,23,0) 70%)",
          }}
        />
        {/* Distinct motif: diagonal hatching */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 14px)",
            maskImage:
              "radial-gradient(80% 70% at 50% 30%, black 0%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(80% 70% at 50% 30%, black 0%, transparent 80%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span
              aria-hidden
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-brand-300 shadow-[var(--shadow-brand)] backdrop-blur"
            >
              <HelpCircle className="h-6 w-6" />
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white">
              {t.landing.faq.title}
            </h2>
          </Reveal>
          <div className="mt-12 space-y-3">
            {t.landing.faq.items.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <details className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-colors open:border-white/20 open:bg-white/[0.07]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 shrink-0 text-brand-300" />
                      {item.q}
                    </span>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg leading-none text-slate-300 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none">+</span>
                  </summary>
                  <p className="mt-3 pl-8 text-sm leading-relaxed text-slate-400">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA (accent) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(55% 70% at 50% -10%, rgba(255,255,255,0.22) 0%, transparent 65%), radial-gradient(35% 50% at 0% 80%, rgba(56,189,248,0.2) 0%, transparent 60%), radial-gradient(35% 50% at 100% 70%, rgba(129,140,248,0.18) 0%, transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(75% 85% at 50% 0%, black 0%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(75% 85% at 50% 0%, black 0%, transparent 80%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-950/40 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[min(700px,90%)] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
        />
        <Reveal className="relative mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white">{t.landing.finalCta.title}</h2>
          <p className="max-w-xl text-pretty text-brand-100">{t.landing.finalCta.subtitle}</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-700 shadow-[var(--shadow-elevated)] ring-1 ring-inset ring-white/60 transition-all duration-200 ease-out hover:bg-brand-50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-700 motion-reduce:transform-none motion-reduce:transition-none"
          >
            {t.landing.finalCta.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Footer (dark) */}
      <footer className="relative border-t border-white/10 bg-slate-950 py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-brand-700 text-white ring-1 ring-inset ring-white/20">
              <ShieldCheck className="h-3.5 w-3.5" />
            </span>
            <span>{t.common.appName} · {t.landing.footer.tagline}</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link href="/impressum" className="transition-colors hover:text-white">{t.landing.footer.impressum}</Link>
            <Link href="/datenschutz" className="transition-colors hover:text-white">{t.landing.footer.datenschutz}</Link>
            <a href={`mailto:${t.contact.email}`} className="underline-offset-4 transition-colors hover:text-white hover:underline hover:decoration-brand-400">
              {t.contact.email}
            </a>
            <span>{t.landing.footer.hosting}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
