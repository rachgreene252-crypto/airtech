# Airtech Page Specifications

Date: 2026-08-16. One entry per page/template, per the brief's 14-attribute format. Cross-references
`AIRTECH_FINAL_EXPERIENCE_SPEC.md` (§ numbers below) rather than repeating its detail. "Data source"
names the Supabase table(s) from `AIRTECH_SUPABASE_ARCHITECTURE.md`; local-content-era equivalents
are the matching `src/content/*.ts` files until the migration in `AIRTECH_IMPLEMENTATION_SEQUENCE.md`
happens.

---

## 1. Homepage (`/`)

- **Purpose:** Establish positioning and drive qualified enquiries in one visit.
- **User / intent:** Any of the target personas, early in evaluation.
- **Primary question:** "What is Airtech, and can they handle my project?"
- **Content:** Per §2's nine-section narrative.
- **Visual experience:** Full visual system (`AIRTECH_DESIGN_SYSTEM.md`) at its most expressive —
  this is the one page allowed the most craft/detail density.
- **Interaction:** Engineering Systems Explorer (§4), featured-project cards.
- **Motion:** Opacity-fade reveals on scroll (existing pattern); Systems Explorer state transitions
  (`AIRTECH_MOTION_SPEC.md` "medium" tier).
- **CTA:** "Discuss Your Project," repeated at bottom; secondary CTAs into Projects/Industries.
- **Data source:** `projects` (featured), `services`, `industries`, `testimonials`
  (reference-proof excerpt if approved), `site_settings` (turnover flag).
- **CMS dependencies:** Featured flag + `display_order` on projects/services/industries.
- **Mobile behaviour:** Systems Explorer becomes tap/accordion (§16); sections stack, no horizontal
  scroll anywhere.
- **Accessibility:** Skip-to-content (existing), heading hierarchy starts at one real `<h1>` in the
  hero, Systems Explorer keyboard/screen-reader parity (§18).
- **Performance:** Hero image is the only `priority` image on the page; turnover chart and Systems
  Explorer both hand-rolled SVG, no charting/3D library (§17).

## 2. Expertise index (`/expertise`)

- **Purpose:** Show the full engineering breadth at a glance.
- **User / intent:** Consultant/architect persona (Flow 2), or a developer confirming full-MEP
  capability.
- **Primary question:** "Does Airtech cover the specific discipline I need?"
- **Content:** 7-service grid, discipline code + short description per card.
- **Visual experience:** Drawing-sheet grid — each card styled like a discipline callout, not a
  generic feature-card grid.
- **Interaction:** Card hover reveals sub-services (desktop); tap-to-expand (mobile).
- **Motion:** Micro-tier hover only (`AIRTECH_MOTION_SPEC.md`).
- **CTA:** Into each service detail page; secondary "Discuss Your Project."
- **Data source:** `services`.
- **CMS dependencies:** `display_order`, `status`.
- **Mobile behaviour:** Single column, tap-to-expand sub-services inline rather than navigating away.
- **Accessibility:** Cards are real links (not click-handlers on divs), sub-service reveal is
  keyboard-operable.
- **Performance:** No images required on this page beyond icons/marks — should be one of the
  lightest pages on the site.

## 3. Individual Expertise/service page (`/expertise/[slug]`)

- **Purpose:** Prove technical depth in one discipline.
- **User / intent:** Consultant verifying capability, or a developer needing this one discipline
  specifically.
- **Primary question:** "How deep does Airtech's [X] capability actually go?"
- **Content:** Capabilities, sub-services, systems, applications, related industries, related
  projects (existing template, no structural change).
- **Visual experience:** Technical/spec-sheet feel — mono-type capability lists, not marketing prose
  paragraphs.
- **Interaction:** None beyond standard link navigation — this page should read fast, not perform.
- **Motion:** Reveal-on-scroll only.
- **CTA:** "Discuss a [service] project."
- **Data source:** `services`, joined `project_services` for related projects.
- **CMS dependencies:** None beyond the base service record.
- **Mobile behaviour:** Linear stack, no change from desktop structure.
- **Accessibility:** Standard semantic structure; no special requirements beyond site-wide baseline.
- **Performance:** Hero image optional (`TechnicalFrame` placeholder-safe pattern already handles
  absence correctly).

## 4. Industries index (`/industries`)

- **Purpose:** Let a visitor self-identify their sector fast.
- **User / intent:** Any persona, sector-first mental model (a hospital administrator thinks "do
  they do hospitals," not "do they do HVAC").
- **Primary question:** "Does Airtech work in my industry?"
- **Content:** 10-industry grid.
- **Visual experience:** Photography-forward (once real photos are approved, §2c of content audit)
  — industries should feel like real buildings, not icons.
- **Interaction:** None beyond navigation.
- **Motion:** Reveal-on-scroll.
- **CTA:** Into each industry detail; secondary "Discuss Your Project."
- **Data source:** `industries`.
- **CMS dependencies:** `display_order`, `status`, hero image per industry.
- **Mobile behaviour:** Single column.
- **Accessibility:** Alt text per industry image describing the sector, not just a filename-derived
  label.
- **Performance:** 10 hero images — lazy-load all but the first two (above-the-fold).

## 5. Individual Industry page (`/industries/[slug]`)

- **Purpose:** Answer "do they understand my sector" with real proof, per §9.
- **User / intent:** Sector decision-maker.
- **Primary question:** "What does Airtech understand about my specific type of project?"
- **Content:** Per §9's fixed pattern — challenges → capability → systems → projects → proof → CTA.
- **Visual experience:** Same technical/editorial system; sector-specific proof points
  (`AIRTECH_CONTENT_AUDIT.md`'s Master Source of Truth §7 sector data) as pull-quotes, not essay
  paragraphs.
- **Interaction:** Related-projects grid, filterable by nothing (small set, no filter needed here).
- **Motion:** Reveal-on-scroll.
- **CTA:** "Discuss a [industry] project."
- **Data source:** `industries`, joined `project_industries`, joined `services` via
  `airtech_capabilities`.
- **CMS dependencies:** None beyond base records — all relations already modeled.
- **Mobile behaviour:** Linear stack.
- **Accessibility:** Standard baseline.
- **Performance:** Same as index — lazy-load below-fold imagery.

## 6. Projects archive (`/projects`)

- **Purpose:** Let a visitor survey and narrow Airtech's project range.
- **User / intent:** Any persona doing due diligence.
- **Primary question:** "Has Airtech done something like my project?"
- **Content:** Filterable grid — per §5's finalized filter set (industry, service, location; year
  and project-type cut at launch).
- **Visual experience:** "The Work" — cinematic index per the user's own framing, large cards, real
  photography where available, honest placeholder where not.
- **Interaction:** Filter bar/sheet with URL-state persistence (existing pattern via query params,
  keep).
- **Motion:** Filter-change transitions are the one place a slightly more expressive motion is
  earned — cards re-flow with a brief, fast (150–200ms) transition, not a full page reload feel.
- **CTA:** Into each case study; "Discuss Your Project" if the visitor filters to zero/few results.
- **Data source:** `projects`, `industries` (for filter labels), `services` (for filter labels).
- **CMS dependencies:** `city`, `featured`, `display_order`, `status`.
- **Mobile behaviour:** Filter sheet (§16), applied-filter chips, single-column card stack.
- **Accessibility:** Filter changes announced via `aria-live` region (§18); filter controls
  keyboard-operable.
- **Performance:** Paginate or virtualize if the project count grows well beyond current volume;
  at ~15–20 projects, a plain grid is fine — do not build pagination infrastructure prematurely.

## 7. Individual Project Case Study (`/projects/[slug]`)

- **Purpose:** Convert interest into a qualified enquiry via concrete proof.
- **User / intent:** A visitor who has already self-selected this project as relevant.
- **Primary question:** "Exactly what did Airtech do here, and can I trust that account?"
- **Content:** Per §5's final section order, including the new Documents section (§6) for reference
  letters where one exists.
- **Visual experience:** The richest single-project template on the site — large hero, at-a-glance
  metadata, narrative sections only where real data exists (existing discipline, keep exactly).
- **Interaction:** Document viewer (§6) if a reference letter exists; gallery lightbox.
- **Motion:** Reveal-on-scroll; document-viewer open/close transition (`AIRTECH_MOTION_SPEC.md`
  "small" tier).
- **CTA:** "Discuss a similar project," related-project cards as secondary navigation.
- **Data source:** `projects`, `testimonials` (reference letter join), `media` (gallery).
- **CMS dependencies:** All of §13/§14's new testimonial/document fields for the ~9 projects with
  letters.
- **Mobile behaviour:** Document viewer becomes full-screen (§16); metadata grid collapses to a
  stacked list.
- **Accessibility:** Document viewer focus-trap + `Escape` + labeled alt text (§18).
- **Performance:** Gallery images lazy-loaded below the fold; hero image is the page's only
  `priority` image.

## 8. Service & Support (`/service-support`)

- **Purpose:** Reassure that Airtech supports the full building lifecycle, not just installation.
- **User / intent:** Existing client or building owner needing AMC/after-sales.
- **Primary question:** "Will Airtech still be there after handover?"
- **Content:** Lifecycle visualization (§10), AMC/after-sales/technical-support detail.
- **Visual experience:** Reuses the homepage delivery-approach component (§10) — same visual
  language, not a page-specific redesign.
- **Interaction:** None beyond the (shared) lifecycle component's existing behaviour.
- **Motion:** Reveal-on-scroll.
- **CTA:** "Request service" — routes into the enquiry flow's Service/AMC branch (§12).
- **Data source:** Mostly static/code-defined content (this page's content isn't project/CMS data
  in the current model) — no new table needed.
- **CMS dependencies:** None beyond `site_settings` for contact routing.
- **Mobile behaviour:** Lifecycle component's existing responsive pattern.
- **Accessibility:** Standard baseline.
- **Performance:** Lightest page on the site — no imagery requirement beyond what's already there.

## 9. Company (`/company`)

- **Purpose:** Establish institutional credibility.
- **User / intent:** Any persona doing final-stage due diligence.
- **Primary question:** "Who is actually behind this company?"
- **Content:** Mission/values (`AIPL PROFILE - 2026.pptx` slides 2, 5 — safe to use verbatim per
  content audit), positioning statement, links into History/Leadership/Quality/Careers.
- **Visual experience:** More editorial/text-forward than Projects/Industries — this page carries
  the company's own voice, per the source material's mission/values statements.
- **Interaction:** None beyond navigation into sub-pages.
- **Motion:** Reveal-on-scroll.
- **CTA:** "Discuss Your Project," secondary links into sub-pages.
- **Data source:** `site_settings` + static mission/values copy.
- **CMS dependencies:** Minimal — this content changes rarely.
- **Mobile behaviour:** Linear stack.
- **Accessibility:** Standard baseline.
- **Performance:** Light page.

## 10. History (`/company/history`)

- **Purpose:** Prove longevity and scale credibly.
- **User / intent:** A visitor weighing Airtech's stability for a long-term relationship (AMC,
  multi-phase project).
- **Primary question:** "How established is this company, really?"
- **Content:** Timeline (§8), full turnover chart (§7) if approved, 25th-anniversary photo (§8) if
  approved.
- **Visual experience:** The turnover chart's full/expressive version lives here (homepage gets the
  compact one).
- **Interaction:** Turnover chart hover/tap (§7).
- **Motion:** Timeline reveal is the one place a slightly more sequenced scroll animation is
  earned (each milestone reveals in order) — still opacity-based, still respects reduced-motion.
- **CTA:** "Discuss Your Project."
- **Data source:** `site_settings` (turnover flag + data), static timeline copy, `media` (anniversary
  photo).
- **CMS dependencies:** `turnover_chart_published` flag (§14).
- **Mobile behaviour:** Timeline becomes a vertical list; chart stays the same component (§16).
- **Accessibility:** Chart accessible-text-equivalent (§18); timeline is a real ordered list in the
  DOM, not purely visual.
- **Performance:** One photo (anniversary), hand-rolled SVG chart — light page.

## 11. Leadership (`/company/leadership`)

- **Purpose:** Put real faces to the company.
- **User / intent:** A visitor wanting to know who they'd actually work with.
- **Primary question:** "Who leads this company?"
- **Content:** Currently MD (Manoj Bhansali) + "Senior Management — Ashok Ji" only
  (`AIRTECH_CONTENT_AUDIT.md` §4) — an honest, small section until more names/bios/photos are
  supplied, per the "kill the padded stock-photo grid" call in §20 of the final spec.
- **Visual experience:** A small, high-quality leadership block, not a grid sized for a team that
  isn't documented yet.
- **Interaction:** None.
- **Motion:** None needed at this size.
- **CTA:** "Discuss Your Project."
- **Data source:** `people`.
- **CMS dependencies:** `display_order`, photo upload.
- **Mobile behaviour:** Single column.
- **Accessibility:** Alt text with name + role, not just "team photo."
- **Performance:** Trivial.

## 12. Quality & Certifications (`/company/quality-certifications`)

- **Purpose:** Third-party-verified credibility.
- **User / intent:** Procurement/compliance-focused persona.
- **Primary question:** "Is this a certified, accountable company?"
- **Content:** Certifications (currently empty/unpublished pending validity confirmation — keep
  that discipline exactly), equipment partners (neutral framing), **Reference Proof library** (§6) —
  this page is the primary home for the full reference-letter set.
- **Visual experience:** Document-forward — certificates and letters as first-class visual content,
  not buried in a sidebar.
- **Interaction:** Document viewer (§6) for each reference letter and (once available) each
  certificate scan.
- **Motion:** Reveal-on-scroll; document-viewer transitions (shared component, §6).
- **CTA:** "Discuss Your Project."
- **Data source:** `certifications`, `partners`, `testimonials` (reference letters).
- **CMS dependencies:** All of §6/§14's redaction/publication-status fields.
- **Mobile behaviour:** Document viewer full-screen (§16).
- **Accessibility:** Same document-viewer requirements as §7/§18.
- **Performance:** Document images lazy-loaded, compressed previews first.

## 13. Careers (`/company/careers`)

- **Purpose:** Minimal — no fabricated job listings (existing discipline, keep).
- **User / intent:** Prospective employee.
- **Primary question:** "Is Airtech hiring, and how do I apply?"
- **Content:** Same as current live page — minimal, honest, no invented openings.
- **Visual experience:** Consistent with the rest of Company.
- **Interaction:** None.
- **Motion:** None needed.
- **CTA:** Contact/apply path (email, once resolved).
- **Data source:** Static content.
- **CMS dependencies:** None at this scope — building a full job-listings CMS module is
  unnecessary complexity for content that doesn't currently exist (kill-list candidate if ever
  proposed).
- **Mobile behaviour:** No change.
- **Accessibility:** Standard baseline.
- **Performance:** Trivial.

## 14. Resources index (`/resources`)

- **Purpose:** Serve the consultant/architect persona directly (§11, Flow 2/7).
- **User / intent:** Technical evaluator wanting evidence without submitting a lead form.
- **Primary question:** "Does Airtech publish anything substantive, or just marketing pages?"
- **Content:** Category grid (Company/Technical/Projects/Certificates/Datasheets/Case
  Studies/Insights), honest empty state where a category has nothing yet (existing discipline,
  keep).
- **Visual experience:** Document-library feel — file-type icons, mono-type metadata (date, type,
  associated system/industry).
- **Interaction:** Filter by category/system/industry once enough content exists to make filtering
  meaningful (not at launch with near-zero content — matches the "don't add filters the data
  doesn't support" rule from §5/§20).
- **Motion:** None needed.
- **CTA:** Download; "Discuss Your Project" as secondary.
- **Data source:** `resources`.
- **CMS dependencies:** `kind`, tags, file upload.
- **Mobile behaviour:** Single column list.
- **Accessibility:** Download links clearly labeled with file type/size.
- **Performance:** No gating/lead-form in front of downloads (per §7 of the flows doc) — direct,
  fast downloads.

## 15. Individual Resource (`/resources/[slug]`)

- **Purpose:** Deliver one specific document/insight.
- **User / intent:** Same as index, now committed to one document.
- **Primary question:** "Is this the document I need?"
- **Content:** Title, summary, metadata, download/read.
- **Visual experience:** Minimal, fast, document-centric.
- **Interaction:** Download or inline read (for `insight`-kind text content).
- **Motion:** None.
- **CTA:** Download; related resources.
- **Data source:** `resources`.
- **CMS dependencies:** None beyond the base record.
- **Mobile behaviour:** No change.
- **Accessibility:** Standard baseline.
- **Performance:** Trivial (template not yet statically generated per prior report — fine to leave
  dynamic given near-zero content volume).

## 16. Contact (`/contact`)

- **Purpose:** Office information + entry point into the enquiry flow.
- **User / intent:** A visitor wanting to reach Airtech directly (phone/email) rather than via the
  form.
- **Primary question:** "How do I actually reach a person?"
- **Content:** Office address, email (phone stays empty pending the conflict — existing pattern,
  keep), map/location reference, entry point into the Project Enquiry flow (§17).
- **Visual experience:** Simple, consistent with Company pages.
- **Interaction:** None beyond the embedded enquiry flow.
- **Motion:** None needed.
- **CTA:** "Discuss Your Project" (opens/scrolls to the enquiry flow).
- **Data source:** `site_settings`.
- **CMS dependencies:** Phone field (conflict-aware, per `AIRTECH_CMS_SPEC.md`).
- **Mobile behaviour:** No change.
- **Accessibility:** Address/contact info in real semantic markup, not an image.
- **Performance:** Trivial, aside from the enquiry form itself (§17).

## 17. Project Enquiry (currently the same route as Contact, `/contact`)

- **Purpose:** Capture a qualified lead with minimum friction.
- **User / intent:** A visitor ready to start a real conversation.
- **Primary question:** implicit — "how do I start this?"
- **Content:** The six-step flow from §12.
- **Visual experience:** Feels proportional to a serious B2B decision — generous spacing, one
  question per step, clear progress indicator (existing pattern, keep).
- **Interaction:** Step navigation, file upload, conditional branching (Service/AMC path, §12).
- **Motion:** Step-transition slide/fade (`AIRTECH_MOTION_SPEC.md` "small" tier) — must not block
  input while animating.
- **CTA:** "Submit" on the final step; confirmation state after.
- **Data source:** Writes to `enquiries`.
- **CMS dependencies:** None to fill in — this is a write path, read by the admin's Enquiries inbox
  (`AIRTECH_CMS_SPEC.md`).
- **Mobile behaviour:** Full-width steps, large tap targets, file upload uses native mobile picker.
- **Accessibility:** Each step is a properly labeled fieldset; errors announced via `role="alert"`
  (existing pattern, keep); progress indicator has a text equivalent, not just a visual bar.
- **Performance:** No heavy dependencies — this must load fast and never block on anything
  non-essential to submitting.

**CLIENT DECISION REQUIRED:** whether Project Enquiry should get its own URL (`/project-enquiry` or
similar) separate from general Contact, given how much weight this flow carries — not addressed in
any source document. Recommendation: keep them on one route (`/contact`) with the form as the
page's primary content, since splitting them adds a navigation step between "I'm ready" and
starting the form, with no clear benefit.

## 18. Search

**Not built, and not recommended at current content volume.** ~15–20 projects, 7 services, 10
industries, near-zero resources — a dedicated search feature has no meaningful corpus to search yet
and would be pure surface area for the "unnecessary complexity" the brief explicitly warns against
(§20 kill-list candidate). Revisit once Resources has real volume (dozens of documents) — at that
point a simple client-side filter (already the pattern used everywhere else on this site) is likely
sufficient; a full search index/service is unlikely to ever be justified at this site's scale.

## 19. 404 (`/not-found`, existing)

- **Purpose:** Recover a lost visitor without losing them.
- **User / intent:** Arrived via a broken/old link.
- **Primary question:** "Where am I, and where do I go now?"
- **Content:** Clear "page not found," links to Home/Projects/Contact — existing implementation,
  no structural change needed.
- **Visual experience:** On-brand, not a generic framework-default error page (already the case).
- **Interaction:** None.
- **Motion:** None needed.
- **CTA:** Back to Home / Projects.
- **Data source:** None (static).
- **CMS dependencies:** None.
- **Mobile behaviour:** No change.
- **Accessibility:** Proper heading, real links (not just a "go back" JS handler).
- **Performance:** Trivial.

## 20. Legal pages

**Not currently built; not addressed in any source document.** No privacy policy, terms, or cookie
notice exists in `source-material/`, and none is referenced as required. Given the enquiry form
collects PII (name, email, phone, project details, optional file upload), a privacy policy is a
reasonable minimum even without an explicit source instruction — flagged as
**CLIENT DECISION REQUIRED / LEGAL INPUT REQUIRED** rather than drafted here, since legal-policy
text is exactly the kind of content that should not be authored by inference (matches the master
brief's own "no invented ... legal, regulatory or compliance" caution, `AIRTECH WEBSITE
REDESIGN.docx` §18.4).
