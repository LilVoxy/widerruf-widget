/**
 * POST /api/org/cancel-subscription — cancel the caller's LemonSqueezy subscription.
 *
 * Marks the subscription to cancel at end of the current billing period via
 * the LemonSqueezy REST API (PATCH subscriptions/{id} with cancelled: true).
 * The local subscription_status stays 'active' until LemonSqueezy fires the
 * subscription_cancelled webhook at actual expiry.
 *
 * Requires LS_API_KEY env var (LemonSqueezy API key).
 */
import { supabaseServer } from "@/lib/supabase-server";
import { env } from "@/lib/env";
import { json } from "@/lib/http";

export const runtime = "nodejs";

export async function POST(): Promise<Response> {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return json({ ok: false, error: "unauthorized" }, 401);

  const apiKey = env.lsApiKey();
  if (!apiKey) return json({ ok: false, error: "billing_not_configured" }, 503);

  const { data: org, error: dbError } = await supabase
    .from("organizations")
    .select("ls_subscription_id, subscription_status")
    .maybeSingle();

  if (dbError) return json({ ok: false, error: dbError.message }, 500);
  if (!org) return json({ ok: false, error: "org_not_found" }, 404);
  if (org.subscription_status !== "active")
    return json({ ok: false, error: "not_active" }, 409);
  if (!org.ls_subscription_id)
    return json({ ok: false, error: "no_subscription_id" }, 409);

  const lsRes = await fetch(
    `https://api.lemonsqueezy.com/v1/subscriptions/${org.ls_subscription_id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "subscriptions",
          id: String(org.ls_subscription_id),
          attributes: { cancelled: true },
        },
      }),
    }
  );

  if (!lsRes.ok) {
    const body = await lsRes.text().catch(() => "");
    console.error(
      JSON.stringify({ scope: "cancel_subscription", status: lsRes.status, body })
    );
    return json({ ok: false, error: "provider_error" }, 502);
  }

  return json({ ok: true });
}
