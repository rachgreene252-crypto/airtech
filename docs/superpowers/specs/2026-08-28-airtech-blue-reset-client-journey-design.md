# Airtech — Blue primary reset, Client Journey, IA & content pass

Date: 2026-08-28
Status: design approved in chat, pending spec review
Supersedes on conflict: nothing — extends the `airtech-digital-experience` skill and the
client resolutions recorded in this session (cold storage, sector requirements, `/how-we-work`).

## 1. Why

The client wants the site to read as **luxurious, cohesive, and unmistakably one piece of
design**, with Airtech blue as the primary colour, calmer motion, easier-to-read content, and a
single strong interactive centrepiece (the project lifecycle). This spec covers a design-system
reset, a navigation/IA restructure, a new `ClientJourney` component + `/how-we-work` page, and a
set of precise content edits.

## 2. Guardrails (binding)

- **Content-truth rules from `airtech-digital-experience` §5 still apply.** No number, capability,
  standard or claim gets added that isn't in `source-material/`. Specifically, per the client's
  own resolution this session:
  - **Cold storage / refrigeration is NOT an Airtech capability** — do not add it to
    pharmaceuticals, hospitality, or anywhere. If any copy implies it, remove/rephrase.
  - **Do not manufacture technical requirements** for sectors without source material —
    Embassies & INGOs and Education & Institutional stay restrained (overview + generic
    building-services framing only). The "What the system has to do" section already renders
    conditionally on a non-empty array; leave those arrays empty.
- **Gated content stays gated** — turnover chart, reference letters, per-logo permission, team
  headcount, phone number, ISO certificates. This pass builds/── restyles shells; it does not
  publish gated data.
- **Motion respects `prefers-reduced-motion`** everywhere (global CSS reset already in place +
  `useReducedMotion()` in components).
- **`AGENTS.md`**: read the relevant guide in `node_modules/next/dist/docs/` before writing
  Next-specific code. This is Next.js 16 with Cache Components/PPR.
- Build on the **uncommitted working-tree changes** (hero sticky-wrapper rework, ProjectsExplorer
  simplification, +12 projects, `ProjectCard`, `ProjectJsonLd`, nav Industries removal) — do not
  revert them.

## 3. Design system

### 3.1 Colour tokens (`src/app/globals.css`)

Strategy: **repoint existing variables**, then a naming-cleanup pass. Every current
`--color-signal` / `--color-signal-soft` / `--color-amber*` / `--color-heritage` usage becomes
blue with no component edit required.

New `:root` values (cooler canvas + blue primary):

| Token | Old | New | Notes |
|---|---|---|---|
| `--color-paper` | `#f6f3ec` | `#f3f5f7` | cool architectural off-white |
| `--color-paper-raised` | `#fcfbf8` | `#ffffff` | raised surfaces, cards |
| `--color-ink` | `#252629` | `#161a1f` | deep cool near-black |
| `--color-ink-soft` | `#4a4c4e` | `#3a4048` | |
| `--color-steel` | `#48453b` | `#454c55` | body-secondary text; **must stay ≥ 7:1 on `--color-paper`** |
| `--color-steel-soft` | `#9b9a8f` | `#8b929b` | dark-surface use only (fails AA on paper — keep that constraint) |
| `--color-line` | `#e4dfd1` | `#e2e6ea` | hairlines |
| `--color-line-strong` | `#cbc2ac` | `#c3cbd3` | stronger borders |
| `--color-brand-blue` | `#00729b` | `#045c80` | **primary** — CTAs, links, focus, eyebrows, active states. White text on it ≥ 6:1; on `--color-paper` ≥ 6:1 |
| `--color-brand-blue-soft` | `#0099da` | `#0099da` | unchanged — large/decorative/dark-bg accent only (≈3:1 on paper) |
| `--color-brand-blue-tint` | `#e6f4fa` | `#e8f1f6` | section-background tint |
| `--color-blue-deep` | — | `#0d2b3e` | NEW — dark surfaces, hero grade, journey rail |
| `--color-signal` | `#8a6428` | `var(--color-brand-blue)` | repoint |
| `--color-signal-soft` | `#c6a15b` | `var(--color-brand-blue-soft)` | repoint |
| `--color-signal-tint` | `#dce8ef` | `var(--color-brand-blue-tint)` | repoint |
| `--color-amber` / `-soft` / `-tint` | gold | `var(--color-brand-blue-soft)` / `-soft` / `-tint` | repoint (SystemMotif/SystemsReveal dark-bg paths) |
| `--color-heritage` | `#6e3036` | `var(--color-brand-blue)` | repoint |
| `--color-blueprint` / `-soft` | keep | keep | already blue-family, still used for line-art |
| `--color-white` | `#ffffff` | `#ffffff` | keep |
| `--color-pale-blue` | `#eef5fb` | `#eef4f9` | keep, retone |

Mirror every change in the `@theme inline` block. Then in a **cleanup commit**: rename
`--color-signal*` → `--color-blue*` across `src/` and drop the dead `--color-amber*` /
`--color-heritage` / `--color-signal*` aliases once no references remain. Cleanup is optional for
launch but the repoint is not.

Acceptance: run the `audit` skill's contrast checks (or an axe pass) on `/`, `/expertise/hvac`,
`/industries/healthcare`, `/projects`, `/contact/project-enquiry` — **zero AA text-contrast
failures**.

### 3.2 `body::before` background wash

Kept (client did not ask to remove it) but **retoned**: overlay `--color-paper` at higher
opacity so the line-art reads at ≈ 30–40% of current strength — a texture, not a competing
drawing. Implement by layering a near-opaque `--color-paper` `linear-gradient` over the
`background-image`, or swap the asset for a lighter-exposure version. The hero and any `tone="ink"`
section already paint over it.

### 3.3 Typography

Fonts unchanged (Oswald / IBM Plex Sans / IBM Plex Mono).

**Type scale** — add to `@theme` and refactor components onto it:

```
--text-display-xl : clamp(2.75rem, 6vw, 4.5rem)   /* hero H1 only */
--text-display-l  : clamp(2.25rem, 4.5vw, 3.5rem) /* section H2 */
--text-display-m  : clamp(1.6rem, 3vw, 2.25rem)   /* sub-section / step headings */
--text-title      : 1.25rem                        /* card titles */
--text-body-l     : 1.125rem
--text-body       : 1rem
--text-small      : 0.875rem
--text-label      : 0.8125rem                      /* the new micro-label size */
```

Heading blocks standardise to `max-w-3xl`; body copy to `max-w-2xl`; both centre or left per
existing section intent. `text-wrap: balance` on headings (already have `.text-balance`).

**Micro-label reset (the "years of experience" ask).** Remove `uppercase` **and**
`tracking-[0.0-0.2em]` from every eyebrow / stat-label / meta-label / step-label / breadcrumb /
footer-heading. New pattern:

- Eyebrows / section kickers: `font-sans text-[--text-label] font-medium text-(--color-brand-blue)`, sentence case.
- Meta labels (stat captions, MetadataGrid keys, Field labels, breadcrumbs): same size, `font-medium`, `text-(--color-steel)`, sentence case.
- **Mono is retained only for genuine machine data**: discipline codes (`M`, `E`, `PHE`, `FP`,
  `ELV`), drawing/sheet references, spec values (capacity figures). Not for prose eyebrows.

Files to sweep (all currently use `font-mono … uppercase tracking-[…]` for labels):
`SectionHeader`, `PageHero`, `Breadcrumbs`, `Footer`, `EnquiryForm` (step list + `Field`),
`MetadataGrid`, `TechnicalFrame` (caption + placeholder), `Tag`, `EmptyState`,
`components/home/*` in use (`ProofBar`, `WhatWeDo`, `MEPSequence`, `FeaturedProjects`,
`TrustedBy`, `EngineeringStatement`), `expertise/[slug]`, `expertise/page`, `industries/[slug]`,
`industries/page`, `projects/[slug]`, `projects/page`, `service-support/page`, `company/*`,
`contact/page`.

The hard requirement is the **class-level sweep** of the files listed above — every label/eyebrow
loses `uppercase` + `tracking-[…]` and adopts the new pattern. Additionally add
`src/components/ui/Label.tsx` (`<Label tone="accent"|"muted">`) encapsulating the pattern and use
it in all new components (`ClientJourney`, Engineering Library, Careers); converting existing
call sites to the component is nice-to-have, not required, as long as the rendered result matches.

### 3.4 Motion

- `Reveal`: unchanged in spirit (opacity-only) but **remove per-item stagger** — sections that
  currently map `delay={i * 0.08}` over grid children (`ProofBar`, `WhatWeDo`, `FeaturedProjects`)
  wrap the whole grid in one `Reveal` instead. One fade per section, ~400ms.
- Delete decorative entrance motion from `EngineeringStatement` (line-by-line stagger → single
  fade), `MEPSequence` keeps its scroll-driven spine fill (it explains the "5 → 1" idea), motifs
  keep looping only while their step is active.
- Motion that stays: `ClientJourney` (explains the lifecycle), projects filter transition,
  hover/focus, the hero scroll-scrub, the `TrustedBy` marquee.
- No new parallax, no scroll-pinning/jacking anywhere (the hero uses the already-landed CSS-sticky
  wrapper, not GSAP `pin`).

### 3.5 Placeholders

Replace `TechnicalPlaceholder` (dark diagonal hatch + "Photography pending") with **`BluePlaceholder`**:
`--color-blue-deep` → `--color-brand-blue` diagonal gradient, a faint white architectural
line-work motif (reuse a simplified `SystemMotif` path set), and a small sentence-case label
(`"[Name] — photography to follow"` for projects; contextual label elsewhere). One component,
`src/components/ui/BluePlaceholder.tsx`, consumed by `TechnicalFrame`, `ProjectCard`,
`ClientJourney` visuals fallback, Engineering Library thumbnails, Careers, and any `heroImage`-less
project/industry hero. Never renders a fake photo.

## 4. Navigation & routing

### 4.1 `src/lib/navigation.ts`

`primaryNav` (5 items) + the existing "Discuss Your Project" button in the header:

```
How We Work        → /how-we-work        (no dropdown)
Expertise          → /expertise          (dropdown: 7 disciplines, unchanged)
Projects           → /projects           (no dropdown; industry browsing lives on the page)
Service & Support  → /service-support    (no dropdown)
Company            → /company            (dropdown: About, History, Leadership,
                                          Quality & Certifications, Engineering Library, Careers)
```

- Careers and Engineering Library both live in the **Company dropdown** (the approved nav keeps
  the top bar to 5 items). Company dropdown =
  `[About /company, History /company/history, Leadership /company/leadership,
  Quality & Certifications /company/quality-certifications, Engineering Library /engineering-library,
  Careers /company/careers]`.
- `footerNav`: replace the "Resources" link with "Engineering Library" (`/engineering-library`);
  add an "Industries" column listing the first 6 industry slugs (each → `/industries/[slug]`);
  add a "How We Work" link to the "Company" group.
- `Industries` is **not** in `primaryNav` (already removed in the working tree). `/industries` and
  `/industries/[slug]` routes stay.

### 4.2 Routes

- **New**: `src/app/(site)/how-we-work/page.tsx`.
- **Rename**: `src/app/(site)/resources/` → `src/app/(site)/engineering-library/`
  (`page.tsx` + `[slug]/page.tsx`). Add a permanent redirect `/resources` → `/engineering-library`
  and `/resources/:slug*` in `next.config.ts`. Update `sitemap.ts`, any internal links, and the
  `Resource` type usage.
- `/projects` gains a **"Browse by industry"** band (see §6.3).

## 5. Homepage (`src/app/(site)/page.tsx`)

New section order:

1. `CinematicHero` — re-graded (§5.1)
2. `EngineeringStatement` — **demoted** to a slim intro band (§5.2)
3. `MEPSequence` — palette + contrast fix
4. `ProofBar` — label restyle
5. `WhatWeDo` — palette + calmer
6. `ClientJourney variant="compact"` — **replaces `SolutionsExperience`** (§7)
7. `FeaturedProjects` — legibility + scroll fixes (§5.3)
8. `TrustedBy` — cooler band, asset hygiene

Delete `src/components/home/SolutionsExperience.tsx` (fully superseded). Leave the other unused
`components/home/*` files alone unless a cleanup task is separately approved.

### 5.1 CinematicHero

- Keep the GSAP scroll-scrub 240-frame canvas + the landed CSS-sticky wrapper.
- **Grade the draw**: after `ctx.drawImage`, composite a `--color-blue-deep` wash
  (`globalCompositeOperation = "multiply"`, ~0.4) + a bottom-up `--color-ink` linear scrim so
  text sits on a controlled dark field. Also drop overall brightness slightly
  (`filter` or a flat `rgba(13,43,62,0.25)` `source-over` pass).
- **Headline layer** (HTML over the canvas, not painted): `h1` at `--text-display-xl`,
  `--color-white`; one supporting line at `--text-body-l`, `white/75`; primary CTA
  ("Discuss your project") + ghost link ("Explore our work"). This layer fades out on scroll
  (reuse the existing `indicatorRef` opacity-on-progress pattern).
- Copy: H1 = the positioning line, e.g. **"Engineering the systems behind Nepal's most demanding
  buildings."** Supporting line = **"Integrated MEP and HVAC — from design through commissioning
  and long-term support."** (Both are paraphrases of `client_confirmed` positioning; keep wording
  within what the Master Source of Truth supports.)
- Reduced-motion fallback: static graded frame 1 (or `atmosphere.png`) + the headline layer.

### 5.2 EngineeringStatement (demoted)

No longer a second full-height hero. Becomes a centred intro band: eyebrow + a single
`--text-display-m` line + the two existing supporting paragraphs (kept, they're good) + the
existing CTA row. Remove the per-line stagger. This resolves the "two giant H1s back to back"
problem.

### 5.3 FeaturedProjects

- Fix card text: put the sector eyebrow and title in a solid-anchored bottom block with a
  stronger, shorter gradient (`from-(--color-ink)` at ~55% → transparent) so photo watermarks
  (e.g. "NEPAL MEDICITI" baked into the image) don't bleed through the type. Eyebrow above title,
  never overlapping.
- Controls: blue pills/circles.
- **Stop the wheel-trap**: the horizontal `overflow-x-auto` track currently swallows vertical
  scroll when the cursor is over it. Add `overscroll-behavior-x: contain` and only bind the
  carousel to the arrow buttons + touch drag + keyboard; do not hijack `wheel`. On desktop the
  arrows are the primary control.

## 6. Projects + Industries

### 6.1 Data — every industry offers all five core services

In `src/content/industries.ts`, set `relatedServiceSlugs` for **all 10** industries to exactly:

```ts
["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"]
```

(The 5 core disciplines. BMS and Engineering/Advisory are not in this list — they're additional,
not part of "the five services".)

### 6.2 Industry detail template (`src/app/(site)/industries/[slug]/page.tsx`)

- Section currently titled *"Disciplines Airtech brings to this sector"* → retitle
  **"Every sector, all five services"** with a one-line lede: *"Airtech delivers HVAC,
  electrical, plumbing, fire protection and ELV as one integrated scope on every project —
  the emphasis shifts by sector, the coverage does not."* Render the 5 as a clean row/grid,
  not filter chips.
- "The challenge" and "What the system has to do" sections: unchanged structure, still
  conditionally rendered on non-empty arrays.
- Palette/type/motion pass. `PageHero` breadcrumb "Industries" link → `/projects` (industries now
  live under Projects) or keep `/industries` index — **keep `/industries` as the crumb target**
  (the index page still exists); the *nav* is what changed, not the route.
- Retune the "Projects / Work in this sector" block to the calmer `Reveal` (one fade).

### 6.3 `/projects` — Browse by industry

Add a band above or below the `ProjectsExplorer` (which the working tree already simplified to
featured-only + one industry `<select>`): a **"Browse by industry"** grid of the 10 industries,
each linking to `/industries/[slug]`. This is the "Industries folded under Projects" resolution —
Projects is the entry point, `/industries/[slug]` pages are the destination. Keep the existing
`?industry=` filter behaviour on the explorer.

### 6.4 Exact copy edits (`src/content/industries.ts`)

| Industry | Field | From | To |
|---|---|---|---|
| `healthcare` | `operationalChallenges[3]` | "Air-conditioning in a hospital runs on a 24×7 basis, so reliability is non-negotiable" | **"Hospital air-conditioning operates 24/7, making reliability non-negotiable."** |
| `corporate-commercial` | `operationalChallenges[0]` | "Air-conditioning systems typically run every working day, so energy efficiency matters" | **"Air-conditioning systems typically run every working day, so energy efficiency is essential."** |
| `corporate-commercial` | `technicalRequirements[1]` | "VRF/VRV systems for high-end corporate buildings, offering long piping runs, multiple indoor units per outdoor unit and low sound pressure" | **"VRF systems for high-end corporate buildings — long piping runs, multiple indoor units per outdoor unit and low sound pressure."** |
| `corporate-commercial` | `technicalRequirements` | — | **add: "Chiller plant for larger commercial cooling loads."** (sourced: `services.ts` HVAC systems/subServices list "Chillers") |
| `corporate-commercial` | `airtechCapabilities[1]` | "VRF/VRV design for high-end corporate fit-outs" | **"VRF design for high-end corporate fit-outs; chiller plant for larger loads."** |

Sourced-sector tightening (wording only, no new claims — `healthcare, hospitality,
pharmaceuticals, industrial, corporate-commercial, telecom-data-centres, auditoriums-studios,
banking-financial`): tighten each `technicalRequirements` / `operationalChallenges` entry to a
single crisp technical sentence; no bullet added that isn't already supported by the brochure /
Master Source of Truth. **Do not** add bullets to `embassies-ingos` or `education-institutional`
— leave their empty arrays empty (template already hides the sections).

**Cold storage / refrigeration: not added anywhere.**

### 6.5 Expertise detail (`src/app/(site)/expertise/[slug]/page.tsx`)

- **Delete** the *"Where this discipline is applied"* section entirely (the `relatedIndustries`
  block, ~lines 100–118) and the `relatedIndustries` computation. Rationale: every discipline
  applies to every sector; listing a subset is misleading.
- Keep hero, Capabilities, Sub-services, Related projects, CTA.
- `expertise/page.tsx` (index): fix the near-invisible faint-on-canvas discipline text seen in QA
  (it's `text-(--color-ink)/25`-ish under a scroll-draw) — use `--color-steel` for the resting
  state, `--color-ink` when in view; ensure it's legible even before the reveal fires.
- `relatedIndustrySlugs` can stay in the `Service` type/data (still used by `industries/[slug]`
  reverse lookups elsewhere) — just not rendered on the expertise page.

## 7. ClientJourney component + `/how-we-work`

### 7.1 Data — `src/content/journey.ts`

```ts
export interface JourneyStep {
  index: number;                 // 1..6
  label: string;                 // short: "Understand"
  sentence: string;              // evocative headline
  subLabel: string;              // "Design & technical planning"
  description: string;           // one line
  points: string[];              // sub-points
  visual: "conversation" | "engineer" | "procure" | "site" | "commission" | "support";
}
```

Content (client-supplied, layered):

| # | label | sentence | subLabel | description | points |
|---|---|---|---|---|---|
| 1 | Understand | "Every project begins with a conversation." | Discovery & brief | "We understand your building, requirements, timelines and challenges." | Project brief · Site & context · Client requirements · Coordination requirements |
| 2 | Engineer | "We engineer the solution." | Design & technical planning | "Our team translates requirements into practical, efficient MEP solutions." | System design · Engineering calculations · Equipment selection · Cross-discipline coordination |
| 3 | Procure | "We source and supply." | Procurement & logistics | "The right equipment, sourced from trusted manufacturers and delivered when the project needs it." | Equipment & material sourcing · Supplier coordination · Project procurement & logistics |
| 4 | Execute | "We bring it to site." | Installation & execution | "From equipment placement to ducting, piping and electrical integration, our teams coordinate the system on site." | Installation · Site coordination · MEP integration |
| 5 | Test & Commission | "We test. We commission." | Performance & handover | "We don't simply install a system. We ensure it performs as designed." | Testing · Balancing & checks where applicable · Commissioning · Handover |
| 6 | Support | "We stay with you." | After-sales & long-term support | "Because our relationship doesn't end when the project is handed over." | After-sales · Maintenance · AMC · Technical support |

Section intro paragraph (used above both treatments): *"Airtech is a single engineering partner
across the whole project lifecycle — from the first conversation to long-term support."*

### 7.2 `src/components/journey/ClientJourney.tsx`

Props: `variant: "compact" | "full"`.

**`compact`** (homepage): the intro line + a horizontal (desktop) / vertical (mobile) 6-step
rail. Each step = index, `label`, `sentence`. A thin connecting line fills to
`--color-brand-blue` as the section scrolls through view (reuse the `MEPSequence` spine
technique — it explains sequence, so the motion is earned). Ends with **"Explore how we work →"**
linking to `/how-we-work`. No pinning. One `Reveal` on the block.

**`full`** (`/how-we-work`): six stacked sections, each ~`min-h-[80vh]` (not pinned), with a
**persistent left progress rail** (`01`–`06`, active step highlighted via `IntersectionObserver` /
`useScroll`). Each section renders: big index + `label` (`--text-display-m`), `sentence` as the
headline (`--text-display-l`), `subLabel` (blue micro-label), `description`, `points` as a clean
list, and the step **visual** (§7.3). Step 6 ("We stay with you") is the finale — full-width,
largest treatment, flows straight into a `Discuss your project` CTA block. Each section fades +
rises 12px once on entry; visuals animate only while in view; all static under reduced-motion.

Mobile: rail collapses to a top progress dots row or inline `01/06`; visuals simplify (hotspots →
labelled legend, gauge → static "100%").

### 7.3 Step visuals — `src/components/journey/visuals/*.tsx`

All inline SVG line-art, `--color-brand-blue` / `--color-brand-blue-soft` on the cool canvas,
each ≤ ~2KB, each with a reduced-motion final state:

- `conversation` — two abstract profile/marker nodes with a connecting pulse.
- `engineer` — 4 cross-fading states: drawing grid → BIM/CAD wireframe → calculation sheet →
  equipment schematic. Loops slowly while in view.
- `procure` — a short strip of equipment-partner marks (Mitsubishi Electric, Midea) under the
  line **"Trusted equipment partners"**. **No "authorised dealer/distributor" wording** (Open
  Decisions #10). Marks from `src/content` partner data / `/public/images` if present, else
  `BluePlaceholder` chips.
- `site` — line-art building section with **4 hotspots pulsing in sequence**, labelled
  **HVAC · Plumbing · Electrical · Fire Protection**.
- `commission` — a **"System: 100% Ready"** indicator: a horizontal bar / arc that animates
  0→100% once in view, with a check on completion.
- `support` — a calm "ongoing" motif (a line that continues past the building, a slow steady
  pulse) — visually signals "this doesn't end".

### 7.4 `/how-we-work` page

`PageHero` (breadcrumb Home / How We Work, eyebrow "How we work", heading "One partner, the whole
lifecycle.", the intro paragraph) → `<ClientJourney variant="full" />` → closing CTA. Add
`metadata`. Add to `sitemap.ts`. This is the destination for the nav item and the homepage
"Explore how we work →" link. Same canonical six steps as the homepage — no divergent process.

## 8. Enquiry form — multi-select intent

### 8.1 `src/lib/enquiry.ts`

- `intentOptions` → the individual disciplines + service paths:
  ```
  hvac        "HVAC"
  electrical  "Electrical"
  plumbing    "Plumbing & Public Health"
  fire        "Fire Protection"
  elv         "ELV / Security / IT"
  full-mep    "Full MEP / integrated delivery"
  amc-service "AMC / Service & Support"
  advisory    "Engineering / Advisory"
  ```
- Schema: `intent: z.array(z.enum([...])).min(1, "Choose at least one option.")`.

### 8.2 `EnquiryForm.tsx`

- Step 0 becomes a **checkbox group** (`role="group"`, not `radiogroup`); `form.intent` is
  `string[]`; toggling adds/removes; "Continue" validates `length >= 1`.
- Visual: same list rows, checkbox indicator (square, blue when checked) instead of radio dot.
- `emptyForm.intent = []`. Update `validateStep(0)`, the thank-you screen, and any place `intent`
  is read as a string.

### 8.3 `contact/actions.ts`

`parsed.data.intent` is now `string[]` — the webhook JSON payload carries the array; the
server-log branch prints it. No other change (no provider is wired).

### 8.4 Also update the standalone `/contact/project-enquiry` page if it renders its own copy of
the intent step; and the enquiry `metadata`/copy that says "5-step".

## 9. Engineering Library (`/engineering-library`)

- Route renamed from `/resources` (§4.2).
- `src/content/resources.ts` (currently empty array) → seed with **placeholder entries**, all
  `status: "source_only"` and `fileUrl` undefined, so nothing is downloadable yet:
  - Discipline capability decks: **Mechanical / HVAC**, **Electrical**, **Plumbing & Public
    Health**, **Fire Protection**, **ELV / Security / IT** (`kind: "download"`).
  - **Company profile** (`kind: "download"`).
  - **Quality certificates** (`kind: "download"`) — cross-links to `/company/quality-certifications`.
  - Optionally 1–2 `kind: "insight"` placeholders.
- Page: `PageHero` + a filterable list (filter by discipline / `kind`). Each row: title, kind,
  one-line summary, and a **"Document coming soon"** state (no link) with a `BluePlaceholder`
  thumbnail. When `fileUrl` exists later, the row becomes a real download — no code change.
- Answer to the client's question, recorded here: **the discipline presentations belong on this
  page** (consultant/architect audience); they publish when Airtech supplies the actual PDFs.
- `Resource` type already supports this (`kind`, `fileUrl`, `status`). Keep `[slug]` route for
  future `insight` articles; `generateStaticParams` returns only entries with `body`.

## 10. Careers (`src/app/(site)/company/careers/page.tsx`)

Stays under `/company/careers`, linked from the Company dropdown. Redesign to the new system:
blue `PageHero`, a short "Why Airtech" block (only `client_confirmed` positioning), a
"How to apply" block (email path — no phone, per Open Decisions #1), and an **honest empty
openings state** (`BluePlaceholder` + "No open positions listed right now — send us your CV").
No fabricated listings.

## 11. Component / file inventory

**New**
- `src/components/ui/Label.tsx`
- `src/components/ui/BluePlaceholder.tsx`
- `src/components/journey/ClientJourney.tsx`
- `src/components/journey/visuals/{Conversation,Engineer,Procure,Site,Commission,Support}.tsx`
- `src/content/journey.ts`
- `src/app/(site)/how-we-work/page.tsx`
- `src/app/(site)/engineering-library/page.tsx` + `[slug]/page.tsx` (moved from `resources/`)

**Modified**
- `src/app/globals.css` — tokens, type scale, background retone
- `src/lib/navigation.ts` — primaryNav (5), Company dropdown, footerNav
- `src/app/(site)/page.tsx` — section order, drop `SolutionsExperience`
- `src/components/home/CinematicHero.tsx` — grade + headline layer
- `src/components/home/EngineeringStatement.tsx` — demote
- `src/components/home/{MEPSequence,ProofBar,WhatWeDo,FeaturedProjects,TrustedBy}.tsx` — palette/label/motion
- `src/components/ui/{SectionHeader,PageHero,Breadcrumbs,TechnicalFrame,MetadataGrid,Tag,EmptyState,Reveal}.tsx` — label reset, `BluePlaceholder`
- `src/components/layout/{Footer,HeaderNav,HeaderShell}.tsx` — labels, nav
- `src/components/forms/EnquiryForm.tsx` + `src/lib/enquiry.ts` + `src/app/(site)/contact/actions.ts` + `contact/page.tsx` + `contact/project-enquiry/page.tsx` — multi-select
- `src/content/industries.ts` — 5 services on all; copy edits
- `src/app/(site)/industries/[slug]/page.tsx` — "all five services" section
- `src/app/(site)/expertise/[slug]/page.tsx` — remove "where applied"
- `src/app/(site)/expertise/page.tsx` — contrast fix
- `src/app/(site)/projects/page.tsx` — "Browse by industry" band
- `src/content/resources.ts` — placeholder library entries
- `src/app/(site)/company/careers/page.tsx` — redesign
- `next.config.ts` — `/resources` → `/engineering-library` redirects
- `src/app/sitemap.ts` — `/how-we-work`, `/engineering-library`
- `src/app/(site)/company/*`, `service-support/page.tsx` — label/palette pass

**Deleted**
- `src/components/home/SolutionsExperience.tsx`
- (cleanup, optional/separately-approved) other unused `components/home/*`

## 12. QA & acceptance

Per `airtech-digital-experience` §7, run every cycle:

```
build → run → Playwright screenshots (desktop 1440 / tablet 768 / mobile 390)
     → frontend-design self-critique → fix
     → audit skill: contrast + a11y + perf → fix
     → code-review before merge
```

Acceptance criteria:

1. `next build` clean; no new TypeScript / lint errors.
2. Zero WCAG AA text-contrast failures on `/`, `/how-we-work`, `/expertise/hvac`,
   `/industries/healthcare`, `/industries/embassies-ingos`, `/projects`,
   `/contact/project-enquiry`, `/engineering-library`, `/company/careers`.
3. Airtech blue is the only accent colour visible anywhere; no gold/bronze/burgundy pixels.
4. No `UPPERCASE` + letter-spaced label text remains except discipline codes / spec data.
5. `ClientJourney` works: compact on `/`, full on `/how-we-work`, same six steps, keyboard
   reachable, fully legible and static under `prefers-reduced-motion`.
6. Enquiry step 1 accepts multiple selections; submitting with none shows the validation message;
   webhook payload carries `intent` as an array.
7. No page contains cold-storage / refrigeration copy; Embassies & Education industry pages show
   no invented technical bullets.
8. `/resources` redirects to `/engineering-library`; every library item is a non-downloadable
   "coming soon" row.
9. Homepage: no two full-height hero-scale headings back to back; `FeaturedProjects` card text is
   legible over every photo; the carousel does not trap vertical scroll.
10. Lighthouse (deployed or `next start`): Performance ≥ previous baseline, SEO 100, Best
    Practices 100, a11y ≥ 96.

## 13. Build sequence (for the implementation plan)

1. **Design-system foundation** — tokens, type scale, background retone, `Label`,
   `BluePlaceholder`, `Reveal` stagger removal. (Everything else depends on this.)
2. **Global label + palette sweep** — UI primitives + layout + in-use home components + all
   route pages. Screenshot pass.
3. **Navigation & routing** — `navigation.ts`, `/how-we-work` route stub, `resources` →
   `engineering-library` rename + redirects, sitemap.
4. **ClientJourney** — data, component (compact + full), step visuals, wire into homepage
   (replace `SolutionsExperience`) and `/how-we-work`.
5. **Hero re-grade** — grade + headline layer + `EngineeringStatement` demotion + homepage order.
6. **Projects / Industries** — 5-services data change, industry template section, `/projects`
   browse-by-industry band, copy edits, expertise "where applied" removal.
7. **Enquiry multi-select** — lib + form + action + pages.
8. **Engineering Library** — placeholder content + filterable page.
9. **Careers** redesign.
10. **QA sweep** — audit skill, responsive, code-review, fix.

## 14. Open items (not blocking this pass)

- `/how-we-work` step-4 hotspot exact building drawing — use a simplified reusable section
  drawing; refine with real coordination-drawing reference if Airtech supplies one.
- Equipment-partner marks for journey step 3 — use whatever clean assets exist; `BluePlaceholder`
  chips otherwise.
- Everything in `docs/AIRTECH_OPEN_DECISIONS.md` stays gated.
- Naming-cleanup commit (`--color-signal*` → `--color-blue*`) can trail the launch.
