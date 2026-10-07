"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export type Value = { title: string; body: string; image: { src: string; alt: string } };

/**
 * Core values as a big typographic index (2026-10-07). Six large rows on the
 * left; pointing at (or tapping / focusing) one swaps the panel on the right
 * to that value's photograph, number and line. The photographs are the
 * client's own team and anniversary pictures.
 */
export function ValuesShowcase({ values }: { values: Value[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const v = values[active];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
      <ol className="border-t border-(--color-line-strong)">
        {values.map((value, i) => {
          const on = i === active;
          return (
            <li key={value.title} className="border-b border-(--color-line-strong)">
              <button
                type="button"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={on}
                className="group relative flex w-full items-baseline gap-5 overflow-hidden py-5 text-left sm:gap-8 sm:py-6"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 origin-left bg-(--color-brand-blue) transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    on ? "scale-x-100" : "scale-x-0"
                  )}
                />
                <span
                  className={cn(
                    "relative w-8 shrink-0 pl-1 font-mono text-[0.75rem] tracking-[0.14em] transition-colors duration-300 sm:pl-3",
                    on ? "text-white/80" : "text-(--color-brand-blue)"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "relative font-display text-[1.75rem] leading-[1.05] font-semibold tracking-[-0.025em] transition-all duration-500 sm:text-[2.5rem] lg:text-[3.25rem]",
                    on ? "translate-x-2 text-white" : "text-(--color-ink) group-hover:text-(--color-brand-blue)"
                  )}
                >
                  {value.title}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative ml-auto pr-4 text-2xl transition-all duration-500",
                    on ? "translate-x-0 text-white opacity-100" : "-translate-x-3 opacity-0"
                  )}
                >
                  &rarr;
                </span>
              </button>
              {/* Phones: the line sits under its row. */}
              <p className={cn("pb-5 pl-14 text-small leading-relaxed text-(--color-steel) lg:hidden", on ? "block" : "hidden")}>
                {value.body}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="relative hidden lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-(--color-blue-deep)">
            <AnimatePresence initial={false}>
              <motion.div
                key={v.image.src}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={v.image.src} alt={v.image.alt} fill sizes="34vw" className="object-cover object-center" />
              </motion.div>
            </AnimatePresence>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-(--color-blue-deep) via-(--color-blue-deep)/30 to-transparent" />
            <span
              aria-hidden="true"
              className="absolute top-4 right-6 font-display text-[7rem] leading-none font-bold tracking-[-0.06em] text-white/20"
            >
              {String(active + 1).padStart(2, "0")}
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={v.title}
                className="absolute inset-x-0 bottom-0 p-8"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                aria-live="polite"
              >
                <p className="font-display text-[2rem] leading-tight font-semibold tracking-[-0.02em] text-white">{v.title}</p>
                <p className="mt-2 max-w-xs text-body leading-relaxed text-white/80">{v.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
