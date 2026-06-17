"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ScrollText,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { useT } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const NAV = [
  { href: "/dashboard", key: "overview", icon: LayoutDashboard },
  { href: "/dashboard/logs", key: "logs", icon: ScrollText },
  { href: "/dashboard/settings", key: "settings", icon: SettingsIcon },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function DashboardShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  const t = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    try {
      await supabaseBrowser().auth.signOut();
    } finally {
      window.location.href = "/login";
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 lg:grid lg:grid-cols-[260px_1fr]">
      {/* Mobile backdrop */}
      {open && (
        <button
          aria-label={t.nav.closeMenu}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-white/10 bg-slate-950/95 backdrop-blur-xl transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 border-b border-white/10 px-5 py-4 transition-colors hover:bg-white/5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[var(--shadow-brand)] ring-1 ring-inset ring-white/20">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-white">Widerrufsbutton</div>
            <div className="text-xs text-slate-400">{t.nav.brandSub}</div>
          </div>
        </Link>

        <nav className="flex-1 space-y-1 p-3">
          {NAV.map(({ href, key, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ease-out ${
                  active
                    ? "bg-brand-600/15 text-brand-200 shadow-[0_0_24px_-6px_rgb(37_99_235/0.4)] ring-1 ring-inset ring-brand-500/25"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-y-1.5 left-0 w-1 rounded-r-full bg-brand-500 shadow-[0_0_12px_2px_rgb(59_130_246/0.6)]"
                  />
                )}
                <Icon
                  className={`h-[18px] w-[18px] transition-colors ${
                    active ? "text-brand-300" : "text-slate-500 group-hover:text-slate-300"
                  }`}
                  strokeWidth={2}
                />
                {t.nav[key]}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4 text-xs text-slate-500">
          {t.nav.hosting}
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur-xl lg:px-8">
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white lg:hidden"
            aria-label={t.nav.openMenu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="ml-auto flex items-center gap-3">
            <LanguageSwitcher variant="dark" />
            <span className="hidden text-sm text-slate-400 sm:inline">{email}</span>
            <button
              onClick={signOut}
              disabled={signingOut}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200 backdrop-blur transition-all duration-200 ease-out hover:border-white/25 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-60 motion-reduce:transform-none motion-reduce:transition-none"
            >
              <LogOut className="h-4 w-4" />
              {signingOut ? t.nav.signingOut : t.nav.signOut}
            </button>
          </div>
        </header>

        <main className="relative flex-1 overflow-hidden">
          {/* Primary brand glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, rgba(37,99,235,0.22) 0%, rgba(2,6,23,0) 70%)",
            }}
          />
          {/* Secondary off-axis glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(35% 40% at 88% 25%, rgba(30,64,175,0.18) 0%, rgba(2,6,23,0) 70%)",
            }}
          />
          {/* Subtle grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(75% 65% at 50% 0%, black 0%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(75% 65% at 50% 0%, black 0%, transparent 80%)",
            }}
          />

          <div className="relative mx-auto w-full max-w-5xl px-4 py-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
