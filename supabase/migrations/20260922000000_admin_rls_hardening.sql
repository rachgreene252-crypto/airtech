-- Admin-role RLS hardening, 2026-09-22.
--
-- Every "Admin has full access to X" policy since 20260816162032_rls_policies.sql
-- has used `to authenticated using (true)`. That was a deliberate, documented
-- choice (see that file's own header comment and AIRTECH_SUPABASE_ARCHITECTURE.md
-- §6): "no public user accounts needed anywhere on this site" means every
-- Supabase Auth account was assumed to be an Airtech admin by construction, so
-- `authenticated` == admin and there's no multi-tenant row ownership to
-- enforce beyond that. That assumption isn't wrong today, but it's a single
-- point of failure — if auth sign-up is ever left open, or a non-admin
-- authenticated use case gets added later (AIRTECH_OPEN_DECISIONS.md #17, the
-- still-open "role split" question) without someone remembering to revisit
-- every one of these policies, the gap reappears silently, with real stakes.
--
-- This migration removes that dependency: every policy below now checks an
-- explicit `public.admins` allow-list instead of inferring admin-ness from
-- "has a valid session at all". It touches every "Admin has full access"
-- (and equivalent) policy across both prior migrations plus storage.objects —
-- one consistent pass, not a partial patch on just the newest tables.
--
-- Design notes:
--   * A table, not a custom JWT claim. A JWT claim needs a Supabase Auth Hook
--     configured in the project dashboard — outside what a SQL migration can
--     express or this codebase can verify is actually wired up. `public.admins`
--     is fully expressed here, trivially auditable (`select * from admins`),
--     and already shaped for the OPEN_DECISIONS.md #17 role split later (add
--     values to the `role` check constraint) without touching any RLS policy
--     again.
--   * The helper function lives in a new `private` schema, not `public` —
--     PostgREST only exposes schemas it's configured to serve (normally just
--     `public`), so this keeps it out of the API surface entirely, on top of
--     the schema-qualified call sites below already being explicit callers,
--     not a discoverable RPC endpoint.
--   * `security definer` + `set search_path = ''` (with every reference
--     inside fully schema-qualified) is the standard-and-required pairing —
--     definer alone, without a pinned search_path, is the classic Postgres
--     privilege-escalation hole (a caller-controlled schema earlier in the
--     path can shadow an unqualified reference). `stable` lets the planner
--     cache it within a single statement.
--   * EXECUTE is granted to `authenticated` only — that's the only role any
--     policy below actually invokes it as. `anon` never needs it (no anon
--     policy references admin-ness), and `service_role` bypasses RLS entirely
--     so it never evaluates these policies in the first place.
--   * Every call site wraps the check as `(select private.is_admin())`, not
--     a bare function call, so the planner evaluates it once per statement
--     (an initPlan) instead of once per row — see supabase-postgres-best-
--     practices' RLS performance guidance.
--
-- Bootstrapping: `public.admins` starts empty and has no INSERT/UPDATE/DELETE
-- policy at all — granting the first (and every later) admin is deliberately
-- not self-service through the API. Insert the row directly via the Supabase
-- SQL editor or service-role connection, both of which bypass RLS:
--   insert into public.admins (user_id) values ('<auth.users.id of the account>');
-- Until that row exists, every policy below correctly denies all admin
-- writes — that's the intended fail-closed default, not a bug to work around.

create schema if not exists private;

create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  -- Single role today ("default recommendation: single admin role at
  -- launch", ARCHITECTURE.md §6). Extend this check constraint, not the
  -- column shape, if OPEN_DECISIONS.md #17 resolves toward a role split.
  role text not null default 'admin' check (role = 'admin'),
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;

revoke execute on function private.is_admin() from public, anon, service_role;
grant execute on function private.is_admin() to authenticated;

-- Admins can see who else is an admin; nobody can write here through the API
-- (see the bootstrapping note above) — deliberately no INSERT/UPDATE/DELETE
-- policy, so admin grants/revokes always go through the service role.
create policy "Admin can read admins" on public.admins
  for select to authenticated using ((select private.is_admin()));

-- ---------------------------------------------------------------------------
-- Replace every "Admin has full access to X" / admin-only policy's
-- `using (true)` with a real check, one drop+create pair per policy, in the
-- same order as 20260816162032_rls_policies.sql.
-- ---------------------------------------------------------------------------

drop policy "Admin has full access to media" on public.media;
create policy "Admin has full access to media" on public.media
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to industries" on public.industries;
create policy "Admin has full access to industries" on public.industries
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to services" on public.services;
create policy "Admin has full access to services" on public.services
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to testimonials" on public.testimonials;
create policy "Admin has full access to testimonials" on public.testimonials
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to certifications" on public.certifications;
create policy "Admin has full access to certifications" on public.certifications
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to partners" on public.partners;
create policy "Admin has full access to partners" on public.partners
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to people" on public.people;
create policy "Admin has full access to people" on public.people
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to clients" on public.clients;
create policy "Admin has full access to clients" on public.clients
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to resources" on public.resources;
create policy "Admin has full access to resources" on public.resources
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to projects" on public.projects;
create policy "Admin has full access to projects" on public.projects
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to service_industries" on public.service_industries;
create policy "Admin has full access to service_industries" on public.service_industries
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to project_services" on public.project_services;
create policy "Admin has full access to project_services" on public.project_services
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to project_industries" on public.project_industries;
create policy "Admin has full access to project_industries" on public.project_industries
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to project_related_projects" on public.project_related_projects;
create policy "Admin has full access to project_related_projects" on public.project_related_projects
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to project_images" on public.project_images;
create policy "Admin has full access to project_images" on public.project_images
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to site_settings" on public.site_settings;
create policy "Admin has full access to site_settings" on public.site_settings
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

-- enquiries — select/update only (no admin "for all": there's still no
-- insert/delete policy for anyone, matching the original file's "write-only
-- from the public's perspective, inserts happen server-side via the service
-- role" design, which is unchanged by this migration).
drop policy "Admin can read enquiries" on public.enquiries;
create policy "Admin can read enquiries" on public.enquiries
  for select to authenticated using ((select private.is_admin()));

drop policy "Admin can update enquiry status" on public.enquiries;
create policy "Admin can update enquiry status" on public.enquiries
  for update to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

-- From 20260916000000_content_additions.sql
drop policy "Admin has full access to company_values" on public.company_values;
create policy "Admin has full access to company_values" on public.company_values
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to map_regions" on public.map_regions;
create policy "Admin has full access to map_regions" on public.map_regions
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

drop policy "Admin has full access to footer_links" on public.footer_links;
create policy "Admin has full access to footer_links" on public.footer_links
  for all to authenticated
  using ((select private.is_admin())) with check ((select private.is_admin()));

-- ---------------------------------------------------------------------------
-- Storage (20260816162035_storage_buckets.sql) — same treatment, admin-ness
-- now checked in addition to the existing bucket allow-list, not instead of it.
-- ---------------------------------------------------------------------------
drop policy "Admin has full access to storage objects" on storage.objects;
create policy "Admin has full access to storage objects" on storage.objects
  for all to authenticated
  using (
    (select private.is_admin())
    and bucket_id in (
      'project-images', 'project-documents', 'team', 'certifications',
      'resources', 'site-media', 'reference-documents'
    )
  )
  with check (
    (select private.is_admin())
    and bucket_id in (
      'project-images', 'project-documents', 'team', 'certifications',
      'resources', 'site-media', 'reference-documents'
    )
  );
