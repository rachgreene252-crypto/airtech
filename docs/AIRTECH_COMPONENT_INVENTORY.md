# Airtech Component Inventory

Date: 2026-08-16. Every reusable UI component required for `AIRTECH_FINAL_EXPERIENCE_SPEC.md` and
`AIRTECH_PAGE_SPECIFICATIONS.md`. **Existing** = already in `src/components/`, confirmed by reading
the current codebase this session — reuse, do not rebuild. **New** = required by this pass's spec,
not yet built.

## Existing — reuse as-is

| Component | Location | Used by |
|---|---|---|
| `Button` / `ButtonLink` | `src/components/ui/Button.tsx` | Every CTA site-wide |
| `Container` | `src/components/ui/Container.tsx` | Every page |
| `Section` | `src/components/ui/Section.tsx` | Every page |
| `SectionHeader` | `src/components/ui/SectionHeader.tsx` | Every page |
| `Tag` | `src/components/ui/Tag.tsx` | Project cards (systems tags), filters |
| `MetadataGrid` | `src/components/ui/MetadataGrid.tsx` | Project case study "at a glance" |
| `Breadcrumbs` | `src/components/ui/Breadcrumbs.tsx` | Every interior page |
| `TechnicalFrame` (+ `TechnicalPlaceholder`) | `src/components/ui/TechnicalFrame.tsx` | Every image slot — extend, don't replace, for the document viewer's framing (§6 of final spec) |
| `Accordion` | `src/components/ui/Accordion.tsx` | Resources FAQ-style content if any; mobile Systems Explorer can reuse this pattern |
| `EmptyState` | `src/components/ui/EmptyState.tsx` | Resources, Certifications, any zero-content section |
| `Reveal` | `src/components/ui/Reveal.tsx` | Scroll-fade — base for all new sections' motion |
| `PageHero` | `src/components/ui/PageHero.tsx` | Interior page heroes |
| `Header` / `HeaderNav` | `src/components/layout/` | Extend for persistent CTA button (§3 of final spec), not rebuild |
| `Footer` | `src/components/layout/Footer.tsx` | No change |
| `ProjectCard` | `src/components/projects/ProjectCard.tsx` | Extend per §5's finalized card fields |
| `ProjectsExplorer` | `src/components/projects/ProjectsExplorer.tsx` | Extend for location filter, filter-sheet mobile pattern (§16) |
| `EnquiryForm` | `src/components/forms/EnquiryForm.tsx` | Extend from 5 to 6 steps (§12) |
| `OrganizationJsonLd` | `src/components/seo/OrganizationJsonLd.tsx` | No change |
| 8 homepage section components (`Hero`, `TrustBar`, `Capabilities`, `FeaturedProjects`,
  `IndustriesShowcase`, `DeliveryApproach`, `PartnersStrip`, `FinalCTA`) | `src/components/home/` | Reorder per §2; `DeliveryApproach` becomes the shared lifecycle component reused on `/service-support` (§10) |

## New — required by this pass

| Component | Purpose | Notes |
|---|---|---|
| `EngineeringSystemsExplorer` | Homepage §4 interactive systems diagram | Static SVG + CSS/JS state, no canvas/WebGL/3D library (§17 performance rule); desktop hover / mobile tap variants share one data model |
| `SystemZoneOverlay` | Sub-component of the above — the callout panel per system | Reuses `MetadataGrid`/mono-label visual language, not a new visual style |
| `TurnoverChart` | §7 — 7-point line chart | Hand-rolled SVG, no charting library; needs an accessible text-equivalent sibling (§18) |
| `DocumentViewer` | §6 — reference-letter/certificate lightbox | Reuses `TechnicalFrame`'s crop-frame device; full-screen on mobile (§16); focus-trapped modal |
| `ReferenceProofCard` | §6 — client/project/date/scope summary linking to `DocumentViewer` | Distinct from any generic testimonial-quote component — do not reuse a pull-quote pattern here |
| `LifecycleVisualization` | §10 — shared between homepage `DeliveryApproach` and `/service-support` | One component, two placements — do not fork into page-specific copies |
| `FilterSheet` | §16 — mobile bottom-sheet filter pattern for Projects | Generalize so Resources can reuse it later once it has enough content to need filtering (§14 of page specs) |
| `FilterChip` | Removable applied-filter chip, mobile + desktop | Small, shared across Projects/Resources filtering |
| `Timeline` | §8/§10 of page specs — Company/History milestone list | Real ordered list in the DOM (accessibility requirement, §18); sequenced reveal-on-scroll |
| `StickyEnquiryBar` | §3 — persistent mobile CTA on Projects/Industries/Service & Support only | Not global — must be easy to scope per-route, not a site-wide fixture |

## Explicitly not building (kill-list, see `AIRTECH_FINAL_EXPERIENCE_SPEC.md` §20)

- A generic `Testimonial`/pull-quote component as the primary treatment for reference letters —
  superseded by `ReferenceProofCard` + `DocumentViewer`.
- Any map/geo component for project locations.
- A search component/index (§18 of page specs — no content volume to justify it yet).
- A generic "page builder" section-ordering admin component — homepage/nav stay code-defined.
- A PDF.js-based document viewer — the reference letters are single-page scanned images, not
  multi-page PDFs; a lightweight image viewer is the right tool.

## Component ownership notes

- All new components must consume `prefers-reduced-motion` the same way `Reveal` already does —
  no new component should invent its own motion-preference check.
- All new interactive components (`EngineeringSystemsExplorer`, `TurnoverChart`, `DocumentViewer`,
  `FilterSheet`) need a fully keyboard-operable, screen-reader-parity fallback per §18 of the final
  spec — this is a build requirement for each component, not a follow-up accessibility pass.
