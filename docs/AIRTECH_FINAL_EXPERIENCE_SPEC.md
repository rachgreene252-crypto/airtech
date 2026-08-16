# Airtech Final Experience Spec

Date: 2026-08-16. This is the master product/design specification. It assumes
`docs/AIRTECH_CONTENT_AUDIT.md`, `docs/AIRTECH_INFORMATION_ARCHITECTURE.md`,
`docs/AIRTECH_SUPABASE_ARCHITECTURE.md`, `docs/AIRTECH_CMS_SPEC.md`, and
`.claude/skills/airtech-digital-experience/SKILL.md` as prerequisite reading and does not repeat
their sourcing detail — it resolves them into final decisions. Per-page detail lives in
`docs/AIRTECH_PAGE_SPECIFICATIONS.md`; components in `docs/AIRTECH_COMPONENT_INVENTORY.md`; motion
in `docs/AIRTECH_MOTION_SPEC.md`; build order in `docs/AIRTECH_IMPLEMENTATION_SEQUENCE.md`. No
application code, migrations, or Supabase connection touched in producing this.

## 0. Conflict found before starting

The instruction to re-read `docs/AIRTECH_CREATIVE_EXPERIENCE_CRITIQUE.md` and
`docs/AIRTECH_EXPERIENCE_BLUEPRINT.md` refers to two files that **do not exist** in `docs/` — this
session did not create them and no prior session did either (confirmed via directory listing).
This is the same pattern as earlier in this project (source documents referenced as if present that
weren't) — reported per the standing rule, not fabricated. Everything below is built from the nine
documents that do exist plus the full source-material ingestion, which is sufficient to proceed.

## 1. Objective & standard

Every decision below is tested against one question, per the user's instruction: **would this make
a serious Airtech client trust the company more?** Not "is this impressive," not "is this possible
with Framer Motion." If a proposed interaction doesn't pass that test, it's cut — see §20.

## 2. Homepage — final narrative

Resolves `AIRTECH_INFORMATION_ARCHITECTURE.md`'s "CLIENT DECISION REQUIRED" homepage ordering with
a specific recommendation, to be confirmed rather than left open once the decision form lands:

| Order | Section | Answers | Real material used |
|---|---|---|---|
| 1 | Hero | What is Airtech? | Positioning statement (`AIRTECH WEBSITE REDESIGN.docx` §20.6, verbatim-sourced), est. 2000, 25+ years |
| 2 | Capability strip | What can Airtech engineer? | Service taxonomy (existing `src/content/services.ts`) |
| 3 | Engineering Systems Explorer (§4) | What can Airtech engineer? (deep) | Same taxonomy, interactive |
| 4 | Industries showcase | Where does Airtech operate? | 10-industry set, sector proof points |
| 5 | Featured work ("The Work") | What has Airtech actually built? | Featured projects, prioritizing the 9 reference-letter-backed projects once approved (§6) |
| 6 | Delivery approach / lifecycle | How does Airtech execute? | Engineering → procurement → installation → testing → commissioning → support |
| 7 | Why Airtech / credibility | Why should I trust Airtech? | 25+ years, verified stats only, turnover chart if approved (§7), 25th-anniversary photo if approved |
| 8 | Partners strip | (supporting proof, not a standalone answer) | Equipment partners, neutral framing |
| 9 | Final CTA | How do I start? | "Discuss Your Project" |

This is close to what's live today (`Hero → TrustBar → Capabilities → FeaturedProjects →
IndustriesShowcase → DeliveryApproach → PartnersStrip → FinalCTA`) with two changes: the Engineering
Systems Explorer is new (§4), and Industries moves ahead of Featured Projects to match the
"capability → relevance → proof" sequence the master brief's core principle (§04) actually implies —
proof only lands once the visitor already knows Airtech understands their sector.

**Do not force every source asset onto the homepage.** Explicitly excluded from the homepage: the
full client-logo wall (belongs on `/company` or a dedicated trust page — a homepage logo soup is
exactly the "generic corporate" pattern the brief warns against), the full 25th-anniversary story
(belongs on `/company/history` — the homepage gets one photo and a stat, not the narrative), the
Engineering Library (belongs on `/resources` — it's a destination for a specific persona, not a
homepage section).

## 3. Navigation — final

No structural change from `AIRTECH_INFORMATION_ARCHITECTURE.md`'s proposal. Confirmed decisions:

- **No mega-menu.** Expertise and Industries get simple dropdowns (7 and 10 items respectively —
  both fit a single-column dropdown without needing a mega-menu grid). Company gets a simple
  dropdown (5 items). Projects, Service & Support, Resources are flat links.
- **"Discuss Your Project" is a persistent, visually distinct CTA** — not a plain nav item. Desktop:
  a filled button at the right end of the header, always visible (not hidden behind scroll). Mobile:
  repeated as a fixed bottom-of-viewport bar on Projects, Industries, and Service & Support pages
  specifically (the pages where enquiry intent peaks), not globally — a persistent mobile CTA bar on
  every page (including e.g. `/company/careers`) would be noise, not conversion support.
- **Projects gets nav prominence beyond a single link**: the header's Projects link should read
  "Projects" but the dropdown-free flat link is intentional — Projects is a destination in itself
  (its own filter/search UI), not a list to preview in a dropdown.
- Footer nav: no structural change to `footerNav` in `src/lib/navigation.ts`.

## 4. Engineering Systems Explorer

This is the interaction designed to fix the single biggest positioning problem in the source
material: *"the biggest misconception people have about Airtech [is] that Airtech is primarily an
air-conditioning company"* (`AIRTECH WEBSITE REDESIGN.docx` §20.2).

**Concept:** an architectural building cross-section (not a cartoon, not a literal 3D model) with
labeled system zones — HVAC, Electrical, Plumbing, Fire Protection, ELV/Security, Water Systems —
rendered in the same technical/drafting visual language as the rest of the site (line-drawing
style, mono-type annotations, blueprint-navy on drafting-paper). Hovering/tapping a zone reveals
that discipline's real capability list (from `src/content/services.ts`) as an annotated overlay,
styled like a coordination-drawing callout.

**What it must do:** teach, in under 10 seconds, that these systems are coordinated by one team —
the visual should show the zones as *interconnected* (shared risers, shared plant rooms), not as
six separate icons in a grid, which would just be a services list with extra steps.

**What it must not do:** become a literal architectural rendering tool, support free rotation/zoom,
or require more than one interaction (hover/tap) to reveal content. If it needs a tutorial, it has
failed.

**Desktop:** hover-driven, all six zones visible simultaneously, overlay panel slides in from the
side. **Mobile:** tap-driven, one zone expands in place (accordion-like), others collapse — see
`AIRTECH_PAGE_SPECIFICATIONS.md` and §7 responsive rules below.

**Data source:** `services` table (existing taxonomy, no new fields needed). **CMS dependency:**
none beyond what Services already needs — this is a presentation layer over existing data, not new
content.

## 5. Project system — final

### Archive (`/projects`)

Filters, **only where source data actually supports them** (per `AIRTECH_CONTENT_AUDIT.md` and the
brief's own "only implement filters that have a meaningful content/data basis" instruction):

- **Industry** — full data coverage, keep.
- **Service/system** — full data coverage, keep.
- **Location** — now supportable (`city` field, `AIRTECH_SUPABASE_ARCHITECTURE.md`) for most
  projects; keep, but do not present as a map/geo interaction — a simple dropdown filter is
  proportional to ~15–20 projects. A map is over-engineering for this data volume.
- **Year** — **cut.** Fewer than half of current projects have a confirmed completion year; a filter
  that's mostly empty erodes trust rather than building it. Revisit once more years are confirmed.
- **Project type** — **cut at launch**, same reasoning; the industry filter already does most of
  this job (hospital vs. hotel vs. corporate largely tracks industry).
- **Featured** — not a user-facing filter; used for homepage/section curation only.

### Card

Per the brief's spec — project, client, location, industry, Airtech scope (one line), year (only
if known), systems (as small tags, reusing the existing `Tag` component). Do not show a field the
project doesn't have data for — this is already the codebase's existing discipline
(`docs/FINAL_IMPLEMENTATION_REPORT.md`'s `status`-gated rendering) and should extend to card-level
fields, not just page-level sections.

### Case study — final section order

```
Hero → At a glance (MetadataGrid, existing) → Airtech role → Challenge → Engineering approach →
Execution → Testing & commissioning → Outcome → Media/gallery → Documents (§6) →
Related services → Related industries → Related projects → Enquiry CTA
```

This matches the existing `ProjectDetailPage` implementation almost exactly — it already renders
`storySections` conditionally (only sections with real content render), which is precisely the "do
not manufacture a case study" rule already built correctly. The only additions: a **Documents**
section (new — for reference letters/technical docs, §6) and an explicit **Related industries**
block (currently the code shows related services and related projects but not a dedicated related-
industries block — small gap, easy add).

## 6. Reference letter experience

Not "Testimonials." A distinct content type and a distinct visual treatment, per the brief's
explicit instruction. Structure:

```
REFERENCE PROOF
  Client name + logo (if approved)
  Project (links to the case study, if one exists)
  Letter date
  One-line confirmed scope (pulled from the transcription in AIRTECH_CONTENT_AUDIT.md §2b)
  → "View reference letter" → document viewer
```

**Document viewer:** a simple, in-page lightbox/modal rendering the letter image (or a redacted
version — see below) at readable size, with a caption stating issuer and date. Not a full PDF
viewer library — these are single-page scanned images; a lightweight image viewer is proportional,
a PDF.js integration is not.

**Redaction support (CMS-level, per the brief's §08 instruction):** the `testimonials` table (see
§14) needs both an `original_document_media_id` and an optional `redacted_document_media_id`. The
admin sets `publication_status` (`unpublished` / `published_full` / `published_redacted`) per
letter — this is a real, non-trivial CMS requirement, not a nice-to-have, because several of these
letters carry exact contract values that Airtech may want to confirm in principle but redact in
practice.

**Placement:** a dedicated "Reference Proof" section on `/company/quality-certifications` (sits
naturally alongside certifications — both are "third parties vouching for Airtech") **and**
individually on the specific project case studies they document (Soaltee, Grande International
Hospital, Tiger Palace, etc. — §5's new Documents section). Not a homepage section on its own — one
letter excerpt can appear in the homepage's credibility section (§2, row 7) as a single pull-quote
if approved, but the full reference-proof library belongs on Company.

## 7. Turnover experience

"25 years of building capability," per the brief's own framing — not a finance dashboard. A single
restrained line chart: seven points (FY2019/20–2025/26), mono-type year labels, burnt-copper accent
on the current year only, hover/tap reveals the exact NPR figure (`AIRTECH_CONTENT_AUDIT.md` §2a —
use the real numbers unmodified, never smoothed/rounded for "cleaner" visual effect). No axis
gridlines, no currency-dashboard chrome — treat it as a technical drawing annotation, consistent
with the rest of the visual system (§16).

**Placement:** homepage credibility section (§2, row 7) as a compact version, full version on
`/company/history`. **Publication:** built as a real component against real data, gated behind
`site_settings.turnover_chart_published` (a boolean flag, simplest possible gate — do not build a
generic "is this section visible" CMS system for one chart).

## 8. Company / History / 25th anniversary

```
2000 — FOUNDATION (client-confirmed)
2013 — MEP OPERATIONS COMMENCE (client-confirmed)
2025 — 25TH ANNIVERSARY (photo-confirmed via the celebration event; consistent with 2000+25)
TODAY — established engineering & integrated MEP partner
```

Do not invent intermediate milestones (no landmark-project years plotted on this timeline unless a
project's `completion_year` is independently confirmed — plotting an unconfirmed year on a
company-history timeline would visually assert a fact that isn't verified). The 25th-anniversary
team photograph (`AIRTECH_CONTENT_AUDIT.md` §2c) anchors the "2025" milestone once approved; no
anniversary narrative copy exists to write yet beyond that.

## 9. Industries — pattern (applies to all 10)

```
Industry challenges → Airtech capability (mapped services) → relevant systems →
relevant projects (real, filtered) → engineering proof (a reference letter or project outcome,
where one exists for this industry) → enquiry CTA
```

No industry page should read as generic sector marketing copy — every "capability" claim on an
industry page must resolve to an actual service or project, enforced by always rendering the
related-projects/related-services blocks from real relations, never static prose repeating what
the services page already says.

## 10. Service & Support

Visualize the lifecycle (`Engineering → Procurement → Installation → Testing → Commissioning →
Service → AMC`) as a horizontal progression component reused from the homepage's delivery-approach
section (§2, row 6) — same component, not a redesign, so the visual language stays one system
rather than accumulating page-specific one-offs. The explicit point to land: Airtech does not
"install and disappear" — Service & AMC is the seventh step of the same process, not a separate
business line bolted on.

## 11. Resources — Engineering Library

Categories per the brief: Company, Technical, Projects, Certificates, Datasheets, Case Studies,
Insights. Build the taxonomy and empty-state UI now; **do not populate any category with fake
content** (already the existing discipline — `docs/FINAL_IMPLEMENTATION_REPORT.md` §6 already
renders an honest empty state here). Highest-value real content to seek first, per
`AIRTECH_USER_FLOWS.md` Flow 7: a company profile PDF — lowest effort, serves the widest range of
personas (developer needing it for a tender pack, consultant wanting a leave-behind document).

## 12. Enquiry — final flow

```
Step 1 — Intent: HVAC / Full MEP / Electrical / Fire / ELV / Service-AMC / Other
Step 2 — Project type
Step 3 — Location
Step 4 — Project stage: Concept / Design / Tender / Construction / Existing
Step 5 — Project details + optional file upload (drawings/BOQ)
Step 6 — Contact details
```

Six steps, matching the brief exactly — one more than the existing 5-step form
(`src/components/forms/EnquiryForm.tsx`), splitting "project details" and "contact" into separate
steps rather than combining them, since contact details are the highest-friction step and should be
last, not buried mid-form. Each step must show progress (existing pattern — keep) and allow back
navigation without data loss (existing pattern — keep). Total fields stay in the "short enough to
complete" zone the brief asks for — six short steps, not six long forms.

**Service/AMC branch:** selecting "Service/AMC" in Step 1 should shorten the remaining flow (skip
"project stage," which doesn't apply to an existing installation) — this resolves the open question
flagged in `AIRTECH_OPEN_DECISIONS.md` #21 with a specific design answer: same form, conditional
branching, not a separate contact path.

## 13. CMS translation summary

No change to the section-by-section spec in `AIRTECH_CMS_SPEC.md`. Two additions surfaced by this
pass:

- **Testimonials/reference-letters admin** needs the `publication_status` +
  `original_document_media_id` + `redacted_document_media_id` fields from §6 above — update
  `AIRTECH_CMS_SPEC.md`'s Testimonials section accordingly when implementation starts.
- **Site Settings** needs the `turnover_chart_published` boolean from §7.

Confirmed still true: homepage layout, navigation structure, and the visual/design system all stay
code-defined — nothing above changes that boundary.

## 14. Supabase schema review

Reviewing `AIRTECH_SUPABASE_ARCHITECTURE.md` against this pass's finalized experience:

**Missing, add:**
- `testimonials.publication_status` enum(`unpublished`,`published_full`,`published_redacted`),
  `testimonials.original_document_media_id`, `testimonials.redacted_document_media_id` (§6).
- `site_settings.turnover_chart_published` boolean (§7).
- `projects.year_confirmed` boolean — needed because the Year filter is cut at launch (§5) *due to*
  low confirmation coverage; this flag is what lets the admin/UI know when that filter becomes
  viable later without a schema change.

**Unnecessary, do not build (confirms existing "do not over-engineer" calls):**
- No `navigation` table — reconfirmed, code-defined.
- No generic "homepage sections" CMS table — reconfirmed, code-defined; the two exceptions (§7's
  turnover flag, §11's resource categories) are narrow booleans/enums, not a page-builder.
- No map/geo columns on `projects` (no lat/long) — the location filter (§5) is a plain
  dropdown on `city`, not a map; do not add geo data that has no consuming feature.

**Confirmed correct, no change:**
- The `status` verification enum, junction-table approach, and `reference-documents` private bucket
  from the original schema all hold up under this pass.
- Indexes proposed (industry_slug, city, featured, status) remain correct — city's proposed index
  is now clearly justified by §5 rather than speculative.

## 15. Visual system

No new tokens. Confirms `AIRTECH_DESIGN_SYSTEM.md`'s existing palette/type/motif and extends it to
new surfaces introduced this pass:

- **Data visualization** (turnover chart): mono type for labels, single blueprint-navy line, single
  burnt-copper accent point — no gridlines, no legend chrome (a 7-point single-series chart never
  needs a legend).
- **Document viewer**: dark scrim overlay (matching `--color-ink`), image centered with the same
  crop-frame device (`TechnicalFrame`) used everywhere else — the reference letters should feel like
  part of the same drafting-sheet visual system, not a bolted-on lightbox library's default styling.
- **Systems explorer overlay panels**: reuse `MetadataGrid`/mono-label patterns already established
  on project pages — the explorer should look like it belongs to the same component family as
  everything else, not a standalone "interactive feature" visually disconnected from the rest of
  the site.

## 16. Responsive system

| Interaction | Desktop | Mobile |
|---|---|---|
| Engineering Systems Explorer | Hover-driven, all zones visible, side-sliding overlay | Tap-driven, one zone expands in place, others collapse (accordion) |
| Project filters | Inline filter bar | Filter sheet (bottom sheet pattern), applied filters shown as removable chips above the grid |
| Turnover chart | Full 7-point line, hover tooltip | Same chart, tap-to-reveal instead of hover, slightly larger tap targets on points |
| Document viewer | Centered modal, click-outside to close | Full-screen takeover (a small modal on a phone screen for a document image is unreadable) |
| Sticky "Discuss Your Project" CTA | Header button, always present | Fixed bottom bar, only on Projects/Industries/Service & Support (§3) |
| Header nav | Dropdowns | Full-screen portal nav (existing pattern, keep) |

## 17. Performance

| Feature | Cost | Mitigation |
|---|---|---|
| Real project/team photography (now available, §2c of content audit) | Largest single LCP risk | AVIF/WebP via `next/image` (already the pipeline), correct `sizes`, hero images only `priority` |
| Engineering Systems Explorer | JS + SVG/illustration weight | Build as static SVG with CSS/JS-driven state, not a canvas/WebGL library — this interaction does not need a rendering engine |
| Turnover chart | Small JS charting cost | A hand-rolled SVG line (7 points) needs no charting library at all — do not add Recharts/Chart.js for one 7-point line |
| Document viewer | Image weight for scanned letters | Lazy-load, only fetch on open, serve a compressed preview + full-res on demand |
| Framer Motion | Already in use | No change — keep to opacity-fade + the explorer's state transitions, per the existing "no transform-driven scroll reveal" fix already made (`docs/FINAL_IMPLEMENTATION_REPORT.md` §13) |

Target stays >90 Lighthouse Performance on a real (CDN) deploy — the current 75 reading was taken
locally and is not the number to optimize against blindly (`docs/FINAL_IMPLEMENTATION_REPORT.md`
§14 item 1).

## 18. Accessibility

- Engineering Systems Explorer: every zone must be reachable and operable via keyboard (Tab +
  Enter/Space to expand), with the overlay content also available as plain, always-present text for
  screen readers (e.g. a visually-hidden but DOM-present list of capabilities per zone) — the
  interaction is a progressive enhancement over real content, not a replacement for it.
- Turnover chart: each data point needs an accessible text equivalent (a visually-hidden table or
  `aria-label` per point) — a chart that only communicates through hover is not accessible.
- Document viewer: proper modal focus-trapping, `Escape` to close, labeled close button, alt text
  describing the letter (issuer + date), not just "reference letter image."
- Project filters: filter controls need proper `<label>` association and announce result-count
  changes (`aria-live`) so a screen-reader user knows filtering did something.
- Everything above must remain fully usable with `prefers-reduced-motion` and with JavaScript
  animation disabled — this is the existing site-wide rule, extended to every new component in this
  spec, not relaxed for any of them.

## 19. Implementation order

See `docs/AIRTECH_IMPLEMENTATION_SEQUENCE.md` — it reconciles this pass's UX-priority ordering
(§22 of the brief) against `docs/AIRTECH_IMPLEMENTATION_PLAN.md`'s infrastructure-dependency
ordering (Supabase must exist before the CMS can be wired). They are not actually in conflict once
separated: the frontend experience can be built and visually validated against the existing local
`src/content/` layer in the brief's requested priority order, with the Supabase/CMS migration
threaded in afterward without blocking or re-doing that frontend work.

## 20. Ruthless review

### What I would kill

- **The homepage `PartnersStrip` as a standalone top-level section** (currently live) — two OEM
  partners (Mitsubishi, Midea) don't earn a full section; fold into the credibility section (§2 row
  7) as a small inline row, matching the "trust signal, not identity" rule already established.
- **A generic "Testimonials" label/pattern anywhere** — superseded entirely by §6's Reference Proof
  treatment; do not ship both a generic testimonials list and the reference-letter system as
  separate things.
- **Project Year and Project Type as launch filters** (§5) — more filter controls than the data
  supports is worse than fewer, better ones; a filter that returns "0 results" or barely narrows
  anything reads as broken, not thorough.
- **Any map/geo treatment for project locations** — the data volume (~15–20 projects, all in Nepal,
  mostly Kathmandu) doesn't justify a map interaction; a dropdown does the same job with a fraction
  of the engineering cost.
- **A generic stock "our team" grid** if real team photos/names beyond the MD and one senior manager
  never materialize — an honest, small leadership section beats a padded grid of unnamed stock
  headshots, which would violate the site's own credibility premise.

### What I would double down on

1. **The nine reference letters** (§6) — this is the strongest, most unusual piece of proof material
   in the entire source set; no competitor's Nepal MEP website is likely to have this.
2. **The Engineering Systems Explorer** (§4) — directly fixes the single most explicitly stated
   misconception about the company, in an interaction native to engineering communication
   (coordination drawings), not a borrowed SaaS pattern.
3. **Real project photography now available** (§2c of the content audit) — replacing placeholders
   is the highest-leverage, lowest-risk visual upgrade available.
4. **The turnover data as an editorial story** (§7) — seven years of real, verifiable growth is a
   scale proof point most competitors can't produce at all.
5. **The 25th-anniversary photograph** — a genuine, large, well-composed team photo is a credibility
   asset most B2B engineering firms in this market don't have.
6. **The case-study depth already unlocked for ~9 projects** — the content-truth discipline that
   looked like a constraint two sessions ago (`status`-gated rendering, empty states instead of
   fabrication) is now paying off: those same rigorous fields have real data to fill.
7. **The positioning statement itself** — "established engineering and integrated MEP partner with
   deep HVAC expertise" is a strong, source-confirmed line; it should appear close to verbatim in
   the hero, not be paraphrased into something vaguer.

### What will make this website memorable

1. A visitor understanding, within 10 seconds of scrolling, that Airtech coordinates six building
   systems as one team — via the Systems Explorer, not a bullet list.
2. Opening a project case study and finding a real signed letter from Nepal Cancer Hospital or the
   British Embassy confirming exact scope — proof no competitor site in this market is likely to
   show.
3. A turnover line that quietly climbs across 25 years, treated as an engineering-drawing artifact,
   not a finance slide.
4. Real photography of real, recognizable Kathmandu buildings (Radisson, Soaltee, Tiger Palace)
   replacing every remaining placeholder.
5. A genuine, large photograph of the actual Airtech team at their 25th-anniversary event —
   humanizing a company the brief explicitly wants to feel "established," without resorting to stock
   imagery.
6. An enquiry flow that feels proportional to a serious project decision — six focused steps, not a
   wall of fields, ending in a confirmation that feels like it reached a real engineering team.
7. Every claim on the site being true, sourced, and quietly confident — the absence of "largest,"
   "No. 1," or "pioneer" language, replaced entirely by documents that don't need adjectives.
