/**
 * POST /api/webhooks/billing — LemonSqueezy billing events.
 *
 * SECURITY: the raw body is verified with HMAC-SHA256 against
 * PAYMENTS_WEBHOOK_SECRET (constant-time compare) before any state change, so
 * forged "activate my subscription" calls are rejected. The endpoint is public
 * by design — HMAC is the authentication.
 *
 * Event mapping (LemonSqueezy event_name → subscription_status):
 *   subscription_created | subscription_payment_success | subscription_unpaused → 'active'
 *   subscription_payment_failed                                                 → 'past_due'
 *   subscription_expired | subscription_cancelled                              → 'canceled'
 *
 * RELIABILITY: the org update is verified via `.select("id")` and the number of
 * affected rows is checked. A 0-row update is NOT reported as success — it means
 * the org reference is wrong OR the service-role client is not actually bypassing
 * RLS (misconfigured SUPABASE_SERVICE_ROLE_KEY), so we return a non-2xx code and
 * LemonSqueezy retries while the operator is alerted via the structured log.
 *
 * ORDERING: a duplicate/late delivery cannot overwrite a newer status. The patch
 * only lands when the event time (attributes.updated_at) is at least as new as
 * the stored subscription_event_at.
 */
import crypto from "node:crypto";
import { serviceClient } from "@/lib/supabase";
import { env } from "@/lib/env";
import { json } from "@/lib/http";

export const runtime = "nodejs";

function verifySignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  const expected = crypto.createHmac("sha256", env.paymentsWebhookSecret()).update(rawBody).digest("hex");
  const sig = signature.replace(/^sha256=/, "").trim();
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

const LS_MAP: Record<string, "active" | "past_due" | "canceled"> = {
  subscription_created: "active",
  subscription_payment_success: "active",
  subscription_unpaused: "active",
  subscription_payment_failed: "past_due",
  subscription_expired: "canceled",
  subscription_cancelled: "canceled",
};

/** Structured, PII-free webhook log line (no emails / names). */
function logEvent(fields: {
  outcome: string;
  signature_ok: boolean;
  event_name?: string;
  org_id?: string;
  new_status?: string;
  rows_affected?: number;
}): void {
  console.log(JSON.stringify({ scope: "billing_webhook", ...fields }));
}

export async function POST(req: Request): Promise<Response> {
  const raw = await req.text();
  const signature =
    req.headers.get("x-signature") ||
    req.headers.get("x-webhook-signature") ||
    req.headers.get("paddle-signature");

  if (!verifySignature(raw, signature)) {
    logEvent({ outcome: "invalid_signature", signature_ok: false });
    return json({ ok: false, error: "invalid_signature" }, 401);
  }

  let event: {
    meta?: { event_name?: string; custom_data?: Record<string, unknown> };
    data?: { id?: string | number; attributes?: Record<string, unknown> };
  };
  try {
    event = JSON.parse(raw);
  } catch {
    logEvent({ outcome: "bad_json", signature_ok: true });
    return json({ ok: false, error: "bad_json" }, 400);
  }

  const eventName = event.meta?.event_name || "";
  const newStatus = LS_MAP[eventName];
  if (!newStatus) {
    logEvent({ outcome: "ignored", signature_ok: true, event_name: eventName });
    return json({ ok: true, ignored: eventName }, 200);
  }

  // LemonSqueezy carries the org reference in meta.custom_data (passed at checkout).
  const customData = event.meta?.custom_data || {};
  const orgId = customData.org_id as string | undefined;
  const attributes = event.data?.attributes || {};
  const plan = (attributes.product_name || attributes.variant_name) as string | undefined;
  // Source-of-truth ordering key; fall back to "now" if absent so first write lands.
  const eventAt = (attributes.updated_at as string | undefined) || new Date().toISOString();

  if (!orgId) {
    logEvent({ outcome: "missing_org_reference", signature_ok: true, event_name: eventName, new_status: newStatus });
    return json({ ok: false, error: "missing_org_reference" }, 400);
  }

  const db = serviceClient();
  const patch: Record<string, unknown> = {
    subscription_status: newStatus,
    subscription_event_at: eventAt,
    billing_user_email: (attributes.user_email as string | undefined) ?? null,
    ls_customer_id: attributes.customer_id != null ? String(attributes.customer_id) : null,
  };
  if (plan) patch.subscription_plan = plan;
  // For subscription_* events data.id IS the subscription id; ignore invoice/order ids.
  if (eventName.startsWith("subscription_") && event.data?.id != null) {
    patch.ls_subscription_id = String(event.data.id);
  }

  // Only apply when this event is at least as new as the last one we stored —
  // a late duplicate (e.g. a re-sent past_due after active) is then a no-op.
  const { data: updated, error } = await db
    .from("organizations")
    .update(patch)
    .eq("id", orgId)
    .or(`subscription_event_at.is.null,subscription_event_at.lte.${eventAt}`)
    .select("id");

  if (error) {
    logEvent({ outcome: "update_failed", signature_ok: true, event_name: eventName, org_id: orgId, new_status: newStatus });
    return json({ ok: false, error: "update_failed" }, 500);
  }

  const rowsAffected = updated?.length ?? 0;
  if (rowsAffected === 0) {
    // Either the org id is wrong / service role isn't bypassing RLS (real failure
    // → must retry), or the event is older than what we already have (idempotent
    // no-op → must NOT retry). Disambiguate with a direct existence probe.
    const { data: exists } = await db
      .from("organizations")
      .select("id")
      .eq("id", orgId)
      .maybeSingle();

    if (!exists) {
      logEvent({ outcome: "org_not_found", signature_ok: true, event_name: eventName, org_id: orgId, new_status: newStatus, rows_affected: 0 });
      return json({ ok: false, error: "org_not_found" }, 404);
    }

    logEvent({ outcome: "stale_event_ignored", signature_ok: true, event_name: eventName, org_id: orgId, new_status: newStatus, rows_affected: 0 });
    return json({ ok: true, org_id: orgId, stale: true }, 200);
  }

  logEvent({ outcome: "applied", signature_ok: true, event_name: eventName, org_id: orgId, new_status: newStatus, rows_affected: rowsAffected });
  return json({ ok: true, org_id: orgId, status: newStatus }, 200);
}
