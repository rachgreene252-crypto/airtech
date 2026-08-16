# Airtech User Flows

Date: 2026-08-16. Ten flows per the master brief §40, grounded in the actual target-customer list
(`AIRTECH WEBSITE REDESIGN.docx` §3.1) and the existing route set (`AIRTECH_INFORMATION_ARCHITECTURE.md`).
Admin flows (9–10) are written against the *proposed* Supabase-backed `/admin` in
`AIRTECH_CMS_SPEC.md`, since no admin exists yet — flagged accordingly.

### Flow 1 — Developer discovers Airtech

- **Entry:** Search ("MEP contractor Kathmandu"), referral, or direct.
- **Goal:** Assess whether Airtech can be the single engineering partner for a new building.
- **Steps:** Home → skim positioning/hero → Expertise (confirm HVAC + full MEP breadth) → Projects
  (scan for comparable building types/scale) → a project case study (read scope depth) → Contact.
- **Decision points:** Does the hero communicate "engineering partner," not "AC company," within 5
  seconds? Does at least one featured project match this developer's building type?
- **CTA:** "Discuss Your Project."
- **Exit:** Enquiry submitted, or bounce if project proof feels thin — this is why project-page
  richness (per `AIRTECH_CONTENT_AUDIT.md` §2b) matters more than any other single content gap.

### Flow 2 — Consultant/architect looking for technical capability

- **Entry:** Referral from a developer, or direct search for a coordination partner.
- **Goal:** Evaluate technical depth before recommending Airtech to a client.
- **Steps:** Home → Expertise (service-by-service technical detail) → a service detail page
  (e.g. `/expertise/hvac`) → Resources/Engineering Library (currently empty — a real gap for this
  persona specifically) → Projects filtered by relevant system.
  This is exactly the persona the master brief §11 identifies as needing "evidence, not marketing
  fluff" — Resources being empty hits this flow hardest of all ten.
- **Decision points:** Is there enough system-level specificity (VRF vs. chiller, fire alarm
  standards, ELV scope) to trust Airtech technically?
- **CTA:** Download company profile / technical resource, or direct enquiry.
- **Exit:** Bookmark for later project, or enquiry.

### Flow 3 — Visitor exploring a specific industry

- **Entry:** Search ("hospital HVAC Nepal"), or Industries nav.
- **Goal:** "Does Airtech understand my sector?"
- **Steps:** Industries index → industry detail (e.g. Healthcare) → challenge/capability/proof
  sections → filtered project list for that industry → project case study.
- **Decision points:** Does the industry page cite real Airtech projects in that sector, not
  generic industry commentary? (Master brief §19 — must not become a marketing essay.)
- **CTA:** "See related projects" / "Discuss a [industry] project."
- **Exit:** Enquiry, or move to Projects for broader browsing.

### Flow 4 — Visitor browsing projects

- **Entry:** Direct nav to Projects, or "See all projects" from homepage.
- **Goal:** Survey Airtech's range before narrowing to a specific case.
- **Steps:** Projects index → apply filter (industry/service/location) → scan cards → open 2–3 case
  studies → Contact or back to browsing.
- **Decision points:** Do filters actually narrow meaningfully (currently limited by how few
  projects carry location/system tags — see `AIRTECH_SUPABASE_ARCHITECTURE.md` schema additions)?
- **CTA:** Open case study / filter refinement.
- **Exit:** Case study, or enquiry directly from the index.

### Flow 5 — Visitor opening a project case study

- **Entry:** From Flow 4, an industry page, or a direct/shared link.
- **Goal:** Verify Airtech's actual scope and credibility on a specific, comparable project.
- **Steps:** Hero/at-a-glance → role/scope → (where data exists) challenge → engineering approach →
  execution → testing & commissioning → outcome → gallery → related projects/services/industries →
  enquiry CTA.
- **Decision points:** For the 8 "lighter" portfolio projects (name + photo only, no scope), this
  flow currently dead-ends early — the empty-state design already handles this honestly, but it's a
  visibly thinner experience than the 5 fuller case studies. This is exactly where the newly
  ingested reference letters (`AIRTECH_CONTENT_AUDIT.md` §2b) can upgrade several of these once
  publication is approved.
- **CTA:** "Discuss a similar project."
- **Exit:** Enquiry, or explore a related project.

### Flow 6 — Visitor looking for service/AMC

- **Entry:** Existing client or building owner needing post-handover support.
- **Goal:** Confirm Airtech offers ongoing maintenance/AMC and find the fastest contact path.
- **Steps:** Home or direct search → Service & Support → AMC/after-sales detail → Contact (likely
  skips the progressive project-enquiry flow's "what are you building" framing, since this is an
  existing relationship, not a new project).
- **Decision points:** Is there a distinct, faster contact path for service requests vs. new-project
  enquiries? Not currently differentiated in the single enquiry form — worth a
  **CLIENT DECISION REQUIRED** flag for `AIRTECH_INFORMATION_ARCHITECTURE.md`.
- **CTA:** "Request service" (currently the same CTA as new-project enquiry).
- **Exit:** Enquiry, or direct phone/email (blocked by the unresolved phone-number conflict).

### Flow 7 — Visitor downloading technical information

- **Entry:** Consultant/procurement persona (overlaps Flow 2), or a developer needing a company
  profile PDF for a tender submission.
- **Goal:** Get a document without submitting an enquiry first.
- **Steps:** Resources → filter by type/system → download.
- **Decision points:** Currently blocked entirely — zero resources exist (`AIRTECH_CONTENT_AUDIT.md`
  §4). This flow cannot be tested or shipped meaningfully until at least a company profile PDF
  exists.
- **CTA:** Direct download, no form gate (recommended — gating a company profile behind a lead form
  is a common B2B mistake that suppresses top-of-funnel trust-building).
- **Exit:** Return to Projects/Expertise with more context, or enquiry.

### Flow 8 — Visitor submitting a project enquiry

- **Entry:** Any of Flows 1–6's CTA.
- **Goal:** Get a qualified project into Airtech's sales pipeline with minimum friction.
- **Steps:** Intent (HVAC/Full MEP/Electrical/AMC/Other) → project type → location → stage
  (concept/design/tender/construction/existing) → contact details → optional file upload → confirm.
- **Decision points:** Does the form feel proportional to a high-value B2B decision (per the
  `airtech-digital-experience` skill's enquiry-flow spec), not a generic contact form?
- **CTA:** Submit.
- **Exit:** Confirmation state; email routed per `LEAD_WEBHOOK_URL`/`LEAD_NOTIFICATION_EMAIL`
  (currently unconfigured — `docs/OPEN_DECISIONS.md` #7).

### Flow 9 — Admin adding a new project *(proposed `/admin`, not yet built)*

- **Entry:** Authenticated Supabase Auth session, `/admin/projects`.
- **Goal:** Add a new project record without touching code.
- **Steps:** "New project" → fill required fields (name, client, location, industry, services,
  status) → optional fields (challenge/approach/execution/outcome, technical metrics) → upload
  gallery images (→ Supabase Storage `project-images` bucket) → set verification `status` → save as
  draft or publish.
- **Decision points:** Can a non-developer complete this without engineering support? This is the
  explicit design goal per the user's admin-scoping instructions (client-handoff without a
  retainer).
- **CTA:** Publish / Save draft.
- **Exit:** Project appears on `/projects` (if published) with correct related-content links.

### Flow 10 — Admin publishing a resource *(proposed `/admin`, not yet built)*

- **Entry:** Authenticated session, `/admin/resources`.
- **Goal:** Upload a technical document (e.g. company profile PDF) and make it downloadable.
- **Steps:** "New resource" → title, type (guide/case study/datasheet/certificate/company
  profile/insight), associated system/industry tags → upload file (→ Supabase Storage
  `resources` bucket) → publish.
- **Decision points:** File-type/size validation must happen server-side (per the security rules in
  `AIRTECH_SUPABASE_ARCHITECTURE.md`), not just client-side.
- **CTA:** Publish.
- **Exit:** Resource appears on `/resources`, filterable by the tags set at upload.
