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
 * expressed as plain CSS defaults, not a conditional render:
 *   - `schematicFullRef` and `resolvedCopyRef` default to visible
 *     (`opacity-100`), with a `md:motion-safe:opacity-0 md:motion-safe:invisible`
 *     override — i.e. they're only hidden-by-default on viewports that
 *     satisfy the exact same media query GSAP's `matchMedia` branch below
 *     uses. GSAP's `autoAlpha` tween (inline style) later overrides that
 *     class on qualifying viewports; everywhere else the CSS default simply
 *     stands, unanimated, forever.
 *   - `schematicEarlyRef` and the canvas wrapper default to
 *     `opacity-0 invisible` unconditionally — they only ever become visible
 *     via the GSAP timeline below, which only ever runs on a qualifying
 *     viewport.
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
        // Two things had to be fixed, not one:
        //
        // 1. The header is `sticky top-0` (see Header.tsx) — it occupies
        //    real space in normal flow above the hero and stays visibly
        //    parked at the viewport's top for the entire pin. Sizing the
        //    hero to a flat `100dvh` (the first attempt at this fix) still
        //    overflows the viewport by exactly the header's height, since
        //    the hero's own box starts *below* the header, not at y=0.
        //    Measuring the header's real rendered height and subtracting it
        //    from `window.innerHeight` gives the actual available box.
        // 2. Even after (1), `resolvedCopyRef` (the state-5 paragraph + CTA
        //    row) is hidden via `autoAlpha` on qualifying viewports, which
        //    does NOT remove it from layout flow — it still reserves its
        //    full height between the headline and the visual mark whether
        //    visible or not. An earlier version of this fix pulled it out
        //    of flow entirely (`position: absolute`) to reclaim that space,
        //    but anchoring it directly under the headline put it in the
        //    same vertical slot the visual mark also occupies (both start
        //    "right after the headline"): at progress 1 — the only moment
        //    both are visible simultaneously — the CTA button and canvas
        //    physically overlapped. Caught via a real end-state screenshot,
        //    not assumed. Reverted: `resolvedCopyRef` stays in flow (so the
        //    resolved state still stacks copy-above-visual, matching the
        //    non-qualifying-viewport fallback layout below), and instead
        //    every element in the stack is tightened — copy's internal
        //    gaps, the gap before the visual mark, and the sequence
        //    canvas's own max size — enough to fit the full stack,
        //    resolvedCopyRef included, inside the smallest viewport height
        //    this was verified against (1024x768, ~695px available after
        //    the header).
        //
        // Applied via `gsap.set` (not CSS classes) so matchMedia's
        // automatic revert restores the original padded, natural-flow,
        // generously-spaced layout the instant the viewport drops below
        // the breakpoint or motion is reduced.
        const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
        gsap.set(heroRef.current, {
          height: window.innerHeight - headerHeight,
          paddingTop: 0,
          paddingBottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        });
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
        // warning on these two targets specifically, caught by inspecting
        // `el.style.cssText` directly after the call.)
        gsap.set(schematicEarlyRef.current, { maxWidth: "175px" });
        gsap.set(schematicFullRef.current, { maxWidth: "175px" });

        const tl = gsap.timeline({
          scrollTrigger: {
            id: "hero-sequence",
            trigger: heroRef.current,
            pin: true,
            start: "top top",
            end: "+=" + window.innerHeight * 3,
            scrub: 1,
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

        // matchMedia's automatic revert (context.revert() under the hood)
        // correctly kills the ScrollTrigger/pin on a live breakpoint
        // crossing (verified: no leftover `.pin-spacer`) and reverts every
        // OTHER gsap.set() from this callback — but empirically leaves
        // heroRef's own inline layout styles (height/padding/display/flex)
        // stuck, since heroRef is also the pin's `trigger` element and its
        // pin-lifecycle style bookkeeping seems to interact with the plain
        // gsap.set() on the same node. Caught by resizing live across the
        // 768px breakpoint mid-session (not just reloading at each width)
        // and finding the hero still locked to the compact pinned layout
        // on a narrow viewport. `clearProps` here is a manual, explicit
        // safety net for exactly that one element.
        return () => {
          gsap.set(heroRef.current, {
            clearProps: "height,paddingTop,paddingBottom,display,flexDirection,justifyContent",
          });
        };
      });

      // No `else`/default branch — see the block comment above the
      // component for why that omission is the point, not an oversight.
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="bg-atmosphere relative isolate overflow-hidden bg-(--color-paper) px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28 lg:px-14 lg:pt-44 lg:pb-32"
    >
      <div className="mx-auto max-w-[1280px]">
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
            className="mx-auto mt-6 max-w-2xl font-display text-6xl sm:text-7xl lg:text-8xl font-normal leading-[0.92] text-(--color-ink) text-balance"
          >
            Engineering
            <br />
            <span className="text-(--color-signal)">complex</span> spaces.
          </motion.h1>

          {/* State 5: resolved body copy + CTA row. Always mounted; visible
              by default (the non-scroll-driven fallback), hidden-then-faded
              by GSAP only on a qualifying viewport (see block comment
              above). */}
          <div
            ref={resolvedCopyRef}
            className="opacity-100 md:motion-safe:invisible md:motion-safe:opacity-0"
          >
            <p className="mx-auto mt-8 max-w-md text-lg text-(--color-steel) leading-relaxed">
              Integrated HVAC and MEP engineering — from engineering and procurement through
              installation, testing, commissioning and long-term support.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <ButtonLink href="/contact/project-enquiry" size="lg">
                Discuss Your Project
              </ButtonLink>
              <Link
                href="/projects"
                className="text-sm font-medium text-(--color-ink)/75 hover:text-(--color-ink) transition-colors"
              >
                Explore our work →
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
              mode; only ever shown by the GSAP timeline. */}
          <div ref={schematicEarlyRef} className="absolute inset-0 flex items-center justify-center opacity-0 invisible">
            <BuildingSchematic stage="early" reduceMotion={!!reduceMotion} />
          </div>

          {/* States 3 & 5 (fallback) — schematic full draw-in. Visible by
              default (the static state-5 fallback across narrow viewports
              and reduced motion); hidden-then-faded by GSAP on a qualifying
              viewport, where it's superseded by the real canvas sequence. */}
          <div
            ref={schematicFullRef}
            className="relative flex items-center justify-center opacity-100 md:motion-safe:invisible md:motion-safe:opacity-0"
          >
            <BuildingSchematic stage="full" reduceMotion={!!reduceMotion} />
          </div>

          {/* State 4 — the hero-sequence canvas. Hidden by default in every
              mode (so it never displaces the schematic fallback); only ever
              drawn into and shown by the GSAP timeline, which is the only
              code path that fetches hero-sequence/*.webp. */}
          <div
            ref={canvasWrapRef}
            className="crop-frame absolute inset-0 m-auto w-full max-w-[720px] text-(--color-line) opacity-0 invisible"
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
