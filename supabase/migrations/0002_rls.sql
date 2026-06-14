-- ============================================================================
-- Migration 0002: Row-Level Security
-- ----------------------------------------------------------------------------
-- Model:
--   * B2B dashboard clients authenticate via Supabase Auth (anon key). They may
--     only ever read/update their OWN organization and its child rows. Tenant
--     ownership is expressed via organizations.owner_user_id = auth.uid().
--     (The ТЗ phrases this as "id/org_id = auth.uid()"; we bind through the
--      owner_user_id foreign key, which is the correct multi-tenant form.)
--   * Widget INSERTs never touch the DB directly. The Next.js API uses the
--     SUPABASE_SERVICE_ROLE_KEY, which BYPASSES RLS, to write rows. No anon
--     INSERT/UPDATE/DELETE policies exist on withdrawal_requests → append-only
--     from the clients' perspective.
-- ============================================================================

alter table public.organizations      enable row level security;
alter table public.withdrawal_requests enable row level security;
alter table public.merkle_roots        enable row level security;

-- Force RLS even for the table owner (defense in depth; service_role still bypasses).
alter table public.organizations      force row level security;
alter table public.withdrawal_requests force row level security;
alter table public.merkle_roots        force row level security;

-- ── organizations ───────────────────────────────────────────────────────────
drop policy if exists org_select_own on public.organizations;
create policy org_select_own on public.organizations
  for select to authenticated
  using (owner_user_id = auth.uid());

drop policy if exists org_insert_self on public.organizations;
create policy org_insert_self on public.organizations
  for insert to authenticated
  with check (owner_user_id = auth.uid());

-- Dashboard may update Impressum, domain whitelist, etc. — but NOT billing
-- columns (those are mutated only by the service role via the billing webhook).
drop policy if exists org_update_own on public.organizations;
create policy org_update_own on public.organizations
  for update to authenticated
  using (owner_user_id = auth.uid())
  with check (owner_user_id = auth.uid());

-- ── withdrawal_requests (SELECT only for owners; append-only) ────────────────
drop policy if exists wr_select_own on public.withdrawal_requests;
create policy wr_select_own on public.withdrawal_requests
  for select to authenticated
  using (
    org_id in (select id from public.organizations where owner_user_id = auth.uid())
  );
-- No INSERT/UPDATE/DELETE policies for authenticated → writes only via service role.

-- ── merkle_roots (SELECT only for owners) ────────────────────────────────────
drop policy if exists mr_select_own on public.merkle_roots;
create policy mr_select_own on public.merkle_roots
  for select to authenticated
  using (
    org_id in (select id from public.organizations where owner_user_id = auth.uid())
  );

-- ----------------------------------------------------------------------------
-- Guard: prevent the dashboard from escalating its own billing status.
-- Billing columns may only change when the row is written by service_role.
-- ----------------------------------------------------------------------------
create or replace function public.prevent_billing_self_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.role() <> 'service_role' then
    if new.subscription_status is distinct from old.subscription_status
       or new.subscription_plan is distinct from old.subscription_plan
       or new.api_key is distinct from old.api_key
       or new.owner_user_id is distinct from old.owner_user_id then
      raise exception 'billing/identity columns are read-only for this role';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_prevent_billing_self_update on public.organizations;
create trigger trg_prevent_billing_self_update
  before update on public.organizations
  for each row execute function public.prevent_billing_self_update();
