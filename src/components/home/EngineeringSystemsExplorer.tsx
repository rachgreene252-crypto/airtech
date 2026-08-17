"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { getServiceBySlug } from "@/content/services";

// The six physical building-system disciplines — deliberately excludes
// "engineering-advisory" (a professional service, not a building system) per
// AIRTECH_FINAL_EXPERIENCE_SPEC.md §4. Order follows a rough top-to-bottom
// building position so the row reads as one cross-section, not a services list.
const ZONE_SLUGS = [
  "hvac",
  "elv-security",
  "electrical",
  "fire-protection",
  "plumbing-public-health",
  "bms-systems-integration",
] as const;

/**
 * An architectural cross-section, not a services grid: six zones sharing one
 * riser line communicate that Airtech coordinates them as a single team.
 * Built on native <details>/<summary> for click/keyboard/screen-reader parity
 * for free; a thin hover enhancement layers the spec's desktop hover-reveal
 * on top without changing the underlying semantics.
 */
export function EngineeringSystemsExplorer() {
  const zones = ZONE_SLUGS.map((slug) => getServiceBySlug(slug)).filter(
    (s): s is NonNullable<typeof s> => Boolean(s)
  );
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || window.matchMedia("(hover: none)").matches) return;

    const detailsEls = Array.from(row.querySelectorAll("details"));
    const cleanups = detailsEls.map((el) => {
      const open = () => detailsEls.forEach((d) => (d.open = d === el));
      el.addEventListener("mouseenter", open);
      return () => el.removeEventListener("mouseenter", open);
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <Section tone="ink" border={false}>
      <SectionHeader
        tone="paper"
        eyebrow="Systems — 02"
        heading="Six systems. One coordinated building."
        description="These aren't six separate contractors' scopes stitched together after the fact — Airtech engineers and executes every system as one coordinated delivery, sharing the same risers and plant rooms."
      />

      <Reveal className="mt-14" delay={0.1}>
        <div
          ref={rowRef}
          className="flex flex-col lg:flex-row lg:min-h-[440px] border border-(--color-ink-soft)"
        >
          {zones.map((zone) => (
            <details
              key={zone.slug}
              className="group relative border-b lg:border-b-0 lg:border-r border-(--color-ink-soft) last:border-b-0 lg:last:border-r-0 lg:flex-1 lg:open:flex-[2.4] transition-[flex-grow] duration-300 ease-out"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 lg:flex-col lg:items-start lg:gap-3 marker:content-none">
                <span className="font-mono text-xs tracking-[0.14em] text-(--color-signal-soft)">
                  {zone.disciplineCode}
                </span>
                <span className="font-display text-xl lg:text-lg font-semibold leading-tight text-(--color-paper)">
                  {zone.name}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-(--color-signal) transition-transform duration-200 group-open:rotate-45 lg:hidden"
                >
                  +
                </span>
              </summary>

              <div className="px-5 pb-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:px-6 lg:pb-6 lg:pt-4 lg:bg-(--color-ink)/95">
                <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-(--color-steel-soft)">
                  Systems
                </p>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-(--color-paper)/85">
                  {zone.systems.map((system) => (
                    <li key={system}>{system}</li>
                  ))}
                </ul>
                <Link
                  href={`/expertise/${zone.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-signal-soft) hover:text-(--color-signal) transition-colors"
                >
                  Explore {zone.name}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </details>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
