# Airtech Blue Reset & Client Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reset Airtech's design system to a single blue primary, restructure navigation/IA, ship the `ClientJourney` centrepiece (homepage compact + `/how-we-work` full), and land the precise content/data edits specified in the design spec — without publishing any unsourced claim.

**Architecture:** Repoint CSS custom properties in `globals.css` first so most components recolor with zero edits (existing `--color-signal`/`--color-amber`/`--color-heritage` usages already point at the right places conceptually). Then a mechanical global sweep removes uppercase/tracked micro-labels. Then structural work (nav, routes, ClientJourney, hero, content, forms, library, careers) layers on top of the now-blue, now-sentence-case base. No test framework exists in this repo (no jest/vitest/playwright config in `package.json`) — verification is `next build` + `next lint` + manual/Playwright-MCP visual QA per the spec's §12 loop, not unit tests.

**Tech Stack:** Next.js 16 (App Router, Cache Components/PPR, Turbopack) — read `node_modules/next/dist/docs/` before writing Next-specific code, per `AGENTS.md`. React 19, Tailwind v4 (`@theme inline` token system), framer-motion, GSAP+ScrollTrigger (hero only), Zod, TypeScript.

**Spec:** `docs/superpowers/specs/2026-08-28-airtech-blue-reset-client-journey-design.md`. Also binding: `.claude/skills/airtech-digital-experience/SKILL.md` (content-truth rules, QA loop), `docs/AIRTECH_OPEN_DECISIONS.md` (gated content), `AGENTS.md`.

## Global Constraints

- **No new claims of any kind.** No capability, statistic, certification, partnership/manufacturer-authorisation, technical/energy-performance claim, or sector requirement may be introduced that isn't already in `source-material/` / the existing `src/content/*.ts` files. Rewording sourced content is fine; inventing content to fill a layout is not. Thin sections stay thin (`embassies-ingos`, `education-institutional` keep empty `technicalRequirements`/`operationalChallenges`).
- **Cold storage / refrigeration is not an Airtech capability** — never add it anywhere.
- **Gated content stays gated**: turnover chart, reference letters, per-logo permission, team headcount, phone number, ISO certificates (`docs/AIRTECH_OPEN_DECISIONS.md`). This pass builds/restyles shells only.
- **No "authorised dealer/distributor" wording** for Mitsubishi Electric / Midea — use the existing neutral `relationshipNote` framing from `src/content/certifications.ts`.
- **`prefers-reduced-motion` respected everywhere** — the global CSS rule in `globals.css` already zeroes all `animation-*`/`transition-*` durations; any framer-motion (JS-driven) animation must additionally branch on `useReducedMotion()` since that CSS rule does not touch framer's JS-driven transitions.
- **Build on the existing uncommitted working-tree changes** — do not revert: `CinematicHero.tsx` sticky-wrapper rework, `ProjectsExplorer.tsx` featured-only + industry `<select>`, +12 projects in `src/content/projects.ts`, `src/components/projects/ProjectCard.tsx`, `src/components/seo/ProjectJsonLd.tsx`, Industries removed from `src/lib/navigation.ts`.
- **Airtech blue is the only accent colour** anywhere after this pass — no gold/bronze/burgundy pixels. The token-repoint strategy (Task 1) achieves this for ~90% of the codebase automatically; do not hand-recolor components that already reference `--color-signal*`/`--color-amber*`/`--color-heritage` — those become blue for free once the token repoint lands.
- **Reviewer diffs `src/content/*.ts` line-by-line against source before merge** (Task 29, Step 7).
- File paths below are relative to the repo root `/Users/tanmay/Documents/airtech`.

---

## Phase 1 — Design-system foundation

### Task 1: Repoint colour tokens, add type scale, retone background wash

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: new CSS custom properties `--color-brand-blue` (`#045c80`), `--color-brand-blue-hover` (`#0a4a67`, NEW), `--color-brand-blue-soft` (`#0099da`, unchanged), `--color-brand-blue-tint` (`#e8f1f6`), `--color-blue-deep` (`#0d2b3e`, NEW), plus repointed `--color-signal`/`--color-signal-soft`/`--color-signal-tint`/`--color-amber`/`--color-amber-soft`/`--color-amber-tint`/`--color-heritage` (all `var(--color-brand-blue...)` aliases), and new type-scale tokens `--text-display-xl`, `--text-display-l`, `--text-display-m`, `--text-title`, `--text-body-l`, `--text-body`, `--text-small`, `--text-label`. Every later task that writes a `text-display-xl`/`text-display-l`/`text-display-m`/`text-title`/`text-body-l`/`text-body`/`text-small`/`text-label` utility class (the plain Tailwind-generated form — see the syntax note below), or `text-(--color-brand-blue-hover)` / `bg-(--color-blue-deep)`, depends on this task landing first.

**Syntax note (binding, added after a defect found during execution — see the plan's SDD ledger):** the type-scale tokens must be referenced via the **plain generated utility class** (`text-display-xl`, `text-label`, etc. — no parens), never via the arbitrary-value shorthand `text-(--text-display-xl)`. Unlike `--color-*` tokens, where `text-(--color-x)` correctly compiles to `color: var(--color-x)`, Tailwind v4's `text-(--var)` shorthand for the `text-*` utility *always* resolves to a `color` declaration regardless of the referenced variable's own namespace — so `text-(--text-display-xl)` compiles to `color: var(--text-display-xl)`, an invalid CSS color value that the browser silently drops, leaving no font-size applied at all. Every occurrence of the size tokens below has already been corrected to the plain-class form throughout this plan.

- [ ] **Step 1: Replace the `:root` token block**

Replace the entire `:root { ... }` block (lines 41–96) with:

```css
:root {
  --color-ink: #161a1f;
  --color-ink-soft: #3a4048;
  --color-paper: #f3f5f7;
  --color-paper-raised: #ffffff;
  --color-steel: #454c55;
  --color-steel-soft: #8b929b;
  --color-line: #e2e6ea;
  --color-line-strong: #c3cbd3;
  --color-blueprint: #496b82;
  --color-blueprint-soft: #8fafc4;

  /* Airtech blue — the single primary accent. --color-brand-blue is a
     deliberate, contrast-tuned UI blue (NOT a sample of the logo mark):
     white text on it and it on --color-paper both clear ~6:1. Logo fidelity
     lives only in --color-brand-blue-soft (the literal #0099DA), used for
     large/decorative/on-dark accents where its ~3:1 is acceptable. A press
     darkens toward --color-brand-blue-hover rather than brightening toward
     the soft/logo blue — see Button.tsx. */
  --color-brand-blue: #045c80;
  --color-brand-blue-hover: #0a4a67;
  --color-brand-blue-soft: #0099da;
  --color-brand-blue-tint: #e8f1f6;
  --color-blue-deep: #0d2b3e;

  /* Repointed, not renamed: every existing --color-signal, --color-amber
     and --color-heritage usage across the codebase becomes Airtech blue
     with zero component edits. A later cleanup commit (out of scope for
     this plan) can rename these call sites to --color-blue directly. */
  --color-signal: var(--color-brand-blue);
  --color-signal-soft: var(--color-brand-blue-soft);
  --color-signal-tint: var(--color-brand-blue-tint);
  --color-amber: var(--color-brand-blue-soft);
  --color-amber-soft: var(--color-brand-blue-soft);
  --color-amber-tint: var(--color-brand-blue-tint);
  --color-heritage: var(--color-brand-blue);

  --color-white: #ffffff;
  --color-pale-blue: #eef4f9;

  --font-display: var(--font-display-face), "Arial Narrow", sans-serif;
  --font-sans: var(--font-plex-sans), system-ui, sans-serif;
  --font-mono: var(--font-plex-mono), ui-monospace, monospace;

  /* Type scale — see the design spec §3.3. display-xl is reserved for the
     hero H1 only; display-l for section H2s; display-m for sub-section/step
     headings. label is the new micro-label size (replaces the old
     font-mono text-xs uppercase tracked pattern). */
  --text-display-xl: clamp(2.75rem, 6vw, 4.5rem);
  --text-display-l: clamp(2.25rem, 4.5vw, 3.5rem);
  --text-display-m: clamp(1.6rem, 3vw, 2.25rem);
  --text-title: 1.25rem;
  --text-body-l: 1.125rem;
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-label: 0.8125rem;

  --container-max: 1440px;
  --container-pad: 1.25rem;
}
```

- [ ] **Step 2: Mirror every new/changed token in `@theme inline`**

Replace the `@theme inline { ... }` block (lines 98–131) with:

```css
@theme inline {
  --color-ink: var(--color-ink);
  --color-ink-soft: var(--color-ink-soft);
  --color-paper: var(--color-paper);
  --color-paper-raised: var(--color-paper-raised);
  --color-steel: var(--color-steel);
  --color-steel-soft: var(--color-steel-soft);
  --color-line: var(--color-line);
  --color-line-strong: var(--color-line-strong);
  --color-blueprint: var(--color-blueprint);
  --color-blueprint-soft: var(--color-blueprint-soft);
  --color-signal: var(--color-signal);
  --color-signal-soft: var(--color-signal-soft);
  --color-signal-tint: var(--color-signal-tint);
  --color-amber: var(--color-amber);
  --color-amber-soft: var(--color-amber-soft);
  --color-amber-tint: var(--color-amber-tint);
  --color-heritage: var(--color-heritage);
  --color-brand-blue: var(--color-brand-blue);
  --color-brand-blue-hover: var(--color-brand-blue-hover);
  --color-brand-blue-soft: var(--color-brand-blue-soft);
  --color-brand-blue-tint: var(--color-brand-blue-tint);
  --color-blue-deep: var(--color-blue-deep);
  --color-white: var(--color-white);
  --color-pale-blue: var(--color-pale-blue);

  --font-display: var(--font-display);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);

  --text-display-xl: var(--text-display-xl);
  --text-display-l: var(--text-display-l);
  --text-display-m: var(--text-display-m);
  --text-title: var(--text-title);
  --text-body-l: var(--text-body-l);
  --text-body: var(--text-body);
  --text-small: var(--text-small);
  --text-label: var(--text-label);

  --radius-none: 0px;
  --radius-xs: 2px;
  --radius-sm: 3px;

  --breakpoint-xs: 360px;
}
```

- [ ] **Step 3: Update the file's leading comment block**

Replace the doc comment at the top of the file (lines 3–39, the "warm heritage" system description) with:

```css
/*
  Airtech design tokens — blue-primary reset (2026-08-28).

  --color-brand-blue is the single primary accent: CTAs, links, focus
  rings, active states, eyebrow accents. It is a deliberate, contrast-tuned
  UI blue, not a literal sample of the logo mark — see the --color-brand-blue
  comment below for the accessibility rationale. --color-brand-blue-soft
  keeps the literal logo blue (#0099DA) for large/decorative/on-dark use
  only, where its lower contrast is acceptable.

  --color-signal, --color-amber and --color-heritage are repointed (not
  removed) so every existing call site across the codebase recolors to blue
  automatically — see the repoint comment in :root below.

  Canvas is a cool architectural off-white (--color-paper), ink is a deep
  cool near-black. Type system unchanged: Oswald (display) + IBM Plex Sans
  (body/UI) + IBM Plex Mono (technical labels — discipline codes, drawing
  references, spec values only; prose eyebrows use --font-sans now, see the
  micro-label reset in the components that consume --text-label).
*/
```

- [ ] **Step 4: Retone the `body::before` background wash**

Find the `body::before` rule and change its `background-image` line to layer a near-opaque paper wash over the existing texture asset, dropping its visible strength to roughly 30–40% of the current level:

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  background-color: var(--color-paper);
  background-image:
    linear-gradient(var(--color-paper) 0 0),
    url(/images/backgrounds/architectural-light.webp);
  background-blend-mode: normal, normal;
  background-size: cover, cover;
  background-position: center top, center top;
  background-repeat: no-repeat, no-repeat;
  pointer-events: none;
}
```

Then add an opacity to the paper layer specifically — since `background-image` gradients don't take a standalone alpha the way a solid overlay div would, use an rgba paper tone instead of the flat `var(--color-paper)` stop so the texture shows through at ~30–40% strength:

```css
background-image:
  linear-gradient(rgba(243, 245, 247, 0.65) 0 0),
  url(/images/backgrounds/architectural-light.webp);
```

(`rgba(243, 245, 247, 0.65)` is `--color-paper` `#f3f5f7` at 65% opacity — leaving the underlying line-art at ~35% visible strength, inside the spec's 30–40% target. Leave `.bg-site-texture` (used by `Section`/`ProjectsPage` etc.) as a separate, unwashed class — it is layered under content that already provides its own contrast, so it is out of scope for this retone.)

- [ ] **Step 5: Update `::selection` and `:focus-visible`**

These already reference `--color-blueprint` and `--color-signal` respectively — leave them as-is (they resolve to the right blue automatically via the repoint in Step 1). No edit needed; just confirm after Step 1 that `:focus-visible { outline: 2px solid var(--color-signal); }` now renders as `#045c80`.

- [ ] **Step 6: Run the build**

```bash
npm run build
```

Expected: clean build, no CSS/type errors. (Tailwind v4 generates new utilities like `text-display-xl`, `text-label`, `bg-brand-blue-hover` etc. from the `@theme inline` additions — confirm no "unknown utility" warnings.)

- [ ] **Step 7: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: repoint design tokens to Airtech-blue primary, add type scale"
```

---

### Task 2: Button.tsx — hover darkens instead of brightens

**Files:**
- Modify: `src/components/ui/Button.tsx`

**Interfaces:**
- Consumes: `--color-brand-blue-hover` from Task 1.
- Produces: no signature change — `Button`/`ButtonLink` props unchanged.

- [ ] **Step 1: Edit the `primary` variant**

Change:

```tsx
  primary: "bg-(--color-brand-blue) text-white hover:bg-(--color-brand-blue-soft)",
```

to:

```tsx
  primary: "bg-(--color-brand-blue) text-white hover:bg-(--color-brand-blue-hover)",
```

Also update the comment above `variants` (lines 12–15) — replace:

```tsx
  // --color-brand-blue is the accessible (~5.3:1) darkened pairing of the
  // literal logo blue --color-brand-blue-soft (see globals.css) — safe for
  // white button-label text. Hovering toward the brighter literal brand
  // blue reads as a "lift" without needing a shadow/animation trick.
```

with:

```tsx
  // --color-brand-blue is the primary UI blue (~6:1 on white — see
  // globals.css). A press/hover darkens toward --color-brand-blue-hover
  // rather than brightening toward the literal logo blue
  // (--color-brand-blue-soft) — a pressed control should read as "pushed
  // in," not "lit up."
```

- [ ] **Step 2: Verify `secondary` and `ghost` variants need no change**

`secondary` and `ghost` already hover to `bg-(--color-brand-blue)`/`text-(--color-ink)` — no brightening behavior there, leave unchanged.

- [ ] **Step 3: Confirm no stray `uppercase`/`tracking` classes**

Re-read `base`, `variants`, `sizes` — none currently contain `uppercase` or `tracking-`. No change needed (satisfies spec §3.3 point 3, this is a verification-only sub-step).

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "fix: Button primary hover darkens toward brand-blue-hover"
```

---

### Task 3: Create `Label.tsx`

**Files:**
- Create: `src/components/ui/Label.tsx`

**Interfaces:**
- Consumes: `--text-label`, `--color-brand-blue`, `--color-steel` from Task 1; `cn` from `@/lib/cn`.
- Produces: `Label({ children, tone, as, className })` — `tone: "accent" | "muted"` (default `"accent"`), `as: "span" | "p" | "div"` (default `"span"`). Used by every new component from Phase 4 onward (`ClientJourney`, Engineering Library, Careers) and optionally by the sweep in Phase 2.

- [ ] **Step 1: Write the component**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The sentence-case micro-label pattern (spec §3.3): small, medium-weight,
 * sans — not the old font-mono uppercase-tracked eyebrow. Mono stays
 * reserved for genuine machine data (discipline codes, drawing references,
 * spec values), not prose labels.
 */
export function Label({
  children,
  tone = "accent",
  as: Tag = "span",
  className,
}: {
  children: ReactNode;
  tone?: "accent" | "muted";
  as?: "span" | "p" | "div";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-sans text-label font-medium",
        tone === "accent" ? "text-(--color-brand-blue)" : "text-(--color-steel)",
        className
      )}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Run the build**

```bash
npm run build
```

Expected: clean (unused-export is fine at this point — nothing consumes `Label` yet).

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/Label.tsx
git commit -m "feat: add Label component for the sentence-case micro-label pattern"
```

---

### Task 4: Create `BluePlaceholder.tsx`, wire into `TechnicalFrame` and `ProjectCard`

**Files:**
- Create: `src/components/ui/BluePlaceholder.tsx`
- Modify: `src/components/ui/TechnicalFrame.tsx`
- Modify: `src/components/projects/ProjectCard.tsx`

**Interfaces:**
- Produces: `BluePlaceholder({ label, className })` — renders a `--color-blue-deep` → `--color-brand-blue` diagonal gradient with faint white line-work and an optional sentence-case label. Consumed by `TechnicalFrame` (replaces `TechnicalPlaceholder`), `ProjectCard`, and later Engineering Library / Careers (Phases 8–9).

- [ ] **Step 1: Write `BluePlaceholder.tsx`**

```tsx
import { cn } from "@/lib/cn";

/**
 * Replaces TechnicalPlaceholder everywhere a photograph is missing. Never
 * renders a fake photo — a graded blue field with faint architectural
 * line-work (a simplified echo of SystemMotif's stroke language) plus an
 * honest, sentence-case caption instead.
 */
export function BluePlaceholder({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("absolute inset-0 flex items-end overflow-hidden p-5", className)}
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--color-blue-deep) 0%, var(--color-brand-blue) 100%)",
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.14]"
        viewBox="0 0 300 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 150 H300 M50 0 V200 M150 0 V200 M250 0 V200 M0 55 H300 M0 105 H300"
          stroke="white"
          strokeWidth={0.75}
          fill="none"
        />
        <circle cx={150} cy={55} r={3} fill="white" />
        <circle cx={250} cy={105} r={3} fill="white" />
      </svg>
      {label && (
        <p className="relative font-sans text-label font-medium text-white/80">
          {label}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Wire into `TechnicalFrame.tsx`**

Replace the `TechnicalPlaceholder` function and its call site. Change:

```tsx
        ) : (
          <TechnicalPlaceholder label={label} />
        )}
```

to:

```tsx
        ) : (
          <BluePlaceholder label={label ? `${label} — photography to follow` : undefined} />
        )}
```

Add the import at the top:

```tsx
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";
```

Delete the now-unused `TechnicalPlaceholder` function entirely (the last ~16 lines of the file).

- [ ] **Step 3: Wire into `ProjectCard.tsx`**

Replace the inlined placeholder `<div>` (the diagonal-hatch fallback):

```tsx
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "var(--color-ink)",
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(245,244,240,0.06) 0px, rgba(245,244,240,0.06) 1px, transparent 1px, transparent 14px)",
          }}
        />
```

with:

```tsx
        <BluePlaceholder />
```

(No label — the card's own bottom text block already names the project; a second label would duplicate it.) Add the import:

```tsx
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";
```

Also update the comment above the placeholder block (it currently references "Same drafting-sheet placeholder language as TechnicalFrame's… inlined rather than reused because…") — replace with:

```tsx
        // Shared BluePlaceholder fallback — same treatment as TechnicalFrame
        // now that both use the blue placeholder system (spec §3.5). No
        // label here: the card's own bottom text block already names the
        // project.
```

- [ ] **Step 4: Run the build**

```bash
npm run build
```

Expected: clean, no unused-import warnings.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/BluePlaceholder.tsx src/components/ui/TechnicalFrame.tsx src/components/projects/ProjectCard.tsx
git commit -m "feat: replace TechnicalPlaceholder with BluePlaceholder"
```

---

### Task 5: Remove per-item `Reveal` stagger in `ProofBar` and `WhatWeDo`

**Files:**
- Modify: `src/components/home/ProofBar.tsx`
- Modify: `src/components/home/WhatWeDo.tsx`

**Interfaces:**
- Consumes: `Reveal` from `@/components/ui/Reveal` (unchanged component).
- Produces: both sections now fade in as one block instead of staggering per child. (`FeaturedProjects`' stagger is handled in Task 19, since that file gets a larger rewrite there.)

- [ ] **Step 1: `ProofBar.tsx` — wrap the whole stat grid in one `Reveal`**

Currently each `STATS` item is individually wrapped: `<Reveal key={stat.label} delay={i * 0.08} className="px-6 py-10 text-center sm:px-8">`. Change the structure so `Reveal` wraps the whole grid once, and the per-item `motion.span` accent-rule delay (`delay: i * 0.08 + 0.25`) collapses to a flat delay since there's no longer a staggered reveal driving it. Replace:

```tsx
          <div className="grid grid-cols-2 divide-x divide-y divide-(--color-line) sm:grid-cols-4 sm:divide-y-0">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="px-6 py-10 text-center sm:px-8">
                <div className="flex items-center justify-center gap-2.5">
                  <StatMotif motif={stat.motif} accent={stat.accent} />
                  <p className="font-display text-4xl sm:text-5xl font-semibold leading-none text-(--color-ink)">
                    <AnimatedStat value={stat.value} />
                  </p>
                </div>
                <motion.span
                  aria-hidden="true"
                  className="mx-auto mt-5 block h-[2px] w-10 origin-center"
                  style={{ backgroundColor: stat.accent }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 + 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
                <p className="mx-auto mt-4 max-w-[11rem] font-mono text-[11px] sm:text-xs leading-relaxed tracking-[0.06em] uppercase text-(--color-steel)">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
```

with:

```tsx
          <Reveal className="grid grid-cols-2 divide-x divide-y divide-(--color-line) sm:grid-cols-4 sm:divide-y-0">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-6 py-10 text-center sm:px-8">
                <div className="flex items-center justify-center gap-2.5">
                  <StatMotif motif={stat.motif} accent={stat.accent} />
                  <p className="font-display text-4xl sm:text-5xl font-semibold leading-none text-(--color-ink)">
                    <AnimatedStat value={stat.value} />
                  </p>
                </div>
                <motion.span
                  aria-hidden="true"
                  className="mx-auto mt-5 block h-[2px] w-10 origin-center"
                  style={{ backgroundColor: stat.accent }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
                <p className="mx-auto mt-4 max-w-[11rem] font-sans text-label leading-relaxed text-(--color-steel)">
                  {stat.label}
                </p>
              </div>
            ))}
          </Reveal>
```

(Note: the `font-mono … tracking-[0.06em] uppercase` → `font-sans text-label` change here is the Task 8 label-reset pattern applied inline since this block is already being rewritten — avoids a second pass over the same lines.)

- [ ] **Step 2: `WhatWeDo.tsx` — wrap the discipline grid in one `Reveal`, drop `motion.div` stagger**

Replace the import of `motion, useReducedMotion` usage for the grid items. Change:

```tsx
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { services } from "@/content/services";
```

to:

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";
```

(Drop `"use client"` — once the per-item `motion.div`/`useReducedMotion` calls are removed in the next step, this component no longer touches any client-only API and can render as a Server Component.)

Replace:

```tsx
export function WhatWeDo() {
  const reduceMotion = useReducedMotion();

  return (
```

with:

```tsx
export function WhatWeDo() {
  return (
```

Replace the grid body:

```tsx
          <div className="grid grid-cols-1 divide-y divide-(--color-line) sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {services.map((service, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <motion.div
                  key={service.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col p-6 sm:p-7"
                >
```

with:

```tsx
          <Reveal className="grid grid-cols-1 divide-y divide-(--color-line) sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {services.map((service, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <div key={service.slug} className="group relative flex flex-col p-6 sm:p-7">
```

and its closing tag, change:

```tsx
                </motion.div>
              );
            })}
          </div>
```

to:

```tsx
                </div>
              );
            })}
          </Reveal>
```

- [ ] **Step 3: Run the build**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 4: Visual check**

```bash
npm run dev
```

Load `/` and confirm the ProofBar stat row and WhatWeDo discipline grid each fade in once as a block (not one child at a time).

- [ ] **Step 5: Commit**

```bash
git add src/components/home/ProofBar.tsx src/components/home/WhatWeDo.tsx
git commit -m "fix: single block fade for ProofBar and WhatWeDo, drop per-item stagger"
```

---

## Phase 2 — Global label + palette sweep

Every task in this phase is the same mechanical transform, applied file by file: **remove `uppercase` and any `tracking-[…]`/`tracking-wide`/`tracking-wider`/`tracking-widest` from every label/eyebrow/breadcrumb/stat-caption/tag/button/tab, and switch its font from `font-mono` to `font-sans` with the new `text-label` size** (unless the text is a genuine discipline code / drawing reference / spec value — those keep `font-mono`, no `uppercase`, no `tracking-`, and are explicitly called out as "leave unchanged" below). Because every prop-driven label string in this codebase is already authored in sentence case (the `uppercase` CSS class was doing the capitalizing), removing the class reveals correct casing with **no text-content edits** — do not rewrite copy in this phase. Colors do not need touching: `--color-signal`/`--color-signal-soft`/`--color-steel` etc. already resolved to blue in Task 1.

The canonical old → new pattern (confirm each file's actual class string against this table — tracking values vary slightly file to file):

| Old (representative) | New |
|---|---|
| `font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)` (eyebrow) | `font-sans text-label font-medium text-(--color-brand-blue)` |
| `font-mono text-[11px] tracking-[0.1em] uppercase text-(--color-steel)` (meta label) | `font-sans text-label font-medium text-(--color-steel)` |
| `font-mono text-xs tracking-[0.05em] uppercase text-(--color-steel)` (breadcrumbs) | `font-sans text-label text-(--color-steel)` |
| `text-xs font-medium uppercase tracking-[0.08em] text-(--color-brand-blue)` (inline link label) | `text-label font-medium text-(--color-brand-blue)` |

**Leave unchanged** (discipline codes / spec data, per spec §3.3): `WhatWeDo.tsx`'s `service.disciplineCode` span (`font-mono text-[11px] font-semibold tracking-[0.08em]`, no `uppercase`), `MEPSequence.tsx`'s `system.code` span (`font-mono text-[11px]`, no `uppercase`/`tracking-`), `expertise/[slug]/page.tsx`'s "Discipline {code}" pattern keeps `font-mono` for the code itself if later split out (not currently split — see Task 8 for the actual edit), `MetadataGrid`/`ProjectDetailPage`'s numeric/spec values, and any `font-mono` used purely for numbers (frame counters, step counters) which may keep `font-mono` but must still drop `tracking-`/`uppercase` if present.

After every task in this phase, the running verification command is:

```bash
grep -rn "tracking-\[\|tracking-wide\|tracking-wider\|tracking-widest" src/ --include="*.tsx" --include="*.ts"
```

Each remaining hit after Phase 2 is complete must be a discipline code / drawing reference / spec value — if it's a prose eyebrow or label, it was missed.

### Task 6: UI primitives label sweep

**Files:**
- Modify: `src/components/ui/SectionHeader.tsx`
- Modify: `src/components/ui/PageHero.tsx`
- Modify: `src/components/ui/Breadcrumbs.tsx`
- Modify: `src/components/ui/TechnicalFrame.tsx`
- Modify: `src/components/ui/MetadataGrid.tsx`
- Modify: `src/components/ui/Tag.tsx`
- Modify: `src/components/ui/EmptyState.tsx`

**Interfaces:**
- Consumes: `--text-label` (Task 1).
- Produces: no prop/signature changes to any of these seven components — this is a pure className edit. Every page using `PageHero`/`SectionHeader`/`Breadcrumbs`/`MetadataGrid`/`EmptyState` (i.e. nearly every route) inherits the fix automatically without further edits to those call sites.

- [ ] **Step 1: `SectionHeader.tsx`**

Change the eyebrow `<p>` className:

```tsx
          className={cn(
            "mb-4 font-mono text-xs tracking-[0.18em] uppercase",
            tone === "ink" ? "text-(--color-signal)" : "text-(--color-signal-soft)"
          )}
```

to:

```tsx
          className={cn(
            "mb-4 font-sans text-label font-medium",
            tone === "ink" ? "text-(--color-brand-blue)" : "text-(--color-brand-blue-soft)"
          )}
```

- [ ] **Step 2: `PageHero.tsx`**

Change:

```tsx
          <p className="mt-8 font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
```

to:

```tsx
          <p className="mt-8 font-sans text-label font-medium text-(--color-brand-blue)">
```

Also change the H1 to use the new type-scale token — replace:

```tsx
        <h1 className="mt-4 max-w-4xl font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.96] text-balance">
```

with:

```tsx
        <h1 className="mt-4 max-w-4xl font-display text-display-xl font-bold leading-[0.96] text-balance">
```

- [ ] **Step 3: `Breadcrumbs.tsx`**

Change:

```tsx
      className={cn("font-mono text-xs tracking-[0.05em] uppercase text-(--color-steel)", className)}
```

to:

```tsx
      className={cn("font-sans text-label text-(--color-steel)", className)}
```

(Call sites in `projects/[slug]/page.tsx` and `expertise/[slug]/page.tsx` pass an additional `className` for dark-background color overrides like `"text-(--color-paper)/70 [&_a]:text-(--color-paper)/70 [&_a:hover]:text-(--color-paper)"` — `cn()` merges these onto the new base, no call-site edit needed.)

- [ ] **Step 4: `TechnicalFrame.tsx` figcaption**

Change:

```tsx
        <figcaption className="mt-2 font-mono text-[11px] tracking-[0.06em] uppercase text-(--color-steel)">
```

to:

```tsx
        <figcaption className="mt-2 font-sans text-label text-(--color-steel)">
```

(This is in addition to the `TechnicalPlaceholder` → `BluePlaceholder` swap already done in Task 4 — that task deleted the old placeholder's own uppercase caption entirely, so no double-edit here.)

- [ ] **Step 5: `MetadataGrid.tsx`**

Change:

```tsx
          <dt className="font-mono text-[11px] tracking-[0.1em] uppercase text-(--color-steel)">
```

to:

```tsx
          <dt className="font-sans text-label font-medium text-(--color-steel)">
```

- [ ] **Step 6: `Tag.tsx`**

Change:

```tsx
        "inline-flex items-center border border-(--color-line-strong) px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] uppercase text-(--color-steel)",
```

to:

```tsx
        "inline-flex items-center border border-(--color-line-strong) px-2.5 py-1 font-sans text-label text-(--color-steel)",
```

- [ ] **Step 7: `EmptyState.tsx`**

Change:

```tsx
      <p className="font-mono text-xs tracking-[0.14em] uppercase text-(--color-signal)">{title}</p>
```

to:

```tsx
      <p className="font-sans text-label font-medium text-(--color-brand-blue)">{title}</p>
```

- [ ] **Step 8: Run the build and grep-verify**

```bash
npm run build
grep -n "tracking-\[\|uppercase" src/components/ui/SectionHeader.tsx src/components/ui/PageHero.tsx src/components/ui/Breadcrumbs.tsx src/components/ui/TechnicalFrame.tsx src/components/ui/MetadataGrid.tsx src/components/ui/Tag.tsx src/components/ui/EmptyState.tsx
```

Expected: build clean; grep returns no matches.

- [ ] **Step 9: Commit**

```bash
git add src/components/ui/SectionHeader.tsx src/components/ui/PageHero.tsx src/components/ui/Breadcrumbs.tsx src/components/ui/TechnicalFrame.tsx src/components/ui/MetadataGrid.tsx src/components/ui/Tag.tsx src/components/ui/EmptyState.tsx
git commit -m "fix: sentence-case micro-labels across UI primitives"
```

---

### Task 7: Layout label sweep (`Footer`, `HeaderShell`)

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/layout/HeaderShell.tsx`

- [ ] **Step 1: `Footer.tsx` — tagline**

Change:

```tsx
            <p className="mt-3 font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel-soft)">
              {siteSettings.tagline}
            </p>
```

to:

```tsx
            <p className="mt-3 font-sans text-label font-medium text-(--color-steel-soft)">
              {siteSettings.tagline}
            </p>
```

- [ ] **Step 2: `Footer.tsx` — nav group titles**

Change:

```tsx
              <h3 className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel-soft)">
```

to:

```tsx
              <h3 className="font-sans text-label font-medium text-(--color-steel-soft)">
```

- [ ] **Step 3: `Footer.tsx` — bottom bar location line**

Change:

```tsx
          <p className="font-mono uppercase tracking-[0.08em]">Kathmandu, Nepal</p>
```

to:

```tsx
          <p className="font-sans text-label">Kathmandu, Nepal</p>
```

- [ ] **Step 4: `HeaderShell.tsx` — tagline**

Change:

```tsx
          <span className="hidden sm:inline font-mono text-[10px] tracking-[0.14em] uppercase text-(--color-steel)">
```

to:

```tsx
          <span className="hidden sm:inline font-sans text-label text-(--color-steel)">
```

- [ ] **Step 5: Run the build, grep-verify, commit**

```bash
npm run build
grep -n "tracking-\[\|uppercase" src/components/layout/Footer.tsx src/components/layout/HeaderShell.tsx
git add src/components/layout/Footer.tsx src/components/layout/HeaderShell.tsx
git commit -m "fix: sentence-case micro-labels in Footer and HeaderShell"
```

---

### Task 8: Home components (in-use) label sweep + MEPSequence contrast fix

**Files:**
- Modify: `src/components/home/MEPSequence.tsx`
- Modify: `src/components/home/FeaturedProjects.tsx`
- Modify: `src/components/home/TrustedBy.tsx`

Note: `ProofBar.tsx` and `WhatWeDo.tsx` labels were already fixed inline in Task 5 (their rewrite touched the same lines). `EngineeringStatement.tsx` has no uppercase/tracked text currently and is fully rewritten in Task 18 (Phase 5) — skip it here. `SolutionsExperience.tsx` is deleted in Task 16 — skip it. `CinematicHero.tsx` has no label text in the current version and gets its headline layer added in Task 17 — skip it here.

- [ ] **Step 1: `MEPSequence.tsx` — kicker label**

Change:

```tsx
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-(--color-brand-blue)">
          Five disciplines. One delivery.
        </p>
```

to:

```tsx
        <p className="font-sans text-label font-medium text-(--color-brand-blue)">
          Five disciplines. One delivery.
        </p>
```

(Leave the `system.code` span — `font-mono text-[11px] transition-colors duration-300` — untouched: it is the discipline-code exception.)

- [ ] **Step 2: `MEPSequence.tsx` — inactive-label contrast fix**

The design spec (§6.5) describes a "near-invisible faint-on-canvas discipline text… `text-(--color-ink)/25`-ish under a scroll-draw" and attributes it to `expertise/page.tsx`. That text does not exist in `expertise/page.tsx` in this codebase — the only `ink)/25` match in `src/` is here, in `MEPSequence.tsx`'s inactive discipline-label state (which is exactly "faint text under a scroll-driven reveal"). Apply the fix here instead. Change:

```tsx
                  <span
                    className={`font-display text-4xl sm:text-5xl font-semibold tracking-tight transition-colors duration-300 ${
                      isActive ? "text-(--color-brand-blue)" : "text-(--color-ink)/25"
                    }`}
                  >
```

to:

```tsx
                  <span
                    className={`font-display text-4xl sm:text-5xl font-semibold tracking-tight transition-colors duration-300 ${
                      isActive ? "text-(--color-brand-blue)" : "text-(--color-steel)"
                    }`}
                  >
```

- [ ] **Step 3: `FeaturedProjects.tsx` — kicker label**

Change:

```tsx
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-brand-blue)">
            Featured Projects
          </p>
```

to:

```tsx
          <p className="font-sans text-label font-medium text-(--color-brand-blue)">
            Featured projects
          </p>
```

(Note the text-content change here: `Featured Projects` → `Featured projects` — this is the one spot where the source string itself was authored in title case rather than relying on CSS transform, since removing `uppercase` would otherwise leave "Featured Projects" title-cased rather than sentence-cased. This is a casing-only edit, not a copy change.)

The rest of `FeaturedProjects.tsx` (the `01 / 08` counter, the per-card sector eyebrow, the numbering badge) is rewritten wholesale in Task 19 (Phase 5) — do not hand-edit those lines here, they'll be superseded.

- [ ] **Step 4: `TrustedBy.tsx` — kicker label**

Change:

```tsx
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-(--color-brand-blue)">
            Trusted by
          </p>
```

to:

```tsx
          <p className="font-sans text-label font-medium text-(--color-brand-blue)">
            Trusted by
          </p>
```

- [ ] **Step 5: Run the build, grep-verify, commit**

```bash
npm run build
grep -n "tracking-\[\|uppercase" src/components/home/MEPSequence.tsx src/components/home/FeaturedProjects.tsx src/components/home/TrustedBy.tsx
git add src/components/home/MEPSequence.tsx src/components/home/FeaturedProjects.tsx src/components/home/TrustedBy.tsx
git commit -m "fix: sentence-case labels + MEPSequence inactive-state contrast fix"
```

(`FeaturedProjects.tsx` will still show remaining `tracking-[…]` hits from its counter/badge — expected, cleaned up in Task 19.)

---

### Task 9: Projects components label sweep

**Files:**
- Modify: `src/components/projects/ProjectCard.tsx`
- Modify: `src/components/projects/ProjectFeatureRow.tsx`
- Modify: `src/components/projects/ProjectListRow.tsx`

- [ ] **Step 1: `ProjectCard.tsx`**

Change:

```tsx
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-(--color-signal-soft)">
          {industryName ?? project.projectType}
        </p>
```

to:

```tsx
        <p className="font-sans text-label font-medium text-(--color-brand-blue-soft)">
          {industryName ?? project.projectType}
        </p>
```

- [ ] **Step 2: `ProjectFeatureRow.tsx`**

Change:

```tsx
      <p className={cn("font-mono text-xs tracking-[0.14em] uppercase", dark ? "text-(--color-signal-soft)" : "text-(--color-signal)")}>
        {String(index).padStart(2, "0")} · {industryName ?? project.projectType}
      </p>
```

to:

```tsx
      <p className={cn("font-sans text-label font-medium", dark ? "text-(--color-brand-blue-soft)" : "text-(--color-brand-blue)")}>
        {String(index).padStart(2, "0")} · {industryName ?? project.projectType}
      </p>
```

- [ ] **Step 3: `ProjectListRow.tsx`**

Change:

```tsx
        <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-(--color-signal)">
          {industryName ?? project.projectType}
        </p>
```

to:

```tsx
        <p className="font-sans text-label font-medium text-(--color-brand-blue)">
          {industryName ?? project.projectType}
        </p>
```

- [ ] **Step 4: Run the build, grep-verify, commit**

```bash
npm run build
grep -n "tracking-\[\|uppercase" src/components/projects/ProjectCard.tsx src/components/projects/ProjectFeatureRow.tsx src/components/projects/ProjectListRow.tsx
git add src/components/projects/ProjectCard.tsx src/components/projects/ProjectFeatureRow.tsx src/components/projects/ProjectListRow.tsx
git commit -m "fix: sentence-case labels across project row/card components"
```

---

### Task 10: Route pages label sweep

**Files:**
- Modify: `src/app/(site)/expertise/[slug]/page.tsx`
- Modify: `src/app/(site)/expertise/page.tsx`
- Modify: `src/app/(site)/industries/page.tsx`
- Modify: `src/app/(site)/projects/page.tsx`
- Modify: `src/app/(site)/projects/[slug]/page.tsx`
- Modify: `src/app/(site)/service-support/page.tsx`
- Modify: `src/app/(site)/company/history/page.tsx`
- Modify: `src/app/(site)/company/leadership/page.tsx`
- Modify: `src/app/(site)/contact/page.tsx`
- Modify: `src/app/(site)/error.tsx`
- Modify: `src/app/(site)/not-found.tsx`
- Modify: `src/app/(site)/loading.tsx`
- Modify: `src/app/not-found.tsx` (root-level 404, distinct from the `(site)/` one above — added during execution, see SDD ledger Task 10 ruling)
- Modify: `src/app/global-error.tsx` (root-level error boundary; hardcodes literal hex since it can't rely on `globals.css` having loaded — added during execution, see SDD ledger Task 10 ruling)

(`industries/[slug]/page.tsx` is rewritten in Task 21 (Phase 6) — its labels are fixed there, skip here. `company/page.tsx` and `company/quality-certifications/page.tsx` use only `SectionHeader`/`PageHero`, already fixed by Task 6 — no direct edit needed, verify only. `company/careers/page.tsx` is fully rewritten in Task 29 (Phase 9) — skip here. `contact/project-enquiry/page.tsx` renders only `PageHero` + `EnquiryForm` (no own label markup) — no edit needed.)

- [ ] **Step 1: `expertise/[slug]/page.tsx`**

Change:

```tsx
          <p className="mt-8 font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal-soft)">
            Discipline {service.disciplineCode}
          </p>
```

to:

```tsx
          <p className="mt-8 font-sans text-label font-medium text-(--color-brand-blue-soft)">
            Discipline <span className="font-mono">{service.disciplineCode}</span>
          </p>
```

(The discipline code itself stays `font-mono` per the discipline-code exception; the surrounding "Discipline" word and the label's size/weight/tracking follow the new sentence-case pattern.)

- [ ] **Step 2: `expertise/page.tsx`**

Change:

```tsx
                {service.subServices.length > 0 && (
                  <p className="mt-4 font-mono text-[11px] tracking-[0.06em] uppercase text-(--color-steel)">
                    {service.subServices.slice(0, 5).join(" · ")}
                  </p>
                )}
```

to:

```tsx
                {service.subServices.length > 0 && (
                  <p className="mt-4 font-sans text-label text-(--color-steel)">
                    {service.subServices.slice(0, 5).join(" · ")}
                  </p>
                )}
```

Also change the "Learn more"-style discipline code span — this one has no `uppercase`/`tracking-` (`font-mono text-sm text-(--color-signal) shrink-0`), leave unchanged (discipline-code exception).

- [ ] **Step 3: `industries/page.tsx`**

Change:

```tsx
                {industry.operationalChallenges.length > 0 && (
                  <p className="mt-4 font-mono text-[11px] tracking-[0.06em] uppercase text-(--color-steel)">
                    {industry.operationalChallenges[0]}
                  </p>
                )}
```

to:

```tsx
                {industry.operationalChallenges.length > 0 && (
                  <p className="mt-4 font-sans text-label text-(--color-steel)">
                    {industry.operationalChallenges[0]}
                  </p>
                )}
```

- [ ] **Step 4: `projects/page.tsx`**

Change:

```tsx
          <p className="mt-10 font-mono text-xs tracking-[0.2em] uppercase text-(--color-signal)">
            Projects
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.92] text-balance">
```

to:

```tsx
          <p className="mt-10 font-sans text-label font-medium text-(--color-brand-blue)">
            Projects
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-display-xl font-bold leading-[0.92] text-balance">
```

(The "Browse by industry" band is added to this same file in Task 22 — that task appends a new section, it does not touch these lines again.)

- [ ] **Step 5: `projects/[slug]/page.tsx`**

There are two `font-mono … uppercase` label spots. Change:

```tsx
            <h2 className="font-mono text-xs tracking-[0.1em] uppercase text-(--color-signal)">
              {section.label}
            </h2>
```

to:

```tsx
            <h2 className="font-sans text-label font-medium text-(--color-brand-blue)">
              {section.label}
            </h2>
```

And change:

```tsx
            <footer className="mt-6 font-mono text-xs tracking-[0.06em] uppercase text-(--color-steel)">
```

to:

```tsx
            <footer className="mt-6 font-sans text-label text-(--color-steel)">
```

And the closing CTA eyebrow:

```tsx
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
          {industry ? `Planning a ${industry.name.toLowerCase()} project?` : "Have a project in planning?"}
        </p>
```

to:

```tsx
        <p className="font-sans text-label font-medium text-(--color-brand-blue)">
          {industry ? `Planning a ${industry.name.toLowerCase()} project?` : "Have a project in planning?"}
        </p>
```

- [ ] **Step 6: `service-support/page.tsx`**

Three spots. Change:

```tsx
          <p className="mt-8 font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
            After the handover
          </p>
```

to:

```tsx
          <p className="mt-8 font-sans text-label font-medium text-(--color-brand-blue)">
            After the handover
          </p>
```

Change:

```tsx
        <p className="mt-10 font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel)">
          Engineers trained at manufacturer centres: {trainingLocations.join(" · ")}
        </p>
```

to:

```tsx
        <p className="mt-10 font-sans text-label text-(--color-steel)">
          Engineers trained at manufacturer centres: {trainingLocations.join(" · ")}
        </p>
```

Change:

```tsx
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
          Existing Airtech customer?
        </p>
```

to:

```tsx
        <p className="font-sans text-label font-medium text-(--color-brand-blue)">
          Existing Airtech customer?
        </p>
```

- [ ] **Step 7: `company/history/page.tsx`**

Change:

```tsx
              <p className="font-mono text-sm text-(--color-signal)">{m.year}</p>
```

Leave this one — it's a bare year number with no `uppercase`/`tracking-`, not in scope for this sweep. No edit needed for this file; verify only.

- [ ] **Step 8: `company/leadership/page.tsx`**

Change:

```tsx
              <p className="mt-2 font-mono text-xs tracking-[0.1em] uppercase text-(--color-signal)">
                {person.role}
              </p>
```

to:

```tsx
              <p className="mt-2 font-sans text-label font-medium text-(--color-brand-blue)">
                {person.role}
              </p>
```

- [ ] **Step 9: `contact/page.tsx`**

Two spots using `<h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-(--color-steel)">` (labels "Head office", "Email", "Response time" — three `<h2>` elements, same class repeated). Change each occurrence of:

```tsx
              <h2 className="font-mono text-[11px] tracking-[0.1em] uppercase text-(--color-steel)">
```

to:

```tsx
              <h2 className="font-sans text-label font-medium text-(--color-steel)">
```

(Three occurrences in this file — "Head office", "Email", "Response time" headings — apply the same replacement to each.)

- [ ] **Step 10: `error.tsx`, `not-found.tsx`, `loading.tsx`**

Change (`error.tsx`):

```tsx
        <p className="font-mono text-xs tracking-[0.14em] uppercase text-(--color-signal)">Error</p>
```

to:

```tsx
        <p className="font-sans text-label font-medium text-(--color-brand-blue)">Error</p>
```

Change (`not-found.tsx`):

```tsx
        <p className="font-mono text-xs tracking-[0.14em] uppercase text-(--color-signal)">404</p>
```

to:

```tsx
        <p className="font-mono text-label text-(--color-brand-blue)">404</p>
```

("404" is a code-like numeral, kept `font-mono` deliberately — but drop `tracking-`/`uppercase` per the sweep.)

Change (`loading.tsx`):

```tsx
      <div className="flex items-center gap-3 font-mono text-xs tracking-[0.1em] uppercase text-(--color-steel)">
```

to:

```tsx
      <div className="flex items-center gap-3 font-sans text-label text-(--color-steel)">
```

- [ ] **Step 11: Run the build**

```bash
npm run build
```

- [ ] **Step 12: Grep-verify across the whole route sweep**

```bash
grep -rn "tracking-\[\|tracking-wide\|tracking-wider\|tracking-widest" src/app --include="*.tsx"
```

Expected: no matches outside files still pending later phases (`industries/[slug]/page.tsx` → Task 21, `company/careers/page.tsx` → Task 29). Confirm those are the only remaining hits.

- [ ] **Step 13: Commit**

```bash
git add src/app/\(site\)/expertise src/app/\(site\)/industries/page.tsx src/app/\(site\)/projects src/app/\(site\)/service-support src/app/\(site\)/company/history src/app/\(site\)/company/leadership src/app/\(site\)/contact/page.tsx src/app/\(site\)/error.tsx src/app/\(site\)/not-found.tsx src/app/\(site\)/loading.tsx
git commit -m "fix: sentence-case labels across route pages"
```

- [ ] **Step 14: Full-site screenshot checkpoint**

Per the spec's §12 QA loop, run this checkpoint now before moving to Phase 3: start `npm run dev`, then use the Playwright MCP tools (`browser_navigate`, `browser_resize`, `browser_take_screenshot`) to capture `/`, `/expertise`, `/expertise/hvac`, `/industries`, `/projects`, `/contact` at desktop (1440px), tablet (768px), and mobile (390px) widths. Confirm: no `UPPERCASE`-styled labels remain anywhere except discipline codes (M/E/PHE/FP/ELV) and the `404` numeral; every accent colour reads as Airtech blue, not gold/bronze/burgundy.

---

## Phase 3 — Navigation & routing

### Task 11: `navigation.ts` — 5-item primary nav, Company dropdown, footer nav

**Files:**
- Modify: `src/lib/navigation.ts`

**Interfaces:**
- Produces: `primaryNav: NavGroup[]` now has 5 top-level entries (`How We Work`, `Expertise`, `Projects`, `Service & Support`, `Company`); `Company`'s `children` grows to 6 entries (adds Engineering Library, Careers). `footerNav` swaps "Resources" for "Engineering Library" and adds a "How We Work" link. Consumed by `HeaderShell.tsx` (`primaryNav`) and `Footer.tsx` (`footerNav`) — both already import from this module, no change needed there.
- Note: `/how-we-work` and `/engineering-library` do not exist as routes yet at this point in the plan — Task 12 creates both in this same phase, immediately after. Do not run `next build` between Task 11 and Task 12 with `typedRoutes: true` still pointing nav links at nonexistent routes; do both tasks' file changes before building.

- [ ] **Step 1: Replace `primaryNav`**

Change:

```ts
export const primaryNav: NavGroup[] = [
  {
    label: "Expertise",
    href: "/expertise",
    children: services.map((s) => ({
      label: s.name,
      href: `/expertise/${s.slug}`,
      description: s.shortDescription,
    })),
  },
  { label: "Projects", href: "/projects" },
  { label: "Service & Support", href: "/service-support" },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About", href: "/company" },
      { label: "History", href: "/company/history" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Quality & Certifications", href: "/company/quality-certifications" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
  { label: "Resources", href: "/resources" },
];
```

to:

```ts
export const primaryNav: NavGroup[] = [
  { label: "How We Work", href: "/how-we-work" },
  {
    label: "Expertise",
    href: "/expertise",
    children: services.map((s) => ({
      label: s.name,
      href: `/expertise/${s.slug}`,
      description: s.shortDescription,
    })),
  },
  { label: "Projects", href: "/projects" },
  { label: "Service & Support", href: "/service-support" },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About", href: "/company" },
      { label: "History", href: "/company/history" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Quality & Certifications", href: "/company/quality-certifications" },
      { label: "Engineering Library", href: "/engineering-library" },
      { label: "Careers", href: "/company/careers" },
    ],
  },
];
```

- [ ] **Step 2: Update `footerNav`**

In the `Company` group's `links`, change:

```ts
      { label: "Careers", href: "/company/careers" },
      { label: "Resources", href: "/resources" },
```

to:

```ts
      { label: "Engineering Library", href: "/engineering-library" },
      { label: "Careers", href: "/company/careers" },
      { label: "How We Work", href: "/how-we-work" },
```

- [ ] **Step 3: Update the file's leading comment**

The comment at the top (lines 4–9) still accurately describes why Industries isn't top-level — leave it. No change needed there.

- [ ] **Step 4: Run the build after Task 12 lands (see Task 12 Step 6)**

Do not build yet — `/how-we-work` and `/engineering-library` don't exist until Task 12. Proceed directly to Task 12.

---

### Task 12: `/resources` → `/engineering-library` rename + redirects + sitemap + `/how-we-work` stub

**Files:**
- Create: `src/app/(site)/engineering-library/page.tsx` (moved content from `resources/page.tsx`, updated)
- Create: `src/app/(site)/engineering-library/[slug]/page.tsx` (moved content from `resources/[slug]/page.tsx`, updated)
- Delete: `src/app/(site)/resources/page.tsx`
- Delete: `src/app/(site)/resources/[slug]/page.tsx`
- Create: `src/app/(site)/how-we-work/page.tsx` (stub — full `ClientJourney` wiring lands in Task 16)
- Modify: `next.config.ts`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Produces: routes `/engineering-library`, `/engineering-library/[slug]`, `/how-we-work` now resolve; `/resources` and `/resources/:slug*` permanently redirect. `sitemap.ts` lists the new routes instead of the old ones.

- [ ] **Step 1: Create `src/app/(site)/engineering-library/page.tsx`**

Same content as the current `resources/page.tsx`, with copy/breadcrumb updated to "Engineering Library" and the label-sweep pattern already applied (this file is new, so write it directly in the target pattern rather than sweeping it later):

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Engineering Library",
  description:
    "Technical documentation for consultants, architects and specifiers: discipline capability decks, company profile and certifications from Airtech's engineering team.",
};

export default function EngineeringLibraryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Engineering Library" }]}
        eyebrow="Engineering library"
        heading="Technical documentation for consultants and specifiers."
        description="Discipline capability decks, company documents and certifications — published as Airtech supplies the source files."
      />
      <Section>
        {resources.length > 0 ? (
          <div>{/* resource list renders here once content exists */}</div>
        ) : (
          <EmptyState
            title="Library in progress"
            description="Technical documentation is being prepared for publication. Contact us directly for anything you need in the meantime."
          />
        )}
      </Section>
    </>
  );
}
```

(This placeholder body is superseded by Task 27 in Phase 8, which adds the real filterable list once `resources.ts` is seeded by Task 26 — left minimal here since `resources` is still empty at this point in the plan.)

- [ ] **Step 2: Create `src/app/(site)/engineering-library/[slug]/page.tsx`**

Same as current `resources/[slug]/page.tsx`, breadcrumb updated:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { getResourceBySlug } from "@/content/resources";

// No generateStaticParams: src/content/resources.ts entries are all
// status: "source_only" with no fileUrl/body until Task 26 seeds real
// placeholder entries (Phase 8) — this route resolves on demand.

export async function generateMetadata({
  params,
}: PageProps<"/engineering-library/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return { title: resource.seo.title, description: resource.seo.description };
}

export default async function EngineeringLibraryDetailPage({
  params,
}: PageProps<"/engineering-library/[slug]">) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Engineering Library", href: "/engineering-library" },
          { label: resource.title },
        ]}
        eyebrow={resource.kind}
        heading={resource.title}
        description={resource.summary}
      />
      <Section>
        <div className="max-w-2xl text-(--color-ink) leading-relaxed">
          {resource.body ?? "Content coming soon."}
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 3: Delete the old `resources/` route directory**

```bash
rm -rf "src/app/(site)/resources"
```

- [ ] **Step 4: Create the `/how-we-work` stub**

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "Airtech's project lifecycle: from the first conversation through engineering, procurement, execution, testing and commissioning, to long-term support.",
};

// Stub — Task 16 (Phase 4) replaces the EmptyState below with
// <ClientJourney variant="full" /> once the component and its data exist.
export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How We Work" }]}
        eyebrow="How we work"
        heading="One partner, the whole lifecycle."
        description="Airtech is a single engineering partner across the whole project lifecycle — from the first conversation to long-term support."
      />
      <Section>
        <EmptyState title="Lifecycle detail in progress" />
      </Section>
    </>
  );
}
```

- [ ] **Step 5: Add redirects in `next.config.ts`**

Add a `redirects` async function to the config object:

```ts
import type { NextConfig } from "next";
import { sanity } from "next-sanity/live/cache-life";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: { default: sanity },
  experimental: {
    // Default 1MB is too small for the project-enquiry form's document
    // upload (drawings/PDFs). See src/app/(site)/contact/actions.ts.
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  typedRoutes: true,
  async redirects() {
    return [
      { source: "/resources", destination: "/engineering-library", permanent: true },
      { source: "/resources/:slug*", destination: "/engineering-library/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 6: Update `sitemap.ts`**

The `import { resources } from "@/content/resources";` line stays exactly as-is — `resources` content still lives at `@/content/resources`, only the route path built from it changes below. Do not edit that import line. In `staticRoutes`, change:

```ts
    "/resources",
```

to:

```ts
    "/how-we-work",
    "/engineering-library",
```

And change the `resourceRoutes` mapping:

```ts
  const resourceRoutes = resources.map((r) => ({
    url: `${siteUrl}/resources/${r.slug}`,
    lastModified: new Date(),
  }));
```

to:

```ts
  const resourceRoutes = resources.map((r) => ({
    url: `${siteUrl}/engineering-library/${r.slug}`,
    lastModified: new Date(),
  }));
```

- [ ] **Step 7: Run the build**

```bash
npm run build
```

Expected: clean. `typedRoutes: true` will now recognize `/how-we-work` and `/engineering-library` as valid `Route` values for the `navigation.ts` changes from Task 11.

- [ ] **Step 8: Manual redirect check**

```bash
npm run dev
```

In another terminal:

```bash
curl -sI http://localhost:3000/resources | grep -i "location\|HTTP"
curl -sI http://localhost:3000/resources/some-slug | grep -i "location\|HTTP"
```

Expected: `308` (permanent redirect) to `/engineering-library` and `/engineering-library/some-slug` respectively.

- [ ] **Step 9: Commit**

```bash
git add src/lib/navigation.ts "src/app/(site)/engineering-library" "src/app/(site)/how-we-work" next.config.ts src/app/sitemap.ts
git status
git add -u
git commit -m "feat: 5-item nav, /how-we-work stub, rename /resources to /engineering-library with redirects"
```

(Use `git status` first to confirm the deleted `resources/` directory is staged as a deletion alongside the new files.)

---

## Phase 4 — ClientJourney

This is the site's interactive centrepiece: **one component, one data file, one set of six steps**, rendered as `variant="compact"` on the homepage and `variant="full"` on `/how-we-work`. The canonical lifecycle (spec §7): Understand → Engineer → Procure → Execute → Test & Commission → Support, mapping 1:1 onto the sourced Engineering → Procurement → Installation → Testing → Commissioning → Long-term-support lifecycle (step 1 is the discovery front-end of that same lifecycle).

### Task 13: `src/content/journey.ts`

**Files:**
- Create: `src/content/journey.ts`

**Interfaces:**
- Produces: `interface JourneyStep`, `journeySteps: JourneyStep[]` (6 entries), `journeyIntro: string`. Consumed by `ClientJourney.tsx` (Task 15).

- [ ] **Step 1: Write the file**

```ts
export interface JourneyStep {
  index: number;
  label: string;
  sentence: string;
  subLabel: string;
  description: string;
  points: string[];
  visual: "conversation" | "engineer" | "procure" | "site" | "commission" | "support";
}

/**
 * The canonical Airtech project lifecycle (spec §7): Engineering ->
 * Procurement -> Installation -> Testing -> Commissioning -> Long-term
 * support, with step 1 (Understand) as the discovery front-end of that same
 * lifecycle. One data file for both the homepage (compact) and
 * /how-we-work (full) renderings of ClientJourney — no second lifecycle
 * definition anywhere.
 */
export const journeySteps: JourneyStep[] = [
  {
    index: 1,
    label: "Understand",
    sentence: "Every project begins with a conversation.",
    subLabel: "Discovery & brief",
    description: "We understand your building, requirements, timelines and challenges.",
    points: ["Project brief", "Site & context", "Client requirements", "Coordination requirements"],
    visual: "conversation",
  },
  {
    index: 2,
    label: "Engineer",
    sentence: "We engineer the solution.",
    subLabel: "Design & technical planning",
    description: "Our team translates requirements into practical, efficient MEP solutions.",
    points: ["System design", "Engineering calculations", "Equipment selection", "Cross-discipline coordination"],
    visual: "engineer",
  },
  {
    index: 3,
    label: "Procure",
    sentence: "We source and supply.",
    subLabel: "Procurement & logistics",
    description:
      "The right equipment, sourced from trusted manufacturers and delivered when the project needs it.",
    points: ["Equipment & material sourcing", "Supplier coordination", "Project procurement & logistics"],
    visual: "procure",
  },
  {
    index: 4,
    label: "Execute",
    sentence: "We bring it to site.",
    subLabel: "Installation & execution",
    description:
      "From equipment placement to ducting, piping and electrical integration, our teams coordinate the system on site.",
    points: ["Installation", "Site coordination", "MEP integration"],
    visual: "site",
  },
  {
    index: 5,
    label: "Test & Commission",
    sentence: "We test. We commission.",
    subLabel: "Performance & handover",
    description: "We don't simply install a system. We ensure it performs as designed.",
    points: ["Testing", "Balancing & checks where applicable", "Commissioning", "Handover"],
    visual: "commission",
  },
  {
    index: 6,
    label: "Support",
    sentence: "We stay with you.",
    subLabel: "After-sales & long-term support",
    description: "Because our relationship doesn't end when the project is handed over.",
    points: ["After-sales", "Maintenance", "AMC", "Technical support"],
    visual: "support",
  },
];

export const journeyIntro =
  "Airtech is a single engineering partner across the whole project lifecycle — from the first conversation to long-term support.";
```

- [ ] **Step 2: Run the build**

```bash
npm run build
```

Expected: clean (unused export is fine — nothing consumes this yet).

- [ ] **Step 3: Commit**

```bash
git add src/content/journey.ts
git commit -m "feat: add canonical ClientJourney lifecycle data"
```

---

### Task 14: Journey step visuals

**Files:**
- Create: `src/components/journey/visuals/Conversation.tsx`
- Create: `src/components/journey/visuals/Engineer.tsx`
- Create: `src/components/journey/visuals/Procure.tsx`
- Create: `src/components/journey/visuals/Site.tsx`
- Create: `src/components/journey/visuals/Commission.tsx`
- Create: `src/components/journey/visuals/Support.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `--color-brand-blue`, `--color-brand-blue-soft`, `--color-line-strong`, `--text-label` (Task 1); `partners` from `@/content/certifications` (existing, unchanged).
- Produces: six named-exported components (`Conversation`, `Engineer`, `Procure`, `Site`, `Commission`, `Support`), each with the signature `({ active }: { active: boolean })`, one per file, so `ClientJourney.tsx` (Task 15) can import each by name from its own path. None of these files need `"use client"` — they use only CSS animations (gated by a conditional class on the `active` prop), the same pattern already used by `DisciplineMotif` in `MEPSequence.tsx` and `StatMotif` in `ProofBar.tsx`. `prefers-reduced-motion` is handled for free by the global CSS rule in `globals.css` that zeroes all `animation-duration`s — no per-component `useReducedMotion()` branching needed.

- [ ] **Step 1: Add two new keyframes to `globals.css`**

Append after the existing `@keyframes advisory-scan` block (end of file):

```css
/* ClientJourney step visuals (spec §7.3) — two new loops beyond the
   existing discipline-motif keyframes above. Both respect the global
   prefers-reduced-motion rule automatically since it zeroes every
   animation-duration. */
@keyframes engineer-crossfade {
  0%, 20% { opacity: 1; }
  25%, 100% { opacity: 0; }
}
.animate-engineer-crossfade {
  animation-name: engineer-crossfade;
  animation-duration: 8s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* Uses pathLength="1" on the target <circle> so stroke-dashoffset is a
   0..1 fraction regardless of the circle's real radius/circumference. */
@keyframes gauge-fill {
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
}
.animate-gauge-fill {
  animation-name: gauge-fill;
  animation-duration: 1.3s;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  animation-fill-mode: forwards;
}
```

- [ ] **Step 2: `Conversation.tsx`** (step 1 — Understand)

```tsx
/**
 * Journey step 1 — Understand. Two abstract profile/marker nodes with a
 * connecting pulse: the first conversation between client and engineer.
 */
export function Conversation({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      <line
        x1={60}
        y1={80}
        x2={180}
        y2={80}
        stroke="var(--color-brand-blue-soft)"
        strokeWidth={1}
        strokeDasharray="3 5"
        opacity={0.6}
      />
      <circle cx={60} cy={80} r={16} fill="none" stroke="var(--color-brand-blue)" strokeWidth={1.5} />
      <circle cx={180} cy={80} r={16} fill="none" stroke="var(--color-brand-blue)" strokeWidth={1.5} />
      <circle
        cx={120}
        cy={80}
        r={5}
        fill="var(--color-brand-blue-soft)"
        className={active ? "animate-energy-pulse" : undefined}
      />
    </svg>
  );
}
```

- [ ] **Step 3: `Engineer.tsx`** (step 2 — Engineer)

```tsx
/**
 * Journey step 2 — Engineer. Four states cross-fade in a slow loop while
 * active: drawing grid, CAD wireframe, calculation sheet, equipment
 * schematic. Each <g> shares the engineer-crossfade keyframe (globals.css)
 * with a staggered animation-delay so exactly one is visible at a time;
 * resting (inactive) state shows the drawing grid only.
 */
const STATES = [
  <g key="grid">
    <path
      d="M20 20 H220 M20 60 H220 M20 100 H220 M20 140 H220 M60 10 V150 M110 10 V150 M160 10 V150"
      stroke="var(--color-brand-blue-soft)"
      strokeWidth={0.75}
      opacity={0.6}
      fill="none"
    />
  </g>,
  <g key="wireframe" fill="none" stroke="var(--color-brand-blue)" strokeWidth={1.25}>
    <path d="M50 130 V50 L120 20 L190 50 V130 L120 160 Z" />
    <path d="M50 50 L120 80 L190 50 M120 80 V160" />
  </g>,
  <g key="sheet" stroke="var(--color-brand-blue)" strokeWidth={1} fill="none">
    <rect x={70} y={15} width={100} height={130} />
    {[35, 55, 75, 95, 115, 135].map((y) => (
      <path key={y} d={`M80 ${y} H160`} opacity={0.55} />
    ))}
  </g>,
  <g key="schematic" fill="none" stroke="var(--color-brand-blue)" strokeWidth={1.25}>
    <rect x={40} y={60} width={40} height={40} />
    <rect x={160} y={60} width={40} height={40} />
    <path d="M80 80 H160 M120 20 V60 M120 100 V140" />
    <circle cx={120} cy={80} r={6} fill="var(--color-brand-blue-soft)" stroke="none" />
  </g>,
];

export function Engineer({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      {STATES.map((state, i) => (
        <g
          key={i}
          className={active ? "animate-engineer-crossfade" : undefined}
          style={{
            opacity: active ? undefined : i === 0 ? 1 : 0,
            animationDelay: active ? `${i * 2}s` : undefined,
          }}
        >
          {state}
        </g>
      ))}
    </svg>
  );
}
```

- [ ] **Step 4: `Procure.tsx`** (step 3 — Procure)

```tsx
import { partners } from "@/content/certifications";

/**
 * Journey step 3 — Procure. A short strip of equipment-partner marks under
 * "Trusted equipment partners" — no "authorised dealer/distributor" wording
 * (docs/AIRTECH_OPEN_DECISIONS.md #10). No partner logo assets have been
 * supplied yet, so partners render as clean text chips rather than
 * BluePlaceholder image boxes.
 */
export function Procure({ active: _active }: { active: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-center gap-4 px-2" aria-hidden="true">
      <p className="font-sans text-label font-medium text-(--color-brand-blue-soft)">
        Trusted equipment partners
      </p>
      <div className="flex flex-wrap gap-3">
        {partners.map((partner) => (
          <span
            key={partner.id}
            className="border border-(--color-brand-blue-soft)/50 px-4 py-2 font-display text-lg text-(--color-brand-blue)"
          >
            {partner.name}
          </span>
        ))}
      </div>
    </div>
  );
}
```

(`active` is accepted for interface consistency with the other five visuals — a static, unanimated marks strip is the intentional treatment here, not an oversight.)

- [ ] **Step 5: `Site.tsx`** (step 4 — Execute)

```tsx
const HOTSPOTS = [
  { label: "HVAC", x: 70, y: 50 },
  { label: "Electrical", x: 170, y: 50 },
  { label: "Plumbing", x: 70, y: 110 },
  { label: "Fire Protection", x: 170, y: 110 },
] as const;

/**
 * Journey step 4 — Execute. A line-art building section with four hotspots
 * pulsing in sequence, one per discipline landing on site. The text legend
 * beneath doubles as the mobile-simplified "hotspots -> labelled legend"
 * treatment the spec calls for (§7.2) and as an accessible label list,
 * since the in-SVG <text> is aria-hidden with the rest of the drawing.
 */
export function Site({ active }: { active: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <svg viewBox="0 0 240 160" className="h-full max-h-40 w-full" aria-hidden="true">
        <rect x={30} y={20} width={180} height={130} fill="none" stroke="var(--color-brand-blue-soft)" strokeWidth={1} opacity={0.5} />
        <path d="M30 80 H210 M120 20 V150" stroke="var(--color-brand-blue-soft)" strokeWidth={0.75} opacity={0.4} />
        {HOTSPOTS.map((spot, i) => (
          <circle
            key={spot.label}
            cx={spot.x}
            cy={spot.y}
            r={5}
            fill="var(--color-brand-blue)"
            className={active ? "animate-detect-ping" : undefined}
            style={active ? { animationDelay: `${i * 0.5}s` } : undefined}
          />
        ))}
      </svg>
      <p className="font-sans text-small text-(--color-steel)">
        {HOTSPOTS.map((h) => h.label).join(" · ")}
      </p>
    </div>
  );
}
```

- [ ] **Step 6: `Commission.tsx`** (step 5 — Test & Commission)

```tsx
/**
 * Journey step 5 — Test & Commission. A ring gauge fills 0->100% once the
 * step becomes active, with a check mark on completion — "System: 100%
 * ready." pathLength="1" normalizes the dash math to a 0..1 fraction;
 * animation-fill-mode: forwards (gauge-fill, globals.css) holds the
 * completed ring after the fill finishes.
 */
export function Commission({ active }: { active: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-28 w-28">
        <circle cx={50} cy={50} r={40} fill="none" stroke="var(--color-line-strong)" strokeWidth={4} />
        <circle
          cx={50}
          cy={50}
          r={40}
          fill="none"
          stroke="var(--color-brand-blue)"
          strokeWidth={4}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={active ? 0 : 1}
          className={active ? "animate-gauge-fill" : undefined}
          transform="rotate(-90 50 50)"
        />
        {active && (
          <path
            d="M36 51 L46 61 L66 39"
            fill="none"
            stroke="var(--color-brand-blue)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
      <p className="font-sans text-label font-medium text-(--color-brand-blue)">System: 100% ready</p>
    </div>
  );
}
```

- [ ] **Step 7: `Support.tsx`** (step 6 — Support)

```tsx
/**
 * Journey step 6 — Support. A line that continues past the building edge
 * with a slow, steady pulse — "this doesn't end." Reuses the existing
 * energy-pulse keyframe at a slower duration than its other call sites.
 */
export function Support({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      <rect x={40} y={30} width={110} height={110} fill="none" stroke="var(--color-brand-blue-soft)" strokeWidth={1} opacity={0.5} />
      <path d="M150 85 H230" stroke="var(--color-brand-blue)" strokeWidth={1.5} strokeDasharray="4 4" />
      <circle
        cx={230}
        cy={85}
        r={5}
        fill="var(--color-brand-blue)"
        className={active ? "animate-energy-pulse" : undefined}
        style={active ? { animationDuration: "3.6s" } : undefined}
      />
    </svg>
  );
}
```

- [ ] **Step 8: Run the build**

```bash
npm run build
```

Expected: clean (unused-export warnings are fine — nothing imports these yet).

- [ ] **Step 9: Commit**

```bash
git add src/components/journey/visuals src/app/globals.css
git commit -m "feat: add ClientJourney step visuals"
```

---

### Task 15: `ClientJourney.tsx` — compact + full variants

**Files:**
- Create: `src/components/journey/ClientJourney.tsx`

**Interfaces:**
- Consumes: `journeySteps`, `journeyIntro`, `JourneyStep` (Task 13); `Conversation`/`Engineer`/`Procure`/`Site`/`Commission`/`Support` (Task 14); `Label` (Task 3); `Reveal`, `Container`, `ButtonLink`.
- Produces: `ClientJourney({ variant: "compact" | "full" })`. Consumed by `src/app/(site)/page.tsx` (Task 16, compact) and `src/app/(site)/how-we-work/page.tsx` (Task 16, full).

- [ ] **Step 1: Write the file**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Label } from "@/components/ui/Label";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { journeySteps, journeyIntro, type JourneyStep } from "@/content/journey";
import { Conversation } from "./visuals/Conversation";
import { Engineer } from "./visuals/Engineer";
import { Procure } from "./visuals/Procure";
import { Site } from "./visuals/Site";
import { Commission } from "./visuals/Commission";
import { Support } from "./visuals/Support";

const VISUALS: Record<JourneyStep["visual"], ComponentType<{ active: boolean }>> = {
  conversation: Conversation,
  engineer: Engineer,
  procure: Procure,
  site: Site,
  commission: Commission,
  support: Support,
};

/**
 * The canonical Airtech project lifecycle, rendered two ways from the same
 * src/content/journey.ts data (spec §7) — compact on the homepage, full on
 * /how-we-work. No second lifecycle definition anywhere.
 */
export function ClientJourney({ variant }: { variant: "compact" | "full" }) {
  return variant === "full" ? <FullJourney /> : <CompactJourney />;
}

function CompactJourney() {
  const reduceMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const [fill, setFill] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setFill(Math.max(0, Math.min(1, v)));
  });

  const displayFill = reduceMotion ? 1 : fill;

  return (
    <section className="bg-site-texture py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Label>Client journey</Label>
            <h2 className="mt-4 font-display text-display-l font-semibold leading-[0.98] text-(--color-ink) text-balance">
              One partner, the whole lifecycle.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-body-l leading-relaxed text-(--color-steel)">
              {journeyIntro}
            </p>
          </div>

          <div ref={railRef} className="relative mx-auto mt-16 max-w-5xl">
            {/* Mobile: vertical rail */}
            <div className="relative pl-8 sm:hidden">
              <span aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-px bg-(--color-line-strong)" />
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-1 w-px origin-top bg-(--color-brand-blue)"
                style={{ height: `${displayFill * 100}%` }}
              />
              {journeySteps.map((step) => (
                <div key={step.index} className="mb-8 last:mb-0">
                  <p className="font-mono text-xs text-(--color-brand-blue)">
                    {String(step.index).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-(--color-ink)">{step.label}</h3>
                  <p className="mt-1 text-sm text-(--color-steel)">{step.sentence}</p>
                </div>
              ))}
            </div>

            {/* Desktop: horizontal rail */}
            <div className="relative hidden pt-6 sm:block">
              <span aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-(--color-line-strong)" />
              <motion.span
                aria-hidden="true"
                className="absolute left-0 top-0 h-px origin-left bg-(--color-brand-blue)"
                style={{ width: `${displayFill * 100}%` }}
              />
              <div className="grid grid-cols-6 gap-4">
                {journeySteps.map((step) => (
                  <div key={step.index}>
                    <p className="font-mono text-xs text-(--color-brand-blue)">
                      {String(step.index).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold leading-tight text-(--color-ink)">
                      {step.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-(--color-steel)">{step.sentence}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/how-we-work"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) hover:gap-2.5 transition-all"
            >
              Explore how we work
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function FullJourney() {
  const [activeIndex, setActiveIndex] = useState(1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute("data-step-index"));
          if (idx) setActiveIndex(idx);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="sticky top-[72px] z-10 border-b border-(--color-line) bg-(--color-paper)/95 px-5 py-3 backdrop-blur sm:hidden">
        <p className="font-mono text-xs text-(--color-brand-blue)">
          {String(activeIndex).padStart(2, "0")} / {String(journeySteps.length).padStart(2, "0")}
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[64px_1fr]">
        <div className="hidden lg:sticky lg:top-24 lg:flex lg:h-fit lg:flex-col lg:items-center lg:gap-6 lg:self-start lg:pt-2">
          {journeySteps.map((step) => (
            <div key={step.index} className="flex flex-col items-center gap-2">
              <span
                className={`font-mono text-xs transition-colors ${
                  activeIndex === step.index ? "text-(--color-brand-blue)" : "text-(--color-steel-soft)"
                }`}
              >
                {String(step.index).padStart(2, "0")}
              </span>
              <span
                className={`h-6 w-px transition-colors ${
                  activeIndex === step.index ? "bg-(--color-brand-blue)" : "bg-(--color-line-strong)"
                }`}
              />
            </div>
          ))}
        </div>

        <div>
          {journeySteps.map((step, i) => (
            <StepSection
              key={step.index}
              step={step}
              isFinale={i === journeySteps.length - 1}
              active={activeIndex === step.index}
              setRef={(el) => {
                stepRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepSection({
  step,
  isFinale,
  active,
  setRef,
}: {
  step: JourneyStep;
  isFinale: boolean;
  active: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const Visual = VISUALS[step.visual];

  return (
    <motion.div
      ref={setRef}
      data-step-index={step.index}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex min-h-[80vh] flex-col justify-center border-t border-(--color-line) px-5 py-16 sm:px-8 lg:px-0 lg:pr-12 ${
        isFinale ? "bg-(--color-blue-deep) text-white" : ""
      }`}
    >
      <div
        className={
          isFinale ? "mx-auto max-w-2xl text-center" : "grid gap-10 lg:grid-cols-2 lg:items-center"
        }
      >
        {!isFinale && (
          <div className="order-2 aspect-[3/2] w-full lg:order-1">
            <Visual active={active} />
          </div>
        )}
        <div className={isFinale ? "" : "order-1 lg:order-2"}>
          <p
            className={`font-display text-display-m font-semibold ${
              isFinale ? "text-white" : "text-(--color-brand-blue)"
            }`}
          >
            {String(step.index).padStart(2, "0")} — {step.label}
          </p>
          <h2
            className={`mt-3 font-display text-display-l font-semibold leading-[1.02] text-balance ${
              isFinale ? "text-white" : "text-(--color-ink)"
            }`}
          >
            {step.sentence}
          </h2>
          <Label className={`mt-5 block ${isFinale ? "text-(--color-brand-blue-soft)" : ""}`}>
            {step.subLabel}
          </Label>
          <p
            className={`mt-3 max-w-xl text-body-l leading-relaxed ${
              isFinale ? "mx-auto text-white/80" : "text-(--color-steel)"
            }`}
          >
            {step.description}
          </p>
          <ul className={`mt-6 flex flex-col gap-2 ${isFinale ? "mx-auto max-w-xs items-start" : ""}`}>
            {step.points.map((point) => (
              <li
                key={point}
                className={`flex gap-3 text-body ${isFinale ? "text-white/90" : "text-(--color-ink)"}`}
              >
                <span aria-hidden="true" className={isFinale ? "text-(--color-brand-blue-soft)" : "text-(--color-brand-blue)"}>
                  —
                </span>
                {point}
              </li>
            ))}
          </ul>
          {isFinale && (
            <div className="mx-auto mt-10 max-w-xs">
              <Visual active={active} />
              <div className="mt-10">
                <ButtonLink href="/contact/project-enquiry" size="lg">
                  Discuss your project
                </ButtonLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Run the build**

```bash
npm run build
```

Expected: clean (unused-export warning is fine — wired up in Task 16).

- [ ] **Step 3: Commit**

```bash
git add src/components/journey/ClientJourney.tsx
git commit -m "feat: add ClientJourney component (compact + full variants)"
```

---

### Task 16: Wire `ClientJourney` into the homepage and finish `/how-we-work`

**Files:**
- Delete: `src/components/home/SolutionsExperience.tsx`
- Modify: `src/app/(site)/page.tsx`
- Modify: `src/app/(site)/how-we-work/page.tsx`

**Interfaces:**
- Consumes: `ClientJourney` (Task 15).

- [ ] **Step 1: Delete `SolutionsExperience.tsx`**

```bash
git rm src/components/home/SolutionsExperience.tsx
```

- [ ] **Step 2: Update `page.tsx`**

Change the imports:

```tsx
import { CinematicHero } from "@/components/home/CinematicHero";
import { EngineeringStatement } from "@/components/home/EngineeringStatement";
import { MEPSequence } from "@/components/home/MEPSequence";
import { ProofBar } from "@/components/home/ProofBar";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { SolutionsExperience } from "@/components/home/SolutionsExperience";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrustedBy } from "@/components/home/TrustedBy";
```

to:

```tsx
import { CinematicHero } from "@/components/home/CinematicHero";
import { EngineeringStatement } from "@/components/home/EngineeringStatement";
import { MEPSequence } from "@/components/home/MEPSequence";
import { ProofBar } from "@/components/home/ProofBar";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ClientJourney } from "@/components/journey/ClientJourney";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrustedBy } from "@/components/home/TrustedBy";
```

And in the JSX, change `<SolutionsExperience />` to `<ClientJourney variant="compact" />`. This lands the section in exactly the position the spec's homepage order requires (§5) — the current order is already `Hero, EngineeringStatement, MEPSequence, ProofBar, WhatWeDo, [this slot], FeaturedProjects, TrustedBy`, so no other reordering is needed in this file.

Update the file's leading comment (currently describes the 2026-08-22 brief's section order and references `SolutionsExperience`/`ClientRecognition`) — replace it with:

```tsx
// Homepage sequence per the 2026-08-28 blue-reset/ClientJourney spec (§5):
// CinematicHero -> EngineeringStatement (slim intro band) -> MEPSequence ->
// ProofBar -> WhatWeDo -> ClientJourney (compact) -> FeaturedProjects ->
// TrustedBy. ClientJourney replaces the retired SolutionsExperience
// component. Prior unused components remain in src/components/home for
// reuse elsewhere and are not deleted.
```

- [ ] **Step 3: Replace the `/how-we-work` stub with the full page**

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ClientJourney } from "@/components/journey/ClientJourney";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "Airtech's project lifecycle: from the first conversation through engineering, procurement, execution, testing and commissioning, to long-term support.",
};

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How We Work" }]}
        eyebrow="How we work"
        heading="One partner, the whole lifecycle."
        description="Airtech is a single engineering partner across the whole project lifecycle — from the first conversation to long-term support."
      />
      <ClientJourney variant="full" />
      <Section className="text-center">
        <h2 className="font-display text-display-m font-semibold max-w-2xl mx-auto text-balance">
          Ready to start the conversation?
        </h2>
        <div className="mt-8">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Discuss your project
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
```

(The `ClientJourney variant="full"` step 6 finale already ends in its own "Discuss your project" CTA per Task 15 — this closing `Section` is a lighter second nudge for anyone who stops scrolling before reaching it, consistent with how every other detail-page template in this codebase ends. If, during the Task 30 visual QA pass, the two CTAs read as redundant back-to-back, drop this closing `Section` — the finale's own CTA already satisfies spec §7.4's "closing CTA" requirement on its own.)

- [ ] **Step 4: Add `/how-we-work` to `sitemap.ts`**

Already done in Task 12 Step 6 — verify only:

```bash
grep -n "how-we-work" src/app/sitemap.ts
```

Expected: one match in `staticRoutes`.

- [ ] **Step 5: Run the build**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 6: Manual + Playwright QA**

```bash
npm run dev
```

Navigate to `/` and confirm `ClientJourney variant="compact"` renders between `WhatWeDo` and `FeaturedProjects`, the horizontal rail fills with blue as you scroll past it, and "Explore how we work →" navigates to `/how-we-work`. Navigate to `/how-we-work` directly and confirm all six steps render with their visuals, the desktop left rail highlights the in-view step, and the step-6 finale renders full-width on a dark blue field with its own CTA. Test keyboard navigation (Tab through the "Explore how we work" and "Discuss your project" links) and toggle OS-level reduced-motion, then reload — confirm the rail fill, step visuals, and section fade/rise all render in their static end state with no motion.

- [ ] **Step 7: Commit**

```bash
git add src/app/\(site\)/page.tsx "src/app/(site)/how-we-work/page.tsx"
git commit -m "feat: wire ClientJourney into homepage and /how-we-work"
```

---

## Phase 5 — Hero re-grade + homepage polish

### Task 17: `CinematicHero.tsx` — grade the canvas, add the HTML headline layer

**Files:**
- Modify: `src/components/home/CinematicHero.tsx`

**Interfaces:**
- Consumes: `--color-blue-deep`, `--color-ink`, `--text-display-xl`, `--text-body-l` (Task 1); `ButtonLink` from `@/components/ui/Button`.
- Produces: no prop changes — `CinematicHero()` still takes no props. The component now renders its own H1 (previously `EngineeringStatement` owned the page's H1 — see Task 18, which changes that component's heading to an `h2` to avoid two H1s).

- [ ] **Step 1: Add imports and a `headlineRef`**

Change:

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
```

to:

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
```

Add a fourth ref alongside the existing three:

```tsx
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
```

becomes:

```tsx
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
```

- [ ] **Step 2: Grade the canvas draw — composite a blue-deep multiply wash + bottom-up ink scrim**

Change the `draw()` function's image branch:

```tsx
      const drawIndex = Math.min(currentIndex, Math.max(0, loadedUpToRef.current - 1));
      const img = images[drawIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cssW / cssH;
        let drawW: number, drawH: number, offsetX: number, offsetY: number;
        if (imgRatio > canvasRatio) {
          drawH = cssH;
          drawW = drawH * imgRatio;
          offsetX = (cssW - drawW) / 2;
          offsetY = 0;
        } else {
          drawW = cssW;
          drawH = drawW / imgRatio;
          offsetX = 0;
          offsetY = (cssH - drawH) / 2;
        }
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      } else {
        ctx.fillStyle = "#eef2f6";
        ctx.fillRect(0, 0, cssW, cssH);
      }

      ctx.restore();
```

to:

```tsx
      const drawIndex = Math.min(currentIndex, Math.max(0, loadedUpToRef.current - 1));
      const img = images[drawIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cssW / cssH;
        let drawW: number, drawH: number, offsetX: number, offsetY: number;
        if (imgRatio > canvasRatio) {
          drawH = cssH;
          drawW = drawH * imgRatio;
          offsetX = (cssW - drawW) / 2;
          offsetY = 0;
        } else {
          drawW = cssW;
          drawH = drawW / imgRatio;
          offsetX = 0;
          offsetY = (cssH - drawH) / 2;
        }
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

        // Grade the frame: a --color-blue-deep (#0d2b3e) multiply wash keeps
        // the sequence in the site's palette instead of raw photography
        // tones, then a bottom-up --color-ink (#161a1f) scrim gives the
        // headline layer (Step 4 below) a controlled dark field to sit on.
        ctx.save();
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = "rgba(13, 43, 62, 0.4)";
        ctx.fillRect(0, 0, cssW, cssH);
        ctx.restore();

        const scrim = ctx.createLinearGradient(0, cssH * 0.35, 0, cssH);
        scrim.addColorStop(0, "rgba(22, 26, 31, 0)");
        scrim.addColorStop(1, "rgba(22, 26, 31, 0.78)");
        ctx.fillStyle = scrim;
        ctx.fillRect(0, cssH * 0.35, cssW, cssH * 0.65);
      } else {
        ctx.fillStyle = "#0d2b3e";
        ctx.fillRect(0, 0, cssW, cssH);
      }

      ctx.restore();
```

(The unloaded-frame fallback fill also changes from `#eef2f6` (light) to `#0d2b3e` (`--color-blue-deep`) — with the grading now establishing a dark field for the headline layer, an unloaded frame should hold that same dark tone rather than flash light gray.)

- [ ] **Step 3: Fade the headline layer out on scroll, alongside the existing indicator**

In the `ScrollTrigger.create` `onUpdate` callback, change:

```tsx
          onUpdate: (self) => {
            currentIndex = Math.min(total - 1, Math.round(self.progress * (total - 1)));
            if (indicatorRef.current) {
              indicatorRef.current.style.opacity = String(Math.max(0, 1 - self.progress * 6));
            }
            draw();
          },
```

to:

```tsx
          onUpdate: (self) => {
            currentIndex = Math.min(total - 1, Math.round(self.progress * (total - 1)));
            if (indicatorRef.current) {
              indicatorRef.current.style.opacity = String(Math.max(0, 1 - self.progress * 6));
            }
            if (headlineRef.current) {
              headlineRef.current.style.opacity = String(Math.max(0, 1 - self.progress * 3));
            }
            draw();
          },
```

(The headline fades out over roughly the first third of the scroll range — faster than the scroll indicator, which is already tuned to disappear almost immediately.)

- [ ] **Step 4: Add the HTML headline layer to the JSX**

Change the animated (non-reduced-motion) return block:

```tsx
  return (
    <div ref={wrapperRef} className="relative w-full min-h-[100dvh]">
      <section
        ref={sectionRef}
        className="sticky top-0 h-[100dvh] min-h-[560px] w-full overflow-hidden bg-(--color-white)"
        style={{
          backgroundImage: "url(/images/backgrounds/architectural-light.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="Airtech Industries: engineering the systems behind extraordinary spaces"
      >
        <canvas ref={canvasRef} className="absolute inset-0 block" />

        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-9 flex justify-center transition-opacity"
        >
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-(--color-ink)/35 pt-1.5">
            <span className="h-1.5 w-[1.5px] animate-flow-drop rounded-full bg-(--color-ink)/55" />
          </span>
        </span>
      </section>
    </div>
  );
```

to:

```tsx
  return (
    <div ref={wrapperRef} className="relative w-full min-h-[100dvh]">
      <section
        ref={sectionRef}
        className="sticky top-0 h-[100dvh] min-h-[560px] w-full overflow-hidden bg-(--color-blue-deep)"
        style={{
          backgroundImage: "url(/images/backgrounds/architectural-light.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="Airtech Industries: engineering the systems behind Nepal's most demanding buildings"
      >
        <canvas ref={canvasRef} className="absolute inset-0 block" />

        <div
          ref={headlineRef}
          className="absolute inset-0 flex flex-col items-start justify-end p-6 pb-20 sm:p-10 sm:pb-24 lg:p-16 lg:pb-28"
        >
          <h1 className="max-w-3xl font-display text-display-xl font-bold leading-[0.98] text-balance text-white">
            Engineering the systems behind Nepal&apos;s most demanding buildings.
          </h1>
          <p className="mt-5 max-w-xl text-body-l leading-relaxed text-white/75">
            Integrated MEP and HVAC — from design through commissioning and long-term support.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <ButtonLink href="/contact/project-enquiry" size="lg">
              Discuss your project
            </ButtonLink>
            <Link href="/projects" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Explore our work →
            </Link>
          </div>
        </div>

        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-9 flex justify-center transition-opacity"
        >
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 pt-1.5">
            <span className="h-1.5 w-[1.5px] animate-flow-drop rounded-full bg-white/70" />
          </span>
        </span>
      </section>
    </div>
  );
```

(The scroll-indicator dot's border/fill colors also switch from ink-on-light to white-on-dark, matching the now-graded-dark canvas.)

- [ ] **Step 5: Update the reduced-motion fallback**

Change:

```tsx
  if (reduceMotion) {
    return (
      <section className="relative h-[86vh] min-h-[600px] w-full overflow-hidden bg-(--color-white)">
        {/* eslint-disable-next-line @next/next/no-img-element -- static reduced-motion fallback, not part of next/image's responsive pipeline */}
        <img
          src="/images/backgrounds/architectural-light.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/airtech-logo.png"
            alt="Airtech Industries"
            className="w-[min(420px,40vw)]"
          />
        </div>
      </section>
    );
  }
```

to:

```tsx
  if (reduceMotion) {
    return (
      <section className="relative h-[86vh] min-h-[600px] w-full overflow-hidden bg-(--color-blue-deep)">
        {/* eslint-disable-next-line @next/next/no-img-element -- static reduced-motion fallback, not part of next/image's responsive pipeline */}
        <img
          src="/images/hero/frames-desktop/frame_001.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "brightness(0.55) saturate(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/35 to-(--color-blue-deep)/30" />
        <div className="relative z-10 flex h-full flex-col items-start justify-end p-6 pb-16 sm:p-10 lg:p-16">
          <h1 className="max-w-3xl font-display text-display-xl font-bold leading-[0.98] text-balance text-white">
            Engineering the systems behind Nepal&apos;s most demanding buildings.
          </h1>
          <p className="mt-5 max-w-xl text-body-l leading-relaxed text-white/75">
            Integrated MEP and HVAC — from design through commissioning and long-term support.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <ButtonLink href="/contact/project-enquiry" size="lg">
              Discuss your project
            </ButtonLink>
            <Link href="/projects" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
              Explore our work →
            </Link>
          </div>
        </div>
      </section>
    );
  }
```

(Uses `frame_001.webp`, the first desktop frame — already generated by this component's own build-time optimization step, per its file-header comment — as the static graded frame, rather than the airtech logo mark centered on raw unsharpened background art.)

- [ ] **Step 6: Run the build**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 7: Visual + reduced-motion QA**

```bash
npm run dev
```

Load `/` and confirm: the hero canvas reads as a graded dark-blue field (not raw, undarkened photography), the H1/subline/CTA sit legibly over it, the headline fades out within the first third of the pin-scroll distance, and the scroll indicator still works. Toggle OS reduced-motion and reload — confirm the static fallback shows the same headline/CTA layer over a graded still frame.

- [ ] **Step 8: Commit**

```bash
git add src/components/home/CinematicHero.tsx
git commit -m "feat: grade CinematicHero canvas and add HTML headline layer"
```

---

### Task 18: `EngineeringStatement.tsx` — demote to a slim intro band

**Files:**
- Modify: `src/components/home/EngineeringStatement.tsx`

**Interfaces:**
- Consumes: `Reveal`, `Container`, `ButtonLink` (existing imports, `Reveal` newly added).
- Produces: no prop changes. The component's top-level heading changes from `h1` to `h2` — `CinematicHero` (Task 17) now owns the page's only `h1`. This resolves spec acceptance criterion 9 ("no two full-height hero-scale headings back to back").

- [ ] **Step 1: Replace the whole file**

```tsx
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Slim intro band — demoted from the former full-height second hero (spec
 * §5.2). The hero's own headline layer (CinematicHero.tsx) is now the
 * page's h1, so this is a supporting h2 statement rather than a second
 * competing full-height headline. One block fade instead of the previous
 * line-by-line stagger.
 */
export function EngineeringStatement() {
  return (
    <section className="bg-site-texture py-16 sm:py-20 lg:py-24">
      <Container className="max-w-4xl text-center">
        <Reveal>
          <span aria-hidden="true" className="mx-auto mb-6 block h-px w-14 bg-(--color-brand-blue-soft)" />

          <h2 className="font-display text-display-m font-semibold leading-[1.05] tracking-tight text-(--color-ink) text-balance">
            Engineering the systems behind extraordinary spaces.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-body-l leading-relaxed text-(--color-steel)">
            Integrated MEP and HVAC engineering for complex buildings, specialised environments
            and projects where reliability matters.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-body leading-relaxed text-(--color-ink-soft)">
            Airtech brings engineering, procurement, execution, commissioning and long-term
            technical support together, giving clients a single engineering partner for the
            systems that make buildings perform.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-7">
            <ButtonLink href="/contact/project-enquiry" size="lg">
              Discuss your project
            </ButtonLink>
            <Link
              href="/projects"
              className="text-sm font-medium text-(--color-ink)/75 hover:text-(--color-ink) transition-colors"
            >
              Explore our work →
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

(Note: `"use client"` is intentionally dropped — the previous version needed it for `motion`/`useReducedMotion`; this version uses only `Reveal`, which is itself a client component, so `EngineeringStatement` can render as a Server Component.)

- [ ] **Step 2: Run the build**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Load `/` — confirm the band directly below the hero now reads as a compact supporting statement (not a second full-height hero), fades in as one block, and the page has exactly one `<h1>` (DevTools → Elements → search `h1`).

- [ ] **Step 4: Commit**

```bash
git add src/components/home/EngineeringStatement.tsx
git commit -m "fix: demote EngineeringStatement to a slim intro band, drop duplicate h1"
```

---

### Task 19: `FeaturedProjects.tsx` — card legibility, stop the wheel-trap, blue controls

**Files:**
- Modify: `src/components/home/FeaturedProjects.tsx`

**Interfaces:**
- Consumes: `--text-label` (Task 1).
- Produces: no prop changes.

- [ ] **Step 1: Kicker label and heading token (if not already applied in Task 8)**

Confirm the kicker from Task 8 Step 3 is in place (`font-sans text-label font-medium text-(--color-brand-blue)`, text "Featured projects"). Also update the H2 to the new type-scale token — change:

```tsx
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold leading-[0.98] text-(--color-ink) text-balance">
            See our expertise
          </h2>
```

to:

```tsx
          <h2 className="mt-4 font-display text-display-l font-semibold leading-[0.98] text-(--color-ink) text-balance">
            See our expertise
          </h2>
```

- [ ] **Step 2: Drop tracking from the counter**

Change:

```tsx
          <p className="mx-auto mt-4 max-w-md font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel)">
            {String(activeCard + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </p>
```

to:

```tsx
          <p className="mx-auto mt-4 max-w-md font-mono text-label text-(--color-steel)">
            {String(activeCard + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </p>
```

(Kept `font-mono` — this is a numeric frame counter, close enough to a spec-value/discipline-code reading to keep monospace, but tracking is still dropped per the sweep.)

- [ ] **Step 3: Make the arrow controls blue by default (not just on hover)**

Change:

```tsx
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => scrollByCard(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line-strong) text-(--color-ink) hover:border-(--color-brand-blue) hover:text-(--color-brand-blue) transition-colors"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => scrollByCard(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line-strong) text-(--color-ink) hover:border-(--color-brand-blue) hover:text-(--color-brand-blue) transition-colors"
            >
              →
            </button>
```

to:

```tsx
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => scrollByCard(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-brand-blue) text-(--color-brand-blue) hover:bg-(--color-brand-blue) hover:text-white transition-colors"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => scrollByCard(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-brand-blue) text-(--color-brand-blue) hover:bg-(--color-brand-blue) hover:text-white transition-colors"
            >
              →
            </button>
```

- [ ] **Step 4: Stop the wheel-trap — add `overscroll-x-contain` to the track**

Change:

```tsx
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="mt-12 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
```

to:

```tsx
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="mt-12 flex gap-6 overflow-x-auto overscroll-x-contain pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
```

(No `onWheel` handler exists in this file — confirm with `grep -n "onWheel" src/components/home/FeaturedProjects.tsx` before and after, expect no matches both times. The track is driven only by the arrow buttons, native touch drag, and native keyboard/scroll focus, per spec §5.3 — `overscroll-x-contain` stops any vertical wheel gesture over the track from being chained/remapped into the page scroll instead of just scrolling the page normally.)

- [ ] **Step 5: Solid-anchored bottom text block with a stronger, shorter gradient**

Change:

```tsx
                <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                <span className="absolute left-6 top-6 font-mono text-[11px] tracking-[0.1em] text-(--color-paper)/70 sm:left-7 sm:top-7">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-(--color-signal-soft)">
                    {project.sector}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-(--color-paper)">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-(--color-paper)/75">{project.location}</p>
                  <span className="mt-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-xs font-medium text-(--color-paper) opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    View Project
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
```

to:

```tsx
                <span className="absolute left-6 top-6 font-mono text-label text-(--color-paper)/70 sm:left-7 sm:top-7">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-0 bottom-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) from-5% via-(--color-ink)/60 via-40% to-transparent to-75% transition-opacity duration-300 group-hover:from-(--color-ink)" />
                  <div className="relative p-6 sm:p-7">
                    <p className="font-sans text-label font-medium text-(--color-brand-blue-soft)">
                      {project.sector}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-(--color-paper)">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-(--color-paper)/75">{project.location}</p>
                    <span className="mt-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-xs font-medium text-(--color-paper) opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      View project
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
```

(The gradient now lives inside the same `inset-x-0 bottom-0` wrapper as the text instead of as a separate full-bleed sibling — a solid-anchored block, per spec §5.3, so a baked-in photo watermark like "NEPAL MEDICITI" can't bleed through the eyebrow/title independently of the text's own backing. "View Project" → "View project" is a casing-only fix, consistent with the sentence-case rule.)

- [ ] **Step 6: Run the build**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 7: Visual + interaction QA**

```bash
npm run dev
```

Load `/`, scroll to Featured Projects. Confirm: card text is legible over every photo (including any with baked-in watermark text), the counter/arrows/pagination dots are all blue, hovering/using the arrow buttons scrolls the track, and placing the cursor over the track and scrolling the mouse wheel vertically scrolls the **page**, not the horizontal track. Resize to mobile width and confirm touch-drag swiping still works.

- [ ] **Step 8: Commit**

```bash
git add src/components/home/FeaturedProjects.tsx
git commit -m "fix: FeaturedProjects card legibility, wheel-trap, blue controls"
```

---

## Phase 6 — Projects & Industries

### Task 20: `src/content/industries.ts` — five services on every industry + exact copy edits

**Files:**
- Modify: `src/content/industries.ts`

**Interfaces:**
- Produces: every `Industry.relatedServiceSlugs` is now exactly `["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"]`. Five specific string edits land per spec §6.4's exact table — **no other wording in this file changes** (see the Global Constraints note on not freelancing "sourced-sector tightening" beyond the spec's literal table, to keep this an auditable, line-by-line-diffable change).

- [ ] **Step 1: Set `relatedServiceSlugs` to the five-service array on all 10 industries**

For each industry object below (located by its `slug:` field), replace the `relatedServiceSlugs` line with the target array. The target array is identical across all 10 — only the **old** value differs per industry:

| Industry `slug` | Old `relatedServiceSlugs` |
|---|---|
| `healthcare` | `["hvac", "electrical", "plumbing-public-health", "elv-security"]` |
| `hospitality` | `["hvac", "electrical", "plumbing-public-health", "fire-protection"]` |
| `pharmaceuticals` | `["hvac", "engineering-advisory"]` |
| `industrial` | `["hvac", "electrical", "bms-systems-integration"]` |
| `corporate-commercial` | `["hvac", "electrical", "bms-systems-integration"]` |
| `telecom-data-centres` | `["hvac", "electrical", "bms-systems-integration"]` |
| `banking-financial` | `["hvac", "electrical"]` |
| `auditoriums-studios` | `["hvac", "electrical"]` |
| `embassies-ingos` | `["hvac", "electrical"]` |
| `education-institutional` | `["hvac", "electrical", "plumbing-public-health", "fire-protection"]` |

New value for **all 10**:

```ts
    relatedServiceSlugs: ["hvac", "electrical", "plumbing-public-health", "fire-protection", "elv-security"],
```

(Three industries — `banking-financial`, `auditoriums-studios`, `embassies-ingos` — currently share the identical old array text `["hvac", "electrical"]`; when editing, use each object's `slug:` field a few lines above as the anchor to edit the correct one, not a blind find-replace-all.)

- [ ] **Step 2: `healthcare.operationalChallenges[3]`**

Change:

```ts
      "Air-conditioning in a hospital runs on a 24×7 basis, so reliability is non-negotiable",
```

to:

```ts
      "Hospital air-conditioning operates 24/7, making reliability non-negotiable.",
```

- [ ] **Step 3: `corporate-commercial.operationalChallenges[0]`**

Change:

```ts
      "Air-conditioning systems typically run every working day, so energy efficiency matters",
```

to:

```ts
      "Air-conditioning systems typically run every working day, so energy efficiency is essential.",
```

- [ ] **Step 4: `corporate-commercial.technicalRequirements[1]`**

Change:

```ts
      "VRF/VRV systems for high-end corporate buildings, offering long piping runs, multiple indoor units per outdoor unit and low sound pressure",
```

to:

```ts
      "VRF systems for high-end corporate buildings — long piping runs, multiple indoor units per outdoor unit and low sound pressure.",
```

- [ ] **Step 5: `corporate-commercial.technicalRequirements` — add a chiller-plant line**

In the same array (`corporate-commercial.technicalRequirements`), add a third entry after the Step 4 line and the existing "Standby cooling capacity for server rooms" line:

```ts
    technicalRequirements: [
      "Equipment compatible with generator (DG) power and local voltage conditions",
      "VRF systems for high-end corporate buildings — long piping runs, multiple indoor units per outdoor unit and low sound pressure.",
      "Standby cooling capacity for server rooms",
      "Chiller plant for larger commercial cooling loads.",
    ],
```

(Sourced: `src/content/services.ts`'s `hvac.subServices` already lists "Chiller systems" — this is not a new capability claim, it's citing an existing sourced sub-service.)

- [ ] **Step 6: `corporate-commercial.airtechCapabilities[1]`**

Change:

```ts
      "VRF/VRV design for high-end corporate fit-outs",
```

to:

```ts
      "VRF design for high-end corporate fit-outs; chiller plant for larger loads.",
```

- [ ] **Step 7: Run the build**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 8: Grep-verify no cold-storage/refrigeration text was introduced**

```bash
grep -in "cold storage\|refrigerat" src/content/industries.ts
```

Expected: no matches.

- [ ] **Step 9: Diff review**

```bash
git diff src/content/industries.ts
```

Confirm the diff contains **only**: the 10 `relatedServiceSlugs` lines, the 5 edits above (healthcare ×1, corporate-commercial ×4), and nothing else — no other `operationalChallenges`/`technicalRequirements`/`airtechCapabilities` strings changed, and `embassies-ingos`/`education-institutional`'s empty `operationalChallenges`/`technicalRequirements` arrays remain empty.

- [ ] **Step 10: Commit**

```bash
git add src/content/industries.ts
git commit -m "feat: all industries offer the five core services, apply client-approved copy edits"
```

---

### Task 21: `industries/[slug]/page.tsx` — "Every sector, all five services"

**Files:**
- Modify: `src/app/(site)/industries/[slug]/page.tsx`

**Interfaces:**
- Consumes: `relatedServiceSlugs` now always resolving to the 5 core services (Task 20).

- [ ] **Step 1: Retitle the section and change its layout from pill/chip links to a clean row/grid**

Change:

```tsx
      {relatedServices.length > 0 && (
        <Section>
          <SectionHeader eyebrow="Relevant expertise" heading="Disciplines Airtech brings to this sector." />
          <div className="mt-10 flex flex-wrap gap-3">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/expertise/${s.slug}`}
                className="border border-(--color-line-strong) px-4 py-2 text-sm text-(--color-ink-soft) hover:border-(--color-signal) hover:text-(--color-signal) transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </Section>
      )}
```

to:

```tsx
      {relatedServices.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="Every project"
            heading="Every sector, all five services."
            description="Airtech delivers HVAC, electrical, plumbing, fire protection and ELV as one integrated scope on every project — the emphasis shifts by sector, the coverage does not."
          />
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/expertise/${s.slug}`}
                className="group block border-t border-(--color-line) pt-4"
              >
                <span className="font-mono text-xs text-(--color-brand-blue)">{s.disciplineCode}</span>
                <h3 className="mt-1 font-display text-lg font-semibold text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                  {s.name}
                </h3>
              </Link>
            ))}
          </div>
        </Section>
      )}
```

- [ ] **Step 2: Verify the breadcrumb and "Work in this sector" Reveal usage need no change**

The `PageHero` breadcrumb already targets `/industries` (`{ label: "Industries", href: "/industries" }`) — the spec's instruction to "keep `/industries` as the crumb target" is already satisfied, no edit needed. The related-projects block already renders each `ProjectFeatureRow`/`ProjectListRow` inside its own single, non-delayed `Reveal` (no per-item stagger) — already "one fade" per spec, no edit needed.

- [ ] **Step 3: Run the build**

```bash
npm run build
```

- [ ] **Step 4: Visual check**

```bash
npm run dev
```

Load `/industries/healthcare` and `/industries/embassies-ingos` — confirm both show the same 5-service row (HVAC/Electrical/Plumbing/Fire Protection/ELV) with the new heading, and `embassies-ingos` still shows no "The challenge"/"What the system has to do" sections (empty arrays stay hidden).

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/industries/[slug]/page.tsx"
git commit -m "feat: retitle industry services section to 'Every sector, all five services'"
```

---

### Task 22: `/projects` — "Browse by industry" band

**Files:**
- Modify: `src/app/(site)/projects/page.tsx`

**Interfaces:**
- Consumes: `industries` from `@/content/industries` (already imported in this file for `ProjectsExplorer`).

- [ ] **Step 1: Add the imports**

Change:

```tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StickyEnquiryBar } from "@/components/ui/StickyEnquiryBar";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { projects } from "@/content/projects";
import { industries } from "@/content/industries";
```

to:

```tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StickyEnquiryBar } from "@/components/ui/StickyEnquiryBar";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { projects } from "@/content/projects";
import { industries } from "@/content/industries";
```

- [ ] **Step 2: Add the band after the explorer, before the sticky bar**

Change:

```tsx
      <Container>
        <Suspense fallback={null}>
          <ProjectsExplorer projects={projects} industries={industries} />
        </Suspense>
      </Container>
      <div className="lg:hidden h-[68px]" aria-hidden="true" />
      <StickyEnquiryBar />
```

to:

```tsx
      <Container>
        <Suspense fallback={null}>
          <ProjectsExplorer projects={projects} industries={industries} />
        </Suspense>
      </Container>

      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeader eyebrow="Browse by industry" heading="Explore by sector." />
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group block border-t border-(--color-line) pt-4"
            >
              <h3 className="font-display text-lg font-semibold leading-snug text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                {industry.name}
              </h3>
            </Link>
          ))}
        </div>
      </Container>

      <div className="lg:hidden h-[68px]" aria-hidden="true" />
      <StickyEnquiryBar />
```

(The existing `?industry=` filter behavior on `ProjectsExplorer` is untouched — this band is a separate destination-linking grid to `/industries/[slug]`, not a second filter control, matching spec §6.3's "Projects is the entry point, `/industries/[slug]` pages are the destination.")

- [ ] **Step 3: Run the build**

```bash
npm run build
```

- [ ] **Step 4: Visual check**

```bash
npm run dev
```

Load `/projects` — confirm the "Browse by industry" grid renders below the featured-projects explorer with all 10 industries, and each links to its `/industries/[slug]` page.

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/projects/page.tsx"
git commit -m "feat: add Browse by industry band to /projects"
```

---

### Task 23: `expertise/[slug]/page.tsx` — remove "Where this discipline is applied"

**Files:**
- Modify: `src/app/(site)/expertise/[slug]/page.tsx`

**Interfaces:**
- Produces: `getIndustryBySlug` import is retained (still used by the "Related projects" section's `industryName={getIndustryBySlug(project.industrySlug)?.name}` calls); `Reveal` import is removed (its only use in this file was inside the deleted block).

- [ ] **Step 1: Remove the `relatedIndustries` computation**

Change:

```tsx
  const relatedIndustries = service.relatedIndustrySlugs
    .map((s) => getIndustryBySlug(s))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));
  const relatedProjects = getProjectsByService(service.slug);
```

to:

```tsx
  const relatedProjects = getProjectsByService(service.slug);
```

- [ ] **Step 2: Delete the "Where this discipline is applied" section**

Delete this entire block:

```tsx
      {relatedIndustries.length > 0 && (
        <Section>
          <SectionHeader eyebrow="Applications" heading="Where this discipline is applied." />
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
            {relatedIndustries.map((industry, i) => (
              <Reveal key={industry.slug} delay={i * 0.05}>
                <Link href={`/industries/${industry.slug}`} className="group block">
                  <h3 className="font-display text-xl font-semibold group-hover:text-(--color-signal) transition-colors">
                    {industry.name}
                  </h3>
                  <span className="mt-1 inline-block text-sm text-(--color-signal) opacity-0 group-hover:opacity-100 transition-opacity">
                    View sector →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
```

(It sits between the "Sub-services" `Section` and the "Related projects" `Section` — remove the whole block, leaving those two sections adjacent.)

- [ ] **Step 3: Remove the now-unused `Reveal` import**

Change:

```tsx
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { SystemMotif, SERVICE_MOTIFS } from "@/components/ui/SystemMotif";
```

to:

```tsx
import { EmptyState } from "@/components/ui/EmptyState";
import { SystemMotif, SERVICE_MOTIFS } from "@/components/ui/SystemMotif";
```

- [ ] **Step 4: Run the build**

```bash
npm run build
```

Expected: clean — confirms `getIndustryBySlug` is still used (no unused-import error) and `Reveal`/`relatedIndustries` are fully gone (no unused-variable error).

- [ ] **Step 5: Commit**

```bash
git add "src/app/(site)/expertise/[slug]/page.tsx"
git commit -m "fix: remove misleading 'where this discipline is applied' section from expertise detail"
```

---

## Phase 7 — Enquiry form multi-select

### Task 24: `src/lib/enquiry.ts` — multi-select taxonomy + schema

**Files:**
- Modify: `src/lib/enquiry.ts`

**Interfaces:**
- Produces: `intentOptions` now has 9 entries aligned 1:1 with `src/content/services.ts`'s taxonomy plus two cross-cutting paths (`full-mep`, `amc-service`). `EnquiryInput["intent"]` changes from `string` to `string[]`. Consumed by `EnquiryForm.tsx` (Task 25) and `contact/actions.ts` (Task 25 Step 6, verification only — the action needs no code change).

- [ ] **Step 1: Replace `intentOptions`**

Change:

```ts
export const intentOptions = [
  { value: "hvac", label: "New project — HVAC" },
  { value: "electrical", label: "New project — Electrical" },
  { value: "full-mep", label: "New project — Full MEP / multiple disciplines" },
  { value: "amc-service", label: "AMC / Service & Support" },
  { value: "consultation", label: "Consultation / advisory" },
] as const;
```

to:

```ts
export const intentOptions = [
  { value: "hvac", label: "HVAC" },
  { value: "electrical", label: "Electrical" },
  { value: "plumbing", label: "Plumbing & Public Health" },
  { value: "fire", label: "Fire Protection & Fire Alarm" },
  { value: "elv", label: "ELV / Security / IT" },
  { value: "bms", label: "BMS / Systems Integration" },
  { value: "advisory", label: "Engineering / Advisory" },
  { value: "full-mep", label: "Full MEP / integrated delivery" },
  { value: "amc-service", label: "AMC / Service & Support" },
] as const;
```

(Slugs match `src/content/services.ts` where a 1:1 service exists — `hvac`, `electrical`, `plumbing` ≈ `plumbing-public-health`, `fire` ≈ `fire-protection`, `elv` ≈ `elv-security`, `bms` ≈ `bms-systems-integration`, `advisory` ≈ `engineering-advisory` — plus two cross-cutting, non-service-taxonomy paths, `full-mep` and `amc-service`, per spec §8.1. "Water treatment" and other sub-disciplines are deliberately not separate options — they live inside "Plumbing & Public Health".)

- [ ] **Step 2: Change the schema field from a single enum to a non-empty array**

Change:

```ts
export const enquirySchema = z.object({
  intent: z.enum(intentOptions.map((o) => o.value) as [string, ...string[]]),
  name: z.string().min(2, "Enter your name"),
```

to:

```ts
export const enquirySchema = z.object({
  intent: z
    .array(z.enum(intentOptions.map((o) => o.value) as [string, ...string[]]))
    .min(1, "Choose at least one option."),
  name: z.string().min(2, "Enter your name"),
```

(Every other field in the schema is unchanged.)

- [ ] **Step 3: Run the build**

```bash
npm run build
```

Expected: TypeScript errors in `EnquiryForm.tsx` (`emptyForm.intent = ""` no longer matches `string[]`) — that's expected at this point; Task 25 fixes them. Confirm the error is specifically in `EnquiryForm.tsx` and not `enquiry.ts` itself.

- [ ] **Step 4: Commit**

```bash
git add src/lib/enquiry.ts
git commit -m "feat: enquiry intent becomes a multi-select array aligned to the service taxonomy"
```

---

### Task 25: `EnquiryForm.tsx` — checkbox multi-select step 0, label sweep

**Files:**
- Modify: `src/components/forms/EnquiryForm.tsx`

**Interfaces:**
- Consumes: `intentOptions`, `enquirySchema`, `EnquiryInput` (Task 24, `intent: string[]`).
- Produces: no prop changes (`EnquiryForm({ industries })` unchanged).

- [ ] **Step 1: Replace the whole file**

```tsx
"use client";

import { useRef, useState, useTransition } from "react";
import { intentOptions, projectStageOptions, enquirySchema, type EnquiryInput } from "@/lib/enquiry";
import { submitEnquiry } from "@/app/(site)/contact/actions";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Industry } from "@/content/types";

// What you need -> Contact -> Project -> Documents -> Done. Step 0 is a
// multi-select checkbox group (spec §8.2) — a project can span more than
// one discipline, so a single radio choice was under-representing what
// visitors actually needed to tell Airtech.
const STEPS = ["What you need", "Contact", "Project", "Documents", "Done"] as const;

const MAX_TOTAL_BYTES = 12 * 1024 * 1024;

const emptyForm: EnquiryInput = {
  intent: [],
  name: "",
  company: "",
  designation: "",
  email: "",
  phone: "",
  projectName: "",
  location: "",
  industry: "",
  projectStage: "",
  budget: "",
  message: "",
};

export function EnquiryForm({ industries }: { industries: Industry[] }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<EnquiryInput>(emptyForm);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formTopRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleIntent(value: string) {
    setForm((f) => ({
      ...f,
      intent: f.intent.includes(value) ? f.intent.filter((v) => v !== value) : [...f.intent, value],
    }));
  }

  function goToStep(next: number) {
    setStep(next);
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function validateStep(current: number): boolean {
    const nextErrors: Record<string, string> = {};
    if (current === 0 && form.intent.length === 0) nextErrors.intent = "Choose at least one option to continue.";
    if (current === 1) {
      if (form.name.trim().length < 2) nextErrors.name = "Enter your name.";
      if (!form.company.trim()) nextErrors.company = "Enter your company or organisation.";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
      if (form.phone.trim().length < 6) nextErrors.phone = "Enter a phone number.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleNext() {
    if (!validateStep(step)) return;
    goToStep(step + 1);
  }

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list);
    const combined = [...files, ...incoming];
    const totalBytes = combined.reduce((sum, f) => sum + f.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      setFileError("Total attachments must stay under 12MB. Remove a file or email larger drawings directly.");
      return;
    }
    setFileError(null);
    setFiles(combined);
  }

  function removeFile(index: number) {
    setFiles((f) => f.filter((_, i) => i !== index));
    setFileError(null);
  }

  function handleSubmit() {
    const parsed = enquirySchema.safeParse(form);
    if (!parsed.success) {
      setSubmitError("Please check the earlier steps: some required details are missing.");
      return;
    }
    setSubmitError(null);
    startTransition(async () => {
      const result = await submitEnquiry(parsed.data, files);
      if (result.ok) {
        goToStep(4);
      } else {
        setSubmitError(result.error ?? "Something went wrong. Please try again or email us directly.");
      }
    });
  }

  return (
    <div ref={formTopRef}>
      <ol className="flex flex-wrap gap-x-6 gap-y-2 mb-10 font-sans text-label">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={cn(
              "flex items-center gap-2",
              i === step ? "text-(--color-ink)" : "text-(--color-steel)"
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center border text-[10px]",
                i === step
                  ? "border-(--color-brand-blue) text-(--color-brand-blue)"
                  : i < step
                    ? "border-(--color-ink) bg-(--color-ink) text-(--color-paper)"
                    : "border-(--color-line-strong)"
              )}
            >
              {i < step ? "✓" : i + 1}
            </span>
            {label}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset>
          <legend className="font-display text-2xl font-semibold mb-6">What do you need?</legend>
          <div role="group" aria-label="What do you need">
            {intentOptions.map((opt) => {
              const checked = form.intent.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={cn(
                    "flex min-h-14 cursor-pointer items-center gap-4 border-t border-(--color-line) py-4 pl-4 text-base transition-colors first:border-t-0 hover:bg-(--color-paper-raised)",
                    checked && "border-l-2 border-l-(--color-brand-blue) bg-(--color-paper-raised)"
                  )}
                >
                  <input
                    type="checkbox"
                    name="intent"
                    value={opt.value}
                    checked={checked}
                    onChange={() => toggleIntent(opt.value)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center border",
                      checked ? "border-(--color-brand-blue) bg-(--color-brand-blue)" : "border-(--color-line-strong)"
                    )}
                  >
                    {checked && <span className="h-1.5 w-1.5 bg-white" />}
                  </span>
                  {opt.label}
                </label>
              );
            })}
          </div>
          {errors.intent && <p className="mt-3 text-sm text-(--color-brand-blue)" role="alert">{errors.intent}</p>}
          <div className="mt-8">
            <Button type="button" onClick={handleNext} size="lg">
              Continue
            </Button>
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend className="font-display text-2xl font-semibold mb-6">Your details</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Full name" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Company / organisation" error={errors.company}>
              <input
                type="text"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Designation" optional>
              <input
                type="text"
                value={form.designation}
                onChange={(e) => update("designation", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
          <StepNav onBack={() => goToStep(0)} onNext={handleNext} />
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend className="font-display text-2xl font-semibold mb-6">Project details</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Project name" optional>
              <input
                type="text"
                value={form.projectName}
                onChange={(e) => update("projectName", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Location" optional>
              <input
                type="text"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Industry" optional>
              <select
                value={form.industry}
                onChange={(e) => update("industry", e.target.value)}
                className={inputClass}
              >
                <option value="">Select an industry</option>
                {industries.map((i) => (
                  <option key={i.slug} value={i.slug}>
                    {i.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Project stage" optional>
              <select
                value={form.projectStage}
                onChange={(e) => update("projectStage", e.target.value)}
                className={inputClass}
              >
                <option value="">Select a stage</option>
                {projectStageOptions.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Budget" optional>
              <input
                type="text"
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                placeholder="Approximate range, if known"
                className={inputClass}
              />
            </Field>
          </div>
          <div className="mt-5">
            <Field label="Requirements" optional>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Scope, timeline, or any specific technical constraints."
                className={inputClass}
              />
            </Field>
          </div>
          <StepNav onBack={() => goToStep(1)} onNext={() => goToStep(3)} />
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend className="font-display text-2xl font-semibold mb-6">Documents</legend>
          <p className="text-sm text-(--color-steel)">
            Drawings, specifications or any reference documents (optional, up to 12MB total).
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-5 flex min-h-14 w-full items-center justify-center border border-dashed border-(--color-line-strong) py-8 text-sm text-(--color-steel) hover:border-(--color-brand-blue) hover:text-(--color-brand-blue) transition-colors"
          >
            Click to attach files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
            className="sr-only"
          />

          {fileError && (
            <p className="mt-3 text-sm text-(--color-brand-blue)" role="alert">
              {fileError}
            </p>
          )}

          {files.length > 0 && (
            <ul className="mt-5">
              {files.map((file, i) => (
                <li
                  key={`${file.name}-${i}`}
                  className="flex items-center justify-between gap-4 border-t border-(--color-line) py-3 text-sm first:border-t-0"
                >
                  <span className="truncate text-(--color-ink)">{file.name}</span>
                  <span className="shrink-0 text-(--color-steel)">{formatBytes(file.size)}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="shrink-0 font-sans text-label font-medium text-(--color-brand-blue) hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          {submitError && (
            <p className="mt-4 text-sm text-(--color-brand-blue)" role="alert">
              {submitError}
            </p>
          )}
          <div className="mt-8 flex gap-4">
            <Button type="button" variant="secondary" onClick={() => goToStep(2)}>
              Back
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={isPending} size="lg">
              {isPending ? "Sending…" : "Send enquiry"}
            </Button>
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <div className="border-t border-(--color-line) pt-10 text-center">
          <p className="font-sans text-label font-medium text-(--color-brand-blue)">Enquiry received</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">
            Thanks, {form.name.split(" ")[0] || "there"}.
          </h2>
          <p className="mt-3 text-(--color-steel) max-w-md mx-auto">
            Our engineering team will review your enquiry and respond within one business day.
          </p>
        </div>
      )}
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const inputClass =
  "w-full border border-(--color-line-strong) bg-(--color-paper-raised) px-3.5 py-2.5 text-(--color-ink) focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-brand-blue)";

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block font-sans text-label font-medium text-(--color-steel) mb-1.5">
        {label} {optional && <span className="text-(--color-steel)">(optional)</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-sm text-(--color-brand-blue)" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

function StepNav({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="mt-8 flex gap-4">
      <Button type="button" variant="secondary" onClick={onBack}>
        Back
      </Button>
      <Button type="button" onClick={onNext} size="lg">
        Continue
      </Button>
    </div>
  );
}
```

(Changes beyond the step-0 checkbox rewrite: `emptyForm.intent = []`; `validateStep(0)` checks `.length === 0`; every `text-(--color-signal)` → `text-(--color-brand-blue)`; every `font-mono … tracking-[…] uppercase` label → the sentence-case `font-sans text-label` pattern; `optional` suffix in `Field` drops its now-redundant `normal-case` class since nothing above it is uppercase anymore.)

- [ ] **Step 2: Run the build**

```bash
npm run build
```

Expected: clean — the Task 24 type error is now resolved.

- [ ] **Step 3: Manual QA — multi-select behavior**

```bash
npm run dev
```

Navigate to `/contact/project-enquiry`. Confirm: clicking "Continue" with nothing checked shows "Choose at least one option to continue."; checking multiple boxes (e.g. HVAC + Electrical) and continuing works; each checked row shows a filled blue square indicator and the left blue accent border; tabbing through the checkboxes with the keyboard and toggling with Space works (native checkbox semantics).

- [ ] **Step 4: Verify `contact/actions.ts` needs no change**

`submitEnquiry`'s webhook payload is built with `{ ...parsed.data, attachments, ... }` — `parsed.data.intent` is now `string[]` automatically via the Task 24 schema change, and the spread/JSON.stringify/console.info calls all handle an array value with no special-casing required. Confirm:

```bash
grep -n "intent" src/app/\(site\)/contact/actions.ts
```

Expected: no direct references to `.intent` in this file at all (it only ever touches `parsed.data` as a whole) — no edit needed.

- [ ] **Step 5: Verify `contact/project-enquiry/page.tsx` needs no change**

This page renders only `<PageHero />` and `<EnquiryForm industries={industries} />` — it has no copy of the intent step or "5-step" wording of its own. Confirm:

```bash
grep -n "5-step\|5 step" src/app/\(site\)/contact/project-enquiry/page.tsx src/components/forms/EnquiryForm.tsx src/lib/enquiry.ts
```

Expected: no matches (the only prior "5-step" reference was a code comment in `EnquiryForm.tsx`, already rewritten in Step 1 above to describe the multi-select behavior instead).

- [ ] **Step 6: Commit**

```bash
git add src/components/forms/EnquiryForm.tsx
git commit -m "feat: enquiry step 1 becomes a multi-select checkbox group"
```

---

## Phase 8 — Engineering Library

### Task 26: Seed `src/content/resources.ts`

**Files:**
- Modify: `src/content/resources.ts`

**Interfaces:**
- Produces: `resources: Resource[]` now has 7 entries (5 discipline capability decks + company profile + quality certificates), all `status: "source_only"` with no `fileUrl` and no `body`. Consumed by `engineering-library/page.tsx` (Task 27) and `sitemap.ts` (already wired in Task 12, iterates `resources`).

- [ ] **Step 1: Replace the file**

```ts
import type { Resource } from "./types";

/**
 * Engineering Library seed — technical-credibility placeholders for
 * consultants, architects and specifiers (spec §9), not a blog. Every entry
 * is status: "source_only" with no fileUrl: it renders as a "Document
 * coming soon" row (engineering-library/page.tsx) until Airtech supplies
 * the actual PDF — adding fileUrl is the only change needed to make an
 * entry downloadable, no code change required.
 */
export const resources: Resource[] = [
  {
    slug: "mechanical-hvac-capability-deck",
    title: "Mechanical / HVAC capability deck",
    kind: "download",
    summary: "Airtech's HVAC design, procurement, installation, testing and commissioning capability.",
    seo: {
      title: "Mechanical / HVAC Capability Deck",
      description: "Airtech's HVAC engineering capability, for consultants and specifiers.",
    },
    status: "source_only",
  },
  {
    slug: "electrical-capability-deck",
    title: "Electrical capability deck",
    kind: "download",
    summary: "Airtech's internal and external electrification capability, from schematics through installation.",
    seo: {
      title: "Electrical Capability Deck",
      description: "Airtech's electrical engineering capability, for consultants and specifiers.",
    },
    status: "source_only",
  },
  {
    slug: "plumbing-public-health-capability-deck",
    title: "Plumbing & Public Health capability deck",
    kind: "download",
    summary: "Airtech's plumbing, sanitary and water/sewage treatment capability.",
    seo: {
      title: "Plumbing & Public Health Capability Deck",
      description: "Airtech's plumbing and public health engineering capability, for consultants and specifiers.",
    },
    status: "source_only",
  },
  {
    slug: "fire-protection-capability-deck",
    title: "Fire Protection capability deck",
    kind: "download",
    summary: "Airtech's fire protection and fire alarm system capability.",
    seo: {
      title: "Fire Protection Capability Deck",
      description: "Airtech's fire protection engineering capability, for consultants and specifiers.",
    },
    status: "source_only",
  },
  {
    slug: "elv-security-capability-deck",
    title: "ELV / Security / IT capability deck",
    kind: "download",
    summary: "Airtech's extra-low-voltage, access control, CCTV and networking capability.",
    seo: {
      title: "ELV / Security / IT Capability Deck",
      description: "Airtech's ELV, security and IT systems capability, for consultants and specifiers.",
    },
    status: "source_only",
  },
  {
    slug: "company-profile",
    title: "Company profile",
    kind: "download",
    summary: "Airtech Industries' company profile: history, capability and project experience.",
    seo: {
      title: "Airtech Company Profile",
      description: "Airtech Industries' company profile document.",
    },
    status: "source_only",
  },
  {
    slug: "quality-certificates",
    title: "Quality certificates",
    kind: "download",
    summary: "Current management-system certification. See also Quality & Certifications.",
    seo: {
      title: "Quality Certificates",
      description: "Airtech's quality management system certification documents.",
    },
    status: "source_only",
  },
];

export function getResources() {
  return resources;
}

export function getResourceBySlug(slug: string) {
  return resources.find((r) => r.slug === slug);
}
```

(No `insight` placeholders added — spec §9 marks those optional, and the content-truth rule prefers a section staying focused over adding speculative filler. All 7 entries name only document *categories* Airtech's own service taxonomy and existing Quality & Certifications page already confirm exist — no new capability, statistic, or certification claim.)

- [ ] **Step 2: Run the build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/content/resources.ts
git commit -m "feat: seed Engineering Library with placeholder capability-deck entries"
```

---

### Task 27: `/engineering-library` — filterable list + `BluePlaceholder` thumbnails

**Files:**
- Create: `src/components/library/LibraryExplorer.tsx`
- Modify: `src/app/(site)/engineering-library/page.tsx`

**Interfaces:**
- Consumes: `BluePlaceholder` (Task 4), `Label` (Task 3), `resources` (Task 26).
- Produces: `LibraryExplorer({ resources: Resource[] })`, a client component filtering by `kind` (the one filterable field the existing `Resource` type actually has — see the scoping note below).
- **Scoping note:** the spec (§9) asks for "filter by discipline / kind." `Resource` (`src/content/types.ts`) has no `discipline` field, and adding one would mean touching `types.ts` and the Sanity schema in `src/sanity/schemaTypes/resource.ts`, neither of which is in this plan's file inventory (spec §11) or this phase's scope. This task filters by `kind` only (`guideline`/`bulletin`/`download`/`insight` — a real field) and leaves discipline-filtering as a follow-up once the CMS/Supabase content model work (gated separately, per `[[architecture-supabase-migration]]` in project memory) adds the field properly.

- [ ] **Step 1: Write `LibraryExplorer.tsx`**

```tsx
"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";
import { Label } from "@/components/ui/Label";
import type { Resource } from "@/content/types";

const KIND_LABELS: Record<Resource["kind"], string> = {
  guideline: "Guideline",
  bulletin: "Bulletin",
  download: "Download",
  insight: "Insight",
};

export function LibraryExplorer({ resources }: { resources: Resource[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const kindFilter = searchParams.get("kind") ?? "";

  const kinds = useMemo(() => Array.from(new Set(resources.map((r) => r.kind))), [resources]);

  const filtered = useMemo(
    () => (kindFilter ? resources.filter((r) => r.kind === kindFilter) : resources),
    [resources, kindFilter]
  );

  function setKind(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("kind", value);
    else params.delete("kind");
    const qs = params.toString();
    router.replace((qs ? `${pathname}?${qs}` : pathname) as never, { scroll: false });
  }

  return (
    <div>
      <div className="flex justify-center">
        <select
          value={kindFilter}
          onChange={(e) => setKind(e.target.value)}
          aria-label="Filter by document type"
          className="border border-(--color-line-strong) bg-(--color-paper-raised) px-5 py-2.5 text-sm font-medium text-(--color-ink) focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-brand-blue)"
        >
          <option value="">All document types</option>
          {kinds.map((kind) => (
            <option key={kind} value={kind}>
              {KIND_LABELS[kind]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((resource) => (
          <div key={resource.slug} className="group flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <BluePlaceholder label={resource.fileUrl ? undefined : "Document coming soon"} />
            </div>
            <Label tone="muted" className="mt-4">
              {KIND_LABELS[resource.kind]}
            </Label>
            <h3 className="mt-1 font-display text-xl font-semibold text-(--color-ink)">{resource.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-(--color-steel)">{resource.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace `engineering-library/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { LibraryExplorer } from "@/components/library/LibraryExplorer";
import { resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Engineering Library",
  description:
    "Technical documentation for consultants, architects and specifiers: discipline capability decks, company profile and certifications from Airtech's engineering team.",
};

export default function EngineeringLibraryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Engineering Library" }]}
        eyebrow="Engineering library"
        heading="Technical documentation for consultants and specifiers."
        description="Discipline capability decks, company documents and certifications — published as Airtech supplies the source files."
      />
      <Section>
        {resources.length > 0 ? (
          <Suspense fallback={null}>
            <LibraryExplorer resources={resources} />
          </Suspense>
        ) : (
          <EmptyState
            title="Library in progress"
            description="Technical documentation is being prepared for publication. Contact us directly for anything you need in the meantime."
          />
        )}
      </Section>
    </>
  );
}
```

- [ ] **Step 3: Run the build**

```bash
npm run build
```

Expected: clean.

- [ ] **Step 4: Visual check**

```bash
npm run dev
```

Load `/engineering-library` — confirm all 7 seeded entries render as blue-placeholder cards with "Document coming soon", the "All document types" select filters correctly (only `download` exists right now, so filtering to it should show all 7 and filtering away should show none — a real second `kind` value only appears once Airtech supplies an `insight` article later).

- [ ] **Step 5: Commit**

```bash
git add src/components/library/LibraryExplorer.tsx "src/app/(site)/engineering-library/page.tsx"
git commit -m "feat: filterable Engineering Library list with BluePlaceholder thumbnails"
```

---

## Phase 9 — Careers

### Task 28: `company/careers/page.tsx` redesign

**Files:**
- Modify: `src/app/(site)/company/careers/page.tsx`

**Interfaces:**
- Consumes: `BluePlaceholder` (Task 4), `siteSettings` (existing).

- [ ] **Step 1: Replace the file**

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";
import { siteSettings } from "@/content/site-settings";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Careers at Airtech Industries: engineers and technicians working on hospitals, pharmaceutical facilities, hotels, telecom infrastructure and industrial sites across Nepal.",
};

// Architecturally separate from the engineering story (spec §10) — no
// lifecycle/expertise/projects narrative here — but visually inside the
// same design system: same PageHero, SectionHeader, BluePlaceholder. No
// stock "join our team" hero photo, no perks grid, no fabricated listings.
const WHY_AIRTECH = [
  {
    title: "Work that's visible",
    body: "Hospitals, pharmaceutical facilities, hotels, telecom infrastructure and industrial sites — engineering quality is directly visible in the result.",
  },
  {
    title: "Integrated scope",
    body: "Engineering, procurement, execution, testing, commissioning and after-sales support under one roof, not a single narrow trade.",
  },
  {
    title: "Team work",
    body: "Open exchange of information and resources across disciplines and with clients.",
  },
] as const;

export default function CareersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Careers" },
        ]}
        eyebrow="Careers"
        heading="Engineers who want to work on projects that matter."
        description="Airtech's work spans hospitals, pharmaceutical facilities, hotels, telecom infrastructure and industrial sites: technically demanding environments where engineering quality is directly visible in the result."
      />

      <Section>
        <SectionHeader eyebrow="Why Airtech" heading="What working here is like." />
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-3">
          {WHY_AIRTECH.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-xl font-semibold text-(--color-ink)">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-(--color-steel)">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="raised">
        <SectionHeader eyebrow="Open positions" heading="Current openings." />
        <div className="relative mt-10 aspect-[21/9] w-full overflow-hidden">
          <BluePlaceholder label="No open positions listed right now" />
        </div>
        <p className="mt-6 max-w-xl text-(--color-steel) leading-relaxed">
          No open positions are listed here right now. If you&apos;re an engineer or technician
          interested in Airtech&apos;s work, send your CV and area of interest — we keep it on file
          for the next relevant opening.
        </p>
      </Section>

      <Section>
        <SectionHeader eyebrow="How to apply" heading="Send us your CV." />
        <p className="mt-6 max-w-xl text-(--color-steel) leading-relaxed">
          Email your CV and area of interest to{" "}
          <a href={`mailto:${siteSettings.primaryEmail}`} className="text-(--color-brand-blue) hover:underline">
            {siteSettings.primaryEmail}
          </a>
          .
        </p>
      </Section>
    </>
  );
}
```

(No phone number — per `docs/AIRTECH_OPEN_DECISIONS.md` #1, still unresolved and gated. "Why Airtech" reuses positioning already published on `/company` and the pre-existing careers copy — multi-sector visible work, integrated scope, team work — rather than inventing culture/perks copy.)

- [ ] **Step 2: Run the build**

```bash
npm run build
```

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Load `/company/careers` — confirm it reads as in-system (blue accents, same type scale) but visually distinct from the engineering-story pages, with an honest empty-openings state (no fabricated job listings) and an email-only apply path.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(site)/company/careers/page.tsx"
git commit -m "feat: redesign Careers with Why Airtech block and honest empty openings state"
```

---

## Phase 10 — QA sweep

### Task 29: Build, lint, and content-safety grep verification

**Files:**
- No file changes expected — fix anything this task's checks surface, in the file(s) where the issue lives.

- [ ] **Step 1: Clean build and lint**

```bash
npm run build
npm run lint
```

Expected: both clean.

- [ ] **Step 2: Micro-label sweep — final check**

```bash
grep -rn "tracking-\[\|tracking-wide\|tracking-wider\|tracking-widest" src/ --include="*.tsx" --include="*.ts"
```

Every remaining hit must be one of: a discipline-code span (`M`/`E`/`PHE`/`FP`/`ELV`/`ADV`/`BMS`), a drawing/spec-value reference, or the `404` numeral (Task 10). If anything else appears, fix it using the same pattern from Phase 2.

```bash
grep -rn "uppercase" src/ --include="*.tsx" --include="*.ts"
```

Same rule — every remaining hit must be a discipline code or genuinely mono spec data, never a prose eyebrow/label/button/tab.

- [ ] **Step 3: Old-palette grep — confirm no gold/bronze/burgundy hex survives outside history**

```bash
grep -rn "#8a6428\|#c6a15b\|#d8bd84\|#f4ebd8\|#6e3036\|#00729b\|#f6f3ec\|#fcfbf8\|#252629\|#48453b\|#9b9a8f\|#e4dfd1\|#cbc2ac" src/ --include="*.tsx" --include="*.ts" --include="*.css"
```

Expected: no matches — every one of these old hex values was either repointed to a CSS variable in Task 1 or never hardcoded outside `globals.css` to begin with.

- [ ] **Step 4: Cold-storage / refrigeration guardrail**

```bash
grep -rin "cold storage\|refrigerat" src/content src/app src/components
```

Expected: no matches anywhere in the codebase.

- [ ] **Step 5: Gated-content guardrail**

```bash
grep -rn "authorised dealer\|authorized dealer\|authorised distributor\|authorized distributor" src/
grep -rn "300+\|+977" src/content src/app src/components
```

Expected: no "authorised dealer/distributor" wording anywhere (`docs/AIRTECH_OPEN_DECISIONS.md` #10); no team-headcount or phone-number figures newly introduced (spot-check any hit against `git blame`/`git log -p` to confirm it predates this plan rather than having been added by it — none of this plan's tasks introduce either).

- [ ] **Step 6: Route + redirect verification**

```bash
npm run dev &
sleep 2
curl -s http://localhost:3000/how-we-work -o /dev/null -w "%{http_code}\n"
curl -s http://localhost:3000/engineering-library -o /dev/null -w "%{http_code}\n"
curl -sI http://localhost:3000/resources | grep -i "^location:\|^HTTP"
curl -sI http://localhost:3000/resources/anything | grep -i "^location:\|^HTTP"
kill %1
```

Expected: `200` for the two new routes; `308` redirects for both `/resources` paths, landing on `/engineering-library` and `/engineering-library/anything` respectively.

- [ ] **Step 7: Content diff review**

```bash
git diff main...HEAD -- src/content/industries.ts src/content/resources.ts src/content/journey.ts src/lib/enquiry.ts
```

Read every line of this diff against `docs/AIRTECH_CONTENT_AUDIT.md` / `source-material/` / the already-sourced `src/content/services.ts` — confirm nothing was introduced that isn't traceable to an existing source. This is the spec's acceptance criterion 7 gate.

- [ ] **Step 8: Commit any fixes found**

If Steps 2–7 surface anything, fix it in place and commit:

```bash
git add -u
git commit -m "fix: QA sweep findings (labels/palette/content guardrails)"
```

(Skip this step if nothing was found.)

---

### Task 30: Playwright responsive screenshot pass

**Files:**
- No file changes expected unless the pass surfaces visual bugs — fix in the relevant component/page file if so.

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Screenshot the 9 acceptance-criteria routes at 3 breakpoints**

Using the Playwright MCP tools (`browser_navigate`, `browser_resize`, `browser_take_screenshot`), for each of `/`, `/how-we-work`, `/expertise/hvac`, `/industries/healthcare`, `/industries/embassies-ingos`, `/projects`, `/contact/project-enquiry`, `/engineering-library`, `/company/careers`:

1. `browser_resize(1440, 900)` → navigate → screenshot (desktop)
2. `browser_resize(768, 1024)` → screenshot (tablet)
3. `browser_resize(390, 844)` → screenshot (mobile)

- [ ] **Step 3: Frontend-design self-critique**

For each screenshot, check against the spec: Airtech blue is the only accent colour; no gold/bronze/burgundy; no uppercase-tracked labels outside discipline codes; no two full-height hero-scale headings back to back on `/`; `FeaturedProjects` card text is legible over every photo at all three widths; `ClientJourney` (compact on `/`, full on `/how-we-work`) renders correctly and the full variant's left rail / mobile progress indicator both work; `/industries/embassies-ingos` shows no invented technical-requirement bullets (its "What the system has to do" section should not render at all, since that array is still empty).

- [ ] **Step 4: Fix and re-screenshot**

Fix anything found in the file it lives in, re-run the build, and re-screenshot only the affected route/breakpoint to confirm the fix.

- [ ] **Step 5: Commit any fixes found**

```bash
git add -u
git commit -m "fix: visual QA findings from responsive screenshot pass"
```

(Skip if nothing was found.)

---

### Task 31: Contrast + accessibility audit pass

**Files:**
- No file changes expected unless the audit surfaces findings — fix in the relevant file(s) if so.

- [ ] **Step 1: Invoke the `audit` skill**

Run the `audit` skill (accessibility/contrast/theming/anti-pattern checks) against the routes from Task 30, with particular attention to the exact 8 routes named in spec §3.1's acceptance line: `/`, `/how-we-work`, `/expertise/hvac`, `/industries/healthcare`, `/projects`, `/contact/project-enquiry`, `/engineering-library`, `/company/careers`.

- [ ] **Step 2: Verify the specific contrast pairings the spec calls out**

Confirm, using the audit tooling or manual DevTools contrast checks:
- `--color-brand-blue` (`#045c80`) white text on it, and it as text on `--color-paper` (`#f3f5f7`) — both ≥ 4.5:1 (spec targets ≥ 6:1).
- `--color-steel` (`#454c55`) as body-secondary text on `--color-paper` — ≥ 7:1.
- `--color-steel-soft` (`#8b929b`) is never used as text on `--color-paper`/`--color-paper-raised` (dark-surface use only, per the token table).
- `--color-brand-blue-soft` (`#0099da`) is only used at large/decorative sizes or on dark backgrounds, never as small body/label text on `--color-paper`.

- [ ] **Step 3: Keyboard + reduced-motion pass**

Tab through `ClientJourney` (both variants), the `EnquiryForm` checkbox group, and the `LibraryExplorer`/`ProjectsExplorer` filter selects — confirm every interactive element is reachable and has a visible focus ring (`:focus-visible` outline, now blue). Toggle OS-level reduced motion and reload every route from Task 30 — confirm no motion plays anywhere (hero, `ClientJourney` visuals/spine, `MEPSequence`, `TrustedBy` marquee all go static).

- [ ] **Step 4: Fix and re-verify**

Fix any P0/P1 findings in the file where they live, re-run `npm run build`, and re-check the specific route/element.

- [ ] **Step 5: Commit any fixes found**

```bash
git add -u
git commit -m "fix: contrast and accessibility audit findings"
```

(Skip if nothing was found.)

---

### Task 32: Final code review and acceptance-criteria checklist

**Files:**
- No file changes expected — this task verifies, and fixes only if the review surfaces something.

- [ ] **Step 1: Run `code-review` against the full branch diff**

Invoke the `code-review` skill against the diff from `main` to the current branch tip. Address any high-confidence findings.

- [ ] **Step 2: Walk the spec's §12 acceptance criteria explicitly, one by one**

1. `next build` clean; no new TypeScript/lint errors — confirmed in Task 29 Step 1.
2. Zero WCAG AA text-contrast failures on the 8 named routes — confirmed in Task 31.
3. Airtech blue is the only accent colour anywhere; no gold/bronze/burgundy pixels — confirmed in Task 29 Step 3 and Task 30 Step 3.
4. No `UPPERCASE` + letter-spaced label text remains except discipline codes/spec data — confirmed in Task 29 Step 2.
5. `ClientJourney` works compact on `/` and full on `/how-we-work`, same six steps, keyboard-reachable, static under reduced motion — confirmed in Task 16 Step 6 and Task 31 Step 3.
6. Enquiry step 1 accepts multiple selections; empty submission shows the validation message; webhook payload carries `intent` as an array — confirmed in Task 25 Step 3.
7. No unsupported claim was introduced anywhere — confirmed in Task 29 Steps 4–5 and 7.
8. `/resources` redirects to `/engineering-library`; every library item is a non-downloadable "coming soon" row — confirmed in Task 29 Step 6 and Task 27 Step 4.
9. Homepage has no two full-height headings back to back; `FeaturedProjects` text is legible over every photo; the carousel doesn't trap vertical scroll — confirmed in Task 18 Step 3 and Task 19 Step 7.
10. Lighthouse (`next start`, not `next dev`): Performance ≥ previous baseline, SEO 100, Best Practices 100, a11y ≥ 96.

For criterion 10, run:

```bash
npm run build
npm run start &
sleep 3
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-home.json --chrome-flags="--headless"
kill %1
```

Read `lighthouse-home.json`'s category scores. If Performance regressed against a pre-change baseline (capture one on `main` before merging if none exists), investigate before proceeding — the hero's added canvas-grading `fillRect` calls and the new `ClientJourney`/journey-visual components are the most likely places a regression would come from; profile with Chrome DevTools Performance if so.

- [ ] **Step 3: Final diff review**

```bash
git log --oneline main..HEAD
git diff main...HEAD --stat
```

Confirm the commit sequence matches this plan's phases and nothing unrelated snuck in.

- [ ] **Step 4: Hand off**

This plan does not include merging — per `superpowers:finishing-a-development-branch`, decide with the user whether to open a PR, merge directly, or continue iterating, once every acceptance criterion above is confirmed green.

---

