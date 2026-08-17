-- RLS strategy per AIRTECH_SUPABASE_ARCHITECTURE.md §5-6:
--   * anon/authenticated (public) get SELECT only, restricted to rows whose verification `status`
--     is safe to publish ('verified' or 'client_confirmed') — the app-layer filter pattern already
--     used by src/content/certifications.ts's getCertifications(), moved into the database so it
--     can't be bypassed by a future code change.
--   * `enquiries` has no public SELECT at all; writes happen server-side via the service role
--     (which bypasses RLS), never via an anon-key INSERT policy — see AIRTECH_SUPABASE_ARCHITECTURE.md
--     §5 and the master brief's "never expose secrets client-side" / spam-protection requirement.
--   * There is a single admin role at launch (AIRTECH_SUPABASE_ARCHITECTURE.md §6: "no public user
--     accounts needed anywhere on this site"). Every Supabase Auth account is therefore an Airtech
--     admin by construction — `to authenticated` + full CRUD is the correct model here, not a BOLA
--     gap, because there is no multi-tenant row ownership to enforce. If a role split is ever
--     introduced (AIRTECH_OPEN_DECISIONS.md #17), these policies need revisiting.

alter table public.media enable row level security;
alter table public.industries enable row level security;
alter table public.services enable row level security;
alter table public.service_industries enable row level security;
alter table public.testimonials enable row level security;
alter table public.certifications enable row level security;
alter table public.partners enable row level security;
alter table public.people enable row level security;
alter table public.clients enable row level security;
alter table public.resources enable row level security;
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.project_services enable row level security;
alter table public.project_industries enable row level security;
alter table public.project_related_projects enable row level security;
alter table public.project_images enable row level security;
alter table public.enquiries enable row level security;

-- ---------------------------------------------------------------------------
-- media — publicly readable EXCEPT rows in the private `reference-documents`
-- bucket (the 9 scanned reference letters), which stay admin-only regardless
-- of which content row references them. See AIRTECH_SUPABASE_ARCHITECTURE.md §4-5.
-- ---------------------------------------------------------------------------
create policy "Public can read non-private media" on public.media
  for select to anon, authenticated
  using (bucket <> 'reference-documents');

create policy "Admin has full access to media" on public.media
  for all to authenticated
  using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Status-gated public content
-- ---------------------------------------------------------------------------
create policy "Public can read published industries" on public.industries
  for select to anon, authenticated
  using (status in ('verified', 'client_confirmed'));
create policy "Admin has full access to industries" on public.industries
  for all to authenticated using (true) with check (true);

create policy "Public can read published services" on public.services
  for select to anon, authenticated
  using (status in ('verified', 'client_confirmed'));
create policy "Admin has full access to services" on public.services
  for all to authenticated using (true) with check (true);

create policy "Public can read published testimonials" on public.testimonials
  for select to anon, authenticated
  using (status in ('verified', 'client_confirmed'));
create policy "Admin has full access to testimonials" on public.testimonials
  for all to authenticated using (true) with check (true);

create policy "Public can read published certifications" on public.certifications
  for select to anon, authenticated
  using (status in ('verified', 'client_confirmed'));
create policy "Admin has full access to certifications" on public.certifications
  for all to authenticated using (true) with check (true);

create policy "Public can read published partners" on public.partners
  for select to anon, authenticated
  using (status in ('verified', 'client_confirmed'));
create policy "Admin has full access to partners" on public.partners
  for all to authenticated using (true) with check (true);

create policy "Public can read published people" on public.people
  for select to anon, authenticated
  using (status in ('verified', 'client_confirmed'));
create policy "Admin has full access to people" on public.people
  for all to authenticated using (true) with check (true);

-- Clients also require display_approved (client-wall logo publication permission,
-- AIRTECH_OPEN_DECISIONS.md #5), distinct from and in addition to the status gate.
create policy "Public can read approved published clients" on public.clients
  for select to anon, authenticated
  using (status in ('verified', 'client_confirmed') and display_approved = true);
create policy "Admin has full access to clients" on public.clients
  for all to authenticated using (true) with check (true);

create policy "Public can read published resources" on public.resources
  for select to anon, authenticated
  using (status in ('verified', 'client_confirmed'));
create policy "Admin has full access to resources" on public.resources
  for all to authenticated using (true) with check (true);

create policy "Public can read published projects" on public.projects
  for select to anon, authenticated
  using (status in ('verified', 'client_confirmed'));
create policy "Admin has full access to projects" on public.projects
  for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Junction tables — a row is publicly visible only when every project/service/
-- industry it connects is itself publicly visible.
-- ---------------------------------------------------------------------------
create policy "Public can read industries for published services" on public.service_industries
  for select to anon, authenticated
  using (
    exists (select 1 from public.services s where s.slug = service_industries.service_slug and s.status in ('verified', 'client_confirmed'))
    and exists (select 1 from public.industries i where i.slug = service_industries.industry_slug and i.status in ('verified', 'client_confirmed'))
  );
create policy "Admin has full access to service_industries" on public.service_industries
  for all to authenticated using (true) with check (true);

create policy "Public can read services for published projects" on public.project_services
  for select to anon, authenticated
  using (
    exists (select 1 from public.projects p where p.id = project_services.project_id and p.status in ('verified', 'client_confirmed'))
    and exists (select 1 from public.services s where s.slug = project_services.service_slug and s.status in ('verified', 'client_confirmed'))
  );
create policy "Admin has full access to project_services" on public.project_services
  for all to authenticated using (true) with check (true);

create policy "Public can read industries for published projects" on public.project_industries
  for select to anon, authenticated
  using (
    exists (select 1 from public.projects p where p.id = project_industries.project_id and p.status in ('verified', 'client_confirmed'))
    and exists (select 1 from public.industries i where i.slug = project_industries.industry_slug and i.status in ('verified', 'client_confirmed'))
  );
create policy "Admin has full access to project_industries" on public.project_industries
  for all to authenticated using (true) with check (true);

create policy "Public can read related projects for published projects" on public.project_related_projects
  for select to anon, authenticated
  using (
    exists (select 1 from public.projects p where p.id = project_related_projects.project_id and p.status in ('verified', 'client_confirmed'))
    and exists (select 1 from public.projects rp where rp.id = project_related_projects.related_project_id and rp.status in ('verified', 'client_confirmed'))
  );
create policy "Admin has full access to project_related_projects" on public.project_related_projects
  for all to authenticated using (true) with check (true);

create policy "Public can read images for published projects" on public.project_images
  for select to anon, authenticated
  using (
    exists (select 1 from public.projects p where p.id = project_images.project_id and p.status in ('verified', 'client_confirmed'))
  );
create policy "Admin has full access to project_images" on public.project_images
  for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- site_settings — a single public-facing company-info row; no per-row status gate.
-- ---------------------------------------------------------------------------
create policy "Public can read site settings" on public.site_settings
  for select to anon, authenticated using (true);
create policy "Admin has full access to site_settings" on public.site_settings
  for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- enquiries — write-only from the public's perspective. No anon policy at all:
-- inserts happen via a server action using the service role key, which bypasses
-- RLS entirely and is never exposed to the browser.
-- ---------------------------------------------------------------------------
create policy "Admin can read enquiries" on public.enquiries
  for select to authenticated using (true);
create policy "Admin can update enquiry status" on public.enquiries
  for update to authenticated using (true) with check (true);
