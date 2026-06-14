import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env";

/**
 * Service-role client — bypasses RLS. Used ONLY on the server (edge/node) to
 * INSERT widget submissions and run privileged RPCs. Never expose to the browser.
 */
export function serviceClient(): SupabaseClient {
  return createClient(env.supabaseUrl(), env.supabaseServiceKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "X-Client-Info": "widerruf-service" } },
  });
}

/** Anonymous client (RLS enforced) — for the dashboard / Proof-URL reads. */
export function anonClient(): SupabaseClient {
  return createClient(env.supabaseUrl(), env.supabaseAnonKey(), {
    auth: { persistSession: false },
  });
}
