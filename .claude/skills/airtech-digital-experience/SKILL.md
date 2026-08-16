---
name: airtech-digital-experience
description: Airtech Industries creative director, UX strategist, and content-truth/QA system. Load before any frontend design, copywriting, page-structure, animation, or project-content work on the Airtech website — establishes the visual/interaction philosophy, the experience architecture, what content is safe to publish, and the QA loop every implementation cycle must run.
---

# Airtech Digital Experience

This skill is the standing creative brief for the Airtech Industries website. It exists so
"make it premium" never has to be said twice. Load it for any task that touches page structure,
copy, visual design, animation, project/content data, or the CMS/Supabase content model.

It does not replace `AGENTS.md` (Next.js version behavior) or the project-memory records —
read those too. This file is about *what the site should be and say*, not framework mechanics.

## 1. Positioning (non-negotiable)

Airtech is an **established engineering and integrated MEP partner with deep HVAC expertise** —
not an air-conditioning company that also does MEP. Every section of the site should make
projects and technical capability the proof, not corporate adjectives. See the full rationale
in `docs/IMPLEMENTATION_AUDIT.md` and `docs/OPEN_DECISIONS.md` — those documents' verification
statuses are binding on this skill, not the other way around.

## 2. Visual philosophy

Airtech should read as: **serious engineering company, premium B2B, architectural, technical,
editorial, restrained, evidence-led, modern, Nepalese engineering identity without clichés.**

Reference points: the information clarity of Stripe, the technical storytelling of Apple, the
project presentation of AECOM/Arup, the conversion discipline of Linear/Notion — translated into
Airtech's own material (drawings, systems, commissioning, buildings), never copied wholesale.

**Never:**
- generic construction-company aesthetics
- residential AC dealer / appliance retailer aesthetics
- SaaS-dashboard aesthetics (this is not a product website)
- glassmorphism, purple/generic-corporate-blue gradients, 3D blobs, AI-slop visual tropes
- stock photography of construction workers
- massive rounded cards with drop shadows as the default component language
- animation or interaction that exists because it's possible, not because it explains something

The existing design system (blueprint navy, drafting-paper off-white, burnt-copper signal color,
Oswald + IBM Plex Sans/Mono, crop-mark "technical drawing" motif — see
`docs/FINAL_IMPLEMENTATION_REPORT.md` §4) is the correct direction and should be extended, not
replaced, unless a specific piece of it is failing on its own terms (e.g. contrast, performance).

## 3. Interaction philosophy

Motion explains a system. It does not decorate a page.

The only motion vocabulary that's earned its place: transitions that walk the visitor through
**systems → engineering → projects → proof** (an interactive building-systems diagram, a
scroll-driven project lifecycle, filter/sort transitions in the project database). Hover states,
focus states, and opacity-fade reveals are fine anywhere. Parallax, scroll-jacking, and
decorative entrance animation on every section are not.

This is not a stylistic preference — it is a direct match to the client's own stated restriction
against excessive/flashy animation (per the discovery questionnaire) and to the Master Source of
Truth's animation guidance. Treat "the client doesn't want flashy" and "make this sophisticated"
as the same instruction, not as being in tension. The bar is **"holy shit, this is sophisticated,"**
not **"holy shit, there are a lot of animations."**

Always respect `prefers-reduced-motion`.

## 4. Experience architecture

This is the intended shape of the site — sequenced, not a flat list of sections. Treat each
numbered section below as a design target, and check its **status** before building it: content
that depends on data not yet present in `source-material/` must not be built with placeholder or
invented numbers. Build the section shell/behavior if useful, but gate the real content behind
verification exactly like the existing `status` field system in `src/content/types.ts` and
`src/sanity/schemaTypes/shared.ts`.

| # | Section | Core idea | Data status |
|---|---|---|---|
| 1 | Opening | "Engineering what keeps Nepal moving." → HVAC / MEP / Engineering / Execution / Support → EST. 2000, 25+ years, integrated MEP, Nepal. Visitor understands the company in 5 seconds. | ✅ buildable — EST. 2000 / 25+ years is `client_confirmed` |
| 2 | "What does Airtech actually do?" | Interactive building-systems diagram (HVAC / Electrical / Plumbing / Fire Protection / ELV branching into real sub-systems). A real technical diagram, not a cartoon. Directly corrects the "Airtech = AC company" misconception. | ✅ buildable from existing service taxonomy (`src/content/services.ts`) |
| 3 | Project lifecycle | Engineering → Procurement → Installation → Testing → Commissioning → Support, scroll-driven, drawings-to-finished-building visual progression. | ✅ buildable — matches questionnaire's request to explain how Airtech operates |
| 4 | Projects as hero ("The Work") | Cinematic project index, not a card grid. | ✅ buildable with the 13 projects already in `src/content/projects.ts` |
| 5 | Filterable project database | Filter by Industry / System / Location, not just Industry. | ✅ buildable — location field needs confirming it exists per-project; extend schema if not |
| 6 | Rich project case-study template | Role, systems, challenge, engineering approach, execution, testing & commissioning, outcome, technical documents, related projects. | ✅ template already exists (`src/app/(site)/projects/[slug]/page.tsx`); populate only where source data supports each field |
| 7 | Engineering Library | Technical guides / case studies / datasheets / certificates / company profile / downloads / insights, filterable by system/industry/document type — aimed at consultants and architects. | ⚠️ mostly unsourced — `src/content/resources.ts` is currently empty; do not fabricate documents |
| 8 | Turnover visualization | Interactive line chart of yearly turnover (NPR millions). | ✅ **NOW SOURCED** (2026-08-16) — exact FY2019/20–FY2025/26 figures confirmed in `AIPL PROFILE - 2026.pptx` slide 6's embedded chart data. See `docs/AIRTECH_CONTENT_AUDIT.md` §2a. Still gated: source-supported / publication approval required — build the component, do not ship real numbers live until management confirms. |
| 9 | Industry experiences | Selecting an industry reveals its spaces, HVAC/system requirements, and relevant Airtech projects. | ✅ buildable from `src/content/industries.ts` + project↔industry relations |
| 10 | "Why Airtech?" | Years / established / team size stat blocks + Engineering/Execution/Commissioning/Support pillars. | ⚠️ team size ("300+") and any headcount figures are `needs_verification` per `docs/OPEN_DECISIONS.md` #3 — render as visibly unverified/locked in the CMS, never as a live number, until Airtech supplies it |
| 11 | Client wall | Categorized, searchable client logos (Hospitality / Healthcare / Banking / Pharma / Telecom / Industrial / Institutional), not a logo-soup grid. | ⚠️ gated by `docs/OPEN_DECISIONS.md` #5 — per-logo publication permission, and Huawei is explicitly excluded per the newer client questionnaire |
| 12 | 25th-anniversary section | Timeline (2000 → 2013 → 2025 → 2026) + real team/celebration photography. | ⚠️ **Partially sourced** (2026-08-16) — `AIPL PROFILE - 2026.pptx` slides 22–23 have a real, high-quality team-celebration photograph (event branded "AIRTECH RELIABILITY MATTERS," visually consistent with a 2025 25th anniversary). The photo is buildable now, pending the same photo-publication gate as everything else. Milestone timeline text/dates beyond est. 2000 and the 2013 MEP launch are still not sourced anywhere — do not invent intermediate milestones. See `docs/AIRTECH_CONTENT_AUDIT.md` §2c. |
| 13 | Service & Support lifecycle | Design → Procurement → Installation → Commissioning → After-sales → AMC, reinforcing the post-handover relationship. | ✅ buildable — matches existing `/service-support` page, can be upgraded to the lifecycle visual |
| 14 | Project enquiry flow | Progressive: what are you building → project type → location → stage → contact details → optional document upload. | ✅ mostly exists (`src/components/forms/EnquiryForm.tsx`, 5-step) — extend fields per this spec rather than rebuild |

**The extended marquee project list is now sourced** (2026-08-16, corrects the note below from
this skill's first version). `AIPL PROFILE - 2026.pptx` slides 8–11 name all of it directly, with
locations: Laxmi Motors KD Plant, CAAN Office Building, Tiger Palace Resort, Chandragiri Hills
Resort, Hyatt Centric, Holiday Inn Express, Skyline Mall, Parliament Building (explicitly marked
**"Ongoing"** — never present as a completed case study), Hotel Hilton Naxal — plus Dusit
Princess, Yak & Yeti, HGI Corporate Office. Several of these (Tiger Palace Resort in particular)
now also have a full signed reference letter with real scope and value — see
`docs/AIRTECH_CONTENT_AUDIT.md` §2b–2d for the complete, sourced breakdown and publication-gate
status before adding any of them to `src/content/projects.ts` / the Supabase schema.

## 5. Content truth rules (binding)

These extend, not replace, the master brief's §14 rules and the existing `status` field system.

- Every fact-bearing piece of copy or data must be traceable to a specific file in
  `source-material/` (cite it, the way the existing `src/content/*.ts` files do).
- If a number, name, date, or claim surfaces in conversation but isn't in the source documents,
  it is **not sourced** — say so, don't build with it, and don't silently drop the idea either;
  flag that the source document needs to be supplied.
- Never let an ambitious interaction design (the building-systems diagram, the turnover chart,
  the anniversary timeline) become the reason unverified data gets published. The interaction
  can be built and staged; the data population step is what's gated.
- `docs/OPEN_DECISIONS.md` remains the authoritative open-items list. Update it, don't duplicate it.

## 6. CMS / Supabase content model alignment

Per the architecture decision in memory ([[architecture-supabase-migration]]): the existing
Sanity schemas (`src/sanity/schemaTypes/`) are the blueprint for the Supabase Postgres schema,
not a system being thrown away. Any new fields this skill's experience architecture requires
(e.g. per-project `location`, `system` tags for the engineering-database filter, document
attachments for the Engineering Library) should be designed directly into the Supabase schema
sketch — don't add them to the Sanity schema first, since Sanity is being retired.

Do not design or provision the Supabase schema until the Website Structure & Experience Decision
Form has been returned by the client — this skill informs *what good looks like*, the decision
form determines *what's actually in scope and how it's navigated*. See the blocking gate already
recorded in memory.

## 7. QA loop (run every implementation cycle, not just at the end)

```
build → run → playwright screenshot → visual critique → fix
     → responsive test → accessibility test → performance test → repeat
```

Use the installed plugin set for this rather than ad hoc checks:

- `frontend-design` — visual thesis / self-critique pass before calling a section done
- `playwright` — screenshots, responsive pass (desktop/tablet/mobile), E2E flows
- `supabase` — schema/migration/storage work once the decision form unblocks it
- `context7` — up-to-date library docs (Next.js 16 Cache Components, Tailwind v4, etc.)
- `code-review` — before merging any implementation cycle
- `security-guidance` — for `/admin` auth and Supabase RLS policies specifically
- `feature-dev` — general implementation work
- `superpowers` — general-purpose support

A build passing `next build` is necessary, never sufficient — this mirrors the master brief's
§21 instruction directly.

## 8. When this skill and a direct instruction conflict

If a future prompt asks for something this skill would gate (e.g. "just put the turnover chart
in with the numbers I gave you"), surface the conflict explicitly rather than silently complying
or silently refusing — say what's unsourced and ask for either the source document or explicit
sign-off to proceed without it.
