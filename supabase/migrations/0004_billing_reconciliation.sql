-- ============================================================================
-- Migration 0004: billing reconciliation + event-ordering metadata
-- ----------------------------------------------------------------------------
-- The billing webhook (service role) now persists the LemonSqueezy identifiers
-- so a paid subscription can always be reconciled against the org, and records
-- the source event time so a late/duplicate delivery cannot clobber a newer
-- status (out-of-order protection).
--
-- All columns are nullable / additive → safe to apply on a live table. RLS is
-- unchanged: these columns are written ONLY by the service role via the webhook
-- (the prevent_billing_self_update trigger from 0002 already blocks the
-- dashboard role from touching billing columns; subscription_event_at is set
-- exclusively by the service role too).
-- ============================================================================

alter table public.organizations
  add column if not exists ls_subscription_id    text,
  add column if not exists ls_customer_id        text,
  add column if not exists billing_user_email     text,
  add column if not exists subscription_event_at  timestamptz;

comment on column public.organizations.ls_subscription_id is
  'LemonSqueezy subscription id (data.id on subscription_* events) for reconciliation.';
comment on column public.organizations.ls_customer_id is
  'LemonSqueezy customer id (attributes.customer_id) for reconciliation.';
comment on column public.organizations.billing_user_email is
  'Email of the paying LS customer (attributes.user_email). NOT the dashboard login.';
comment on column public.organizations.subscription_event_at is
  'Source timestamp of the last applied billing event (attributes.updated_at). '
  'Used to reject out-of-order / duplicate webhook deliveries.';

-- Fast lookup when reconciling by LS subscription id.
create index if not exists organizations_ls_subscription_idx
  on public.organizations (ls_subscription_id);
