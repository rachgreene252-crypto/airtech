"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Full-viewport opening — no card, no split-screen, no grid. Real photograph
 * (Nepal Mediciti hospital, Lalitpur) presented with its own natural color
 * grading rather than a color-wash overlay: the building's facade is
 * genuinely a dense grid of windows, and a mix-blend-color tint over that
 * geometry was reading as a decorative "chessboard" rather than a
 * photograph — removed entirely. Headline sits over the sky instead of the
 * busier ground-level area, where there's real tonal contrast to work with
 * without needing a heavy scrim.
 */
export function Opening() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[calc(100svh-4.5rem)] min-h-[560px] w-full overflow-hidden bg-(--color-ink)">
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
        {/* Dark ink headline sits over the naturally bright sky — no scrim
            needed there. Only the bottom band (caption, scroll indicator)
            gets a light scrim, since that's where the busier ground-level
            part of the photo is. */}
        <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-black/50 to-transparent" />
      </motion.div>

      {/* Vertical technical annotation, left margin — a signature editorial
          touch, in the site's own drawing-sheet-label vocabulary. */}
      <div
        aria-hidden="true"
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 -rotate-90 whitespace-nowrap font-mono text-[10px] tracking-[0.2em] uppercase text-(--color-paper)/70 sm:block"
      >
        Est. 2000 · MEP since 2013
      </div>

      <motion.div
        style={reduceMotion ? undefined : { opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col justify-start px-5 pt-16 sm:px-8 sm:pt-20 lg:px-14 lg:pt-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs tracking-[0.2em] uppercase text-(--color-ink)/70"
        >
          Airtech Industries · Est. 2000 · MEP since 2013
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl font-display text-[13vw] sm:text-7xl lg:text-[6.5rem] font-bold leading-[0.92] text-(--color-ink) text-balance"
        >
          Engineering
          <br />
          <span className="text-(--color-signal)">complex</span> spaces.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-6"
        >
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Discuss Your Project
          </ButtonLink>
          <Link
            href="/projects"
            className="text-sm font-medium text-(--color-ink)/80 hover:text-(--color-ink) transition-colors"
          >
            Explore our work →
          </Link>
        </motion.div>
      </motion.div>

      {/* On-image documentary caption — identifies the real project, matching
          the "evidence, not decoration" principle used across the site. */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute bottom-6 left-5 z-10 font-mono text-[10px] tracking-[0.12em] uppercase text-(--color-paper)/80 sm:left-8 lg:left-14"
      >
        Nepal Mediciti Hospital
        <br />
        <span className="text-(--color-paper)/55">Lalitpur, Nepal</span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-6 right-5 z-10 hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase text-(--color-paper)/70"
      >
        Scroll
        <span aria-hidden="true" className="block h-8 w-px bg-(--color-paper)/50" />
      </motion.div>
    </section>
  );
}
