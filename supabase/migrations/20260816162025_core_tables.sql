-- Airtech content schema. Table shapes are a direct translation of src/sanity/schemaTypes/ and
-- src/content/types.ts (AIRTECH_SUPABASE_ARCHITECTURE.md §1: "blueprint translation, not a
-- from-scratch redesign"). Deliberate scope decisions vs. the generic AGENTS.md table list are
-- called out inline where they depart from it.

-- ---------------------------------------------------------------------------
-- media — Sanity handled assets as a built-in type; Storage needs an explicit
-- tracking table (bucket/path/alt/caption/provenance).
-- ---------------------------------------------------------------------------
create table public.media (
  id uuid primary key default gen_random_uuid(),
  bucket text not null,
  path text not null,
  alt text not null default '',
  width integer,
  height integer,
  caption text,
  source_note text,
  created_at timestamptz not null default now(),
  unique (bucket, path)
);

-- ---------------------------------------------------------------------------
-- industries
-- ---------------------------------------------------------------------------
create table public.industries (
  slug text primary key,
  name text not null,
  overview text,
  operational_challenges text[] not null default '{}',
  technical_requirements text[] not null default '{}',
  airtech_capabilities text[] not null default '{}',
  proof_points text[] not null default '{}',
  hero_image_id uuid references public.media (id) on delete set null,
  seo_title text,
  seo_description text,
  status public.verification_status not null default 'needs_verification',
  display_order integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------
create table public.services (
  slug text primary key,
  name text not null,
  category public.service_category not null,
  discipline_code text,
  short_description text,
  detailed_description text,
  capabilities text[] not null default '{}',
  sub_services text[] not null default '{}',
  systems text[] not null default '{}',
  applications text[] not null default '{}',
  hero_image_id uuid references public.media (id) on delete set null,
  seo_title text,
  seo_description text,
  status public.verification_status not null default 'needs_verification',
  display_order integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Collapses the Sanity schema's two mirrored array-reference fields
-- (service.relatedIndustries / industry.relatedServices) into one relation.
create table public.service_industries (
  service_slug text not null references public.services (slug) on delete cascade,
  industry_slug text not null references public.industries (slug) on delete cascade,
  primary key (service_slug, industry_slug)
);

-- ---------------------------------------------------------------------------
-- testimonials — project_id FK added after `projects` exists (see below) to
-- break the testimonials <-> projects circular reference.
-- ---------------------------------------------------------------------------
create table public.testimonials (
  id text primary key,
  quote text,
  person_name text,
  person_title text,
  organisation text,
  source_type public.testimonial_source_type not null default 'testimonial',
  document_media_id uuid references public.media (id) on delete set null,
  status public.verification_status not null default 'needs_verification',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- certifications / partners
-- ---------------------------------------------------------------------------
create table public.certifications (
  id text primary key,
  name text not null,
  issuing_body text,
  valid_until date,
  document_image_id uuid references public.media (id) on delete set null,
  status public.verification_status not null default 'needs_verification',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.partners (
  id text primary key,
  name text not null,
  logo_id uuid references public.media (id) on delete set null,
  relationship_note text,
  status public.verification_status not null default 'needs_verification',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- people (team)
-- ---------------------------------------------------------------------------
create table public.people (
  id text primary key,
  name text not null,
  role text,
  bio text,
  photo_id uuid references public.media (id) on delete set null,
  years_with_airtech text,
  status public.verification_status not null default 'needs_verification',
  display_order integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- clients — the "client wall" (airtech-digital-experience skill §4 row 11) is a
-- categorized logo grid, a distinct concern from a project's free-text `client`
-- attribution field. Not in AIRTECH_SUPABASE_ARCHITECTURE.md (a gap in that
-- document), but explicitly required by AGENTS.md and has real sourced data
-- pending publication approval (AIRTECH_CONTENT_AUDIT.md §2e, OPEN_DECISIONS #5).
-- ---------------------------------------------------------------------------
create table public.clients (
  id text primary key,
  name text not null,
  sector text,
  logo_id uuid references public.media (id) on delete set null,
  display_approved boolean not null default false,
  status public.verification_status not null default 'needs_verification',
  display_order integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- resources
-- ---------------------------------------------------------------------------
create table public.resources (
  slug text primary key,
  title text not null,
  kind public.resource_kind,
  summary text,
  published_date date,
  body text,
  file_media_id uuid references public.media (id) on delete set null,
  seo_title text,
  seo_description text,
  status public.verification_status not null default 'needs_verification',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- site_settings — singleton row (id is always `true`; the primary key makes a
-- second row impossible).
-- ---------------------------------------------------------------------------
create table public.site_settings (
  id boolean primary key default true,
  company_name text,
  brand_name text,
  tagline text,
  established_year text,
  head_office text,
  primary_email text,
  -- Deliberately nullable — see docs/OPEN_DECISIONS.md #1 (phone number conflict, unresolved).
  phone text,
  whatsapp text,
  lead_notification_email text,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id)
);

-- navigation and homepage_content are intentionally NOT created here — both are
-- explicitly scoped out in AIRTECH_SUPABASE_ARCHITECTURE.md §2 and AIRTECH_CMS_SPEC.md
-- ("explicitly out of scope"): nav/homepage structure stay code-defined unless the
-- client decision form asks otherwise. See the implementation report for detail.

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  client text,
  client_display_approved boolean not null default false,
  location text,
  city text,
  industry_slug text not null references public.industries (slug) on delete restrict,
  project_type text,
  completion_year text,
  project_status public.project_status not null default 'provisional',
  airtech_role text,
  installed_capacity text,
  contract_value_npr numeric,
  project_area_sqm numeric,
  oem_systems text[] not null default '{}',
  challenge text,
  engineering_approach text,
  execution_scope text,
  testing_commissioning text,
  outcome text,
  -- true for the 9 projects backed by a signed appreciation letter (AIRTECH_CONTENT_AUDIT.md §2b).
  reference_letter_on_file boolean not null default false,
  hero_image_id uuid references public.media (id) on delete set null,
  testimonial_id text references public.testimonials (id) on delete set null,
  featured boolean not null default false,
  display_order integer,
  seo_title text,
  seo_description text,
  status public.verification_status not null default 'needs_verification',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Close the testimonials <-> projects circular reference.
alter table public.testimonials
  add column project_id uuid references public.projects (id) on delete set null;

-- ---------------------------------------------------------------------------
-- project relations
-- ---------------------------------------------------------------------------

-- Replaces the Sanity schema's mirrored project.relatedServices / service.relatedProjects
-- array-reference fields with a single relation.
create table public.project_services (
  project_id uuid not null references public.projects (id) on delete cascade,
  service_slug text not null references public.services (slug) on delete cascade,
  primary key (project_id, service_slug)
);

-- The many-to-many "this industry is also relevant to this project" relation
-- (industry.relatedProjects in Sanity), distinct from projects.industry_slug,
-- which is the project's single primary/canonical industry classification.
create table public.project_industries (
  project_id uuid not null references public.projects (id) on delete cascade,
  industry_slug text not null references public.industries (slug) on delete cascade,
  primary key (project_id, industry_slug)
);

create table public.project_related_projects (
  project_id uuid not null references public.projects (id) on delete cascade,
  related_project_id uuid not null references public.projects (id) on delete cascade,
  primary key (project_id, related_project_id),
  constraint project_related_projects_not_self check (project_id <> related_project_id)
);

-- Replaces Sanity's inline `gallery` image array; display_order supports admin reordering.
create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  media_id uuid not null references public.media (id) on delete cascade,
  display_order integer,
  created_at timestamptz not null default now(),
  unique (project_id, media_id)
);

-- ---------------------------------------------------------------------------
-- enquiries — new relative to Sanity; the enquiry form currently posts to an
-- email/webhook with no persistence (docs/OPEN_DECISIONS.md #7).
-- ---------------------------------------------------------------------------
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  intent public.enquiry_intent,
  project_type text,
  location text,
  stage text,
  name text not null,
  company text,
  email text not null,
  phone text,
  message text,
  attachment_media_id uuid references public.media (id) on delete set null,
  status public.enquiry_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
