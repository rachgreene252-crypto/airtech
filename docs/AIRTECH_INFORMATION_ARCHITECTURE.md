# Airtech Information Architecture

Date: 2026-08-16. This is a **proposed** IA, not a final one — the document that would make it
final (`AIRTECH_WEBSITE_CLIENT_WEBSITE_DECISIONS_FORM_v1.docx`) is not present in
`source-material/` (see `SOURCE_INDEX.md`). Every open question below is marked
**CLIENT DECISION REQUIRED**. Where no client preference exists yet, this document proposes the
Master Source of Truth §13 structure plus what the live implementation (`src/lib/navigation.ts`)
already does, since that structure already shipped and works.

## Primary navigation

```
Home
Expertise          → dropdown: HVAC · Electrical · Plumbing & Public Health · Fire Protection ·
                      ELV/Security/IT · BMS/Systems Integration · Engineering/Advisory
Industries          → dropdown: Healthcare · Hospitality · Industrial · Pharmaceuticals ·
                      Telecom & Data Centres · Corporate & Commercial · Institutional · Banks &
                      Financial Institutions · Auditoriums/Studios · Education
Projects            → no dropdown; the filterable database is the destination
Service & Support   → no dropdown
Company             → dropdown: About · History · Leadership · Quality & Certifications · Careers
Resources           → no dropdown (CLIENT DECISION REQUIRED: should this get a dropdown once the
                       Engineering Library has real content — see §7 below)
Contact             → primary CTA, styled distinctly from the rest of the nav, not a plain nav item
```

This matches the live `primaryNav` in `src/lib/navigation.ts` almost exactly (Contact is currently
a `/contact` link, not yet visually distinguished as a CTA button in the header — worth checking
during the next implementation pass, not a structural change).

**CLIENT DECISION REQUIRED:** final ordering, whether "Service & Support" should sit before or
after "Projects" (questionnaire feedback wants the site to feel project-led — Projects arguably
belongs directly after Industries, ahead of Service & Support), and whether Resources merits
top-level billing at launch given it currently has zero content (see §7).

## Mobile navigation

Current implementation: portal-rendered full-screen mobile nav (per
`docs/FINAL_IMPLEMENTATION_REPORT.md` §3) with the same grouping as desktop. No changes proposed —
this is a UX pattern decision, not a content-structure one, and the existing approach (accordion
groups, proper `aria-expanded`) is sound.

## Page hierarchy / URL structure

Already live, clean, and consistent with the master brief's SEO requirements (`/expertise/hvac`,
`/industries/healthcare`, `/projects/ncell-corporate-office`). No changes proposed to the URL
scheme itself — only to what fills the Projects and Resources trees, per the content audit.

```
/                                  Home
/expertise                         Service taxonomy index
/expertise/[slug]                  Service detail
/industries                        Industry index
/industries/[slug]                 Industry detail
/projects                          Filterable project database
/projects/[slug]                   Project case study
/service-support                   AMC / after-sales / technical support
/company                           About
/company/history                   Timeline
/company/leadership                Team
/company/quality-certifications    Certifications + equipment partners
/company/careers                   Careers
/resources                         Engineering Library index
/resources/[slug]                  Resource detail
/contact                           Progressive project-enquiry flow
/studio                            CMS (Sanity today, to be replaced by /admin per the Supabase
                                    migration decision — see AIRTECH_SUPABASE_ARCHITECTURE.md)
```

## Homepage structure

Per Master Source of Truth §14 and the `airtech-digital-experience` skill's experience-architecture
table, proposed section order:

1. Hero — positioning statement, immediate credibility (est. 2000, 25+ years, integrated MEP)
2. Trust bar — client logos + certifications (gated on logo/cert publication approval)
3. "What does Airtech actually do?" — interactive systems diagram
4. Industries — sector relevance
5. Featured projects — "The Work"
6. Project lifecycle — engineering → procurement → installation → testing → commissioning → support
7. Why Airtech — years/scale pillars (numeric claims only where verified)
8. Service & Support lifecycle
9. Final CTA — project enquiry

**CLIENT DECISION REQUIRED:** this ordering is proposed, not confirmed. The live homepage
(`src/app/(site)/page.tsx`) currently ships Hero → TrustBar → Capabilities → FeaturedProjects →
IndustriesShowcase → DeliveryApproach → PartnersStrip → FinalCTA — close to this proposal already;
the main gap is the interactive systems-explorer section (not yet built) and the project-lifecycle
visual (not yet built).

## Service hierarchy

No change proposed to the 7-service taxonomy already in `src/content/services.ts` — it matches the
Master Source of Truth §5 taxonomy closely. Confirm whether Engineering/Advisory (MEP audit, design
peer review, energy audit) should be a full top-level service or folded under Service & Support —
**CLIENT DECISION REQUIRED**, not addressed in any source document.

## Industry hierarchy

No change proposed to the 10-industry set already in `src/content/industries.ts`. One addition to
consider: the reference letters (`AIRTECH_CONTENT_AUDIT.md` §2b) confirm embassy work (British
Embassy, JICA) and casino/resort work (Tiger Palace) at a level of detail that could support
dedicated proof points on the existing Embassies/INGOs and Hospitality industry pages without
needing new top-level industries.

## Project hierarchy

The single biggest content gap. Current filters: none confirmed live beyond industry/service query
params (`?industry=`, `?service=`, per `docs/FINAL_IMPLEMENTATION_REPORT.md` §2). Proposed
expansion, contingent on the decision form:

- Filter by Industry (existing)
- Filter by System/Service (existing)
- Filter by Location — **new field needed**; most projects now have a city (Kathmandu, Bhairahawa,
  Parasi, Birgunj) from the pptx landmark-projects list and the reference letters
- Filter by Project Status (verified/documented vs. source_only vs. ongoing — Parliament Building is
  explicitly ongoing per source, must never render in a "completed projects" filter)

**CLIENT DECISION REQUIRED:** whether location-based filtering is wanted at all — not addressed in
any source document, proposed here because the data now supports it.

## Resources / Engineering Library

Currently empty (0 resources, per `docs/FINAL_IMPLEMENTATION_REPORT.md` §6). No source document
supplies technical guides, datasheets, or insights content. Recommend keeping this as a real but
minimal top-level nav item (honest empty state, as already built) rather than removing it, since
the questionnaire (`AIRTECH WEBSITE REDESIGN.docx` §17.1) explicitly lists "technical resources"
and "downloadable company profile" as desired features. **CLIENT DECISION REQUIRED:** whether to
launch without this section populated, or hold launch until at least a company-profile PDF and a
handful of technical documents exist.

## Company hierarchy

No structural change proposed. Content gap: only MD (Manoj Bhansali) and "Senior Management — Ashok
Ji" are named anywhere in the source material (`AIRTECH WEBSITE REDESIGN.docx` §10.1); everything
else on `/company/leadership` needs collection.

## Contact / enquiry architecture

Existing 5-step progressive enquiry flow already matches the questionnaire's request
(`AIRTECH WEBSITE REDESIGN.docx` §15.2) closely. Proposed extension per the
`airtech-digital-experience` skill: add explicit "what are you building" intent step (HVAC / Full
MEP / Electrical / AMC / Other) as step 1, ahead of contact details, and an optional file-upload
step for drawings/BOQ — both already implied by source material, not new invention.

## Footer

No structural change proposed to `footerNav` in `src/lib/navigation.ts`. **CLIENT DECISION
REQUIRED:** social links (none currently supplied by any source document), WhatsApp contact
(desired per questionnaire §17.1 but unconfirmed number, per `docs/OPEN_DECISIONS.md` #7).

## Internal linking strategy

No change proposed — the existing related-services/related-industries/related-projects pattern in
`src/content/projects.ts` already implements this correctly and should be extended, not redesigned,
as new project records are added.

## Summary of CLIENT DECISION REQUIRED items in this document

1. Final primary-nav ordering (Service & Support vs. Projects position)
2. Whether Resources should get a mega-menu once populated
3. Final homepage section order
4. Whether Engineering/Advisory is a top-level service or folded into Service & Support
5. Whether project location-based filtering is wanted
6. Whether to launch Resources empty or hold for content
7. Footer social links and WhatsApp number
