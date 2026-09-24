import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { services } from "@/content/services";
import type { ServiceCategory } from "@/content/types";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Airtech's engineering disciplines: HVAC, Electrical, Plumbing & Public Health, Fire Fighting & Fire Protection, ELV/Security, and BMS/Systems Integration, coordinated as one practice.",
};

const FACTS = [
  { value: "06", label: "Engineering disciplines, coordinated as one" },
  { value: "01", label: "One practice, not a chain of sub-contractors" },
  { value: "2000", label: "Delivering integrated MEP in Nepal since" },
];

// One meaning-specific icon per discipline — the fix for a "boring and
// simple" flat list: each row now has a real visual anchor, not just a
// number. Blue throughout (not per-discipline colour), matching the
// standing "Airtech blue is the only strong accent" rule set on the
// homepage systems diagram.
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
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--color-brand-blue-tint) text-(--color-brand-blue) transition-colors group-hover:bg-(--color-brand-blue) group-hover:text-white">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
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
      <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
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

      <dl className="mt-10 grid grid-cols-1 border-t border-(--color-line) sm:grid-cols-3">
        {FACTS.map((fact) => (
          <div key={fact.value} className="border-b border-(--color-line) py-6 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0">
            <dt className="sr-only">{fact.label}</dt>
            <dd className="font-display text-4xl font-bold text-(--color-brand-blue)">{fact.value}</dd>
            <dd className="mt-2 max-w-[16rem] text-small leading-relaxed text-(--color-steel)">
              {fact.label}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-12 border-t border-(--color-line)">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.05}>
            <li>
              <Link
                href={`/expertise/${service.slug}` as Route}
                className="group relative flex items-center gap-5 overflow-hidden border-b border-(--color-line) py-5 pl-4 transition-colors hover:bg-(--color-paper-raised)"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-(--color-brand-blue) transition-transform duration-300 group-hover:scale-y-100"
                />
                <DisciplineIcon category={service.category} />
                <span className="flex-1">
                  <span className="font-display text-title font-semibold text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                    {service.name}
                  </span>
                  <span className="mt-1 block text-small leading-relaxed text-(--color-steel)">
                    {service.homeSummary}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="text-(--color-brand-blue) transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
