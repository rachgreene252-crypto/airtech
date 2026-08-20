# Airtech visual hard reset — Phase 1 (design system) + Phase 2 (homepage)

## Context

Full stop on incremental CSS tweaks. Rebuilt visual language: light, centered,
quiet, premium — closer to Apple/Midea/Stripe discipline than an engineering-
company template — using Airtech's real content already in `src/content/*.ts`.

This supersedes the visual philosophy documented in
`.claude/skills/airtech-digital-experience/SKILL.md` §2 (the old "warm
heritage" bronze/ivory/Oswald system). That skill file is updated to describe
the new system as canonical **only after** the user has seen and approved the
rendered result of this plan — not as part of any task below.

Scope: Phase 1 (design tokens, fonts, shared primitives) and Phase 2 (the 11
homepage section components) only. Internal pages, the projects index/filter/
detail template, and full-site QA are a roadmap, listed at the end, not
executed in this plan.

Two decisions already confirmed with the user: keep the existing homepage
section order (Opening → SystemsReveal → SystemShowcase → HVACSpotlight →
ProjectShowcase → IndustryJourney → EngineeringLifecycle → DataMoments →
TrustBar → PartnersStrip → FinalCTA), and use Geist (body/UI) + Manrope
(display) + Geist Mono as the new type system.

## Global Constraints

- **Redefine token values in place under their existing CSS custom-property
  names — do not rename them** (the two explicitly-scoped exceptions are the
  font source-variable renames in Task 2, and `--container-max`'s value
  change in Task 1). 49 files sitewide consume these exact token names via
  Tailwind arbitrary-value syntax; redefining values means later phases
  (not in this plan) inherit the new palette with zero token churn.
- **Exact token values** (Task 1) are given as hex codes — use them verbatim,
  do not approximate or "improve" them.
- Preserve the frozen homepage section order. Do not reorder, add, or remove
  sections.
- Do not touch: any status/content-verification gating logic in
  `src/content/*.ts` or `src/sanity/schemaTypes/shared.ts`, the Sanity/
  Supabase data model, any copy not explicitly covered by this brief, or
  `.claude/skills/airtech-digital-experience/SKILL.md`.
- Preserve all data-wiring named in a task (e.g. `ZONE_SLUGS`,
  `getServiceBySlug`, `INDUSTRY_PHOTOS`, `getProjectsByIndustry`,
  `heroImage?.src` gating) exactly — these are functional, not visual.
- Respect `prefers-reduced-motion` behavior already in place; do not remove
  or weaken it.
- `next build` must succeed with no new TypeScript/build errors after every
  task, run from the worktree root.
- **Visual verification standard.** This is a visual-design plan; a clean
  build is necessary but not sufficient. For every task, after implementing,
  run `npm run dev` (kill anything already listening on port 3000 first:
  `lsof -ti:3000 | xargs -r kill`), use the Playwright MCP browser tools to
  navigate to `http://localhost:3000` (or the specific route named in the
  task), and screenshot the affected section(s). Save screenshots into this
  plan's SDD workspace directory (ask `sdd-workspace` for the path, or reuse
  the directory your task brief file lives in) as
  `task-N-<viewport>.png`. Reference every screenshot's path in your report —
  the reviewer will read them with the Read tool. Minimum viewports: 1440
  and 390 for every task; Task 6 (Opening), Task 8 (IndustryJourney), and
  Task 9 (SystemsReveal) additionally screenshot at 1280, 1024, 768, 375
  (all six breakpoints — these are the highest-visibility structural
  changes). Stop the dev server when done (`kill` the process you started).
- The target visual ratio for the whole homepage (informational, judged at
  the end, not per-task): roughly 70% white paper, 15% pale-blue tint,
  10% graphite/ink, 4% light-blue linework, 1% gold/burgundy accent.
- Never spawn a subagent from inside a task — implementers and reviewers
  both work solo.

## Task 1: Design tokens — `src/app/globals.css`

Redefine these existing CSS custom properties **in place, same names**,
inside `src/app/globals.css` wherever they are currently declared (`:root`
or the `@theme inline` block — follow the file's existing structure, do not
introduce a new declaration block):

| Token | New value |
|---|---|
| `--color-ink` | `#263642` |
| `--color-ink-soft` | `#4E6270` |
| `--color-paper` | `#FFFFFF` |
| `--color-paper-raised` | `#F7FAFC` |
| `--color-steel` | `#4F6875` |
| `--color-steel-soft` | `#7C93A0` |
| `--color-line` | `#E4EEF3` |
| `--color-line-strong` | `#C9DCE8` |
| `--color-blueprint` | `#8FB8CE` |
| `--color-blueprint-soft` | `#EAF3F8` |
| `--color-signal` | `#263642` (same value as `--color-ink`) |
| `--color-signal-soft` | `#5C7686` |
| `--color-signal-tint` | `#EAF3F8` (same value as `--color-blueprint-soft` — this duplication is intentional; the real rename/consolidation is deferred to a later phase not in this plan) |
| `--color-amber` | `#B88A3B` |
| `--color-amber-soft` | `#C7A45D` |
| `--color-amber-tint` | `#F5EBD9` |
| `--color-heritage` | `#6B3038` (value unchanged — same burgundy as before; this row exists only to confirm you should NOT touch it) |

Also: `--container-max` currently `1440px` and is dead CSS (never wired into
`@theme inline`, never referenced anywhere in the codebase). Change its value
to `1280px` for doc accuracy. (The three files that hardcode `max-w-[1440px]`
directly — `Container.tsx`, `Opening.tsx`, `DataMoments.tsx` — are each
updated to `max-w-[1280px]` in their own tasks below, not here.)

**Do not touch:** the `prefers-reduced-motion` override, `.crop-frame`,
`.hairline`, `.text-balance`, the radius tokens (0/2/3px), or any of the 7
`@keyframes`/`.animate-*` rules used by `SystemMotif.tsx`.

**Verification:**
- `npm run build` clean.
- Screenshot the full, unmodified homepage at 1440 and 390 — this is the
  "new tokens through old markup" baseline. Confirm nothing looks visually
  broken (missing contrast, invisible text) even though the composition
  hasn't changed yet.
- Compute WCAG contrast ratios by hand (relative-luminance formula) for
  `--color-steel` (`#4F6875`) and `--color-steel-soft` (`#7C93A0`) against
  `--color-paper` (`#FFFFFF`). Report both ratios. Grep the codebase for
  where `text-(--color-steel)` and `text-(--color-steel-soft)` are used on
  the homepage today and note the approximate font sizes/weights at those
  call sites, so the reviewer can judge AA (4.5:1 normal text / 3:1 for
  ≥18.66px bold or ≥24px regular) against actual usage, not in the abstract.

## Task 2: Font system — `src/app/layout.tsx`

Replace the `next/font/google` imports `Oswald`, `IBM_Plex_Sans`,
`IBM_Plex_Mono` with `Geist`, `Manrope`, `Geist_Mono`:

- `Manrope` → CSS variable `--font-display-face`, `weight: ["700","800"]`,
  `display: "swap"`.
- `Geist` → CSS variable `--font-geist-sans` (renamed from
  `--font-plex-sans`), `weight: ["400","500","600"]`, `display: "swap"`.
- `Geist_Mono` → CSS variable `--font-geist-mono` (renamed from
  `--font-plex-mono`), `weight: ["400","500"]`, `display: "swap"`.

In `src/app/globals.css`, update the `--font-sans` / `--font-mono` variable
references so they point at the renamed source variables
(`--font-geist-sans`, `--font-geist-mono`) instead of the old
`--font-plex-sans`/`--font-plex-mono` names. No homepage or component call
sites need changes — they all consume the Tailwind classes
`font-display`/`font-sans`/`font-mono`, never the raw font variable names.

Update `viewport.themeColor` in `src/app/layout.tsx` from `#f6f3ec` to
`#F7FAFC` (the new `--color-paper-raised` value).

Use `display: "swap"` for all three fonts (not `"optional"` — the old
choice was specific to Oswald's condensed-width CLS regression against
fallback fonts, which doesn't apply to Geist/Manrope's standard-proportion,
fallback-metric-backed fonts).

**Verification:**
- `npm run build` clean.
- Screenshot the full homepage at 1440 and 390 with the new fonts loaded —
  confirm Geist/Manrope are actually rendering (not silently falling back).
- Cold-load CLS check: with the dev server running, use
  `browser_evaluate` to install a `PerformanceObserver` for
  `"layout-shift"` entries before navigation (or reload and read
  `performance.getEntriesByType('layout-shift')` shortly after load),
  sum the `value` of entries where `hadRecentInput` is false, and report
  the resulting cumulative score. If it's a real, visible regression
  (rough guide: notably above ~0.1), flag it in your report as a concern
  and note that the plan's fallback is to set Manrope's `display` back to
  `"optional"` — but do not make that change yourself; report it as a
  DONE_WITH_CONCERNS finding for the controller to rule on.

## Task 3: Shared UI primitives — `src/components/ui/Section.tsx`, `src/components/ui/Container.tsx`

In `Section.tsx`: add a fourth tone option, `tint`, with the class string
`"bg-(--color-blueprint-soft) text-(--color-ink)"`, alongside the existing
tones. Keep the existing `ink` tone defined and unchanged — it stays in the
component's tone map, just isn't the default choice for most sections
anymore (that's decided per-section in Phase 2, not here).

In `Container.tsx`: change `max-w-[1440px]` to `max-w-[1280px]`. This
cascades automatically into everything built on `Container`/`Section`.

Do NOT modify `src/components/ui/Button.tsx` — its existing
`bg-(--color-signal) text-(--color-paper) hover:brightness-90` fill
resolves correctly to Deep Slate automatically via Task 1's token
redefinition. No code change needed there; this task does not touch that
file.

Do NOT modify `SectionHeader.tsx`, `TechnicalFrame.tsx`, or
`SystemMotif.tsx` in this task — they're token-driven and inherit the new
palette automatically.

**Verification:**
- `npm run build` clean.
- Screenshot the full, unmodified-section-markup homepage at 1440, 1280,
  1024, 768, 390, 375 (all six breakpoints — this is the Phase 1 exit gate:
  tokens + fonts + container width together, before any component surgery
  begins in Phase 2). Confirm no layout breakage at any width and that the
  light/pale-blue/graphite balance looks intentional even on old markup.
- This task's report is the Phase 1 completion gate. Explicitly state:
  build clean (yes/no), contrast ratios from Task 1 restated with a pass/
  fail judgment against actual usage sizes, CLS finding from Task 2
  restated, and confirmation all six breakpoint screenshots were taken and
  saved.

## Task 4: Homepage Batch 1 — token-reskin only (low risk)

Files, each is reskin-only (adjust hardcoded/legacy color classes to use the
current token names — most of this should already resolve correctly purely
from Task 1's redefinition; audit each file for any color reference that
bypasses the tokens and fix those):

1. **`src/components/home/TrustBar.tsx`** — reskin only.
2. **`src/components/home/PartnersStrip.tsx`** — reskin only, trivial.
3. **`src/components/home/FinalCTA.tsx`** — reskin only. Verify in your
   screenshot that `tone="raised"` (`#F7FAFC`) still reads as a visible,
   deliberate step down from pure-white paper — take a side-by-side crop
   comparing a `tone="paper"` section against this one in the same
   screenshot if useful.
4. **`src/components/home/DataMoments.tsx`** — reskin only; also update
   its hardcoded `max-w-[1440px]` → `max-w-[1280px]` (this file was
   explicitly excluded from Task 1/3's `--container-max` work and must be
   done here). The burgundy dot markers (`--color-heritage`) keep their
   exact role — only the resolved value changes via the token, no code
   change to those call sites needed unless they hardcode a hex instead of
   the token. Verify in your screenshot that the faint ~9%-opacity
   background photo still reads against pure white (it was tuned against
   the old warmer paper tone).
5. **`src/components/home/HVACSpotlight.tsx`** — reskin only; verify in
   your screenshot that the `ink/45`-style photo overlay still reads
   correctly now that ink is Deep Slate (`#263642`) rather than a near-
   black tone — it may need no change if it's purely token-driven, but
   check for any hardcoded opacity/color value that assumed near-black.

**Verification:** `npm run build` clean. Screenshot each of the 5 touched
sections at 1440 and 390 (10 screenshots total, or fewer if you can capture
adjacent sections together — use judgment, but every file must be visible
in at least one screenshot at each viewport).

## Task 5: Homepage Batch 2 — overlay/scrim rework

**`src/components/home/SystemShowcase.tsx`:** text sits beside photos here,
never over them. Reduce the current full-panel wash (currently something
like `bg-(--color-ink)/45` combined with a `mix-blend-color`
`blueprint/30` layer) to a much lighter unifying wash only —
`bg-(--color-ink)/10` to `bg-(--color-ink)/15` — and drop the
`mix-blend-color` layer entirely. Keep `SystemMotif` overlays, the
alternating layout, and all `getServiceBySlug` image-sourcing wiring
untouched. Recheck `SystemMotif`'s stroke contrast in your screenshot —
those strokes were tuned against the old dark scrim and may need their own
opacity/color nudge (via the SystemMotif call sites in this file only, not
by editing `SystemMotif.tsx` itself) to stay legible against the new,
much lighter wash.

**`src/components/home/ProjectShowcase.tsx`:** text is pinned bottom-left
over the photo here, so a legibility scrim is genuinely needed (unlike
SystemShowcase — do not apply the same treatment). Replace the current
full-image wash (roughly `from-(--color-ink) via-(--color-ink)/50
to-(--color-ink)/10`) with a steeper, bottom-anchored scrim, e.g.
`from-(--color-ink)/70 via-(--color-ink)/20 to-transparent`, tuned so only
roughly the bottom third-to-half of each photo darkens enough for AA text
contrast against the pinned copy, leaving most of the photo naturally lit.
No composition change — do not restructure this section, only retune the
gradient. Preserve the `heroImage?.src` featured-project gating exactly.

**Verification:** `npm run build` clean. Screenshot both files at 1440 and
390. For ProjectShowcase specifically, zoom/crop the screenshot on the
bottom-left text-over-photo area and eyeball-check (or compute, if you can
sample pixel color) that the text region is dark enough for the copy to
read as AA-compliant against its background.

## Task 6: `src/components/home/Opening.tsx` — centered recomposition

Recompose from the current `lg:grid-cols-[1.15fr_1fr]` two-column layout to
a single centered column: `mx-auto max-w-3xl text-center` wrapping the
eyebrow, h1, and body copy, with a centered CTA row beneath.

`BuildingSchematic` (the SVG illustration) moves from a ~40%-width
companion column to a small, quiet, centered mark beneath the CTA row —
shrink it to roughly `max-w-[200px] sm:max-w-[240px]`, always horizontally
centered. No SVG stroke-color changes needed inside `BuildingSchematic`
itself — its token references already resolve correctly through Task 1's
redefinition.

Also update this file's hardcoded `max-w-[1440px]` → `max-w-[1280px]`
(this file was explicitly excluded from Task 1/3's container work and must
be done here, same as DataMoments in Task 4).

Keep the existing copy verbatim (do not rewrite any text) and keep the
no-hero-photography choice — this section stays typography + a small SVG
mark, not a photo.

**Verification:** `npm run build` clean. Screenshot at all six breakpoints
(1440, 1280, 1024, 768, 390, 375) — this is a Batch 3 structural task.
Confirm the column is genuinely centered (not just text-align: center on a
still-wide flex item) at every width, and that the CTA row and schematic
mark both stay centered and readable down to 375px.

## Task 7: `src/components/home/EngineeringLifecycle.tsx` — re-tint, stays dark

This section stays `tone="ink"` (now resolves to Deep Slate `#263642`
instead of the old near-black) — this is the one homepage section that
stays a full graphite band, deliberately, as the "~10% graphite" real
estate and an intentional darker pause in the page's rhythm. Do not
convert it to a light tone.

Re-tint the section's SVG: structural/connecting lines →
`--color-blueprint-soft`, markers/nodes → `--color-signal-soft` and/or
`--color-amber` (per how the current markup distinguishes marker types —
follow the existing marker-role logic, just repoint the color tokens used).
Most of this should already resolve automatically via Task 1's token
redefinition; only change hardcoded values that bypass the tokens.

The left-stepper / right-SVG split composition and the stepper's
interaction logic are unchanged — do not restructure this file, only
retint it.

**Contrast risk to check explicitly:** `--color-signal-soft` used to be a
literal gold (`#c6a15b`) — it worked well against the old near-black ink as
a bright accent. It's now redefined to a muted graphite-blue (`#5C7686`),
and this file uses it in several places against the dark `--color-ink`
background: the "Delivery — 06" eyebrow label, the stepper's active dot
fill/border and progress line, the "Install" stage SVG trace, and the
progress-rail fill. Compute the WCAG contrast ratio of `#5C7686` against
`#263642` (the new ink). If it's too low to read clearly as an active/
highlighted state against dark ink (rough guide: below ~3:1 for graphical/
UI elements, below ~4.5:1 for the eyebrow text), swap those specific
elements to `--color-blueprint-soft` (`#8FB8CE`, a light sky blue that
contrasts well against dark ink and matches this token's "structural SVG
linework" role) or `--color-amber` instead — your judgment on which per
element, but don't leave a genuinely low-contrast active state in place.

**Verification:** `npm run build` clean. Screenshot at 1440 and 390 (this
one is not in the all-six-breakpoints list — only Opening, IndustryJourney,
and SystemsReveal get that treatment). Confirm the section reads as a
clear, deliberate dark "pause" against the light sections above and below
it in a full-page screenshot, and that all marker/line colors are legible
against the Deep Slate background.

## Task 8: `src/components/home/IndustryJourney.tsx` — tint tone + TechnicalFrame

Change this section's `tone` prop to `"tint"` (added in Task 3) — this is
the concrete spend of the brief's ~15% pale-blue-background budget.

Replace the current bespoke full-bleed-photo-with-gradient-scrim +
diagonal-hatch-fallback panel with `src/components/ui/TechnicalFrame.tsx`
(imported, not modified) — that component already implements this exact
real-photo-vs-honest-placeholder duality; its internal
`TechnicalPlaceholder` is the same hatch pattern this file currently
hand-rolls, so the hand-rolled version should be deleted once
`TechnicalFrame` is wired in. Render a fixed-aspect `TechnicalFrame`
alongside the existing industry name/copy/challenge/capability text for
all 10 industries, so photo-available and photo-unavailable industries
render structurally identically instead of the current inconsistent
fallback.

Preserve exactly: the `INDUSTRY_PHOTOS` data map (feed it into
`TechnicalFrame` rather than removing it), the `getProjectsByIndustry`
wiring, and the existing selection pattern (it's plain buttons with
`aria-current`, not a full ARIA tablist today — preserve that pattern
as-is, don't add `role="tablist"`/`role="tab"` machinery that wasn't there
before).

**Ruling (ambiguity resolved during plan review, not by you):** the current
file is built entirely for a dark background — headline/copy/labels use
`text-(--color-paper)`, `text-(--color-paper)/85`, `text-(--color-paper)/80`,
`text-(--color-paper)/20` (a divider), and the nav buttons use
`text-(--color-steel-soft)`/`border-(--color-ink-soft)` for the inactive
state. Moving `tone` from `"ink"` to `"tint"` (pale blue background) means
**every one of these needs inverting to a dark-on-light equivalent** — e.g.
`text-(--color-paper)` → `text-(--color-ink)`, the `/20` divider → something
like `border-(--color-line-strong)` instead of a paper-tinted border. This
is not optional polish, it's required for the text to be visible at all
against the new light background. Audit every color utility class in this
file (not just the ones named above) and repoint each one so it reads
correctly against a pale-blue/white surface. `--color-signal-soft` and
`--color-signal` (used on the "View all industries" and "Relevant Project"
links) already resolve to legible dark-graphite tones on light backgrounds
via Task 1's redefinition — no change needed there.

**Verification:** `npm run build` clean. Screenshot at all six breakpoints.
Specifically confirm: (a) at least one industry with a real photo and at
least one without both render with the same structural layout via
`TechnicalFrame`, (b) the pale-blue tint background is visibly distinct
from both the pure-white sections around it and the `--color-blueprint-
soft` tint fills used elsewhere, (c) tab/pill keyboard navigation still
works (tab to focus, arrow/enter to switch — check against whatever the
existing pattern actually implements).

## Task 9: `src/components/home/SystemsReveal.tsx` — full light rework, centered

Full light rework: `tone="paper"`. This is the brief's own "SYSTEMS —
centered interactive system selector" language, so it gets the most
structural work of any file in this plan. Do this task last — it depends
on the centered-composition pattern already being proven and committed in
Task 6 (Opening.tsx).

Recompose to a fully centered single column:
- Headline/intro: `max-w-2xl mx-auto text-center`.
- The six-zone stepper pills: centered in a flex row (`justify-center` or
  equivalent).
- The building diagram (SVG): centered underneath, roughly `~720px` max
  width.
- The active-zone detail panel: centered below the diagram,
  `max-w-md mx-auto text-center`.

**Ruling (from plan review — the SVG is more finished than the framing
above assumed; follow this, not a literal re-read of "recolor to X"):**

- The active system trace (`hvac`/`electrical`/`plumbing-public-health`/
  `fire-protection`/`elv-security` cases in `SystemTrace`) already uses
  `stroke="var(--color-signal)"` — Task 1's redefinition alone turns this
  into the graphite active-trace color with **no code change needed** here.
  After implementing, check in your screenshot whether it still reads as
  clearly more prominent than the structural lines (see below); if not,
  you may increase its `strokeWidth` slightly, but do not change which
  token it references.
- The BMS/systems-integration trace (the unnamed final case in
  `SystemTrace`, "the convergence node, drawn last") and the standalone
  amber circle drawn at `step === ZONES.length` already both use
  `var(--color-amber)` — **no code change needed.** Do not recolor the
  BMS system's own radiating lines away from amber to make room for a
  "singular accent" reading — that's pre-existing behavior, not something
  this task redesigns.
- The genuinely stale colors are the **structural building lines**: the
  building outline `rect`'s stroke (currently `--color-steel-soft`), the
  roofline parapet `line`'s stroke (currently `--color-steel-soft`), and
  the floor-divider `line`s (currently `--color-ink-soft`). Repoint all
  three to `--color-blueprint`. The ground `line` (currently
  `--color-steel`) may stay on `--color-steel` or also move to
  `--color-blueprint` — your call, whichever reads better against the new
  white canvas; note which you chose.

Text-color inversion — same issue as Task 8, and there is one real bug to
fix, not just polish: this file is built for a dark background today
(`text-(--color-paper)` on the h2 headline, the active stepper button, the
zone-name h3, and the systems list; `text-(--color-steel-soft)` for
inactive/muted text; `border-(--color-ink-soft)` for inactive borders).
Moving `tone` to `"paper"` requires inverting every one of these to a
dark-on-light equivalent (`text-(--color-paper)` → `text-(--color-ink)`,
etc.) — audit the whole file, not just the lines named here. **The Prev/
Next buttons specifically have a real bug if left as-is:**
`hover:text-(--color-paper)` on those buttons means the hover state turns
the text white, which will be invisible against the new white background.
Fix that hover state to a dark color (e.g. `hover:text-(--color-ink)`) as
part of this task, not as an afterthought.

Preserve exactly: the `ZONE_SLUGS` data wiring, `getServiceBySlug`
lookups, the stepper's keyboard accessibility (tab/arrow/enter behavior —
match whatever the existing implementation does), and
`AnimatePresence mode="wait"` for the crossfade between zone states.

**Verification:** `npm run build` clean. Screenshot at all six breakpoints.
Confirm: true centering at every width (not just centered text on a wide
flex container), the active-zone trace is visually distinct from and more
prominent than the idle structural lines, the amber convergence node
reads as a single small accent rather than a recurring color, keyboard
navigation between zones still works, and `prefers-reduced-motion` still
degrades the crossfade correctly (toggle it via `browser_evaluate` /
`emulateMedia`-equivalent if the Playwright tool supports it, or note if
it doesn't and describe your fallback check).

## Roadmap (not executed in this plan)

- Phase 3: apply the same redefined tokens to internal pages (`/company`,
  `/expertise`, `/industries`, `/service-support`, `/resources`,
  `/contact`), convert Service & Support's full-bleed photo hero to the
  typography-first `PageHero` pattern, wire `--container-max` properly,
  resolve the `--color-signal-tint`/`--color-blueprint-soft` duplication.
- Phase 4: projects index filter UI rework, project detail template
  re-skin, sourcing missing `heroImage`s from `ASSETS/`.
- Phase 5: full-site QA loop (responsive, accessibility, performance).
- Documentation: once the user has seen and approved the rendered result
  of this plan, update `.claude/skills/airtech-digital-experience/SKILL.md`
  §2 to describe this system as canonical. Not part of this plan's tasks.
