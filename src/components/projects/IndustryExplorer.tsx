"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Industry, Project } from "@/content/types";
import type { Client } from "@/content/clients";
import { ProjectTile } from "./ProjectTile";
import { IndustrySelect, type IndustryOption } from "./IndustrySelect";
import { hasTileImage } from "@/content/image-quality";

const INITIAL = 6;

// Mosaic rhythm: a large lead (two columns, two rows on desktop) with two
// tiles stacked beside it, then rows of three.
function tileShape(i: number, total: number) {
  const last = i === total - 1;
  if (i === 0) {
    return total === 1
      ? "aspect-[4/3] sm:col-span-2 sm:aspect-[2/1] lg:col-span-3 lg:row-span-2 lg:aspect-auto"
      : "aspect-[4/3] sm:col-span-2 sm:aspect-[2/1] lg:col-span-2 lg:row-span-2 lg:aspect-auto";
  }
  const cls = ["aspect-[4/3] lg:aspect-auto"];
  // Only one tile beside the lead: let it take the lead's full height.
  if (total === 2) cls.push("lg:row-span-2");
  // The last tile fills whatever its row leaves free, so no row ends ragged.
  if (last && (total - 1) % 2 === 1) cls.push("sm:col-span-2 sm:aspect-[2/1]");
  if (last && total > 3) {
    const rem = (total - 3) % 3;
    if (rem === 1) cls.push("lg:col-span-3");
    if (rem === 2) cls.push("lg:col-span-2");
  }
  return cls.join(" ");
}

/**
 * Industry explorer (2026-10-29 redesign; replaces the chip row above a
 * long card grid, and the "Explore by sector" tile wall). Modelled on the
 * structured discovery of Arup's and Foster + Partners' project indexes,
 * adapted: an industry dropdown (the client's request) with previous / next
 * steppers, pinned while scrolling, over a full-width image mosaic. Switching sector
 * swaps the mosaic in place (no navigation) and keeps `?industry=` in the
 * URL so sector links from elsewhere on the site land pre-selected.
 *
 * No counts beside sector names (client brief). A sector with no published
 * case studies shows the organisations Airtech has worked with there, from
 * the client register, instead of an empty grid.
 */
type ExplorerProps = {
  industries: Industry[];
  projects: Project[];
  clientsBySector: Record<string, Client[]>;
  /** Shown last within their sector (the featured set the page already leads with). */
  pushBack?: string[];
};

/**
 * Reads `?industry=` (industry pages, discipline pages and the homepage
 * link here pre-filtered). Needs a <Suspense> boundary; the page passes
 * the plain explorer as the static fallback.
 */
export function IndustryExplorerFromUrl(props: ExplorerProps) {
  const param = useSearchParams().get("industry") ?? undefined;
  // Seeds the initial sector only: choose() rewrites the URL with
  // replaceState, which Next feeds back into useSearchParams.
  return <IndustryExplorer {...props} initialSector={param} />;
}

export function IndustryExplorer({
  industries,
  projects,
  clientsBySector,
  pushBack = [],
  initialSector,
}: ExplorerProps & { initialSector?: string }) {
  const reduce = useReducedMotion();
  const deepLinked = Boolean(initialSector && industries.some((i) => i.slug === initialSector));
  const [sector, setSector] = useState<string>(deepLinked ? initialSector! : industries[0].slug);
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // A deep link without the #explore anchor still lands on the explorer.
  const landedDeepLinked = useRef(deepLinked);
  useEffect(() => {
    if (landedDeepLinked.current && window.location.hash !== "#explore") {
      rootRef.current?.scrollIntoView({ block: "start" });
    }
  }, []);

  function choose(slug: string) {
    if (slug === sector) return;
    setSector(slug);
    setExpanded(false);
    const params = new URLSearchParams(window.location.search);
    params.set("industry", slug);
    window.history.replaceState(null, "", `${window.location.pathname}?${params}${window.location.hash}`);
    // If the visitor had scrolled deep into a long sector, bring the new
    // one's first row back into view under the pinned bar.
    const top = panelRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) panelRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  function step(dir: number) {
    const i = industries.findIndex((ind) => ind.slug === sector);
    choose(industries[(i + dir + industries.length) % industries.length].slug);
  }

  const options = useMemo<IndustryOption[]>(
    () =>
      industries.map((ind) => {
        const lead = projects.find((p) => p.industrySlug === ind.slug && hasTileImage(p));
        return { slug: ind.slug, name: ind.name, thumb: lead?.heroImage && { src: lead.heroImage.src } };
      }),
    [industries, projects]
  );

  const industry = industries.find((i) => i.slug === sector) ?? industries[0];
  const inSector = useMemo(() => {
    const list = projects.filter((p) => p.industrySlug === sector);
    // Large photographs first (the lead tile is big), then smaller ones,
    // then no photo; projects already featured above go behind their peers.
    const rank = (p: Project) =>
      (hasTileImage(p) ? ((p.heroImage?.width ?? 1600) >= 1200 ? 0 : 2) : 4) + (pushBack.includes(p.slug) ? 1 : 0);
    return [...list].sort((a, b) => rank(a) - rank(b));
  }, [projects, sector, pushBack]);
  const visible = expanded ? inSector : inSector.slice(0, INITIAL);
  const clients = clientsBySector[sector] ?? [];

  return (
    <section
      id="explore"
      ref={rootRef}
      aria-labelledby="explore-heading"
      className="scroll-mt-20 border-t border-(--color-line) bg-(--color-paper-raised) py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
              Explore by industry
            </p>
            <h2
              id="explore-heading"
              className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.018em] text-balance text-(--color-ink)"
            >
              Choose a sector. See the buildings.
            </h2>
          </div>
          <p className="max-w-md text-body leading-relaxed text-(--color-steel) lg:col-span-5">
            Each sector asks something different of a building&rsquo;s systems. Select one to see the
            projects Airtech has delivered there.
          </p>
        </div>

        {/* Control bar: the industry dropdown plus previous / next, pinned
            under the header while the visitor scrolls the results. */}
        <div className="sticky top-[4.5rem] z-20 -mx-5 mt-10 border-y border-(--color-line-strong) bg-(--color-paper-raised)/95 px-5 py-4 backdrop-blur-sm sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-14 lg:px-0">
          <div className="flex items-end justify-between gap-4">
            <IndustrySelect options={options} value={sector} onChange={choose} />
            <div className="flex shrink-0 gap-2 pb-1">
              {[
                { label: "Previous industry", dir: -1, d: "M10 3.5L5.5 8 10 12.5" },
                { label: "Next industry", dir: 1, d: "M6 3.5L10.5 8 6 12.5" },
              ].map((b) => (
                <button
                  key={b.label}
                  type="button"
                  aria-label={b.label}
                  onClick={() => step(b.dir)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line-strong) bg-(--color-paper) text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
                >
                  <svg aria-hidden="true" viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={b.d} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          {/* Selected sector */}
          <div ref={panelRef} id="explore-panel" aria-live="polite" className="min-w-0 scroll-mt-48">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={sector}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="sr-only">{industry.name}</h3>
                <p className="max-w-3xl text-body-l leading-relaxed text-(--color-steel)">{industry.overview}</p>

                {inSector.length > 0 ? (
                  <>
                    <motion.ul layout={!reduce} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:auto-rows-[15rem] xl:auto-rows-[17rem]">
                      {visible.map((project, i) => (
                        <motion.li
                          key={project.slug}
                          layout={!reduce}
                          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.45, delay: reduce ? 0 : Math.min(i, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          className={cn("relative", tileShape(i, visible.length))}
                        >
                          <ProjectTile
                            project={project}
                            industryName={industry.name.split(/[,&]/)[0].trim()}
                            size={i === 0 ? "lg" : "md"}
                            sizes={i === 0 ? "(min-width: 1024px) 64vw, 100vw" : "(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"}
                            className="absolute inset-0"
                          />
                        </motion.li>
                      ))}
                    </motion.ul>
                    {inSector.length > INITIAL && (
                      <div className="mt-6 flex justify-center">
                        <button
                          type="button"
                          onClick={() => setExpanded((e) => !e)}
                          aria-expanded={expanded}
                          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--color-line-strong) bg-(--color-paper) px-5 text-sm font-semibold text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
                        >
                          {expanded ? "Show fewer" : `Show all ${industry.name.toLowerCase()} projects`}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="mt-6 grid gap-8 rounded-[3px] border border-(--color-line) bg-(--color-paper) p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
                    <div>
                      <p className="text-body-l font-semibold leading-snug text-(--color-ink)">
                        Case studies for this sector are being prepared for publication.
                      </p>
                      <p className="mt-3 text-body leading-relaxed text-(--color-steel)">
                        Tell us about your project and we&rsquo;ll share references from comparable
                        {" "}{industry.name.toLowerCase()} work.
                      </p>
                      <div className="mt-6">
                        <ButtonLink href="/contact/project-enquiry">Inquire for Services</ButtonLink>
                      </div>
                    </div>
                    {clients.length > 0 && (
                      <div>
                        <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-(--color-steel)">
                          Organisations we&rsquo;ve worked with
                        </p>
                        <ul className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                          {clients.slice(0, 10).map((c) => (
                            <li key={c.name} className="border-b border-(--color-line) py-2.5 text-body text-(--color-ink)">
                              {c.name}
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#client-register"
                          className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--color-brand-blue) hover:underline"
                        >
                          The full client register <span aria-hidden="true">&darr;</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
