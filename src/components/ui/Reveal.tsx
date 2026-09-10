"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Re-enabled 2026-09-10 — a prior session disabled this into a no-op
 * passthrough ("restrained motion... a fade on every section read as
 * noise"), which the client has now explicitly reversed: more animation,
 * more life, GSAP/motion "adds character." The ~12+ call sites across the
 * site (BuildingFor, FeaturedProjects, ProofBar, etc.) already pass
 * `delay` expecting a real reveal — this makes that real again: a single
 * fade-up, triggered once when scrolled into view, respecting
 * prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
