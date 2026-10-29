"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import Image from "@/components/ui/Image";
import { Container } from "@/components/ui/Container";
import { BuildingModel } from "@/components/engineering/BuildingModel";
import { SYSTEM_COLOR, SYSTEM_SHORT, type SystemSlug } from "@/components/engineering/model";
import { cn } from "@/lib/cn";

export interface AtlasDiscipline {
  slug: SystemSlug;
  name: string;
  code: string;
  summary: string;
  description: string;
  systems: string[];
  applications: string[];
  photo?: { src: string; alt: string; caption: string };
  projects: { slug: string; name: string }[];
}

/**
 * /expertise as a technical atlas (2026-10-29 rebuild). Each discipline is a
 * chapter: drawing-sheet code, what it is, a real site photograph where one
 * exists, its systems and applications as a schedule, and where it has been
 * delivered. Beside the chapters, one pinned axonometric drawing highlights
 * the system being read (IntersectionObserver, plain scrolling; no
 * hijacking). A code bar along the top doubles as navigation and progress.
 * Phones get the chapters alone; the drawing is a desktop aid.
 */
export function ExpertiseAtlas({ disciplines }: { disciplines: AtlasDiscipline[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = disciplines[active];

  return (
    <>
      {/* Discipline bar: navigation + progress */}
      <nav
        aria-label="Disciplines on this page"
        className="sticky top-[4.5rem] z-20 border-y border-(--color-line) bg-(--color-paper)/95 backdrop-blur-sm"
      >
        <Container>
          <ol className="-mx-5 flex overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:px-0">
            {disciplines.map((d, i) => {
              const on = i === active;
              return (
                <li key={d.slug} className="shrink-0">
                  <a
                    href={`#${d.slug}`}
                    aria-current={on ? "true" : undefined}
                    className="group relative flex min-h-14 items-center gap-2.5 px-3 text-sm font-medium lg:px-0"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-0 h-[3px] origin-left transition-transform duration-500 lg:inset-x-0 lg:right-4"
                      style={{ background: SYSTEM_COLOR[d.slug], transform: on ? "scaleX(1)" : "scaleX(0)" }}
                    />
                    <span className="font-mono text-[0.75rem] font-semibold tracking-[0.08em]" style={{ color: SYSTEM_COLOR[d.slug] }}>
                      {d.code}
                    </span>
                    <span className={cn("whitespace-nowrap transition-colors", on ? "text-(--color-ink)" : "text-(--color-steel) group-hover:text-(--color-ink)")}>
                      {SYSTEM_SHORT[d.slug]}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </Container>
      </nav>

      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-7">
            {disciplines.map((d, i) => (
              <section
                key={d.slug}
                id={d.slug}
                data-index={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                aria-labelledby={`${d.slug}-title`}
                className="scroll-mt-36 border-t border-(--color-line-strong) py-12 first:border-t-0 first:pt-0 sm:py-16"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="font-display text-[3.5rem] font-bold leading-none tracking-[-0.04em] sm:text-[4.5rem]"
                    style={{ color: SYSTEM_COLOR[d.slug] }}
                  >
                    {d.code}
                  </span>
                  <span className="font-mono text-[0.75rem] tracking-[0.16em] text-(--color-steel)">
                    {String(i + 1).padStart(2, "0")} / {String(disciplines.length).padStart(2, "0")}
                  </span>
                </div>
                <h2 id={`${d.slug}-title`} className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.018em] text-balance text-(--color-ink)">
                  {d.name}
                </h2>
                <p className="mt-4 text-body-l font-medium leading-relaxed text-(--color-ink-soft)">{d.summary}</p>
                <p className="mt-3 text-body leading-relaxed text-(--color-steel)">{d.description}</p>

                {d.photo && (
                  <figure className="mt-8">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-[3px] bg-(--color-paper-raised)">
                      <Image src={d.photo.src} alt={d.photo.alt} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
                    </div>
                    <figcaption className="mt-2.5 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-(--color-steel)">
                      {d.photo.caption}
                    </figcaption>
                  </figure>
                )}

                <dl className="mt-8 grid gap-8 sm:grid-cols-2">
                  <div>
                    <dt className="border-b-2 pb-2 font-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-(--color-ink)" style={{ borderColor: SYSTEM_COLOR[d.slug] }}>
                      Systems
                    </dt>
                    {d.systems.map((s) => (
                      <dd key={s} className="border-b border-(--color-line) py-2.5 text-body text-(--color-ink-soft)">
                        {s}
                      </dd>
                    ))}
                  </div>
                  <div>
                    <dt className="border-b-2 border-(--color-line-strong) pb-2 font-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-(--color-ink)">
                      Typical applications
                    </dt>
                    {d.applications.map((a) => (
                      <dd key={a} className="border-b border-(--color-line) py-2.5 text-body text-(--color-ink-soft)">
                        {a}
                      </dd>
                    ))}
                  </div>
                </dl>

                {d.projects.length > 0 && (
                  <p className="mt-8 text-body leading-relaxed text-(--color-steel)">
                    <span className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-(--color-ink)">Delivered at </span>
                    {d.projects.map((p, j) => (
                      <span key={p.slug}>
                        <Link href={`/projects/${p.slug}` as Route} className="font-medium text-(--color-ink) underline decoration-(--color-line-strong) underline-offset-4 hover:text-(--color-brand-blue) hover:decoration-current">
                          {p.name}
                        </Link>
                        {j < d.projects.length - 1 ? ", " : "."}
                      </span>
                    ))}
                  </p>
                )}

                <Link
                  href={`/expertise/${d.slug}` as Route}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-(--color-line-strong) px-5 text-sm font-semibold text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
                >
                  Full {SYSTEM_SHORT[d.slug]} scope <span aria-hidden="true">&rarr;</span>
                </Link>
              </section>
            ))}
          </div>

          {/* Pinned drawing (lg+) */}
          <aside aria-label="Building systems drawing" className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-40">
              <div className="overflow-hidden rounded-[3px] border border-(--color-line-strong) bg-white">
                <div className="flex items-center justify-between border-b border-(--color-line) px-4 py-3 font-mono text-[0.75rem] uppercase tracking-[0.14em]">
                  <span style={{ color: SYSTEM_COLOR[current.slug] }}>
                    {current.code} · {SYSTEM_SHORT[current.slug]}
                  </span>
                  <span className="text-(--color-steel)">Typical building, not to scale</span>
                </div>
                <div className="relative h-[24rem] px-2 xl:h-[28rem]">
                  <BuildingModel
                    className="h-full w-full"
                    highlight={current.slug}
                    colorCoded
                    title={`Axonometric drawing of a typical building with the ${current.name} system highlighted`}
                  />
                </div>
                <ul className="grid grid-cols-3 border-t border-(--color-line)">
                  {disciplines.map((d, i) => (
                    <li key={d.slug} className="border-b border-r border-(--color-line) [&:nth-child(3n)]:border-r-0 [&:nth-last-child(-n+3)]:border-b-0">
                      <a
                        href={`#${d.slug}`}
                        className={cn("flex min-h-11 items-center gap-2 px-3 text-[0.8125rem] font-medium transition-colors", i === active ? "bg-(--color-paper-raised) text-(--color-ink)" : "text-(--color-steel) hover:text-(--color-ink)")}
                      >
                        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ background: SYSTEM_COLOR[d.slug] }} />
                        {SYSTEM_SHORT[d.slug]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
