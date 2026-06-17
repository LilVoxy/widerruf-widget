# Widerrufsbutton DACH

Production-ready B2B Micro-SaaS for **§ 356a BGB** compliance (in force
**2026-06-19**, implementing EU Directive 2023/2673): an embeddable, framework-
agnostic withdrawal-button widget plus a tamper-evident backend (SHA-256 →
Merkle tree → RFC 3161 trusted timestamp).

## Stack

- **Widget:** Vanilla JS, closed Shadow DOM, ~2.8 KB gzip (≤ 5 KB transfer budget), single `<script>` embed.
- **Backend:** Next.js (App Router) → Vercel Edge Functions, region `fra1`.
- **DB:** Supabase (PostgreSQL, `eu-central-1`) with Row-Level Security.
- **Crypto:** Web Crypto SHA-256 (edge) + `@openzeppelin/merkle-tree` + DigiCert TSA (RFC 3161).
- **Email:** Resend HTTP API (EU enforced) — provider-agnostic call site.
- **Rate limiting:** Upstash Redis (sliding window, 5/h/IP).
- **Monitoring:** Sentry.

## The 4 legally-mandated UI steps

1. **Entry Button** — `Vertrag widerrufen` (always visible, no Login-Wall).
2. **Form** — exactly three fields: name, order/contract id, email. No "reason" field.
3. **Confirmation** — `Widerruf bestätigen` → `POST /api/withdraw`.
4. **Instant Receipt** — email with exact ISO 8601 receipt time, SHA-256 hash,
   Proof-URL and the shop's Impressum (durable medium, § 126b BGB).

## Layout

```
widget/                 embeddable widget (Vanilla JS) + Rollup build
  src/widget.js         closed Shadow DOM custom element
  src/i18n.js           DE/EN strings
src/lib/                crypto, schema, cors, ratelimit, email, tsa, merkle, …
src/app/
  api/withdraw/         Edge intake (CORS, rate limit, Zod, hash, encrypt, email)
  api/cron/merkle/      daily Merkle build + RFC 3161 notarization (23:59 UTC)
  api/cron/retention/   GDPR PII anonymization (02:00 UTC)
  api/webhooks/billing/ HMAC-verified subscription lifecycle
  api/org, api/org/avv  dashboard org management + AVV audit
  api/export/[hash]/    court evidence ZIP
  verify/[hash]/        public Proof-URL page
  dashboard/, login/    client portal
supabase/migrations/    SQL: tables, RLS, RPCs (run in order)
docs/                   phase-by-phase specs + OpenAPI
```

## Getting started

```bash
npm install
cp .env.example .env.local      # fill in secrets (EU regions!)
# apply supabase/migrations/0001..0003 to your Supabase project (SQL editor or CLI)
npm run widget:build            # emits public/widget.min.js
npm run widget:size             # asserts ≤ 5 KB budget
npm run dev
```

## Embed snippet (shown in dashboard only when subscription is active)

```html
<script src="https://YOUR-CDN/widget.min.js" data-api-key="wb_live_…" data-api="https://YOUR-CDN" defer></script>
```

`data-api` must point at the API origin (it defaults to `https://app.example`, so
omitting it makes the widget silently call the wrong host). Optional attribute:
`data-lang` (`de`/`en`).

## Security & compliance notes

- Widget INSERTs go through the Edge API using the service-role key (bypasses
  RLS); dashboards see only their own rows via RLS.
- Origin checked against the org's domain whitelist; 402 when subscription
  inactive; XSS sanitization + strict Zod (rejects any extra field).
- Email + consumer name encrypted at rest (AES-256-GCM); raw IPs never stored
  (anonymized for AVV audit, transient for rate limiting).
- Deterministic canonical JSON (sorted keys) → reproducible SHA-256 for Proof-URL.

See `docs/phase-1..5` for the full specification.
