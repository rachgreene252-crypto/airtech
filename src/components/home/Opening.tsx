"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ButtonLink } from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const FRAME_COUNT = 60;
const FRAME_URLS = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/images/hero-sequence/frame-${String(i + 1).padStart(3, "0")}.webp`,
);

// Progressive-loading window for the canvas frame sequence. Loading all 60
// WebP frames up front (~1.8MB total per Task 4) the instant a wide,
// motion-allowed viewport mounts would be wasteful for anyone who never
// scrolls the hero into view. Instead: eagerly create/load only the first
// `EAGER_FRAME_COUNT` frames (enough to paint immediately and cover a fast
// initial scroll before the lazy loader can catch up), then lazily
// instantiate the rest as playback approaches them. `LOOKAHEAD`/`LOOKBEHIND`
// define a rolling window around the current scrubbed frame — ahead-biased
// (5 frames) since forward scroll is the overwhelmingly common direction,
// with a small look-behind (2 frames) so scrolling back up through the pin
// doesn't have to wait on a network request for frames already passed on a
// normal forward-first traversal.
const EAGER_FRAME_COUNT = 8;
const LOOKAHEAD = 5;
const LOOKBEHIND = 2;

/**
 * GSAP-driven canvas image-sequence scrubber, adapted from GSAP's own
 * documented `imageSequence` helper pattern (ScrollTrigger docs, verified
 * via Context7 in the Task 6 brief). Two deliberate deviations from that
 * reference implementation, both called for explicitly in the brief:
 *
 * 1. Progressive/lazy loading (see the constants above) instead of eagerly
 *    constructing all `urls.length` `Image` objects up front.
 * 2. No `scrollTrigger` config of its own. The reference helper wires a
 *    `gsap.to(playhead, {..., scrollTrigger: config.scrollTrigger})`
 *    directly — i.e. its own independent ScrollTrigger. The brief instead
 *    requires the frame-scrub tween to live inside the *same* pinned
 *    timeline as the state-opacity crossfades (one shared trigger, not two
 *    independent ones on the same pinned element). So this factory returns
 *    a `{ playhead, updateImage, totalFrames }` handle; the caller adds
 *    `playhead` to the master timeline itself via `tl.to(seq.playhead, {...
 *    onUpdate: seq.updateImage}, position)`.
 */
function createImageSequence({
  canvas,
  urls,
}: {
  canvas: HTMLCanvasElement;
  urls: string[];
}) {
  const playhead = { frame: 0 };
  const ctx = canvas.getContext("2d");
  const images: HTMLImageElement[] = new Array(urls.length);

  function loadFrame(i: number) {
    if (i < 0 || i >= urls.length || images[i]) return;
    const img = new Image();
    img.src = urls[i];
    images[i] = img;
    if (i === 0) img.onload = updateImage;
  }

  for (let i = 0; i < Math.min(EAGER_FRAME_COUNT, urls.length); i++) loadFrame(i);

  function updateImage() {
    const frame = Math.round(playhead.frame);
    for (let i = frame - LOOKBEHIND; i <= frame + LOOKAHEAD; i++) loadFrame(i);
    const img = images[frame];
    if (ctx && img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }

  return { playhead, updateImage, totalFrames: urls.length };
}

/**
 * Editorial, typography-first opening — no hero photograph. A full-bleed
 * image with an overlay was tried first; it competed with the headline for
 * attention and read as a generic corporate/SaaS hero regardless of how the
 * overlay was tuned. This is the "luxury product launch" version instead:
 * warm ivory canvas, huge whitespace, a quiet fine-line technical drawing
 * and (on qualifying viewports) a real scroll-scrubbed video sequence
 * standing in for photography rather than competing with it.
 *
 * Five narrative beats, all ALWAYS mounted (see below for why):
 *   1. near-empty — eyebrow + headline only.
 *   2. a quiet engineering system begins appearing — BuildingSchematic's
 *      early draw-in stage (outline, roofline, ground).
 *   3. the system becomes fully visible — BuildingSchematic's later stage
 *      (floor lines, system trace, dimension mark).
 *   4. the canvas fades in and scrubs through 60 extracted video frames
 *      (public/images/hero-sequence/) as the user scrolls.
 *   5. resolved — body copy + CTA row appear over the sequence's final
 *      frame.
 *
 * ## Two rendering paths, one JSX tree, no React-state branching
 *
 * Task 5 drove these as discrete React states switched via
 * `AnimatePresence mode="wait"`. That doesn't survive contact with
 * continuous scroll: driving `heroState` from ScrollTrigger callbacks would
 * mean dozens of `setState` calls a second under fast scrolling, each
 * triggering a mount/unmount/exit-animation cycle — visible lag and
 * stacking. So GSAP now owns these elements' `opacity`/`y` directly via
 * refs, entirely bypassing React state and `AnimatePresence` for the
 * scroll-driven path. Every element that participates in the sequence is
 * unconditionally mounted; only the CSS/inline *visibility* differs.
 *
 * The two "modes" this needs to support — (a) a wide, motion-allowed
 * viewport running the full pinned GSAP sequence, and (b) everything else,
 * showing a static resolved hero with zero `hero-sequence/` requests — are
 * expressed as plain CSS defaults plus JS-applied hiding, never a
 * conditional render, and never CSS that hides something only JS can ever
 * reveal:
 *   - `schematicFullRef` and `resolvedCopyRef` are visible by DEFAULT — no
 *     hiding class of any kind in the static markup. That's what mode (b)
 *     looks like, and it's also exactly what mode (a) looks like for the
 *     brief instant before JS runs. The qualifying-viewport `matchMedia`
 *     branch below hides them itself, synchronously, via
 *     `gsap.set(el, { autoAlpha: 0, ... })` (an inline style) before the
 *     pinned timeline reveals them progressively. Fix-round-1 correction:
 *     an earlier version hid these two via static Tailwind classes keyed to
 *     the same `md:motion-safe:` media query GSAP's `matchMedia` uses.
 *     That's a trap — the CSS hides them independent of whether JS ever
 *     actually runs, so any JS failure (script blocked, GSAP failing to
 *     load, the `!canvasRef.current || ...` early-return guard below
 *     firing) left a qualifying desktop viewport with a permanently
 *     invisible body copy, CTA, and schematic — no description, no CTA, no
 *     visual, no way to ever recover. Making JS the ONLY thing that can
 *     ever hide them means a JS failure now degrades to "the static
 *     fallback shows a beat early," never to "the content never appears."
 *   - `schematicEarlyRef` and the canvas wrapper default to
 *     `opacity-0 invisible` unconditionally, in static CSS — safe (not the
 *     same trap) because they're never the only visual on screen:
 *     `schematicFullRef`/`resolvedCopyRef`'s visible-by-default state
 *     always stands in for them until/unless JS explicitly reveals them
 *     partway through the pinned sequence.
 * This means the correct non-JS/no-match fallback (state 5, statically) is
 * simply what the page looks like before any JS touches it — not a branch
 * that "hides an already-loaded asset". Critically, the `<canvas>` element
 * existing in the DOM costs nothing on its own; the WebP frame requests are
 * only ever issued inside the `matchMedia` callback below (`new Image()` +
 * `img.src = ...`), so a non-qualifying viewport never fetches them
 * regardless of the canvas's presence.
 */
export function Opening() {
  const reduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLElement | null>(null);
  const schematicEarlyRef = useRef<HTMLDivElement | null>(null);
  const schematicFullRef = useRef<HTMLDivElement | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const resolvedCopyRef = useRef<HTMLDivElement | null>(null);
  const visualRowRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // The ONLY branch that ever registers a ScrollTrigger, constructs a
      // frame `Image`, or fetches anything from hero-sequence/. Narrow
      // viewports and prefers-reduced-motion are handled by the absence of
      // a branch here, not by a branch that hides a loaded asset.
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        if (!canvasRef.current || !heroRef.current || !resolvedCopyRef.current) return;

        const seq = createImageSequence({ canvas: canvasRef.current, urls: FRAME_URLS });

        // Compact the hero's layout to fit within one viewport height.
        // `pin: true` freezes the section in place for the whole scroll
        // range below — the section's normal, generously-padded flow
        // height (~1200px at 1440x900, taller than the viewport itself)
        // would leave its bottom content (the visual mark) permanently cut
        // off below the fold for the entire pin, since a pinned element
        // can't scroll its own overflow into view.
        //
        // Fix-round-1 correction, part 1 (header overlap): the previous
        // version sized the hero's HEIGHT to `window.innerHeight -
        // headerHeight`, reasoning that subtracting the sticky header's
        // height would make the box fit below it. It didn't — the pinned
        // box's own top edge still sits at document y=0 (CSS has no idea
        // the header is "above" it; `pin: true` just freezes the section's
        // current position), so the reclaimed space landed at the BOTTOM of
        // the shrunk box while the TOP kept overlapping the sticky header
        // by exactly headerHeight px. Measured live at 1280 wide: the
        // eyebrow sat 8px *under* the header, with ~73px of dead space left
        // at the bottom.
        //
        // Fix-round-1 correction, part 2 (why this is CSS, not `gsap.set`,
        // and why that's not just a style preference): the compact layout
        // used to be applied via `gsap.set(heroRef.current, {height,
        // paddingTop, ...})`, re-run on every ScrollTrigger refresh via
        // `onRefreshInit` so it wouldn't go stale on a same-breakpoint
        // resize. That measurement/re-apply logic was correct in isolation
        // — verified via a direct log immediately after the `gsap.set`
        // call, which showed the right height every time — but it was
        // fighting a losing battle against ScrollTrigger's OWN pin
        // bookkeeping. `pin: true` on `heroRef.current` (this is also the
        // `trigger` element below) makes ScrollTrigger snapshot that
        // element's *entire inline style* via `_getState()` exactly ONCE,
        // the first time the pin activates — and every single
        // `refresh()` call (automatic on resize, or the explicit one this
        // file also fires — see the resize listener further down)
        // temporarily reverts the pinned element back to that ONE frozen
        // snapshot *before* remeasuring, as an unavoidable, documented part
        // of ScrollTrigger's own refresh cycle (it needs to un-pin
        // temporarily to measure the page's natural flow). Since that
        // snapshot was taken right after our very first `gsap.set` call
        // (at whatever the viewport happened to be at mount), it
        // permanently re-imposes THAT height on every later refresh,
        // clobbering whatever a fresh `onRefreshInit` measurement had just
        // set — deterministically, not flakily, confirmed by instrumenting
        // both sides of the `ScrollTrigger.refresh()` call directly. No
        // amount of re-running the `gsap.set` on refresh can out-run
        // ScrollTrigger's own revert-to-original-snapshot step, because
        // that step runs *after* `onRefreshInit` on every single refresh.
        //
        // The fix: never put this on the pinned element's INLINE style at
        // all. `_getState`/`_swapPinOut` only snapshot and restore the
        // inline `style` attribute — a plain CSS class is untouched by it.
        // So the compaction is expressed below as static Tailwind classes
        // (`md:motion-safe:h-dvh md:motion-safe:pt-[var(--hero-header-h,73px)]
        // ...`), gated behind the exact same media query as GSAP's
        // `matchMedia` branch, so it only ever applies where the scroll
        // sequence runs. `h-dvh` (100dvh) is inherently viewport-responsive
        // with zero JS involved. The one piece that still needs a real
        // measurement — the header's rendered height, for `padding-top` — is
        // written to a CSS custom property on `document.documentElement`
        // instead of on `heroRef` itself, so it's completely outside
        // ScrollTrigger's pin bookkeeping for this trigger and survives
        // every refresh untouched. (`73px` is also hardcoded as the
        // `var()` fallback, matching every qualifying breakpoint measured
        // during verification, in case this ever runs before the variable
        // is set.)
        function applyHeaderHeightVar() {
          const headerHeight =
            document.querySelector("header")?.getBoundingClientRect().height ?? 0;
          document.documentElement.style.setProperty("--hero-header-h", `${headerHeight}px`);
        }
        applyHeaderHeightVar();
        gsap.set(resolvedCopyRef.current.querySelector("p"), { marginTop: "1rem" });
        gsap.set(resolvedCopyRef.current.querySelector(":scope > div"), { marginTop: "1.25rem" });
        gsap.set(visualRowRef.current, { marginTop: "0.75rem" });
        gsap.set(canvasWrapRef.current, { maxWidth: "340px" });
        // The schematic wrappers (schematicEarlyRef/schematicFullRef) are
        // the only IN-FLOW children of the visual-mark row — canvasWrapRef
        // and schematicEarlyRef are `absolute`, so only schematicFullRef's
        // rendered size actually determines the row's flex-sized height.
        // Left at its default ~263px (larger than the shrunk 191px-tall
        // canvas above), the row would still reserve ~263px regardless of
        // the canvas resize. Cap it to match the canvas's own height so the
        // row's real footprint tracks the visual that's actually on screen
        // for most of the pin. (Values passed as unit strings, not bare
        // numbers — a bare number here left `max-width` unset with no
        // warning on these two targets. The underlying rule: GSAP infers a
        // numeric CSS value's unit from the property's *existing computed
        // value*, and when that's `none`/`auto` — as `max-width` starts out
        // here — there's nothing to infer from, so the set silently no-ops.
        // Caught by inspecting `el.style.cssText` directly after the call.)
        gsap.set(schematicEarlyRef.current, { maxWidth: "175px" });
        gsap.set(schematicFullRef.current, { maxWidth: "175px" });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "hero-sequence",
            trigger: heroRef.current,
            pin: true,
            start: "top top",
            // A function (not a static string) so this is re-evaluated on
            // every ScrollTrigger refresh — including the automatic
            // refresh ScrollTrigger runs on window resize — rather than
            // being frozen at the viewport height read once at setup time.
            end: () => "+=" + window.innerHeight * 3,
            scrub: 1,
            invalidateOnRefresh: true,
            // Re-measure the header height on every refresh too (initial
            // load and every subsequent resize) — cheap, and keeps
            // `--hero-header-h` correct if the header's own height ever
            // changes at a qualifying viewport. Safe to re-run here
            // specifically because it writes to `document.documentElement`,
            // not to `heroRef` (the pin trigger) — see the comment above
            // `applyHeaderHeightVar` for why that distinction is what makes
            // this reliable across refreshes and the old approach wasn't.
            onRefreshInit: applyHeaderHeightVar,
          },
        });

        gsap.set([schematicEarlyRef.current, schematicFullRef.current, canvasWrapRef.current], {
          autoAlpha: 0,
        });
        gsap.set(resolvedCopyRef.current, { autoAlpha: 0, y: 14 });

        tl
          // States 2/3: the schematic crossfades from its early draw-in to
          // its fully-drawn stage across the first third of the scroll.
          .to(schematicEarlyRef.current, { autoAlpha: 1, duration: 0.1 }, 0.02)
          .to(schematicFullRef.current, { autoAlpha: 1, duration: 0.1 }, 0.14)
          .to(schematicEarlyRef.current, { autoAlpha: 0, duration: 0.08 }, 0.18)
          .to(schematicFullRef.current, { autoAlpha: 0, duration: 0.08 }, 0.3)
          // State 4: the canvas fades in as the schematic leaves, then
          // scrubs through all 60 frames across the middle/late range.
          .to(canvasWrapRef.current, { autoAlpha: 1, duration: 0.08 }, 0.26)
          .to(
            seq.playhead,
            { frame: seq.totalFrames - 1, ease: "none", duration: 0.55, onUpdate: seq.updateImage },
            0.3,
          )
          // State 5: body copy + CTA resolve over the sequence's final frame.
          .to(resolvedCopyRef.current, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.85);

        // Belt-and-suspenders for the pin's scroll RANGE (the `end`
        // function above, and `invalidateOnRefresh`) staying correct on
        // resize: ScrollTrigger already listens for window "resize"
        // internally and debounces its own `refresh()` call, which is
        // exactly what re-evaluates `end` and remeasures the (now
        // CSS-responsive) trigger height. That internal auto-refresh is
        // GSAP's documented, standard mechanism. It proved inconsistent to
        // observe firing reliably within this task's own automated,
        // browser-driven verification specifically (the native "resize"
        // DOM event itself always fired immediately, and the pin's
        // scroll/scrub loop stayed fully alive throughout — only the
        // timing of GSAP's internal debounced refresh varied). Adding an
        // explicit, direct `ScrollTrigger.refresh()` on resize — via the
        // `ScrollTrigger` import already in this file, not any
        // private/internal API — means this doesn't depend on that
        // internal auto-detection succeeding on its own. It's a safe,
        // redundant call (it's what the internal path calls anyway).
        const handleWindowResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", handleWindowResize);

        return () => {
          window.removeEventListener("resize", handleWindowResize);
        };
      });

      // No `else`/default branch — see the block comment above the
      // component for why that omission is the point, not an oversight.
    },
    { scope: heroRef },
  );

  return (
    // The `md:motion-safe:...!` classes below (see `applyHeaderHeightVar`
    // above for why this is CSS, not `gsap.set`) need the trailing `!`
    // important-modifier: at a viewport that's both `lg:` (≥1024px) and
    // `md:motion-safe:` qualifying — i.e. every desktop width this
    // sequence runs at — the base `lg:pt-44 lg:pb-32` utilities and these
    // compaction utilities have equal (single-class) specificity, and
    // without `!` the `lg:` ones won generation-order ties over the
    // `md:motion-safe:` ones (confirmed live: padding stayed 176px/128px,
    // and the whole pinned section rendered ~3200px off-screen as a
    // result). `!` forces these to win unconditionally whenever their own
    // media query matches, regardless of utility generation order.
    //
    // `justify-content: safe center` is a plain `style` prop instead of a
    // `justify-[safe_center]` Tailwind class: Tailwind's arbitrary-value
    // parser didn't generate any rule for that class at all (confirmed —
    // no matching CSSOM rule anywhere, and the property computed as
    // `normal`, i.e. inert, in every test), while the browser itself
    // supports the `safe` keyword fine (confirmed by setting it via plain
    // `element.style.justifyContent` directly). Landing it as a real
    // inline style also sidesteps the pin-revert issue described above —
    // safely, because unlike `height`/`padding-top`, this value never
    // needs to change per viewport, so it's identical every time
    // ScrollTrigger's pin bookkeeping reverts this element back to "how it
    // looked when first mounted." `justify-content` is a no-op without
    // `display: flex`, so this is harmless on every other viewport too.
    <section
      ref={heroRef}
      style={{ justifyContent: "safe center" }}
      className="bg-atmosphere relative isolate overflow-hidden bg-(--color-paper) px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28 lg:px-14 lg:pt-44 lg:pb-32 md:motion-safe:flex! md:motion-safe:h-dvh! md:motion-safe:flex-col! md:motion-safe:pt-[var(--hero-header-h,73px)]! md:motion-safe:pb-0!"
    >
      {/* `w-full` alongside `mx-auto max-w-[1280px]`: once the qualifying
          branch above sets `display: flex` on the hero section, this
          container becomes a flex item — and `mx-auto` on a flex item
          disables the default `align-items: stretch` cross-axis sizing
          (auto margins take priority over stretch), so without an explicit
          width the container shrinks-to-fit its widest line instead of
          filling the row. Measured: 518px wide at a 1280px viewport instead
          of the expected ~1168px, sized by the h1's widest line — which
          left the visual row beneath it with almost no horizontal slack,
          contributing to the copy/visual off-center bug below. `w-full` is
          a no-op in the default (non-flex) block layout, so this is safe to
          apply unconditionally rather than gating it behind JS. */}
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          {/* State 1: eyebrow + headline, present in every state/mode —
              untouched by GSAP, unconditional, the literal starting point. */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs tracking-[0.2em] uppercase text-(--color-steel)"
          >
            Airtech Industries · Est. 2000 · MEP since 2013
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-3xl font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[0.96] text-(--color-ink) text-balance"
          >
            Engineering the systems
            <br />
            <span className="text-(--color-signal)">behind extraordinary</span> spaces.
          </motion.h1>

          {/* State 5: resolved body copy + CTA row. Always mounted, visible
              by DEFAULT (no hiding class in the markup — see the
              fix-round-1 note in the block comment above the component for
              why: static CSS hiding here previously meant a JS failure left
              this permanently invisible on a qualifying viewport). Hidden
              only by GSAP's own `gsap.set(..., { autoAlpha: 0 })` inline
              style, which only ever runs inside the qualifying-viewport
              `matchMedia` branch, then faded back in by the timeline. */}
          <div ref={resolvedCopyRef}>
            <p className="mx-auto mt-8 max-w-lg text-lg text-(--color-steel) leading-relaxed">
              Integrated MEP and HVAC engineering for complex buildings and specialised
              environments — engineering, procurement, installation, testing, commissioning and
              long-term support, from a single technical partner.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <ButtonLink href="/contact/project-enquiry" size="lg">
                Discuss Your Project
              </ButtonLink>
              <Link
                href="/projects"
                className="text-sm font-medium text-(--color-ink)/75 hover:text-(--color-ink) transition-colors"
              >
                Explore Our Work →
              </Link>
            </div>
          </div>
        </div>

        {/* States 2–5: the visual mark. All three visuals are stacked in
            the same slot and always mounted; GSAP crossfades their opacity
            on qualifying viewports (see block comment above). Sized to fit
            the canvas (the largest of the three) so nothing reflows as
            elements fade in/out. */}
        <div
          ref={visualRowRef}
          className="relative mx-auto mt-14 flex min-h-[80px] items-center justify-center sm:mt-16 sm:min-h-[100px]"
        >
          {/* State 2 — schematic early draw-in. Hidden by default in every
              mode; only ever shown by the GSAP timeline.
              `m-auto` alongside `inset-0`: once GSAP caps this element's
              width via `gsap.set(..., { maxWidth: "175px" })`, an
              absolutely-positioned box with `inset-0` (left/right/top/bottom
              all 0) and a capped width needs auto margins to distribute the
              leftover space evenly — without them the box left-aligns
              against `left: 0` instead of centering, since `left`/`right`
              being pinned to 0 with no margin resolution collapses toward
              the start edge. */}
          <div
            ref={schematicEarlyRef}
            className="absolute inset-0 m-auto flex items-center justify-center opacity-0 invisible"
          >
            <BuildingSchematic stage="early" reduceMotion={!!reduceMotion} />
          </div>

          {/* States 3 & 5 (fallback) — schematic full draw-in. Visible by
              DEFAULT (no hiding class — see the fix-round-1 note in the
              block comment above the component); hidden-then-faded by GSAP
              only on a qualifying viewport, where it's superseded by the
              real canvas sequence. */}
          <div ref={schematicFullRef} className="relative flex items-center justify-center">
            <BuildingSchematic stage="full" reduceMotion={!!reduceMotion} />
          </div>

          {/* State 4 — the hero-sequence canvas. Hidden by default in every
              mode (so it never displaces the schematic fallback); only ever
              drawn into and shown by the GSAP timeline, which is the only
              code path that fetches hero-sequence/*.webp.
              `position: absolute` is set inline, not just via the
              `absolute` Tailwind class: `.crop-frame` (globals.css)
              declares `position: relative` OUTSIDE any `@layer` block, and
              unlayered CSS always wins over Tailwind's `@layer utilities`
              classes regardless of source order — so the `absolute` utility
              alone was silently losing that fight. Confirmed live:
              `getComputedStyle(canvasWrap).position` was `"relative"`, not
              `"absolute"` — leaving this wrapper as a normal in-flow flex
              sibling next to the schematic instead of stacked on top of it,
              visibly off-center at every breakpoint, including the no-JS
              (390px) and reduced-motion fallback paths, since it ate
              horizontal space even while invisible. `.crop-frame` is also
              used by `TechnicalFrame.tsx` elsewhere in the app, so this
              overrides `position` on just this element rather than moving
              `.crop-frame` itself into a layer, which would change its
              cascade behavior for every other consumer of that class. */}
          <div
            ref={canvasWrapRef}
            className="crop-frame absolute inset-0 m-auto w-full max-w-[720px] text-(--color-line) opacity-0 invisible"
            style={{ position: "absolute" }}
          >
            <canvas
              ref={canvasRef}
              data-hero-frame-canvas
              width={960}
              height={540}
              aria-hidden="true"
              className="block aspect-video w-full bg-(--color-ink)/[0.02]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * A quiet fine-line drawing — not a photograph, not a full building
 * cross-section competing for attention. Sits in the hero's secondary
 * position and draws itself in (pathLength) on mount, the same restrained
 * technical-drawing vocabulary used throughout the site.
 *
 * Both `stage` variants are now always mounted simultaneously (GSAP
 * crossfades their wrapper opacity — see the component above), so each
 * plays its own mount-time draw-in once, immediately on page load,
 * regardless of whether its wrapper happens to be visible yet. That trades
 * away syncing the pathLength draw to the moment the shape scrolls into
 * view; the alternative (rewriting this into a GSAP-scrubbed stroke-
 * dashoffset draw tied to scroll progress) is a larger scope than this
 * task's core deliverable (the canvas sequence) and was left out — flagged
 * in the Task 6 report as a follow-up worth considering.
 *
 * `stage` controls how much of the drawing is rendered: "early" is the
 * hero's state 2 (outline + roofline + ground only); "full" adds the floor
 * lines, the system trace, and the dimension mark for states 3 and 5.
 */
function BuildingSchematic({
  stage,
  reduceMotion,
}: {
  stage: "early" | "full";
  reduceMotion: boolean;
}) {
  const draw = {
    initial: reduceMotion ? false : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
  };

  return (
    <motion.svg
      viewBox="0 0 420 460"
      className="mx-auto w-full max-w-[200px] sm:max-w-[240px]"
      role="img"
      aria-label="Line drawing of a building elevation with engineering system markers"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.rect
        x={90}
        y={60}
        width={240}
        height={340}
        fill="none"
        stroke="var(--color-blueprint)"
        strokeWidth={1.25}
        {...draw}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Roofline */}
      <motion.line
        x1={84}
        y1={60}
        x2={336}
        y2={60}
        stroke="var(--color-blueprint)"
        strokeWidth={2}
        {...draw}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
      {/* Ground */}
      <motion.line
        x1={40}
        y1={400}
        x2={380}
        y2={400}
        stroke="var(--color-steel-soft)"
        strokeWidth={1}
        {...draw}
        transition={{ duration: 0.6, delay: 0.05 }}
      />

      {stage === "full" && (
        <>
          {[130, 200, 270, 340].map((y, i) => (
            <motion.line
              key={y}
              x1={90}
              y1={y}
              x2={330}
              y2={y}
              stroke="var(--color-blueprint)"
              strokeWidth={0.75}
              opacity={0.5}
              {...draw}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
          {/* A single system trace, riser + branch, drawn last */}
          <motion.path
            d="M 150 400 V 165 H 240 V 130"
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth={1.5}
            {...draw}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.circle
            cx={240}
            cy={130}
            r={4}
            fill="var(--color-amber)"
            initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.6 }}
          />
          {/* Dimension mark */}
          <motion.g {...draw} transition={{ duration: 0.5, delay: 1.2 }}>
            <line x1={350} y1={60} x2={350} y2={400} stroke="var(--color-steel-soft)" strokeWidth={0.5} />
            <line x1={344} y1={60} x2={356} y2={60} stroke="var(--color-steel-soft)" strokeWidth={0.5} />
            <line x1={344} y1={400} x2={356} y2={400} stroke="var(--color-steel-soft)" strokeWidth={0.5} />
          </motion.g>
          <motion.text
            x={362}
            y={232}
            fontSize={9}
            fill="var(--color-steel)"
            fontFamily="var(--font-mono)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            6F
          </motion.text>
        </>
      )}
    </motion.svg>
  );
}
