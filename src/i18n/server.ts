import { cookies } from "next/headers";
import { LANG_COOKIE, normalizeLang, type Lang } from "./config";

/**
 * Reads the persisted language from the request cookie so the server render
 * matches the client provider's initial state (no hydration mismatch).
 * Falls back to the default language when the cookie is absent.
 */
export async function getServerLang(): Promise<Lang> {
  const store = await cookies();
  return normalizeLang(store.get(LANG_COOKIE)?.value);
}
