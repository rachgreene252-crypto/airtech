# Airtech visual reset (round 2) — design spec

Date: 2026-09-02. Status: **in progress, building while writing** (user directive).
Supersedes the abandoned `worktree-airtech-visual-reset` branch (rejected).

## Why

Client feedback: the site reads "gloomy and old-school," no x-factor, not luxurious.
Root causes identified in audit:

1. **Oswald** condensed signage face on every headline → blunt, industrial, dated.
2. Cold murky palette: grey `#f3f5f7` ground + navy-black ink + muddy `#045c80` accent
   + a low-opacity architectural line-art wash behind *every* page = haze.
3. `display: "optional"` fonts → Arial Narrow on cold load.
4. No signature moment; empty placeholder frames on the homepage read as unfinished.

## Direction (client-approved)

- **Editorial serif + clean grotesque.** Fraunces (display) + Geist (body/UI) +
  IBM Plex Mono (technical labels only).
- **Cool palette kept**, but brightened and de-hazed. No warm pivot.
- **Every page centre-aligned.** Shared primitives centre by default.
- **Header + footer** restyled into the same type/colour system as the pages.
- **GSAP scroll hero kept** — same scrub mechanism, re-graded bright, serif headline,
  quiet choreography (hairline draw, disciplines tick in).
- **Lenis** smooth-scroll driving ScrollTrigger for buttery entry/exit.
- Content-truth rules from `.claude/skills/airtech-digital-experience/SKILL.md` still
  bind: no invented numbers; turnover chart / team size / full client wall stay gated.

## Scope of this pass

1. Design system — `globals.css` tokens (colour, type scale, motion), `layout.tsx` fonts,
   Lenis provider, background treatment.
2. Shared primitives — `Section`, `Container`, `SectionHeader`, `PageHero` centred;
   `Header*`, `Footer` restyled.
3. Homepage — rebuilt on the system.
4. Expertise — nav dropdown removed; `/expertise` becomes a persistent left-rail
   switcher; `/expertise/[slug]` renders inside a shared nested layout.

Other interiors inherit tokens + centred primitives automatically; their section-level
redesign is a later pass.

## Token system (target)

### Colour
| Token | Value | Role |
|---|---|---|
| `--color-ink` | `#14181D` | cool near-black, primary text |
| `--color-ink-soft` | `#3C4550` | secondary text on light |
| `--color-steel` | `#586470` | muted text (AA on white) |
| `--color-steel-soft` | `#7E8894` | large/decorative only |
| `--color-line` | `#E4E8EC` | hairlines |
| `--color-line-strong` | `#CBD2D9` | grid rules |
| `--color-paper` | `#FFFFFF` | default page ground (bright) |
| `--color-paper-raised` | `#F4F7F9` | alternating-section tint |
| `--color-brand-blue` | `#1A5A9E` | links, CTAs, focus (AA on white) |
| `--color-brand-blue-hover` | `#154A83` | pressed |
| `--color-brand-blue-soft` | `#5B8FC7` | on-dark / decorative |
| `--color-brand-blue-tint` | `#EAF1F8` | tint fills |
| `--color-blue-deep` | `#0C2233` | dark bands / hero grade base |

`--color-signal*`, `--color-amber*`, `--color-heritage` stay repointed to blue (as today)
so every existing call site recolours with no component churn.

### Type
- `--font-display-face` → Fraunces (variable, normal + italic, `opsz`)
- `--font-sans-face` → Geist (variable)
- `--font-mono-face` → IBM Plex Mono (400, 500)
- all `display: "swap"` with real fallback metrics (kills the Arial-Narrow bug)

Scale: `display-2xl` clamp(3rem,7vw,6rem) hero only · `display-xl` clamp(2.5,5vw,4) ·
`display-l` clamp(2,3.6vw,3) · `display-m` clamp(1.5,2.4vw,2) · `title` 1.375rem ·
`body-l` 19px · `body` 17px · `small` 15px · `label` 13px. Body line-height 1.65.

### Motion
`--ease-out: cubic-bezier(0.22,1,0.36,1)` · `--dur-1: 200ms` · `--dur-2: 350ms` ·
`--dur-3: 600ms`. Lenis for smooth scroll; disabled under `prefers-reduced-motion`
(native scroll re-enabled there). GSAP ScrollTrigger for the 3 choreographed moments
(hero, systems diagram, lifecycle track); Framer `Reveal` (opacity only) everywhere else.

### Background
Keep the architectural line-art layer (`body::before`), but brightened (overlay ~0.82)
and softened (`blur(2px) brightness(1.06)`) so it reads as faint texture, not murk.
`.bg-site-texture` collapses to a no-op (the body layer covers it). Final call — keep
vs remove — decided from screenshots.

## Build log

### Round 1 (2026-09-02)

Done:
- `globals.css` — new cool-bright token set, editorial type scale (+display-2xl),
  motion tokens, `.font-display.font-{bold,semibold}` compound-selector overrides
  (lightens ~73 existing headings to Fraunces 430–470 with no per-file edits),
  background layer brightened + blurred, `.bg-site-texture` → transparent,
  `scroll-behavior` handed to Lenis.
- `layout.tsx` — Fraunces + Geist + IBM Plex Mono, all `display: "swap"`.
- `SmoothScroll.tsx` — `ReactLenis root` + GSAP ticker/ScrollTrigger sync; off under
  reduced motion. Wired into `(site)/layout.tsx`.
- Primitives centred: `Container` (1320px), `SectionHeader` (centre default, mono
  eyebrow, light weight), `PageHero` (centred column).
- `Footer` → light, Fraunces wordmark, mono labels, hairlines.
- `HeaderShell`/`HeaderNav` — mono tagline, lighter logo, Fraunces mobile "Menu".
- `navigation.ts` — Expertise dropdown removed (plain link).
- Eyebrow sweep: `font-sans text-label font-medium text-(--color-brand-blue[-soft])`
  → `font-mono … uppercase tracking-[0.14em]` across ~23 sites.
- `CinematicHero` — dropped the 240-frame canvas sequence (source frames were an
  AI-generated glossy "MEP" wheel with warped text — off-brief). Now: single clean
  architectural still, GSAP intro choreography + scroll parallax/fade. No pin.
- Homepage: `EngineeringStatement` cut (redundant); `MEPSequence` retimed + tighter;
  `ProofBar` → quiet editorial row (count-up + spec-box removed); `WhatWeDo` →
  numbered sheet index; `FeaturedProjects` copy + sharper card radius;
  `TrustedBy` → typographic client index (logo assets were upscaled screenshots
  with hard boxes — see component note); hairline rhythm + tighter padding sitewide.
- Expertise restructure: `expertise/layout.tsx` (centred header + persistent
  `ExpertiseRail`), `ExpertiseRail` (desktop vertical list / mobile select),
  `/expertise` overview panel, `/expertise/[slug]` reworked as in-layout panel
  (own dark hero removed).
- `projects/page.tsx` hero centred.

`next build` clean. Screenshots in session scratchpad.

### Round 2 (2026-09-02)

- `service-support` hero → centred `PageHero` (was a full-bleed left-photo hero).
- `how-we-work` FullJourney: dropped the sparse SVG "viewport" frames (both the
  sticky-rail one and the per-step ones), removed the `whileInView opacity:0`
  fragility (was rendering a tall void in some states), now a clean single-column
  numbered editorial sequence + sticky lifecycle rail + dark finale band.
- Homepage `ClientJourney` (compact): same treatment — dropped the weak left
  SVG pane, now a single step-card panel that swaps on scroll/hover + the
  6-node timeline. Deleted the now-unused `VISUALS` map + visual imports
  (`src/components/journey/visuals/*` left on disk, unreferenced).
- `.select-field` global style (drawn chevron, mono caps) applied to the
  Projects and Engineering Library filters + the Expertise mobile rail select.
- `ProofBar` figure sizing so "In-house" stops wrapping.
- Homepage section rhythm: hairline `border-t` between sections, padding
  `py-14/16/20`.

`next build` + `eslint` clean.

Open / needs user steer:
- `TrustedBy` now groups clients by sector (banking / pharma / institutional) —
  the names were already live as logo alts, but the grouping is a light new claim;
  confirm OK or revert to a flat list.
- Hero copy changed to "Engineering what keeps Nepal moving." (the skill's own
  suggested opening line) + new sub-copy.
- Interior pages (company, service-support, how-we-work, library, contact) have the
  new tokens/type but no section-level redesign yet — that's the follow-up pass.
- Native `<select>` on projects filter + expertise mobile rail is unstyled — polish later.
