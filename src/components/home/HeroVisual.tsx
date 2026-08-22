"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Section 02 — Hero visual. Per the 2026-08-22 visual-correction brief:
 * visual first, text second — no headline or eyebrow copy sits over this
 * section at all. Brand identity is carried by the logo, which is always
 * visible in the nav above. A slow continuing "develop" motion (a gentle
 * Ken Burns drift, not a one-shot fade) gives the visual room to breathe
 * before the engineering statement appears in the next section. The BG
 * folder supplies a single still image, not a video/frame sequence — see
 * the implementation report for why a still is used here.
 */
export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative h-[86vh] min-h-[600px] w-full overflow-hidden bg-(--color-paper)">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: reduceMotion ? 1 : 1.14, opacity: 1 }}
        transition={
          reduceMotion
            ? { duration: 1 }
            : {
                opacity: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 14, ease: "easeOut" },
              }
        }
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
      <div className="absolute inset-6 sm:inset-10 lg:inset-14 crop-frame text-(--color-ink)/20" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-(--color-paper) to-transparent" />

      <motion.div
        className="absolute inset-x-0 bottom-9 flex justify-center"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
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
