"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Section 02 — Hero visual. A single atmospheric still (the supplied BG
 * asset), not a video background: the brief explicitly prefers optimized
 * still imagery over a heavy hero video, and this asset is a soft, warm,
 * architectural-paper abstraction rather than a literal building photo —
 * so it reads as premium atmosphere behind the engineering statement that
 * follows, not as content competing with it.
 */
export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden bg-(--color-paper)">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/hero/atmosphere.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Grounds the abstraction as "architectural" rather than decorative —
          a faint drafting-paper crop frame, the site's recurring device. */}
      <div className="absolute inset-6 sm:inset-10 lg:inset-14 crop-frame text-(--color-ink)/25" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-(--color-paper) to-transparent" />

      <div className="absolute inset-x-0 top-24 sm:top-28 flex justify-center px-5">
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.24em] uppercase text-(--color-ink)/60">
          Airtech Industries — Est. 2000 — Integrated MEP since 2013
        </p>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-8 flex justify-center"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <span
          aria-hidden="true"
          className="flex h-9 w-5 items-start justify-center rounded-full border border-(--color-ink)/30 pt-1.5"
        >
          <span className="h-1.5 w-[1.5px] animate-flow-drop rounded-full bg-(--color-ink)/50" />
        </span>
      </motion.div>
    </section>
  );
}
