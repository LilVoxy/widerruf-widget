-- ============================================================================
-- Migration 0005: protect AVV audit-trail columns from self-update
-- ----------------------------------------------------------------------------
-- The original trigger (0002) guarded billing/identity columns but left
-- avv_accepted_at and avv_accepted_ip_anonymized unprotected. Because the RLS
-- update policy (org_update_own) lets an authenticated owner UPDATE any column
-- of their own row, a shop could erase their own AVV acceptance record via a
-- direct Supabase REST call — invalidating the "immutable audit trail" claim
-- required under Art. 28 DSGVO.
--
-- Fix: replace the trigger function so it also blocks any change to AVV
-- columns from non-service_role callers. AVV is set exactly once by
-- POST /api/org/avv (service-role-equivalent path via supabaseServer) and
-- must never be overwritten or nullified by the shop owner.
-- ============================================================================

create or replace function public.prevent_billing_self_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() <> 'service_role' then
    -- Billing / identity columns (unchanged from 0002):
    if new.subscription_status is distinct from old.subscription_status
       or new.subscription_plan  is distinct from old.subscription_plan
       or new.api_key            is distinct from old.api_key
       or new.owner_user_id      is distinct from old.owner_user_id then
      raise exception 'billing/identity columns are read-only for this role';
    end if;

    -- AVV audit-trail columns: once set they must be immutable.
    if new.avv_accepted_at           is distinct from old.avv_accepted_at
       or new.avv_accepted_ip_anonymized is distinct from old.avv_accepted_ip_anonymized then
      raise exception 'AVV audit columns are immutable once set';
    end if;
  end if;
  return new;
end;
$$;

-- The trigger itself already exists on the table; replacing the function body
-- is sufficient (the trigger calls the function by name). Re-creating it here
-- for clarity and idempotency.
drop trigger if exists trg_prevent_billing_self_update on public.organizations;
create trigger trg_prevent_billing_self_update
  before update on public.organizations
  for each row execute function public.prevent_billing_self_update();
