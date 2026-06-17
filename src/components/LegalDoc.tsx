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
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="font-semibold text-white">{t.common.appName}</span>
          </Link>
          <LanguageSwitcher variant="dark" />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/"
          className="text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
        >
          {t.legal.backHome}
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{page.title}</h1>

        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          {t.legal.placeholderNote}
        </p>

        <div className="mt-8 space-y-8">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-semibold text-slate-900">{s.heading}</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {render(s.body)}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="font-semibold text-slate-900">{t.legal.contactCta}</p>
          <p className="mt-1 text-sm text-slate-600">
            {t.legal.contactEmailLabel}{" "}
            <a
              href={`mailto:${t.contact.email}`}
              className="font-medium text-brand-600 transition-colors hover:text-brand-700"
            >
              {t.contact.email}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
