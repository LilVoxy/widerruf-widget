import { en, type Dict } from "./en";
import { de } from "./de";

export type Lang = "en" | "de";

/** Default site language. */
export const DEFAULT_LANG: Lang = "en";

/** Cookie that persists the chosen language across reloads and to the server. */
export const LANG_COOKIE = "lang";

/** One year, in seconds — used for the persistence cookie. */
export const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const dictionaries: Record<Lang, Dict> = { en, de };

export function isLang(value: string | undefined | null): value is Lang {
  return value === "en" || value === "de";
}

export function normalizeLang(value: string | undefined | null): Lang {
  return isLang(value) ? value : DEFAULT_LANG;
}

export function getDictionary(lang: Lang): Dict {
  return dictionaries[lang];
}

export type { Dict };
