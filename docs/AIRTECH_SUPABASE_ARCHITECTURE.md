# Airtech Supabase Architecture (proposed)

Date: 2026-08-16. Per the migration decision recorded in project memory
(`architecture-supabase-migration`): this schema is derived directly from the existing Sanity
schema (`src/sanity/schemaTypes/`) and the shared TypeScript content model (`src/content/types.ts`)
— it is a blueprint translation, not a from-scratch redesign. Additions beyond the existing model
are called out explicitly and justified against material from this session's source ingestion.

**This is architecture only. No migration, no provisioning, no destructive action has been taken.**
Supabase project ref `xmkegimmzdshnbqbdvxs` is referenced in the master brief but not yet confirmed
connected to this repository (no `.vercel` link, no Supabase env vars set — see prior audit).
Provisioning is blocked on the client decision form per the existing gate in project memory.

## 1. Design principles

- Every fact-bearing table carries the existing `status` enum (`verified`, `client_confirmed`,
  `source_only`, `needs_verification`, `historical`, `do_not_publish`) — this is the single most
  important thing to preserve from the Sanity implementation. It is not decorative; the app layer
  must filter on it (mirroring `getCertifications()`'s existing filter pattern).
- Slugs stay human-authored strings (not surrogate-only), matching the existing content model, for
  stable URLs and easy migration from `src/content/`.
- Junction tables for many-to-many relationships (`project_services`, `project_industries`)
  replace Sanity's array-of-references fields — this is the one place normalization genuinely
  helps: it makes "all projects for this service" a join, not an application-level filter.
- Do not over-normalize fields that are always 1:1 with their parent (e.g. `seo_title`,
  `seo_description` stay columns on the parent table, not a separate `seo` table, matching how
  little independent value the `seoType` Sanity object actually has on its own).

## 2. Core tables

### `projects`

Directly maps `src/content/types.ts`'s `Project` interface, with additions marked **NEW**.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid, pk | |
| `slug` | text, unique | |
| `name` | text | |
| `client` | text, nullable | |
| `client_display_approved` | boolean | mirrors existing `clientDisplayApproved` |
| `location` | text, nullable | |
| **`city` (NEW)** | text, nullable | extracted from `location` for filtering — see `AIRTECH_INFORMATION_ARCHITECTURE.md` §Project hierarchy; sourced values now exist for most projects (Kathmandu, Bhairahawa, Parasi, Birgunj, Lalitpur, ...) |
| `industry_slug` | text, fk → `industries.slug` | was a bare string field in Sanity; now a real fk |
| `project_type` | text | |
| `completion_year` | text, nullable | |
| `project_status` | enum(`completed`,`ongoing`,`provisional`) | **enforcement note:** Parliament Building must be seeded as `ongoing`, never `completed` — see `AIRTECH_CONTENT_AUDIT.md` §2d |
| `airtech_role` | text | |
| **`contract_value_npr` (NEW)** | numeric, nullable | now sourced for several projects via the reference letters (`AIRTECH_CONTENT_AUDIT.md` §2b) — nullable and gated by `status`; never rendered unless `status IN ('verified','client_confirmed')` |
| **`project_area_sqm` (NEW)** | numeric, nullable | sourced for Tiger Palace (16,245 sqm) |
| `installed_capacity` | text, nullable | |
| `challenge` | text, nullable | |
| `engineering_approach` | text, nullable | |
| `execution_scope` | text, nullable | |
| `testing_commissioning` | text, nullable | |
| `outcome` | text, nullable | |
| **`reference_letter_on_file` (NEW)** | boolean, default false | true for the 9 projects backed by a signed appreciation letter — lets the admin/UI surface "documented" vs. "portfolio only" without needing the letter itself public |
| `hero_image_id` | uuid, fk → `media.id`, nullable | |
| `testimonial_id` | uuid, fk → `testimonials.id`, nullable | |
| `featured` | boolean | |
| `display_order` | int, nullable | **NEW** — supports the "control ordering" admin requirement from the user's `/admin` capability list |
| `seo_title` | text, nullable | |
| `seo_description` | text, nullable | |
| `status` | verification enum | |
| `created_at`, `updated_at` | timestamptz | |

### `project_services` / `project_industries` (junction tables)

`project_id`, `service_slug` / `industry_slug`, replacing the array fields
(`serviceSlugsDelivered`, `relatedServiceSlugs`) — collapses two overlapping array fields in the
current model into one clean relation with an optional `relationship_type` column
(`'delivered'` vs `'related'`) if that distinction is still wanted; otherwise simplify to one.
**CLIENT DECISION REQUIRED** on whether "delivered" vs "related" services need to stay distinct —
not addressed in any source document.

### `project_related_projects`

`project_id`, `related_project_id` — self-referential junction, replacing `relatedProjectSlugs`.

### `services`

Maps `Service` directly: `slug`, `name`, `category` (enum matching the existing `ServiceCategory`
union), `discipline_code`, `short_description`, `detailed_description`, `capabilities` (text[]),
`sub_services` (text[]), `systems` (text[]), `applications` (text[]), `hero_image_id`, `seo_title`,
`seo_description`, `status`, `display_order` (**NEW**, same admin-ordering rationale as projects).

### `industries`

Maps `Industry` directly: `slug`, `name`, `overview`, `operational_challenges` (text[]),
`technical_requirements` (text[]), `airtech_capabilities` (text[]), `proof_points` (text[]),
`hero_image_id`, `seo_title`, `seo_description`, `status`, `display_order` (**NEW**).

### `testimonials`

Maps `Testimonial` directly. **Addition to consider:** the 9 reference letters
(`AIRTECH_CONTENT_AUDIT.md` §2b) are a stronger, more formal category than a pull-quote
testimonial — recommend a `source_type` column (`'testimonial'` vs `'reference_letter'`) so the
admin/UI can treat a scanned, signed letter differently from a quoted testimonial (e.g. show a
"view letter" link vs. inline pull-quote styling).

### `certifications`

Maps `Certification` directly: `id`, `name`, `issuing_body`, `valid_until`, `document_image_id`,
`status`. No structural change — the existing "build it in the CMS but don't render until
verified" pattern (`getCertifications()`) is exactly right and should be preserved as an
application-layer filter on `status`, not relaxed.

### `partners` (OEM/equipment partners)

Maps `Partner` directly: `id`, `name`, `logo_id`, `relationship_note`, `status`. Keep the existing
"neutral trusted-equipment-partner framing, never 'authorized dealer'" rule as a content policy,
not a schema constraint — nothing to change structurally. Note: the reference letters newly confirm
specific Mitsubishi Electric City Multi VRF installations (JICA, Radisson/Oriental Hotels, British
Embassy) — this is evidence for the *existing* neutral framing, not grounds to escalate the wording.

### `people` (team)

Maps `Person` directly: `id`, `name`, `role`, `bio`, `photo_id`, `years_with_airtech`, `status`,
`display_order` (**NEW**).

### `resources`

Maps `Resource` directly: `slug`, `title`, `kind` (enum matching the existing union), `summary`,
`published_date`, `body`, `file_media_id` (fk → `media.id`, replacing the bare `fileUrl` string so
file access can go through Supabase Storage signed URLs — see §4), `seo_title`, `seo_description`,
`status`.

### `site_settings`

Single-row table (or key/value table if more flexibility is wanted later): `company_name`,
`brand_name`, `tagline`, `established_year`, `head_office`, `primary_email`, `phone` (nullable —
stays empty until the phone-number conflict resolves, exactly as today), `whatsapp` (nullable).

### `navigation`

**NEW relative to the Sanity schema** (which had no navigation schema — nav is currently hardcoded
in `src/lib/navigation.ts`). Only build this if the client decision form actually asks for
admin-editable navigation; otherwise leave navigation as code-defined, since over-engineering a
navigation CMS for a ~7-item nav is exactly the kind of unnecessary complexity the master brief
warns against (§29: "do not build an unnecessarily complex CMS").
**CLIENT DECISION REQUIRED.**

### `enquiries`

**NEW** — currently the enquiry form posts to an email/webhook with no persistence
(`docs/OPEN_DECISIONS.md` #7). Moving to Supabase, persisting submissions is close to free and
gives the admin a real inbox instead of relying entirely on email delivery:

`id`, `intent` (HVAC/Full MEP/Electrical/AMC/Other), `project_type`, `location`, `stage`,
`name`, `company`, `email`, `phone`, `message`, `attachment_media_id` (nullable, fk → `media.id`),
`status` (`new`/`contacted`/`qualified`/`closed`), `created_at`.

### `media`

**NEW** — Sanity handled media as a built-in asset type; Supabase Storage needs an explicit table
to track what's uploaded, its bucket/path, alt text, and captions (mirroring `SanityImageRef`'s
`src`/`alt`/`width`/`height`/`caption` fields): `id`, `bucket`, `path`, `alt`, `width`, `height`,
`caption`, `source_note` (nullable — e.g. "AIPL PROFILE - 2026.pptx slide 8," useful for
provenance tracking given how much of this session's find was about mismatched provenance),
`created_at`.

## 3. Indexes

- Unique index on every `slug` column.
- Index on `projects.industry_slug`, `projects.city`, `projects.featured`, `projects.status` — these
  are the live filter/query paths.
- Index on `enquiries.status`, `enquiries.created_at` for the admin inbox view.

## 4. Storage buckets

| Bucket | Contents | Access |
|---|---|---|
| `project-images` | Project galleries, hero images | Public read |
| `project-documents` | Technical drawings/reports where publishable | Public read or signed, per document |
| `team` | Person photos | Public read |
| `certifications` | Certificate scans | Public read only once `status` is `verified`/`client_confirmed` — enforce via signed URL generation gated on that column, not bucket-level public access, so a draft certificate can't leak via a guessed URL |
| `resources` | Downloadable PDFs/datasheets | Public read once published |
| `site-media` | Homepage/hero imagery not tied to a project | Public read |
| **`reference-documents` (NEW)** | The 9 scanned reference letters and any future signed client correspondence | **Private, signed URLs only, admin-only access** — this bucket should never be public-read by default, since its contents are private business correspondence pending explicit per-letter publication approval (`AIRTECH_CONTENT_AUDIT.md` §2b) |

## 5. RLS strategy

- All tables: public (anon) role gets `SELECT` only, and only on rows where
  `status IN ('verified','client_confirmed')` — mirrors the existing app-layer filter pattern,
  moved to the database so it can't be bypassed by a future code change.
- `enquiries`: no public `SELECT` at all (write-only via a server action using the service role,
  never the anon key — matches the master brief's §31 "public user must never modify CMS content,"
  extended here to "must never read enquiries either").
- Authenticated admin role (Supabase Auth): full CRUD on all content tables, `SELECT` on
  `enquiries`.
- `reference-documents` bucket and its associated `media` rows: admin-only, no anon policy at all.

## 6. Auth model

- Supabase Auth, email/password (or magic link) for the single Airtech admin account(s) at launch —
  no public user accounts needed anywhere on this site (it's a B2B lead-gen site, not a portal).
- **CLIENT DECISION REQUIRED:** how many admin accounts, and whether any role split (e.g.
  content-editor vs. full-admin) is wanted — not addressed in any source document. Default
  recommendation: single admin role at launch, matching "simple enough for a non-developer" from
  the master brief §29.

## 7. What stays exactly as-is from the Sanity implementation

- The `status` verification enum and its values — unchanged.
- The overall shape of every content type — this is a schema *translation*, not a redesign.
- The principle that unverified content is buildable but never rendered live.

## 8. What this document deliberately does not do

- No SQL migration files yet — per the master brief §41 ("do not execute destructive migrations
  yet; first produce the architecture") and the standing blocking gate on the client decision form.
- No Supabase project provisioning, no env vars set, no `/admin` code written.
