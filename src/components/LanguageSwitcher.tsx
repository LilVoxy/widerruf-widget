"use client";

import { Languages } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/config";

const OPTIONS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
];

/**
 * Compact EN | DE segmented control. `variant="dark"` is tuned for dark
 * backgrounds (landing hero header), `variant="light"` for white surfaces
 * (dashboard topbar).
 */
export default function LanguageSwitcher({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const { lang, setLang } = useLang();

  const dark = variant === "dark";
  const container = dark
    ? "border-white/15 bg-white/10"
    : "border-slate-200 bg-slate-100";

  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center gap-0.5 rounded-lg border p-0.5 ${container}`}
    >
      <Languages
        className={`ml-1 mr-0.5 h-3.5 w-3.5 ${dark ? "text-white/60" : "text-slate-400"}`}
        aria-hidden
      />
      {OPTIONS.map(({ code, label }) => {
        const active = lang === code;
        const activeCls = dark
          ? "bg-white text-slate-900 shadow-[var(--shadow-xs)] ring-1 ring-inset ring-white/60"
          : "bg-white text-brand-700 shadow-[var(--shadow-xs)] ring-1 ring-inset ring-white/70";
        const idleCls = dark
          ? "text-white/70 hover:text-white"
          : "text-slate-500 hover:text-slate-900";
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`rounded-md px-2 py-1 text-xs font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 ${
              active ? activeCls : idleCls
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
