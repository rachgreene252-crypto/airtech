"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Editorial, typography-first opening — no hero photograph. A full-bleed
 * image with an overlay was tried first; it competed with the headline for
 * attention and read as a generic corporate/SaaS hero regardless of how the
 * overlay was tuned. This is the "luxury product launch" version instead:
 * warm ivory canvas, huge whitespace, a quiet fine-line technical drawing
 * standing in for photography rather than competing with it.
 */
export function Opening() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-atmosphere relative isolate overflow-hidden bg-(--color-paper) px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28 lg:px-14 lg:pt-44 lg:pb-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-3xl text-center">
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

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-md text-lg text-(--color-steel) leading-relaxed"
          >
            Integrated HVAC and MEP engineering — from engineering and procurement through
            installation, testing, commissioning and long-term support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6"
          >
            <ButtonLink href="/contact/project-enquiry" size="lg">
              Discuss Your Project
            </ButtonLink>
            <Link
              href="/projects"
              className="text-sm font-medium text-(--color-ink)/75 hover:text-(--color-ink) transition-colors"
            >
              Explore our work →
            </Link>
          </motion.div>
        </div>

        <BuildingSchematic reduceMotion={!!reduceMotion} />
      </div>
    </section>
  );
}

/**
 * A quiet fine-line drawing — not a photograph, not a full building
 * cross-section competing for attention. Sits in the hero's secondary
 * position and draws itself in once on load (pathLength), the same
 * restrained technical-drawing vocabulary used throughout the site.
 */
function BuildingSchematic({ reduceMotion }: { reduceMotion: boolean }) {
  const draw = {
    initial: reduceMotion ? false : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
  };

  return (
    <motion.svg
      viewBox="0 0 420 460"
      className="mx-auto mt-14 w-full max-w-[200px] sm:mt-16 sm:max-w-[240px]"
      role="img"
      aria-label="Line drawing of a building elevation with engineering system markers"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
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
        transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
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
          transition={{ duration: 0.7, delay: 0.7 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      {/* Roofline */}
      <motion.line
        x1={84}
        y1={60}
        x2={336}
        y2={60}
        stroke="var(--color-blueprint)"
        strokeWidth={2}
        {...draw}
        transition={{ duration: 0.5, delay: 0.5 }}
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
        transition={{ duration: 0.6, delay: 0.45 }}
      />
      {/* A single system trace, riser + branch, drawn last */}
      <motion.path
        d="M 150 400 V 165 H 240 V 130"
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth={1.5}
        {...draw}
        transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx={240}
        cy={130}
        r={4}
        fill="var(--color-amber)"
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: 2 }}
      />
      {/* Dimension mark */}
      <motion.g {...draw} transition={{ duration: 0.5, delay: 1.6 }}>
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
        transition={{ duration: 0.5, delay: 1.8 }}
      >
        6F
      </motion.text>
    </motion.svg>
  );
}
