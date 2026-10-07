import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { services } from "@/content/services";
import type { ServiceCategory } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";
import { SYSTEM_COLOR, SYSTEM_SHORT, type SystemSlug } from "@/components/engineering/model";


export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Airtech's engineering disciplines: HVAC, Electrical, Public Health Engineering (PHE), Fire Fighting & Fire Protection, Extra Low-Voltage (ELV), and BMS/Systems Integration, coordinated as one practice.",
};

const FACTS = [
  { value: "06", label: "Engineering disciplines, coordinated as one" },
  { value: "01", label: "One practice, not a chain of sub-contractors" },
  { value: "2000", label: "Engineering buildings in Nepal since" },
];

// One meaning-specific icon per discipline, drawn in that system's colour
// (the same coding as the homepage building drawing).
const DISCIPLINE_ICONS: Record<ServiceCategory, ReactNode> = {
  hvac: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return <line key={deg} x1="12" y1="12" x2={12 + Math.cos(rad) * 8} y2={12 + Math.sin(rad) * 8} />;
      })}
    </>
  ),
  electrical: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" strokeLinejoin="round" />,
  "plumbing-public-health": (
    <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" strokeLinejoin="round" />
  ),
  "fire-protection": (
    <path
      d="M12 2c1 3-3 4-3 7.5a3 3 0 006 0c0-1-.5-1.5-.5-1.5.8 1 1.5 2.3 1.5 3.8a4 4 0 01-8 0C7 8 12 6 12 2z"
      strokeLinejoin="round"
    />
  ),
  "elv-security": (
    <>
      <rect x="3" y="7" width="14" height="10" rx="1.5" />
      <path d="M17 10.5l4-2.5v8l-4-2.5" strokeLinejoin="round" />
      <circle cx="10" cy="12" r="2.4" />
    </>
  ),
  "bms-systems-integration": (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <circle cx="12" cy="12" r="2" />
      {[4, 9, 15, 20].map((v) => (
        <g key={v}>
          <line x1={v} y1="7" x2={v} y2="4" />
          <line x1={v} y1="17" x2={v} y2="20" />
        </g>
      ))}
    </>
  ),
};

function DisciplineIcon({ category }: { category: ServiceCategory }) {
  const color = SYSTEM_COLOR[category as SystemSlug];
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
      style={{ background: `color-mix(in srgb, ${color} 14%, white)`, color }}
    >
      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        {DISCIPLINE_ICONS[category]}
      </svg>
    </span>
  );
}

/**
 * The right-column landing for /expertise: a short orientation plus the
 * discipline list. Picking a discipline in the rail (or here) swaps this
 * panel for that discipline; the page header and rail stay put.
 */
export default function ExpertiseOverviewPage() {
  return (
    <div>
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
        Overview
      </p>
      <h2 className="mt-4 font-display text-display-m font-semibold leading-[1.1] tracking-[-0.016em] text-balance">
        One team holds every system in the building.
      </h2>
      <p className="mt-5 max-w-2xl text-body-l leading-relaxed text-(--color-steel)">
        Each discipline below is designed, procured, installed and commissioned by
        Airtech, not handed between trades. Select one to see its scope, the systems
        it covers, and where it has been delivered.
      </p>

      <figure className="mt-10">
        <div className="relative aspect-[16/8] overflow-hidden border border-(--color-line)">
          <Image
            src="/images/projects/mit-college-3.jpg"
            alt="Ceiling cassettes, cable trays and lighting in a classroom at MIT College"
            fill
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover object-center"
          />
        </div>
        <figcaption className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-(--color-steel)">
          Air-conditioning, cable trays and lighting · MIT College
        </figcaption>
      </figure>

      <dl className="mt-10 grid grid-cols-1 border-t border-(--color-line) sm:grid-cols-3">
        {FACTS.map((fact) => (
          <div key={fact.value} className="border-b border-(--color-line) py-6 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0">
            <dt className="sr-only">{fact.label}</dt>
            <dd className="font-display text-3xl font-semibold tabular-nums text-(--color-brand-blue)">{fact.value}</dd>
            <dd className="mt-2 max-w-[16rem] text-small leading-relaxed text-(--color-steel)">
              {fact.label}
            </dd>
          </div>
        ))}
      </dl>

      {/* 2026-10-07 ("I don't love the expertise section"): the flat list
          became colour-coded discipline tiles, each system in the same
          colour it has in the homepage building drawing. */}
      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {services.map((service, i) => {
          const color = SYSTEM_COLOR[service.category as SystemSlug];
          return (
            <li key={service.slug}>
              <Reveal delay={i * 0.05} className="h-full">
                <Link
                  href={`/expertise/${service.slug}` as Route}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-(--color-line) bg-(--color-paper) p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_-30px_rgba(5,29,43,0.5)]"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.18] transition-transform duration-500 group-hover:scale-x-100" style={{ background: color }} />
                  <span className="flex items-center justify-between">
                    <DisciplineIcon category={service.category} />
                    <span className="font-mono text-[0.6875rem] tracking-[0.18em] text-(--color-steel-soft)">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="mt-5 font-display text-title font-semibold text-(--color-ink)">{service.name}</span>
                  <span className="mt-2 block text-small leading-relaxed text-(--color-steel)">{service.homeSummary}</span>
                  <span className="mt-4 flex flex-wrap gap-1.5">
                    {service.subServices.slice(0, 3).map((sub) => (
                      <span
                        key={sub}
                        className="rounded-full px-2.5 py-1 text-[0.75rem] font-medium"
                        style={{ background: `color-mix(in srgb, ${color} 10%, white)`, color: `color-mix(in srgb, ${color} 70%, black)` }}
                      >
                        {sub}
                      </span>
                    ))}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold" style={{ color: `color-mix(in srgb, ${color} 75%, black)` }}>
                    Explore {SYSTEM_SHORT[service.category as SystemSlug]}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
