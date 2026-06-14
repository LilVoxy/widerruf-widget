# Phase 4 — Deploy & Registration

## Vercel

- **Edge intake** (`/api/withdraw`) runs on the Edge runtime, region **fra1**
  (`preferredRegion = ["fra1"]` in the route + `"regions": ["fra1"]` in
  `vercel.json`) → ≤ 120 ms latency for DACH traffic.
- **Node functions** (cron, webhook, dashboard) also pinned to `fra1`.
- **Cron** (`vercel.json`):
  - `59 23 * * *` → `/api/cron/merkle` (daily Merkle + RFC 3161 notarization)
  - `0 2 * * *`  → `/api/cron/retention` (GDPR PII anonymization)
  - Vercel injects `Authorization: Bearer ${CRON_SECRET}`; routes verify it.
- **Env vars**: set everything from `.env.example` in the Vercel project
  (Production + Preview). `SUPABASE_SERVICE_ROLE_KEY`, `FIELD_ENCRYPTION_KEY`,
  `CRON_SECRET`, `PAYMENTS_WEBHOOK_SECRET` are server-only secrets.

## EU data residency (DSGVO)

| Service        | Region                         |
|----------------|--------------------------------|
| Supabase       | `eu-central-1` (Frankfurt)     |
| Vercel funcs   | `fra1` (Frankfurt)             |
| Upstash Redis  | `eu-central-1` / `eu-west-1`   |
| Resend         | EU sending enforced on domain  |

## CDN for `widget.min.js`

`npm run widget:build` emits `public/widget.min.js` and `widget/dist/widget.min.js`.

- Served by Next/Vercel with `Cache-Control: public, max-age=31536000, immutable`
  and `Access-Control-Allow-Origin: *` (see `next.config.mjs` + `vercel.json`).
- For Cloudflare / CloudFront: upload `widget/dist/widget.min.js`, set the same
  immutable cache header, enable Brotli/Gzip, and serve over HTTP/2.
- The embed snippet uses `defer` so it never blocks rendering (Core Web Vitals).

## Client Dashboard (registration)

- Magic-link auth (`/login`) via Supabase Auth.
- On first visit the shop **creates its organization** (auto-generated API key).
- The shop must fill **Impressum** and **accept the AVV** (Art. 28 DSGVO). On
  acceptance the backend stores `avv_accepted_at` (exact ISO 8601) **and**
  `avv_accepted_ip_anonymized` — not a bare boolean — for legal audit.
- The **integration snippet is shown ONLY when `subscription_status === 'active'`**.

## Billing (Merchant of Record)

- `/api/webhooks/billing` verifies an HMAC-SHA256 signature
  (`PAYMENTS_WEBHOOK_SECRET`, constant-time) before any state change.
- `subscription.created` / `payment.success` → `active`;
  `subscription.expired` → `past_due`; `subscription.canceled` → `canceled`.
- When not `active`, `/api/withdraw` returns **402 Payment Required** and the
  widget script also refuses to render (double guard).

## Sentry

- `sentry.{client,server,edge}.config.ts` + `instrumentation.ts`, wrapped by
  `withSentryConfig` in `next.config.mjs`. Activates only when
  `NEXT_PUBLIC_SENTRY_DSN` is set, so it monitors widget/runtime errors in prod.
