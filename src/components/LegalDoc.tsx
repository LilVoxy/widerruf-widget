"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * Renders the Imprint / Privacy legal pages from the i18n dictionary. The actual
 * legal text is a template — the bracketed fields must be filled with the real
 * company details before going live (legally required in the DACH region).
 */
export default function LegalDoc({ doc }: { doc: "impressum" | "datenschutz" }) {
  const t = useT();
  const page = t.legal[doc];

  // Keep the contact email a single source of truth: bodies use the {email}
  // token instead of hardcoding the address, so it can never drift.
  const render = (text: string) => text.replace(/\{email\}/g, t.contact.email);

  return (
    <div className="min-h-screen bg-transparent">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/20">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="font-semibold tracking-tight text-white">{t.common.appName}</span>
          </Link>
          <LanguageSwitcher variant="dark" />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link
          href="/"
          className="text-sm font-medium text-brand-600 underline-offset-4 transition-colors hover:text-brand-700 hover:underline hover:decoration-brand-400"
        >
          {t.legal.backHome}
        </Link>

        <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-900">{page.title}</h1>

        <div className="mt-8 space-y-8">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">{s.heading}</h2>
              <p className="mt-2 whitespace-pre-line text-pretty text-sm leading-relaxed text-slate-600">
                {render(s.body)}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-slate-200/70">
          <p className="font-semibold text-slate-900">{t.legal.contactCta}</p>
          <p className="mt-1 text-sm text-slate-600">
            {t.legal.contactEmailLabel}{" "}
            <a
              href={`mailto:${t.contact.email}`}
              className="font-medium text-brand-600 underline-offset-4 transition-colors hover:text-brand-700 hover:underline hover:decoration-brand-400"
            >
              {t.contact.email}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
