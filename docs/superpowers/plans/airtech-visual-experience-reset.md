# Airtech visual experience reset — Global system + Landing hero

## Context

The prior plan (`airtech-visual-hard-reset.md`, already merged into this
branch — see its ledger at `.superpowers/sdd/airtech-visual-hard-reset/
progress.md`) reset the color tokens, fonts, and recomposed all 11
homepage section components toward a light/centered palette. The user has
now issued a much larger creative-direction brief: the result still reads
as "a website," not "a designed digital product." This plan implements the
first slice of that brief, per the user's own explicit ordering: global
design system → typography → background system → navigation → landing
hero → scroll-driven hero video sequence → transition into section 2 —
**then stop** for a Playwright/critique pass before continuing to internal
pages (a later plan, not this one).

**What carries forward unchanged from the prior plan** (do not re-touch
unless a task below explicitly says so): all color tokens in
`globals.css`, `Section`/`Container` primitives, `TrustBar`,
`PartnersStrip`, `FinalCTA`, `DataMoments`, `HVACSpotlight`,
`SystemShowcase`, `ProjectShowcase`, `EngineeringLifecycle`,
`IndustryJourney`. The user's restated color hex values in this new brief
are the same values already live in `globals.css` — no color-token task in
this plan.

**What this plan changes:** the display typeface, a new background-
atmosphere system (starting with the homepage), a navigation pass to keep
it visually consistent with the above, and a full rebuild of `Opening.tsx`
into a scroll-driven, video-backed hero sequence.

**Known open item carried forward, not this plan's to fix:**
`--color-steel-soft` (#7C93A0) fails WCAG AA contrast at real body/label
text sizes — flagged to the user at the end of the prior plan, still open,
still not touched here.

## Global Constraints

- This is a **visual and interaction** plan. No content/copy changes
  beyond what a task explicitly specifies (the hero's own copy, already
  drawn from the existing Opening.tsx text plus the user's brief). No
  changes to `src/content/*.ts`, `src/sanity/schemaTypes/`, or any
  non-homepage route.
- **No scroll-jacking outside the hero.** Only `Opening.tsx`'s own height
  is ever pinned. Once the hero's pin releases, scrolling is 100% native
  for the rest of the page — this must be true immediately on page load
  too (no long forced pin before the user even reaches the hero).
- **Reduced motion:** `prefers-reduced-motion: reduce` must produce a
  fully static hero — no pin, no scrub, no canvas animation — showing the
  hero's resolved end-state directly, consistent with how the rest of the
  site already handles `useReducedMotion()`.
- **Mobile (below the `md` breakpoint, 768px):** no canvas/video asset is
  loaded or requested at all — a lighter, purely typographic hero renders
  instead (extending the "no hero photography" precedent already
  established, and matching the user's own performance mandate). Decide
  the exact cutoff in code via `window.matchMedia("(min-width: 768px)")`
  gated GSAP `matchMedia()` context, not a CSS-only `hidden md:block`
  trick — the asset must not even be requested below 768px, not just
  visually hidden.
- **Performance:** the hero's image sequence must be preloaded only a few
  frames ahead of the current scroll position, not all up front. Target:
  no regression to Lighthouse Performance (verify via a build; a full
  Lighthouse run is not required, but do not introduce an unbounded
  synchronous asset load).
- `next build` must succeed with no new TypeScript/build errors after
  every task, run from the worktree root
  (`/Users/tanmay/Documents/airtech/.claude/worktrees/airtech-visual-reset`).
- **New dependencies this plan introduces:** `gsap` and `@gsap/react`
  (not currently installed — `npm install gsap @gsap/react` is part of
  Task 5). No other new runtime dependency is authorized without asking.
- **Visual verification standard**, same as the prior plan: after
  implementing, run `npm run dev` (`lsof -ti:3000 | xargs -r kill` first
  if occupied — kill only that specific PID; **never** run a broad
  `pkill` matching "playwright" or "mcp" in any form — doing so mid-plan
  once already cost this project a multi-hour delay by killing the shared
  Playwright MCP server this whole session depends on), then use the
  Playwright MCP browser tools to screenshot the affected area. Save
  screenshots into this plan's SDD workspace directory (same convention as
  before: ask `sdd-workspace` for the path, or reuse the directory your
  task brief file lives in) as `task-N-<viewport>.png`. Minimum viewports
  1440 and 390 for every task; Task 5 and Task 6 (the hero rebuild and the
  GSAP scroll sequence) get all six breakpoints
  (1440/1280/1024/768/390/375) plus explicit before/after states of the
  hero's scroll progression.
- Never spawn a subagent from inside a task.

## Design decisions already made (do not re-litigate — implement as specified)

These were researched and decided by the plan-writer before dispatch, the
same way the prior plan's exact hex values were pre-decided. Treat them as
literal spec, not a starting suggestion to redesign.

**Typography.** Replace the `Manrope` import in `src/app/layout.tsx` with
`Instrument_Serif` from `next/font/google`, keeping it wired to the same
`--font-display-face` CSS variable slot (zero call-site changes needed —
every component already uses the `font-display` Tailwind class, never the
raw font name). Instrument Serif ships on Google Fonts as
weight `400` only (regular + italic) — request
`weight: ["400"]`, `style: ["normal", "italic"]`, `display: "swap"`. Keep
`Geist` (body/UI) and `Geist_Mono` (technical labels) exactly as the prior
plan left them — this plan does not touch the body/mono fonts, only the
display face. This directly satisfies the brief's own example pairing
("Instrument Serif + Manrope") by keeping Manrope's already-integrated
sibling (Geist, a comparably clean modern sans — not Inter, not a generic
geometric sans) as the body face, and introducing the serif only at
display/headline scale where the brief asks for "character."

**Hero frame-sequence pipeline.** The video at `ASSETS/
Airtech_Industries_video_product…_202608211636.mp4` is 1280×720, 24fps,
10.0s, h264+aac, 2.5MB. Tested and verified on this machine: extracting at
`fps=6` (not the source 24fps — scroll-scrub doesn't need per-frame
temporal resolution, and this keeps the sequence light) yields 60 frames;
converting each to WebP at 960×540 via `cwebp -q 78 -resize 960 540`
yields ~40-45KB per frame (~2.5MB total for the full sequence) — an
acceptable payload for a *progressively loaded* (not all-at-once)
sequence gated to viewports ≥768px only. Exact commands are in Task 4's
brief. If `cwebp` isn't available in the execution environment, install it
via `brew install webp` (macOS) before falling back to any other approach
— do not skip WebP conversion and ship raw PNG frames (10-15x larger).

**Background-atmosphere system.** Not a single fixed value — this is
genuinely subjective and needs visual iteration, so Task 3's brief gives
concrete starting techniques plus explicit prohibitions and lets the
implementer tune via screenshot, same working pattern the prior plan used
successfully for the SystemShowcase/ProjectShowcase overlay retuning
(Task 5 of that plan, which needed one fix round and converged well).

## Task 1: Typography — `src/app/layout.tsx`

Replace the `Manrope` import with `Instrument_Serif` from
`next/font/google`, per the "Design decisions" section above:

```ts
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";

const displayFont = Instrument_Serif({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});
```

Remove the old `Manrope(...)` call entirely — nothing else references it
directly (everything goes through the `--font-display-face` variable and
the `font-display` Tailwind class). Do NOT touch the `Geist` or
`Geist_Mono` font calls, the `--font-sans`/`--font-mono` variable wiring in
`globals.css`, or `viewport.themeColor`.

Because Instrument Serif is a single-weight family, grep the codebase for
any `font-display` usage that also specifies a Tailwind font-weight
utility heavier than `font-normal` (e.g. `font-semibold`, `font-bold`,
`font-extrabold`) — these currently rely on Manrope's 700/800 weights.
Instrument Serif has no bold cut, so the browser will synthetically
embolden it (faux-bold), which looks poor on a serif. Fix every such call
site in: (a) the 11 homepage section components (this plan's main scope),
and (b) `src/components/layout/Header.tsx`'s wordmark specifically (`font-
display text-2xl font-bold` on the site title — Header is shared chrome
rendered on every route, not an "internal page," so it renders on the
homepage too and must not go faux-bold there). Leave every other internal-
page-only call site alone (e.g. `/company`, `/expertise` body content) for
the later phase. Replace the weight utility with either `font-normal`
(regular Instrument Serif reads as "display weight" at large sizes on its
own) or `italic` where emphasis is wanted, per the existing visual
context — use your judgment per call site, but do not leave a faux-bold
serif anywhere the homepage or its shared header/footer chrome renders.

**Verification:** `npm run build` clean. Screenshot the full homepage at
1440 and 390. Confirm Instrument Serif is actually rendering at every
headline (not silently falling back — check computed `font-family` via
`browser_evaluate` on at least one `font-display` element), and confirm no
headline reads as faux-bold/synthetically emboldened.

## Task 2: Navigation pass — `src/components/layout/Header.tsx`, `HeaderNav.tsx`

Read both files first. This is a verification-and-light-touch task, not a
redesign — the header is already token-driven from the prior plan and
should mostly just work once Task 1's fonts land. Your job:

1. Confirm the site wordmark/logo text reads well in the new typography —
   Task 1 already fixed its `font-bold` → non-bold/italic to avoid faux-
   bold on Instrument Serif, so this is a verification check, not a new
   fix: confirm that change actually landed and looks right at header
   scale (smaller than the hero's headline size, so re-check legibility
   at `text-2xl`, not just at hero scale).
2. Confirm the header's background/border still reads correctly against
   the (still-white) homepage now that Task 3 will add a background-
   atmosphere layer behind the hero specifically — the header itself does
   not need an atmosphere treatment, just confirm it doesn't visually
   clash with a hero that now has a subtle background layer directly
   beneath it (e.g. the header should stay opaque/solid, not blend oddly
   with hero content scrolling underneath it, unless it's already
   position:sticky with its own solid background — check and report which
   is true).
3. Do NOT add the "navigation morphing on scroll" effect mentioned as one
   of the brief's optional "design moments" — that's explicitly out of
   scope for this plan (roadmap item, not required here).

**Verification:** `npm run build` clean. Screenshot the header at 1440 and
390, both at the top of the page and scrolled down past the hero.

## Task 3: Background-atmosphere system — `src/app/globals.css`, `Opening.tsx` (background layer only)

The homepage currently reads as "white canvas + content + border + next
section" with no environmental depth. Add a background-atmosphere layer
specifically behind the hero (`Opening.tsx`) — do not touch any other
section's background in this task (DataMoments, TrustBar, etc. already
have their own token-driven backgrounds from the prior plan and are out of
scope here).

**Starting techniques to try** (pick and tune one or a light combination —
do not stack all of them, that becomes "gradient soup," which is
explicitly prohibited):

- A very soft, large-radius radial tint using existing tokens at low
  opacity, e.g. `radial-gradient(ellipse 70% 55% at 50% -15%,
  color-mix(in srgb, var(--color-blueprint-soft) 45%, transparent),
  transparent 70%)` positioned above/behind the hero content — a hint of
  atmosphere, not a visible "glow blob." Keep opacity low enough that a
  screenshot side-by-side with a flat white background shows a difference
  only on close inspection, not a dominant visual element.
- Fine technical linework: reuse the site's existing "drawing-sheet"
  vocabulary (see `.crop-frame` in `globals.css`, and the dimension-mark
  ticks in `Opening.tsx`'s current `BuildingSchematic` SVG) — e.g. a few
  sparse, thin `--color-line` or `--color-blueprint-soft` hairlines at
  low opacity positioned architecturally (not a repeating grid pattern,
  not a checkerboard — literal grep confirms no such pattern exists
  anywhere in the current codebase; do not introduce one now).
- Soft, single-source directional light suggestion via a subtle linear or
  radial gradient — avoid anything that reads as neon, purple, or
  cyberpunk; stay within the existing token palette only (no new colors).

**Explicitly prohibited:** gradient soup (3+ overlapping gradients),
visible blob shapes, purple/neon glows, particle effects, repeating grid
or checkerboard patterns, any color not already a token in `globals.css`.

Implement as a new CSS class (e.g. `.bg-atmosphere` or similar — your
naming) applied to `Opening.tsx`'s outer `<section>`, layered behind the
content via a pseudo-element or an absolutely-positioned sibling div with
`pointer-events: none`. It must not affect layout (no added height/width)
and must not interfere with the canvas element Task 5/6 will add on top of
it — coordinate z-index/stacking so this task's background layer sits
furthest back.

**Verification:** `npm run build` clean. Screenshot the hero at 1440 and
390 with and without the atmosphere layer visible (e.g. toggle the class
via `browser_evaluate` for an A/B comparison in your report) so the
reviewer can judge the effect is "feels expensive," not "obviously an
animated/decorated background." Confirm no layout shift introduced.

## Task 4: Hero frame-sequence asset pipeline (no component code — produces static assets)

Extract and convert the hero video into a WebP frame sequence for Task 6's
canvas scroll-scrub. This task produces files in `public/images/hero-
sequence/`, not component code — there's no "diff to review" in the usual
sense, the reviewer will verify file count, naming, sizes, and visual
spot-checks of a few frames instead.

Source video: `/Users/tanmay/Documents/airtech/ASSETS/
Airtech_Industries_video_product…_202608211636.mp4` (1280×720, 24fps,
10.0s — already confirmed present and readable).

Run, from the worktree root:

```bash
mkdir -p public/images/hero-sequence
cd public/images/hero-sequence
ffmpeg -y -i "/Users/tanmay/Documents/airtech/ASSETS/Airtech_Industries_video_product…_202608211636.mp4" \
  -vf "fps=6,scale=960:540" frame-%03d.png
for f in frame-*.png; do
  cwebp -q 78 "$f" -o "${f%.png}.webp"
done
rm frame-*.png
```

This should produce exactly 60 files, `frame-001.webp` through
`frame-060.webp`, each roughly 35-50KB (verified on this machine: ~40-45KB
at these settings). If `cwebp` is not available in your environment, run
`brew install webp` first (macOS) — do not fall back to shipping raw PNGs.

After generating, verify:
- Exactly 60 files exist, sequentially numbered `frame-001.webp` through
  `frame-060.webp` (zero-padded 3 digits).
- Total directory size is roughly 2-3MB (not 10MB+ — if it's far outside
  this range, something went wrong with the resize/quality flags; retry
  with the exact flags above rather than guessing new ones).
- Spot-check frame-001, frame-030, and frame-060 visually (read them with
  the Read tool — it can display images) to confirm they show real,
  distinct video content at three different points in the source video
  (not three near-identical frames, not corrupted/black frames).

**Verification:** No `npm run build` needed (no code changed). Report the
exact file count, total directory size, and your visual read of the three
spot-check frames. Commit the new `public/images/hero-sequence/` directory
with git.

## Task 5: Opening.tsx hero — static structure for all 5 states (no GSAP yet)

This task builds the hero's five visual states as reachable, styled DOM —
Task 6 wires actual scroll-driven GSAP control on top. Building this in
two steps keeps each one reviewable and de-risks the hardest task in this
plan.

Read the current `src/components/home/Opening.tsx` first (it currently
has the prior plan's centered-column hero with a small `BuildingSchematic`
SVG mark).

Recompose into five narrative states per the user's brief, all living in
the same component:

- **State 01 (rest/initial):** near-empty. Small eyebrow
  (`AIRTECH INDUSTRIES · EST. 2000 · MEP SINCE 2013` — reuse the exact
  existing copy, do not invent new copy), then the h1
  ("Engineering / complex spaces." — exact existing copy), minimal visual
  movement. This is exactly what `Opening.tsx` already renders today after
  the prior plan's centering work — keep it as the literal starting point,
  do not redesign it.
- **State 02:** a quiet engineering system begins appearing — reuse the
  existing `BuildingSchematic` SVG's early draw-in stages (lines, points)
  as this state's visual, rather than inventing new SVG geometry.
- **State 03:** the system becomes more complex/visible — the
  `BuildingSchematic`'s later draw-in stages (the full building outline,
  floor lines, the system trace).
- **State 04:** transitions into the video/frame-sequence visual — this
  state introduces a `<canvas>` element (empty/hidden for now, Task 6
  wires it) positioned where the SVG mark currently sits, sized
  responsively up to a reasonable max (e.g. `max-w-[720px]` centered,
  matching the scale of other homepage diagrams).
- **State 05 (resolved):** the complete visual (final canvas frame once
  wired, or the SVG's fully-drawn state as a placeholder until Task 6),
  the existing body copy and CTA row (exact existing copy: "Integrated
  HVAC and MEP engineering..." and the "Discuss Your Project" /
  "Explore our work" CTA row) becoming visible here, unchanged from what
  the prior plan already built.

For THIS task, states can be manually reachable via a temporary
`data-hero-state="1"` through `"5"` attribute you set for testing/
screenshotting purposes (e.g. via a quick `useState` + keyboard shortcut,
or just five separate screenshot passes with the value hardcoded and
reverted) — Task 6 replaces this manual mechanism with real scroll-driven
control. Do not ship a permanent manual state-switcher UI; it's a build/
test aid only, remove it (or leave it as a harmless dev-only affordance
behind `process.env.NODE_ENV === "development"`, your call, document
which) before finishing.

Keep all existing copy verbatim. Keep the `Section` wrapper and Task 3's
background-atmosphere layer. Preserve `useReducedMotion()` — for now
(before Task 6 adds real scroll logic) this just means state transitions
use simple opacity fades, no scroll dependency yet.

**Verification:** `npm run build` clean. Screenshot all five states at
1440, and states 1 and 5 (the two states visible without scroll
interaction, roughly) at all six breakpoints. In your report, describe
each state's visual content and confirm existing copy is unchanged.

## Task 6: Scroll-driven hero video sequence (GSAP)

This is the hardest task in the plan — wires real scroll control onto
Task 5's five states, integrating Task 4's WebP frame sequence.

Read `src/components/home/Opening.tsx` (Task 5's output) first.

1. `npm install gsap @gsap/react` from the worktree root.
2. Build a canvas-based image-sequence scrubber using GSAP's own
   documented helper pattern (verified current via Context7 against
   GSAP's official docs — implement this exact function, adapted to
   TypeScript/React, not a re-invention):

```ts
function imageSequence(config: {
  urls: string[];
  canvas: HTMLCanvasElement;
  scrollTrigger: ScrollTrigger.Vars;
  onUpdate?: () => void;
}) {
  const playhead = { frame: 0 };
  const ctx = config.canvas.getContext("2d")!;
  const images = config.urls.map((url, i) => {
    const img = new Image();
    img.src = url;
    if (i === 0) img.onload = updateImage;
    return img;
  });
  function updateImage() {
    ctx.drawImage(images[Math.round(playhead.frame)], 0, 0);
    config.onUpdate?.();
  }
  return gsap.to(playhead, {
    frame: images.length - 1,
    ease: "none",
    onUpdate: updateImage,
    scrollTrigger: config.scrollTrigger,
  });
}
```

   Adapt for **progressive loading, not all 60 images up front**: eagerly
   create/load only the first ~8 `Image` objects; lazily instantiate the
   rest as `playhead.frame` approaches them (e.g. in `onUpdate`, check if
   `images[Math.round(playhead.frame) + 5]` exists yet and create it if
   not). Document your exact lazy-load window choice in the report.

3. Wire this inside a `useGSAP()` hook (from `@gsap/react` — use the
   current documented API: `useGSAP((context, contextSafe) => {...},
   {scope: containerRef})`, which auto-cleans on unmount via
   `context.revert()` — do not hand-roll manual `ScrollTrigger.kill()`
   cleanup, the hook handles it). Guard the entire scroll-driven setup
   inside `gsap.matchMedia()`:
   - A `"(min-width: 768px) and (prefers-reduced-motion: no-preference)"`
     query: full pinned + scrubbed sequence, `ScrollTrigger` config
     `{trigger: heroRef.current, pin: true, start: "top top", end: "+=" +
     (window.innerHeight * 3), scrub: 1}` (tune the `end` distance — 3x
     viewport height is a starting point, adjust based on how it feels in
     your screenshot pass; the hero should not take an excessively long
     scroll to complete). Map `scrollTrigger.progress` (0→1) to the five
     states' visibility/opacity (states 1-3 fade through early progress,
     state 4's canvas becomes visible and scrubs through the 60 frames
     across the middle/late progress range, state 5's copy/CTA fades in
     at the end) AND to the `imageSequence` tween's own scrollTrigger
     (they should share one trigger/timeline, not two independent
     triggers on the same pinned element — use one `gsap.timeline({
     scrollTrigger: {...} })` and add both the frame-scrub tween and the
     state-opacity tweens to it with explicit position parameters, per
     GSAP's documented timeline+ScrollTrigger pattern).
   - Any other case (narrow viewport OR reduced motion): no `matchMedia`
     branch registers `ScrollTrigger` at all — the hero renders State 5
     (resolved) statically, immediately, canvas/video assets never
     requested. This is the mechanism enforcing the Global Constraints'
     mobile/reduced-motion rules — implement it as the ABSENCE of a
     branch, not as a branch that "shows nothing."
4. `<Image>`/`fetchpriority` note: do NOT use `next/image` for the
   sequence frames (canvas needs raw `HTMLImageElement`s, not a Next.js
   optimized `<img>`) — plain `new Image()` as in the helper above is
   correct here, that's an intentional, documented exception to the
   site's usual `next/image` convention.
5. Confirm the pin releases cleanly and native scrolling resumes
   immediately after — no residual scroll-jank, no dead zone.

**Verification:** `npm run build` clean. This needs the most thorough
manual verification in the plan:
- Screenshot the hero at progress 0%, ~25%, ~50%, ~75%, 100% (drive this
  via `browser_evaluate` calling `window.scrollTo` to specific pixel
  offsets you calculate from the pin's total scroll distance, or by
  directly setting `ScrollTrigger.getById(...).progress = X` if you expose
  an id — your call on the mechanism, but produce 5 real intermediate
  screenshots, not just start/end) at 1440.
- Full six-breakpoint screenshots of the hero's resting state (0% and
  100% progress) — 768px and below should show the static Task-5-state-5
  rendering with zero network requests to `hero-sequence/` (verify via
  `browser_network_requests` or equivalent — report the request count to
  that path at 375/390/768 widths, should be 0).
- Toggle `prefers-reduced-motion` (via `browser_evaluate` /
  emulateMedia-equivalent) at 1440 and confirm the static State 5 renders
  immediately with no pin/scrub, and zero requests to `hero-sequence/`.
- Confirm scrolling past the hero on a normal (non-reduced-motion, ≥768px)
  viewport releases the pin and reaches SystemShowcase (Task 7 will handle
  the SystemsReveal→SystemShowcase transition feel, but confirm here that
  scroll doesn't get stuck).
- Report the total number of `hero-sequence/*.webp` network requests fired
  during a full scroll-through at 1440 — should be 60 or fewer (progressive
  loading working), never 60 requests fired instantly on page load.

## Task 7: Transition into SystemsReveal — verification only, small fixes if needed

Read `src/components/home/Opening.tsx` (post Task 6) and
`src/components/home/SystemsReveal.tsx`. Confirm the hero's exit (State 5,
pin released) flows into SystemsReveal without a jarring visual jump —
check spacing/margin between the two sections, and whether SystemsReveal's
own entrance (it already has scroll-reveal behavior from the prior plan)
feels sequenced rather than abrupt. Make only small spacing/timing
adjustments if something looks wrong — this is not a redesign task for
SystemsReveal, which is out of this plan's scope otherwise.

**Verification:** `npm run build` clean. Screenshot the hero-to-
SystemsReveal transition zone (scrolled to roughly the boundary) at 1440
and 390.

## Roadmap (not executed in this plan)

- Full Playwright + critique + fix loop across the whole homepage once
  this plan's tasks are done (per the user's own §29 — this happens after
  Task 7, before any further work is authorized).
- Internal pages (Expertise, Industries, Projects, Company, Service &
  Support, Resources, Contact) get their own designed openings and
  per-page background character, per the user's brief §16.
- Projects index rebuilt as a cinematic editorial sequence (brief §17).
- TechnicalFrame's placeholder pattern (currently a faint diagonal
  hairline hatch, not a literal grid/checkerboard — audited, confirmed no
  checkerboard pattern exists anywhere in the current codebase) may get a
  more sophisticated treatment when the internal-pages phase touches the
  files that use it (Projects, Industries) — out of scope for this
  homepage-only plan.
- Additional "design moments" from the brief's §15 menu (project-image
  expand transitions, navigation morphing, industry-selection environment
  changes, etc.) — the user says to pick 4-5, not all 10; this plan
  implements exactly one (the hero sequence, clearly the highest-value
  one) and leaves selecting the remaining 3-4 to a future planning pass.

## Critical files

- src/app/layout.tsx
- src/app/globals.css
- src/components/layout/Header.tsx
- src/components/layout/HeaderNav.tsx
- src/components/home/Opening.tsx
- public/images/hero-sequence/ (new directory)
- src/components/home/SystemsReveal.tsx (verification-only touch)
- package.json / package-lock.json (gsap, @gsap/react added)
