"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";

type HeroState = 1 | 2 | 3 | 4 | 5;

/**
 * Editorial, typography-first opening — no hero photograph. A full-bleed
 * image with an overlay was tried first; it competed with the headline for
 * attention and read as a generic corporate/SaaS hero regardless of how the
 * overlay was tuned. This is the "luxury product launch" version instead:
 * warm ivory canvas, huge whitespace, a quiet fine-line technical drawing
 * standing in for photography rather than competing with it.
 *
 * Structured as five narrative states (see the Task 5 brief in
 * .superpowers/sdd/airtech-visual-experience-reset/):
 *   1. near-empty — eyebrow + headline only.
 *   2. a quiet engineering system begins appearing — BuildingSchematic's
 *      early draw-in stage (outline, roofline, ground).
 *   3. the system becomes fully visible — BuildingSchematic's later stage
 *      (floor lines, system trace, dimension mark).
 *   4. transitions toward the video/frame-sequence visual — an empty
 *      `<canvas>` occupies the mark's position (Task 6 wires real frames).
 *   5. resolved — body copy + CTA row appear; the schematic's fully-drawn
 *      state stands in for the canvas's final frame until Task 6 lands.
 *
 * Task 6 will drive `heroState` from GSAP ScrollTrigger progress instead of
 * the static default below. For now, transitions between states are plain
 * opacity fades (no scroll dependency yet) per the Task 5 brief.
 */
export function Opening() {
  const reduceMotion = useReducedMotion();

  // Defaults to 5 (fully resolved) so the shipped homepage is visually
  // unaffected until Task 6 wires real scroll-driven control. Reachability
  // for testing/screenshotting the other four states is dev-only: in
  // `next dev`, press 1–5 anywhere on the page to switch `heroState`. This
  // listener and the `data-hero-state` attribute below are the only state-
  // switching mechanism shipped — there is no user-facing UI control.
  const [heroState, setHeroState] = useState<HeroState>(5);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    function handleKeydown(event: KeyboardEvent) {
      if (event.key >= "1" && event.key <= "5") {
        setHeroState(Number(event.key) as HeroState);
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const showResolvedCopy = heroState === 5;
  const fadeTransition = { duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] as const };

  const visualKey =
    heroState === 1
      ? "none"
      : heroState === 2
        ? "schematic-early"
        : heroState === 4
          ? "canvas"
          : "schematic-full";

  return (
    <section
      data-hero-state={heroState}
      className="bg-atmosphere relative isolate overflow-hidden bg-(--color-paper) px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28 lg:px-14 lg:pt-44 lg:pb-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
          {/* State 1: eyebrow + headline, present in every state — the
              literal starting point per the Task 5 brief, unchanged. */}
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

          {/* State 5: resolved body copy + CTA row. Mounted only once
              resolved so hidden CTAs are never focusable/announced. */}
          <AnimatePresence>
            {showResolvedCopy && (
              <motion.div
                key="resolved-copy"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                transition={fadeTransition}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* States 2–5: the visual mark. States 2/3/5 show the
            BuildingSchematic SVG at increasing stages of completion (5
            reuses the fully-drawn stage as a placeholder "final frame").
            State 4 swaps in an empty canvas positioned in the same spot —
            Task 6 wires the hero-sequence frames onto it. */}
        <div className="mx-auto mt-14 flex min-h-[80px] items-center justify-center sm:mt-16 sm:min-h-[100px]">
          <AnimatePresence mode="wait">
            {visualKey === "schematic-early" || visualKey === "schematic-full" ? (
              <motion.div
                key={visualKey}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
                transition={fadeTransition}
              >
                <BuildingSchematic
                  stage={visualKey === "schematic-early" ? "early" : "full"}
                  reduceMotion={!!reduceMotion}
                />
              </motion.div>
            ) : visualKey === "canvas" ? (
              <motion.div
                key="canvas"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fadeTransition}
                className="crop-frame w-full max-w-[720px] text-(--color-line)"
              >
                {/*
                  Empty/hidden hero-sequence canvas — Task 6 draws the 60
                  extracted WebP frames (public/images/hero-sequence/,
                  960x540 source) onto this element, scrubbed by scroll
                  progress. Intrinsic size matches the source frames;
                  displayed size is responsive up to 720px, matching the
                  scale of the other homepage diagrams (see
                  SystemsReveal.tsx's BuildingDiagram).
                */}
                <canvas
                  data-hero-frame-canvas
                  width={960}
                  height={540}
                  aria-hidden="true"
                  className="block aspect-video w-full bg-(--color-ink)/[0.02]"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/**
 * A quiet fine-line drawing — not a photograph, not a full building
 * cross-section competing for attention. Sits in the hero's secondary
 * position and draws itself in (pathLength) each time it mounts, the same
 * restrained technical-drawing vocabulary used throughout the site.
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
