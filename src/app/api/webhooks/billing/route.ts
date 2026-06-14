/**
 * POST /api/webhooks/billing — Merchant-of-Record billing events.
 *
 * SECURITY: the raw body is verified with HMAC-SHA256 against
 * PAYMENTS_WEBHOOK_SECRET (constant-time compare) before any state change, so
 * forged "activate my subscription" calls are rejected.
 *
 * Event mapping:
 *   subscription.created | payment.success   → subscription_status = 'active'
 *   subscription.expired                     → 'past_due'
 *   subscription.canceled                    → 'canceled'
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

const STATUS_MAP: Record<string, "active" | "past_due" | "canceled"> = {
  "subscription.created": "active",
  "payment.success": "active",
  "subscription.expired": "past_due",
  "subscription.canceled": "canceled",
};

export async function POST(req: Request): Promise<Response> {
  const raw = await req.text();
  const signature =
    req.headers.get("x-signature") ||
    req.headers.get("x-webhook-signature") ||
    req.headers.get("paddle-signature");

  if (!verifySignature(raw, signature)) {
    return json({ ok: false, error: "invalid_signature" }, 401);
  }

  let event: { type?: string; data?: Record<string, unknown> };
  try {
    event = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "bad_json" }, 400);
  }

  const type = event.type || "";
  const newStatus = STATUS_MAP[type];
  if (!newStatus) return json({ ok: true, ignored: type }, 200);

  // The MoR payload must carry the org reference (custom data passed at checkout).
  const data = event.data || {};
  const orgId = (data.organization_id || data.org_id || (data.custom_data as any)?.org_id) as string | undefined;
  const plan = (data.plan || data.subscription_plan) as string | undefined;

  if (!orgId) return json({ ok: false, error: "missing_org_reference" }, 400);

  const db = serviceClient();
  const patch: Record<string, unknown> = { subscription_status: newStatus };
  if (plan) patch.subscription_plan = plan;

  const { error } = await db.from("organizations").update(patch).eq("id", orgId);
  if (error) return json({ ok: false, error: "update_failed" }, 500);

  return json({ ok: true, org_id: orgId, status: newStatus }, 200);
}
