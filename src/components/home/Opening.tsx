"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Full-viewport opening — no card, no split-screen, no grid. Real photograph
 * (Nepal Mediciti hospital, Lalitpur — AIPL PROFILE 2026.pptx slide 8's
 * "Our Landmark Projects" plate) with a controlled graphite/cobalt treatment
 * so the image reads as engineered, not stock. Scroll drives one subtle
 * transform only — the image settling — never scroll-jacked content.
 */
export function Opening() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[calc(100svh-4.5rem)] min-h-[560px] w-full overflow-hidden bg-(--color-ink)"
    >
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}
      >
        <Image
          src="/images/projects/nepal-mediciti-hospital.jpg"
          alt="Nepal Mediciti hospital, Lalitpur — completed engineering works by Airtech"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Graphite/cobalt treatment: grounds the photo in the brand system and masks
            source resolution — not a decorative gradient, a legibility device. */}
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/35 to-(--color-ink)/10" />
        <div className="absolute inset-0 bg-(--color-blueprint) mix-blend-color opacity-40" />
      </motion.div>

      <motion.div
        style={reduceMotion ? undefined : { opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-(--color-paper)/75"
        >
          Airtech Industries · Est. 2000 · MEP since 2013
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl font-display text-[13vw] sm:text-7xl lg:text-[6.5rem] font-bold leading-[0.92] text-(--color-paper) text-balance"
        >
          Engineering
          <br />
          complex spaces.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9"
        >
          <ButtonLink href="/contact" size="lg">
            Discuss Your Project
          </ButtonLink>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-6 right-5 z-10 hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase text-(--color-paper)/60"
      >
        Scroll
        <span aria-hidden="true" className="block h-8 w-px bg-(--color-paper)/40" />
      </motion.div>
    </section>
  );
}
