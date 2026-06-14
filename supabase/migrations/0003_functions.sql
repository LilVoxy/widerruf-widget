-- ============================================================================
-- Migration 0003: helper RPCs (API-key resolution + GDPR retention)
-- ============================================================================

-- Resolve an organization from its API key, returning only the fields the edge
-- function needs for authz. SECURITY DEFINER so it can run regardless of RLS;
-- callers pass the secret api_key, so this is not an enumeration vector.
create or replace function public.org_for_api_key(p_api_key text)
returns table (
  id                  uuid,
  domain_whitelist    text[],
  impressum_text      text,
  subscription_status text
)
language sql
security definer
set search_path = public
as $$
  select o.id, o.domain_whitelist, o.impressum_text, o.subscription_status
  from public.organizations o
  where o.api_key = p_api_key
  limit 1;
$$;

revoke all on function public.org_for_api_key(text) from public, anon, authenticated;
-- Only the service role (edge function) may call it.
grant execute on function public.org_for_api_key(text) to service_role;

-- ----------------------------------------------------------------------------
-- GDPR retention (Art. 5(1)(e)): nullify raw PII after the retention window
-- while preserving the SHA-256 hash for legal audit. Idempotent; returns the
-- number of rows anonymized. Invoked by the daily CRON (and usable standalone).
-- ----------------------------------------------------------------------------
create or replace function public.anonymize_expired_withdrawals(p_retention_days integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  affected integer;
begin
  update public.withdrawal_requests
     set consumer_name = null,
         email         = null,
         anonymized_at = now()
   where anonymized_at is null
     and created_at < now() - make_interval(days => greatest(p_retention_days, 0));
  get diagnostics affected = row_count;
  return affected;
end;
$$;

revoke all on function public.anonymize_expired_withdrawals(integer) from public, anon, authenticated;
grant execute on function public.anonymize_expired_withdrawals(integer) to service_role;

-- ----------------------------------------------------------------------------
-- Optional pure-DB retention via pg_cron (Supabase). Uncomment to run nightly
-- at 02:00 UTC independently of the Vercel CRON. Adjust the interval/days.
-- ----------------------------------------------------------------------------
-- create extension if not exists pg_cron;
-- select cron.schedule(
--   'anonymize-withdrawals-nightly',
--   '0 2 * * *',
--   $$ select public.anonymize_expired_withdrawals(180); $$
-- );
