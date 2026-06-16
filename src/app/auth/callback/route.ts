/**
 * GET /auth/callback — completes the Supabase PKCE magic-link flow.
 *
 * The email link points Supabase's /auth/v1/verify here with a one-time
 * `?code=`. We exchange that code for a session (which sets the auth cookies on
 * the SAME host the verifier cookie lives on) and then redirect into the app.
 *
 * Without this exchange the session cookie is never written, so the dashboard's
 * getUser() stays empty and the user bounces back to /login forever.
 */
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function safeNext(raw: string | null): string {
  // Only allow same-origin relative paths to avoid open-redirect abuse.
  if (raw && raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return "/dashboard";
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = safeNext(url.searchParams.get("next"));

  if (!code) {
    const reason = url.searchParams.get("error_description") || "missing_code";
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(reason)}`, url.origin));
  }

  const supabase = await supabaseServer();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, url.origin));
  }

  return NextResponse.redirect(new URL(next, url.origin));
}
