# Phase 5 — Post-MVP

## 1. Court evidence export portal ✅ (implemented)

`GET /api/export/{hash}` streams a ZIP containing `withdrawal.json` (with the
canonical hashed object), `merkle.json` (root + inclusion proof), `timestamp.tsr`
(RFC 3161 DER token) and a `README.txt` verification guide. Access is RLS-scoped
to the owning organization; PII is decrypted server-side for the shop's lawyer.

A "Download evidence" action can be wired into the dashboard per withdrawal row.

## 2. GDPR retention ✅ (implemented)

- `GET/POST /api/cron/retention` (daily 02:00 UTC) calls the SECURITY DEFINER
  RPC `anonymize_expired_withdrawals(DATA_RETENTION_DAYS)`.
- Nullifies `email` + `consumer_name`, sets `anonymized_at`, **keeps the
  SHA-256 hash** for legal audit. A pure-DB `pg_cron` alternative is included
  (commented) in `0003_functions.sql`.

## 3. White-label B2B2B panel (design)

For IT agencies managing many client sites:

- Add an `agencies` table and `organizations.agency_id` (nullable FK).
- Agency role in the dashboard: list/create client organizations, manage each
  client's domain whitelist + Impressum, and issue per-client API keys.
- Branding columns on `agencies` (logo URL, accent color) → the widget reads a
  `data-brand` attribute / a `/api/brand/{key}` lookup to restyle the button.
- Bulk billing: one subscription covers N client organizations (seat-based).
- RLS: extend policies so `agency owner` can read/update child orgs
  (`organizations.agency_id in (select id from agencies where owner_user_id = auth.uid())`).

## 4. Dual-Button widget (design — § 312k vs § 356a)

German law forbids merging cancellation (Kündigungsbutton, § 312k BGB,
subscriptions) and withdrawal (Widerrufsbutton, § 356a BGB, one-off purchases)
into one universal button — the legal effects differ.

Approach:

- After the user enters the contract identifier, call a lightweight
  classification endpoint `POST /api/classify` that maps the order id to a
  contract type (`subscription` | `purchase`) using the shop's order metadata
  (or a configured prefix rule).
- The widget then renders the legally correct flow:
  - `purchase` → current Widerruf flow ("Widerruf bestätigen").
  - `subscription` → Kündigungs flow with § 312k wording and the statutory
    "Verträge hier kündigen" / "Jetzt kündigen" labels and confirmation page.
- Keep both flows in separate state machines inside the same Shadow DOM so the
  bundle stays small; lazy-load the cancellation strings only when needed.
- Store the chosen `process_type` alongside the request for the audit log.

## Result

The product evolves from a single-purpose utility into a self-sustaining B2B
asset: court-grade evidence on demand, agency resale, and full coverage of both
DACH consumer-exit obligations.
