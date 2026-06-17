"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANG,
  LANG_COOKIE,
  LANG_COOKIE_MAX_AGE,
  getDictionary,
  normalizeLang,
  type Dict,
  type Lang,
} from "./config";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function persist(lang: Lang) {
  if (typeof document !== "undefined") {
    document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; samesite=lax`;
    document.documentElement.lang = lang;
  }
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(LANG_COOKIE, lang);
    } catch {
      /* storage unavailable — cookie is the source of truth */
    }
  }
}

/**
 * Client i18n provider. `initialLang` comes from the server (cookie) so the
 * first paint is consistent. Switching updates state instantly and persists to
 * a cookie + localStorage so the choice survives reloads — all without locale
 * routing, leaving auth, middleware and /auth/callback untouched.
 */
export function LanguageProvider({
  initialLang = DEFAULT_LANG,
  children,
}: {
  initialLang?: Lang;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    const normalized = normalizeLang(next);
    setLangState(normalized);
    persist(normalized);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: getDictionary(lang) }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function useLanguageContext(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage/useT must be used within a LanguageProvider");
  }
  return ctx;
}

/** Returns the typed dictionary for the active language, e.g. `t.landing.hero.title`. */
export function useT(): Dict {
  return useLanguageContext().t;
}

/** Returns the active language and a setter for the language switcher. */
export function useLang(): { lang: Lang; setLang: (lang: Lang) => void } {
  const { lang, setLang } = useLanguageContext();
  return { lang, setLang };
}
