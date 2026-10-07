"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export type Milestone = {
  year: string;
  title: string;
  body: string;
  image?: { src: string; alt: string };
};

/**
 * Horizontal milestone rail for /company (2026-10-07, "very bland and
 * boring"): the connecting line draws itself across as the section scrolls
 * in and each year lands on it in turn. Stacks vertically on small screens.
 * Milestones are the four sourced ones from /company/history only.
 */
export function CompanyTimeline({ milestones }: { milestones: Milestone[] }) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="relative">
      {/* Desktop rail */}
      <motion.span
        aria-hidden="true"
        className="absolute top-[1.375rem] right-0 left-0 hidden h-0.5 origin-left bg-(--color-brand-blue-vivid) lg:block"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4, ease }}
      />
      <span aria-hidden="true" className="absolute top-0 bottom-0 left-[1.375rem] w-px bg-(--color-line-strong) lg:hidden" />

      <ol className="relative grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-8">
        {milestones.map((m, i) => (
          <motion.li
            key={m.year}
            className="relative pl-16 lg:pl-0"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.25 + i * 0.22, ease }}
          >
            <span className="absolute top-0 left-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-(--color-brand-blue-vivid) bg-(--color-paper) lg:relative">
              <span className="h-3 w-3 rounded-full bg-(--color-brand-blue-vivid)" />
            </span>
            <p className="font-display text-[2.75rem] leading-none font-semibold tracking-[-0.03em] text-(--color-brand-blue) lg:mt-6 lg:text-[3.25rem]">
              {m.year}
            </p>
            <h3 className="mt-3 font-display text-title font-semibold text-(--color-ink)">{m.title}</h3>
            <p className="mt-2 text-small leading-relaxed text-(--color-steel)">{m.body}</p>
            {m.image && (
              <div className="relative mt-5 aspect-[3/2] overflow-hidden rounded-[4px] border border-(--color-line)">
                <Image
                  src={m.image.src}
                  alt={m.image.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 90vw"
                  className="object-cover object-center"
                />
              </div>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
