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

const INITIAL = 6;

// Mosaic rhythm inside the right-hand column: a wide lead, then pairs, then
// a wide closer — varied proportions without a ragged grid.
function tileShape(i: number, total: number) {
  if (i === 0) return "sm:col-span-2 aspect-[4/3] sm:aspect-[2/1]";
  if (total > 4 && i === total - 1 && (total - 1) % 2 === 1) return "sm:col-span-2 aspect-[4/3] sm:aspect-[5/2]";
  return "aspect-[4/3]";
}

/**
 * Industry explorer (2026-10-29 redesign; replaces the chip row above a
 * long card grid, and the "Explore by sector" tile wall). Modelled on the
 * structured discovery of Arup's and Foster + Partners' project indexes,
 * adapted: a sector index you read like a contents page on the left, the
 * selected sector's work as an image mosaic on the right. Switching sector
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
    // On small screens the selector sits above the results; bring them up.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      const top = panelRef.current?.getBoundingClientRect().top ?? 0;
      if (top > window.innerHeight * 0.6 || top < 0) {
        panelRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
    }
  }

  const industry = industries.find((i) => i.slug === sector) ?? industries[0];
  const inSector = useMemo(() => {
    const list = projects.filter((p) => p.industrySlug === sector);
    // Photographed work first, so the mosaic opens on images; projects
    // already featured above the explorer go to the back of the queue.
    const rank = (p: Project) => (p.heroImage?.src ? 0 : 2) + (pushBack.includes(p.slug) ? 1 : 0);
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

        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[19rem_minmax(0,1fr)]">
          {/* Sector index */}
          <nav aria-label="Industries" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:block lg:overflow-visible lg:px-0 lg:pb-0">
              {industries.map((ind) => {
                const on = ind.slug === sector;
                return (
                  <li key={ind.slug} className="shrink-0 lg:border-b lg:border-(--color-line) lg:first:border-t">
                    <button
                      type="button"
                      onClick={() => choose(ind.slug)}
                      aria-pressed={on}
                      aria-controls="explore-panel"
                      className={cn(
                        "group relative flex min-h-11 w-full items-center gap-3 whitespace-nowrap rounded-full border px-4 text-left text-[0.9375rem] font-medium transition-colors duration-300",
                        "lg:min-h-0 lg:whitespace-normal lg:rounded-none lg:border-0 lg:px-0 lg:py-3.5 lg:pl-5 lg:text-[1.0625rem]",
                        on
                          ? "border-(--color-brand-blue-vivid) bg-(--color-brand-blue-vivid) text-white lg:bg-transparent lg:text-(--color-ink)"
                          : "border-(--color-line-strong) bg-(--color-paper) text-(--color-ink-soft) hover:border-(--color-brand-blue) hover:text-(--color-brand-blue) lg:bg-transparent lg:text-(--color-steel)"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-y-2 left-0 hidden w-[3px] origin-center rounded-full bg-(--color-brand-blue-vivid) transition-transform duration-300 lg:block",
                          on ? "scale-y-100" : "scale-y-0 group-hover:scale-y-50"
                        )}
                      />
                      <span className="flex-1">{ind.name}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "hidden text-(--color-brand-blue) transition-all duration-300 lg:inline",
                          on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                        )}
                      >
                        &rarr;
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Selected sector */}
          <div ref={panelRef} id="explore-panel" aria-live="polite" className="min-w-0 scroll-mt-24">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={sector}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="border-b border-(--color-line-strong) pb-6">
                  <div>
                    <h3 className="font-display text-display-m font-semibold leading-tight tracking-[-0.012em] text-(--color-ink)">
                      {industry.name}
                    </h3>
                    <p className="mt-2 max-w-3xl text-body leading-relaxed text-(--color-steel)">{industry.overview}</p>
                  </div>
                </div>

                {inSector.length > 0 ? (
                  <>
                    <motion.ul layout={!reduce} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
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
                            sizes={i === 0 ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
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
