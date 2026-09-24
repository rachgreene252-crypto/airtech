"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getServiceBySlug } from "@/content/services";
import { getProjectBySlug } from "@/content/projects";
import { getIndustryBySlug } from "@/content/industries";
import { EngineeringScene, type Highlight } from "./engineering/EngineeringScene";
import { LANE_ORDER } from "./engineering/layout";

/**
 * The signature interaction, rebuilt 2026-09-15 — replacing the hub-and-
 * spoke diagram entirely per a full bespoke-visualization brief: this is
 * now an isometric engineering coordination model (one structural bay of a
 * ceiling void, the actual thing MEP disciplines are coordinated in on a
 * real project — not a building silhouette, not a dashboard of coloured
 * circles). HVAC ductwork, electrical cable tray, plumbing, fire
 * protection and ELV run through the void as distribution "lanes," each
 * with real branch equipment (AHU, panels, valves, sprinklers, ELV
 * nodes); BMS is the payoff, drawn last as coordination ties threading
 * through every lane, exactly the idea it exists to communicate: one
 * control layer holding five installed systems together as a single
 * coordinated building, not six separate contractors.
 *
 * Colour is restrained on purpose: every line defaults to graphite/silver;
 * Airtech blue (#008ED1, the client's own exact stated hex) is reserved
 * for whichever discipline is the current focus — the scroll-triggered
 * build sequence, or a manual click on the discipline nav below it — plus
 * the BMS ties. Nothing is rainbow-coded; the earlier per-discipline
 * colour scheme from this section's previous version is retired here, on
 * this exact instruction: "AIRTECH BLUE as the only strong accent."
 */
const ZONE_SLUGS = LANE_ORDER.map((s) => s) as unknown as (
  | "hvac"
  | "electrical"
  | "plumbing-public-health"
  | "fire-protection"
  | "elv-security"
)[];
const ALL_SLUGS = [...ZONE_SLUGS, "bms-systems-integration"] as const;

const NAV_LABEL: Record<string, string> = {
  hvac: "HVAC",
  electrical: "Electrical",
  "plumbing-public-health": "PHE",
  "fire-protection": "Fire",
  "elv-security": "ELV",
  "bms-systems-integration": "BMS",
};

// Notable projects, hospitality-led per direct instruction — these three
// are representative work, not an exhaustive list of everything delivered.
const PROJECT_SLUGS = ["hotel-barahi-kathmandu", "radisson-hotel-kathmandu", "holiday-inn-express"] as const;

export function SystemsReveal() {
  const [stage, setStage] = useState(0); // 0 = structure only, 1..6 = disciplines cumulatively assembled
  const [highlight, setHighlight] = useState<Highlight>("all");
  const [engaged, setEngaged] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const total = ALL_SLUGS.length;

  function selectDiscipline(slug: Highlight) {
    setEngaged(true);
    setStage(total);
    setHighlight(slug);
  }

  // GSAP ScrollTrigger — plays the six-stage build-out once, the first
  // time the section is about two-thirds into view: HVAC, then Electrical,
  // Plumbing, Fire, ELV, then BMS ties across all of them, settling on the
  // fully-assembled "ALL" state. Scroll brings the section into view and
  // starts it — the literal "assembles as you scroll" idea — without
  // trapping the scrollbar in a pinned section, which this site's own
  // motion standard rules out (no scroll-jacking).
  useEffect(() => {
    if (reduceMotion || engaged) return;
    const el = sectionRef.current;
    if (!el) return;
    let cancelled = false;
    let ctx: { revert: () => void } | undefined;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 65%", once: true } });
        for (let i = 1; i <= total; i++) {
          const slug = ALL_SLUGS[i - 1];
          tl.call(
            () => {
              setStage((s) => (s < i ? i : s));
              setHighlight(slug as Highlight);
            },
            undefined,
            i === 1 ? 0.2 : "+=0.85"
          );
        }
        tl.call(() => setHighlight("all"), undefined, "+=0.6");
      }, el);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduceMotion, engaged, total]);

  const activeService = highlight === "all" ? null : getServiceBySlug(highlight);

  return (
      <Section tone="raised" border={false} className="overflow-hidden bg-soft-glow">
        <div ref={sectionRef} className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:items-center">
          <div>
            <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
              What Airtech does
            </p>
            <h2 className="mt-5 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.015em] text-(--color-ink) text-balance">
              One building. Every system, coordinated.
            </h2>
            <p className="mt-5 max-w-md text-body-l leading-relaxed text-(--color-steel)">
              Airtech brings HVAC, electrical, PHE, fire protection and ELV together
              through one engineering and execution team, held to one coordinated
              schedule instead of six separate contractors&apos;. Select a system below to
              see how it runs.
            </p>

            {/* Discipline navigation — technical, not a SaaS tab bar: plain
                mono labels in hairline boxes, the same language as the
                stepper this replaced. */}
            <div className="mt-10 flex flex-wrap gap-1.5" role="group" aria-label="Select a system to highlight">
              <button
                type="button"
                onClick={() => selectDiscipline("all")}
                aria-pressed={highlight === "all"}
                className={`min-h-11 px-2.5 py-2 font-mono text-[12px] tracking-[0.1em] uppercase border transition-colors ${
                  highlight === "all"
                    ? "border-(--color-brand-blue) text-(--color-brand-blue)"
                    : "border-(--color-line-strong) text-(--color-steel-soft) hover:border-(--color-steel)"
                }`}
              >
                All
              </button>
              {ALL_SLUGS.map((slug) => {
                const isActive = highlight === slug;
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => selectDiscipline(slug as Highlight)}
                    aria-pressed={isActive}
                    className={`min-h-11 px-2.5 py-2 font-mono text-[12px] tracking-[0.1em] uppercase border transition-colors ${
                      isActive
                        ? "border-(--color-brand-blue) text-(--color-brand-blue)"
                        : "border-(--color-line-strong) text-(--color-steel-soft) hover:border-(--color-steel)"
                    }`}
                  >
                    {NAV_LABEL[slug]}
                  </button>
                );
              })}
            </div>

            {activeService && (
              <motion.div
                key={activeService.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 border-t border-(--color-line) pt-6"
              >
                <h3 className="font-display text-title font-semibold text-(--color-brand-blue)">
                  {activeService.name}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {activeService.systems.map((s) => (
                    <li
                      key={s}
                      className="rounded-xs border border-(--color-brand-blue-soft)/50 bg-(--color-brand-blue-tint) px-3 py-1 text-xs font-medium text-(--color-brand-blue-hover)"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/expertise/${activeService.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) transition-colors hover:text-(--color-ink)"
                >
                  Explore {activeService.name}
                  <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            )}
          </div>

          <div className="relative border border-(--color-brand-blue-soft)/40 bg-(--color-paper) p-4 sm:p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-(--color-brand-blue-soft)/25 blur-[90px]"
            />
            <div className="relative mb-4 flex items-center justify-between border-b border-(--color-line) pb-3">
              <p className="font-mono text-[0.8125rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">
                Coordination model — one structural bay
              </p>
              <p className="font-mono text-[0.8125rem] uppercase tracking-[0.16em] text-(--color-brand-blue)">
                {String(Math.min(stage, total)).padStart(2, "0")}/{String(total).padStart(2, "0")}
              </p>
            </div>
            <motion.div
              animate={highlight !== "all" ? { scale: 1.02 } : { scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "50% 60%" }}
            >
              <EngineeringScene stage={stage} highlight={highlight} />
            </motion.div>
          </div>
        </div>

        <Reveal>
          <div className="mt-20 flex flex-col items-center gap-3 border-t border-(--color-line) pt-12 text-center">
            <p className="font-mono text-[0.8125rem] uppercase tracking-[0.16em] text-(--color-brand-blue)">
              Notable projects
            </p>
            <p className="font-display text-title font-normal text-(--color-ink)">
              This coordination model, delivered on real buildings.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {PROJECT_SLUGS.map((slug, i) => {
            const project = getProjectBySlug(slug);
            if (!project) return null;
            return (
              <Reveal key={slug} delay={i * 0.08}>
                <ProjectCard project={project} industryName={getIndustryBySlug(project.industrySlug)?.name} />
              </Reveal>
            );
          })}
        </div>
      </Section>
  );
}
