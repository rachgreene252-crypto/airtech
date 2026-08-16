# Airtech CMS Spec (`/admin`, proposed)

Date: 2026-08-16. Scoped narrowly per the user's explicit instruction: the client should be able to
manage content, not restructure the site. This spec describes the admin surface over the schema in
`AIRTECH_SUPABASE_ARCHITECTURE.md`. Not yet built — planning only.

## Design constraint

"Simple enough for a non-developer" (master brief §29) and "the client shouldn't be able to
accidentally destroy the entire homepage structure" (user's architecture message). Concretely: the
admin edits **content within fixed structures** (add/edit/reorder/publish a project; upload a
resource) — it does not let anyone edit the homepage's section order, the nav structure, or the
design system. Navigation stays code-defined unless the client decision form specifically asks for
otherwise (flagged in `AIRTECH_SUPABASE_ARCHITECTURE.md` §2).

## Sections

### Projects (`/admin/projects`)

- List view: table with name, client, industry, status (verification + project status), featured
  flag, `display_order`.
- Create/edit: all `projects` columns from the Supabase schema. `status` (verification) defaults to
  `needs_verification` — mirrors the existing Sanity `initialValue`, deliberately conservative.
- Feature/unfeature toggle, drag-reorder (writes `display_order`).
- Gallery upload → `project-images` bucket, associates `media` rows.
- Publish/unpublish (`status` transitions) — publishing to a public-visible status is a distinct,
  explicit action from saving a draft.
- **Guardrail:** a project can be saved in any verification `status`, but the admin UI should
  visibly warn (not block) when publishing a project with `contract_value_npr` or
  `reference_letter_on_file = true` set, reminding the editor that reference-letter-derived figures
  need the specific per-letter approval described in `AIRTECH_CONTENT_AUDIT.md` §2b — this is a
  UX nudge, not a hard technical constraint, since the admin is trusted (Airtech's own staff).

### Services (`/admin/services`)

- Add/edit the 7-taxonomy services, reorder, publish/unpublish. No delete from the UI for the core
  taxonomy — removing a whole discipline is a structural decision, not a content-editing one; if
  ever needed, do it via direct database access, not the admin.

### Industries (`/admin/industries`)

- Same pattern as Services: add/edit/reorder/publish. No structural delete from the UI.

### Resources (`/admin/resources`)

- Upload PDF/document → `resources` bucket, set `kind`, tags (system/industry associations via the
  same junction-table pattern as projects), publish.
- This section matters more than its current empty state suggests — see Flow 7 in
  `AIRTECH_USER_FLOWS.md`; getting even a company-profile PDF into this section quickly is high
  value relative to effort.

### Company (`/admin/company`)

- **Team**: add/edit people, photo upload, reorder.
- **Certifications**: add/edit, document upload, `status` — stays unpublished by default exactly
  like today until validity is confirmed (`AIRTECH_CONTENT_AUDIT.md` §7).
- **Testimonials / reference letters**: add/edit, distinguishing `source_type` (testimonial vs.
  reference letter per the schema note in `AIRTECH_SUPABASE_ARCHITECTURE.md`), document upload to
  the private `reference-documents` bucket for reference letters specifically.

### Site Settings (`/admin/settings`)

- Contact details (phone stays empty until the conflict resolves — the admin should not silently
  let someone paste in the wrong number without seeing the conflict flagged inline, e.g. a warning
  note in the phone field: "Two conflicting numbers exist in source material — confirm with
  management before setting this").
- Social links, footer content, SEO defaults (default `og:image`, meta description template).

### Enquiries (`/admin/enquiries`)

- Read-only inbox view of the `enquiries` table (list + detail), status transitions
  (new/contacted/qualified/closed). This is new relative to the current email-only flow and is low
  effort given the `enquiries` table already exists in the schema.

## Explicitly out of scope for `/admin`

- Homepage section order/layout — code-defined.
- Navigation structure — code-defined unless the decision form says otherwise.
- Design tokens/visual system — code-defined, always.
- Bulk data operations, content versioning/history, multi-role permissions beyond a single admin
  role at launch — all deferred per "do not build an unnecessarily complex CMS" (master brief §29).

## Security requirements (see `AIRTECH_SUPABASE_ARCHITECTURE.md` §5–6 for the underlying RLS/auth)

- All admin routes behind Supabase Auth middleware; no route works without a valid session.
- Server-side validation on every upload (file type, size limit) — never trust client-side
  validation alone, per the master brief §31.
- Service-role key never reaches the browser; all privileged writes go through server
  actions/route handlers.
