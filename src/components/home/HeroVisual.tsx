"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Section 02 — Hero visual. The opening architectural film supplied at
 * ASSETS/Airtech_Industries_video_product…_202608211636.mp4 (building
 * exterior → interior → MEP plant rooms) — a short, light autoplaying loop
 * rather than a scroll-scrubbed sequence: at 10s/2.4MB there's no frame
 * data to scrub against, and forcing scroll-linked playback on a short
 * looping clip would fight the loop rather than read as "an architectural
 * film." Visual first, text second — no headline or eyebrow copy sits over
 * this section; brand identity is carried by the logo, always visible in
 * the nav above. `reduceMotion` swaps the video for its poster frame.
 */
export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative h-[86vh] min-h-[600px] w-full overflow-hidden bg-(--color-paper)">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {reduceMotion ? (
          // eslint-disable-next-line @next/next/no-img-element -- static poster fallback, not a candidate for next/image's responsive pipeline
          <img
            src="/images/hero/video-poster.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero/video-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-(--color-ink)/10" />
      </motion.div>

      {/* Grounds the film as "architectural" rather than decorative — a
          faint drafting-paper crop frame, the site's recurring device. */}
      <div className="absolute inset-6 sm:inset-10 lg:inset-14 crop-frame text-(--color-paper)/40" aria-hidden="true" />

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-(--color-paper) to-transparent" />

      <motion.div
        className="absolute inset-x-0 bottom-9 flex justify-center"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <span
          aria-hidden="true"
          className="flex h-9 w-5 items-start justify-center rounded-full border border-(--color-paper)/50 pt-1.5"
        >
          <span className="h-1.5 w-[1.5px] animate-flow-drop rounded-full bg-(--color-paper)/70" />
        </span>
      </motion.div>
    </section>
  );
}
