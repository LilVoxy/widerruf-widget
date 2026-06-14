# Phase 1 — Initiation

Legal + architectural foundation for the **Widerrufsbutton DACH** Micro-SaaS
(§ 356a BGB, in force **2026-06-19**, implementing EU Directive 2023/2673).

---

## 1. JSON Payload schema (GDPR data minimization)

§ 356a BGB permits collecting **only** the data strictly necessary to identify the
consumer and the contract, plus a contact channel for the receipt. Art. 5(1)(c)
DSGVO (data minimization) makes any additional field unlawful — in particular a
"reason for withdrawal" field is **forbidden even as optional**, because the right
of withdrawal is unconditional.

### 1.1 Request payload (widget → `POST /api/withdraw`)

```jsonc
{
  "name":     "string",   // consumer name, 1–120 chars (required)
  "order_id": "string",   // order/contract identifier, 1–64 chars (required)
  "email":    "string"    // RFC 5322 email for the receipt (required)
}
```

The shop is **not** part of the JSON body. It is identified out-of-band via the
`X-Api-Key` header (the widget reads it from its own `<script data-api-key>` tag).
This prevents a malicious page from spoofing a different shop's id inside the body.

**Forbidden in the payload (hard rule):** `reason`, `grund`, `comment`, `message`,
`marketing_opt_in`, `newsletter`, `phone`, `address`, or any free-text field other
than the three above.

### 1.2 Canonical hashing object (server-side, pre-DB-write)

The SHA-256 fingerprint is computed over a **deterministic** JSON with
alphabetically sorted keys (see `src/lib/crypto.ts`):

```jsonc
{
  "email":          "string",   // lower-cased, trimmed
  "order_id":       "string",   // trimmed
  "shop_id":        "uuid",     // organization.id resolved from the API key
  "timestamp_iso8601": "string" // server receipt time, e.g. 2026-06-19T08:30:00.000Z
}
```

> Keys are sorted (`email`, `order_id`, `shop_id`, `timestamp_iso8601`) so that the
> hash is reproducible by any third party verifying the Proof-URL.

### 1.3 Success response (widget ← API)

```jsonc
{
  "ok": true,
  "received_at": "2026-06-19T08:30:00.000Z",
  "hash": "f1c2…",                       // SHA-256 hex
  "proof_url": "https://app.widerrufsbutton.example/verify/f1c2…"
}
```

### 1.4 Error responses

| HTTP | `error` code         | Meaning                                                   |
|------|----------------------|-----------------------------------------------------------|
| 400  | `invalid_payload`    | Zod validation failed (bad email, empty field, etc.)      |
| 401  | `invalid_api_key`    | Unknown / missing API key                                 |
| 403  | `origin_not_allowed` | `Origin` not in the org's domain whitelist                |
| 402  | `payment_required`   | `subscription_status !== 'active'`                        |
| 429  | `rate_limited`       | > 5 requests / hour from this IP                          |
| 503  | `email_unavailable`  | Request stored, but receipt delivery failed (retry queued)|
| 500  | `internal_error`     | Unexpected server error                                   |

---

## 2. User Journey (incl. edge cases)

### Happy path (4 legally mandated steps)

1. **Entry Button** — floating button `"Vertrag widerrufen"`. Always visible, no
   Login-Wall. Renders only if the shop's subscription is `active`.
2. **Form** — exactly three fields: name, order/contract id, email. No reason field.
3. **Confirmation Button** — `"Widerruf bestätigen"`. Click fires `POST /api/withdraw`.
4. **Instant Receipt** — success screen with the server receipt time + hash; an
   email receipt (durable medium per § 126b BGB) is sent immediately containing the
   ISO 8601 receipt time, the data, the SHA-256 hash, the Proof-URL and the shop's
   Impressum in the footer.

### Edge cases

| Scenario | Behavior |
|---|---|
| **Network error** on submit | Widget keeps the form data, shows a retry message ("Verbindung fehlgeschlagen…"), button re-enabled. No data lost client-side. `fetch` has a 10 s timeout. |
| **Invalid order id / payload** | API returns `400 invalid_payload`; widget highlights the offending field with an `aria-describedby` error. We do **not** validate that the order exists in the shop's system (the law does not require it, and doing so would leak order existence). |
| **Subscription inactive** | API returns `402`; widget script also refuses to render the button (double guard). |
| **Origin not whitelisted** | API returns `403`; nothing is written. |
| **Rate limit hit** | API returns `429`; widget shows "Zu viele Versuche, bitte später erneut." |
| **TSA unavailable** (CRON) | Request was already stored with its hash at submit time. The daily Merkle root is stored with `tsa_pending = true`; exponential backoff retries; a later run notarizes it. The consumer receipt is unaffected. |
| **Email provider down** | The withdrawal is still persisted (legal record preserved). API returns `503 email_unavailable` and a background retry is enqueued; the consumer can still verify via the Proof-URL. |
| **Duplicate submit** (double click) | Confirmation button is disabled on first click; idempotency is best-effort — each confirmed click is a distinct legal declaration and is stored append-only. |
| **JS disabled / CSP blocks script** | Out of scope of the widget; shops are advised to also keep a textual fallback link. Documented in onboarding. |

---

## 3. UI text matrix (DE primary, EN secondary)

Canonical, legally-fixed strings are marked **LOCKED** — they must not be altered.

| Key | German (de) | English (en) | Locked |
|---|---|---|---|
| `entry_button` | **Vertrag widerrufen** | **Vertrag widerrufen** (legal term kept; tooltip: "Cancel contract") | ✅ |
| `confirm_button` | **Widerruf bestätigen** | **Widerruf bestätigen** (tooltip: "Confirm withdrawal") | ✅ |
| `modal_title` | Vertrag widerrufen | Withdraw from contract | |
| `field_name` | Name | Name | |
| `field_order` | Bestell-/Vertragsnummer | Order / contract number | |
| `field_email` | E-Mail-Adresse | Email address | |
| `submit_hint` | Wir senden Ihnen sofort eine Bestätigung per E-Mail. | We will email you a confirmation immediately. | |
| `success_title` | Widerruf eingegangen | Withdrawal received | |
| `success_body` | Ihr Widerruf wurde am {time} empfangen. Eine Bestätigung wurde an {email} gesendet. | Your withdrawal was received at {time}. A confirmation was sent to {email}. | |
| `err_network` | Verbindung fehlgeschlagen. Bitte erneut versuchen. | Connection failed. Please try again. | |
| `err_validation` | Bitte prüfen Sie Ihre Eingaben. | Please check your input. | |
| `err_ratelimit` | Zu viele Versuche. Bitte später erneut. | Too many attempts. Please try again later. | |
| `err_generic` | Etwas ist schiefgelaufen. Bitte später erneut. | Something went wrong. Please try again later. | |
| `close` | Schließen | Close | |
| `required` | Pflichtfeld | Required | |

> **Note on the locked buttons:** the German statutory wording is retained even in
> the English UI because the legal effect attaches to the exact phrasing under
> § 356a BGB. The English label is provided as an `aria-label`/tooltip only.

---

**Result of Phase 1:** approved data architecture (§1), complete User Journey with
edge cases (§2), full localization matrix (§3). These are encoded in
`widget/src/i18n.js` and `src/lib/schema.ts` in later phases.
