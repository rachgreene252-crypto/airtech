-- Additions on top of the 2026-08-16 schema, driven by the 2026-09-16 "all site content should be
-- editable from the admin" instruction. Scope decisions, so nothing here silently reintroduces what
-- 20260816162025_core_tables.sql deliberately left out:
--
--   * company_values      — new. Powers the /company "Our core values" grid (icon + title + body).
--   * map_regions         — new. Powers the /projects map (label + SVG position). Replaces the old
--                            regex-match-on-location approach in ProjectsMap.tsx with a real FK, so
--                            an admin assigns a project's region directly instead of the app guessing
--                            from free-text location strings.
--   * projects.region_key — new column, FK to map_regions. Existing `location`/`city` text columns
--                            are unchanged (still the human-readable address); this is the map-display
--                            grouping, a separate concern.
--   * footer_links        — new, narrowly scoped. The footer's "Expertise" and "Industries" columns
--                            are already derived from public.services / public.industries — making
--                            those admin-editable requires zero new schema, they inherit it for free.
--                            This table covers only the remaining two static columns ("Company",
--                            "Get in touch"), which have no backing table of their own. Deliberately
--                            NOT a general-purpose nav/menu builder: fixed group_key enum, no nesting,
--                            no way to add a new column — same "can't restructure site IA" protection
--                            AIRTECH_SUPABASE_ARCHITECTURE.md §2 argued for when it scoped navigation
--                            out entirely. The header's primary nav stays code-defined; only these two
--                            footer groups were asked for.
--
-- Quick-stat-style numbers that are exactly derivable from other tables (disciplines count = number
-- of published services; "years in operation" = current year minus site_settings.established_year)
-- are deliberately NOT duplicated into a table here — computing them in the app is one line and can
-- never drift out of sync with the row it's derived from.

-- ---------------------------------------------------------------------------
-- company_values
-- ---------------------------------------------------------------------------
create table public.company_values (
  id text primary key,
  title text not null,
  body text not null,
  -- One of a fixed, known icon set the frontend already draws inline (see
  -- ValueIcon in src/app/(site)/company/page.tsx) — an admin picks from a
  -- select, not free-text SVG, so a bad value can't break the render.
  icon_key text not null,
  display_order integer not null default 0,
  status public.verification_status not null default 'client_confirmed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint company_values_icon_key_check check (
    icon_key in ('integrity', 'excellence', 'reliability', 'flexibility', 'responsiveness', 'teamwork')
  )
);

-- ---------------------------------------------------------------------------
-- map_regions
-- ---------------------------------------------------------------------------
create table public.map_regions (
  key text primary key,
  label text not null,
  -- Position on the shared 400x225 Nepal outline viewBox (src/lib/geo.ts).
  svg_x numeric not null,
  svg_y numeric not null,
  label_side text not null default 'above' check (label_side in ('above', 'below')),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects
  add column region_key text references public.map_regions (key) on delete set null;

-- ---------------------------------------------------------------------------
-- footer_links — see header note: only the two static footer columns that
-- have no backing table of their own.
-- ---------------------------------------------------------------------------
create type public.footer_link_group as enum ('company', 'get_in_touch');

create table public.footer_links (
  id uuid primary key default gen_random_uuid(),
  group_key public.footer_link_group not null,
  label text not null,
  href text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS — same pattern as the rest of the schema: status-gated public read
-- where a status column exists, unconditional public read for pure display
-- config (map_regions, footer_links) with no fact-verification dimension,
-- full CRUD for the authenticated admin role everywhere.
-- ---------------------------------------------------------------------------
alter table public.company_values enable row level security;
alter table public.map_regions enable row level security;
alter table public.footer_links enable row level security;

create policy "Public can read published company values" on public.company_values
  for select to anon, authenticated
  using (status in ('verified', 'client_confirmed'));
create policy "Admin has full access to company_values" on public.company_values
  for all to authenticated using (true) with check (true);

create policy "Public can read map regions" on public.map_regions
  for select to anon, authenticated using (true);
create policy "Admin has full access to map_regions" on public.map_regions
  for all to authenticated using (true) with check (true);

create policy "Public can read footer links" on public.footer_links
  for select to anon, authenticated using (true);
create policy "Admin has full access to footer_links" on public.footer_links
  for all to authenticated using (true) with check (true);

create index projects_region_key_idx on public.projects (region_key);
create index footer_links_group_key_idx on public.footer_links (group_key);

create trigger set_updated_at before update on public.company_values
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.map_regions
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.footer_links
  for each row execute function public.set_updated_at();
