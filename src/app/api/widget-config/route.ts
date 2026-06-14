/**
 * GET /api/widget-config?k=API_KEY — lightweight render gate for the widget.
 *
 * The embedded script calls this BEFORE rendering. The entry button is only
 * mounted when the organization's subscription is active, so an expired/unpaid
 * shop never shows a (non-functional) withdrawal button — which would itself be
 * a § 356a BGB violation. Reuses the existing `org_for_api_key` RPC; no logic
 * is duplicated.
 */
import { serviceClient } from "@/lib/supabase";
import { originAllowed, corsHeaders } from "@/lib/cors";
import { json } from "@/lib/http";

export const runtime = "edge";
export const preferredRegion = ["fra1"];

function cors(origin: string | null, whitelist: string[]): Record<string, string> {
  // Echo a whitelisted Origin; otherwise fall back to "*" (response carries no PII).
  if (origin && originAllowed(origin, whitelist)) return corsHeaders(origin);
  return { "Access-Control-Allow-Origin": "*", Vary: "Origin" };
}

export async function OPTIONS(req: Request): Promise<Response> {
  const origin = req.headers.get("origin");
  return new Response(null, { status: 204, headers: cors(origin, []) });
}

export async function GET(req: Request): Promise<Response> {
  const origin = req.headers.get("origin");
  const key = new URL(req.url).searchParams.get("k") || "";

  if (!key) return json({ active: false }, 200, cors(origin, []));

  try {
    const db = serviceClient();
    const { data, error } = await db.rpc("org_for_api_key", { p_api_key: key });
    if (error) return json({ active: false }, 200, cors(origin, []));

    const org = Array.isArray(data) ? data[0] : data;
    const whitelist: string[] = (org && org.domain_whitelist) || [];
    const active = !!org && org.subscription_status === "active";

    return json({ active }, 200, cors(origin, whitelist));
  } catch {
    return json({ active: false }, 200, cors(origin, []));
  }
}
