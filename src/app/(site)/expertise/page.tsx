import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Airtech's engineering disciplines: HVAC, Electrical, Plumbing & Public Health, Fire Protection, ELV/Security, BMS/Systems Integration and Engineering/Advisory — coordinated as one practice.",
};

const FACTS = [
  { value: "07", label: "Engineering disciplines, coordinated as one" },
  { value: "01", label: "One practice — not a chain of sub-contractors" },
  { value: "2000", label: "Delivering integrated MEP in Nepal since" },
];

/**
 * The right-column landing for /expertise: a short orientation plus the
 * discipline list. Picking a discipline in the rail (or here) swaps this
 * panel for that discipline; the page header and rail stay put.
 */
export default function ExpertiseOverviewPage() {
  return (
    <div>
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
        Overview
      </p>
      <h2 className="mt-4 font-display text-display-m font-normal leading-[1.1] tracking-[-0.012em] text-balance">
        One team holds every system in the building.
      </h2>
      <p className="mt-5 max-w-2xl text-body-l leading-relaxed text-(--color-steel)">
        Each discipline below is designed, procured, installed and commissioned by
        Airtech — not handed between trades. Select one to see its scope, the systems
        it covers, and where it has been delivered.
      </p>

      <dl className="mt-10 grid grid-cols-1 border-t border-(--color-line) sm:grid-cols-3">
        {FACTS.map((fact) => (
          <div key={fact.value} className="border-b border-(--color-line) py-6 sm:border-b-0 sm:border-r sm:pr-6 sm:last:border-r-0">
            <dt className="font-display text-4xl font-normal text-(--color-ink)">{fact.value}</dt>
            <dd className="mt-2 max-w-[16rem] text-small leading-relaxed text-(--color-steel)">
              {fact.label}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-12 border-t border-(--color-line)">
        {services.map((service, i) => (
          <li key={service.slug}>
            <Link
              href={`/expertise/${service.slug}` as Route}
              className="group flex items-baseline gap-5 border-b border-(--color-line) py-5 transition-colors hover:bg-(--color-paper-raised)"
            >
              <span className="font-mono text-xs text-(--color-steel-soft)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="font-display text-title font-normal text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
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
        ))}
      </ul>
    </div>
  );
}
