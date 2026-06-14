-- ============================================================================
-- Widerrufsbutton DACH — schema (Supabase / PostgreSQL, region eu-central-1)
-- Migration 0001: extensions + core tables
-- ============================================================================
-- Data-at-rest note: Supabase encrypts the underlying volume by default. In
-- addition, the application layer encrypts the consumer's `email` and
-- `consumer_name` with AES-256-GCM BEFORE insert (see src/lib/crypto.ts), so
-- those columns hold ciphertext only. The SHA-256 audit hash is computed over
-- the *plaintext* canonical JSON before encryption and is retained forever.
-- ============================================================================

create extension if not exists "pgcrypto";        -- gen_random_uuid()

-- ── organizations: the B2B shop tenants ─────────────────────────────────────
create table if not exists public.organizations (
  id                        uuid primary key default gen_random_uuid(),
  owner_user_id             uuid not null references auth.users (id) on delete cascade,
  name                      text not null default '',
  api_key                   text not null unique,
  domain_whitelist          text[] not null default '{}',
  impressum_text            text not null default '',
  subscription_status       text not null default 'past_due'
                              check (subscription_status in ('active', 'past_due', 'canceled')),
  subscription_plan         text,
  -- AVV (Auftragsverarbeitungsvertrag / DPA) legal audit trail:
  avv_accepted_at           timestamptz,
  avv_accepted_ip_anonymized text,
  created_at                timestamptz not null default now()
);

comment on column public.organizations.avv_accepted_at is
  'Exact ISO 8601 timestamp the shop accepted the AVV/DPA (legal audit).';
comment on column public.organizations.avv_accepted_ip_anonymized is
  'IP of the shop at AVV acceptance, last octet/segment masked (GDPR).';

create index if not exists organizations_owner_idx on public.organizations (owner_user_id);
create index if not exists organizations_api_key_idx on public.organizations (api_key);

-- ── withdrawal_requests: append-only tamper-evident audit log ────────────────
create table if not exists public.withdrawal_requests (
  id                 uuid primary key default gen_random_uuid(),
  org_id             uuid not null references public.organizations (id) on delete restrict,
  consumer_name      text,                       -- AES-256-GCM ciphertext (nullable after retention)
  email              text,                       -- AES-256-GCM ciphertext (nullable after retention)
  order_id           text not null,
  timestamp_iso8601  text not null,              -- server receipt time, ISO 8601 (immutable, hashed)
  received_at        timestamptz not null default now(),
  sha256_hash        text not null,              -- SHA-256 of canonical JSON (retained forever)
  tsa_pending        boolean not null default true,
  anonymized_at      timestamptz,                -- set when PII is nullified by retention job
  created_at         timestamptz not null default now()
);

create index if not exists withdrawal_org_created_idx
  on public.withdrawal_requests (org_id, created_at);
create index if not exists withdrawal_hash_idx
  on public.withdrawal_requests (sha256_hash);
-- Retention scans: find rows older than the cutoff that still hold PII.
create index if not exists withdrawal_retention_idx
  on public.withdrawal_requests (created_at)
  where anonymized_at is null;

-- ── merkle_roots: daily Merkle root + RFC 3161 TSA token per org ─────────────
create table if not exists public.merkle_roots (
  id              uuid primary key default gen_random_uuid(),
  org_id          uuid not null references public.organizations (id) on delete restrict,
  date            date not null,
  merkle_root_hex text not null,
  tsa_token_der   bytea,                         -- ASN.1 DER TimeStampResp token (null while pending)
  tsa_pending     boolean not null default true,
  created_at      timestamptz not null default now(),
  unique (org_id, date)
);

create index if not exists merkle_roots_org_date_idx
  on public.merkle_roots (org_id, date);
create index if not exists merkle_roots_pending_idx
  on public.merkle_roots (tsa_pending) where tsa_pending = true;
