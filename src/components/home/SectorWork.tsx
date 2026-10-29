"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "@/components/ui/Image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export interface SectorPreview {
  slug: string;
  name: string;
  /** Lead photographed project in this sector, if any. */
  project?: { slug: string; name: string; place?: string; image: { src: string; alt: string } };
  /** A few client-register names, for sectors without a photographed project. */
  clients: string[];
}

/**
 * 03 — THE WORK (2026-10-29). Industry experience and real projects in one
 * compact piece: the sectors read as a contents list; pointing at one (or
 * focusing it) brings up that sector's lead project photograph, captioned
 * with its name and place. Every row links into the portfolio's industry
 * explorer, pre-filtered. Sectors with no photographed project show who
 * Airtech has worked for there instead of a stand-in image. No counts.
 */
export function SectorWork({ sectors }: { sectors: SectorPreview[] }) {
  const [active, setActive] = useState(sectors[0]?.slug);
  const reduce = useReducedMotion();
  const current = sectors.find((s) => s.slug === active) ?? sectors[0];
  if (!current) return null;

  return (
    <section aria-labelledby="work-heading" className="border-t border-(--color-line) bg-(--color-paper) py-20 sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
                03 · The work
              </p>
              <h2
                id="work-heading"
                className="mt-4 max-w-[18ch] font-display text-display-xl font-semibold leading-[1.04] tracking-[-0.022em] text-balance text-(--color-ink)"
              >
                Every sector asks something different.
              </h2>
            </div>
            <p className="max-w-md text-body-l leading-relaxed text-(--color-steel) lg:col-span-5">
              Clean-room pressure for pharma, round-the-clock resilience for hospitals, quiet comfort for
              hotels. Choose a sector to see the work.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <ul className="lg:col-span-5">
            {sectors.map((s, i) => {
              const on = s.slug === current.slug;
              return (
                <li key={s.slug} className="border-b border-(--color-line) first:border-t">
                  <Link
                    href={`/projects?industry=${s.slug}#explore` as Route}
                    onMouseEnter={() => setActive(s.slug)}
                    onFocus={() => setActive(s.slug)}
                    className="group flex min-h-14 items-center gap-4 py-3 outline-offset-2"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "w-7 shrink-0 font-mono text-[0.75rem] tabular-nums transition-colors",
                        on ? "text-(--color-brand-blue)" : "text-(--color-steel)"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.01em] transition-[color,transform] duration-300 sm:text-[1.5rem]",
                        on ? "translate-x-1 text-(--color-ink)" : "text-(--color-ink-soft) group-hover:text-(--color-ink)"
                      )}
                    >
                      {s.name}
                    </span>
                    {s.project && (
                      <span className="relative block aspect-[4/3] w-16 shrink-0 overflow-hidden rounded-[2px] lg:hidden">
                        <Image src={s.project.image.src} alt="" fill sizes="64px" className="object-cover" />
                      </span>
                    )}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "hidden text-(--color-brand-blue) transition-all duration-300 lg:inline",
                        on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      )}
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Preview (lg+) */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-(--color-blue-deep)">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.slug}
                    className="absolute inset-0"
                    initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {current.project ? (
                      <Link href={`/projects/${current.project.slug}` as Route} className="group absolute inset-0 block text-white" tabIndex={-1}>
                        <Image
                          src={current.project.image.src}
                          alt={current.project.image.alt}
                          fill
                          sizes="(min-width: 1024px) 56vw, 1px"
                          className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                        />
                        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-(--color-blue-deep)/85 via-transparent to-transparent" />
                        <span className="absolute inset-x-0 bottom-0 p-6">
                          <span className="block font-mono text-[0.75rem] uppercase tracking-[0.14em] text-white/80">
                            {[current.name, current.project.place].filter(Boolean).join(" · ")}
                          </span>
                          <span className="mt-1.5 block font-display text-[2rem] font-semibold leading-tight tracking-[-0.015em]">
                            {current.project.name}
                          </span>
                        </span>
                      </Link>
                    ) : (
                      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-br from-(--color-blue-deep) to-(--color-brand-blue) p-8 text-white">
                        <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-white/80">{current.name}</p>
                        <p className="mt-2 max-w-md font-display text-[1.75rem] font-semibold leading-tight">
                          Engineered for organisations including
                        </p>
                        <ul className="mt-5 grid grid-cols-2 gap-x-6 border-t border-white/20">
                          {current.clients.map((c) => (
                            <li key={c} className="border-b border-white/20 py-2.5 text-body text-white/90">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--color-brand-blue) hover:underline"
          >
            The full portfolio <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href={"/projects#client-register" as Route}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--color-ink-soft) hover:text-(--color-brand-blue)"
          >
            Client register <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
