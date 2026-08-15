import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Service & Support",
  description:
    "Airtech's after-sales service, Annual Maintenance Contracts (AMC) and technical support for HVAC and MEP systems already in operation.",
};

const coverage = [
  "Annual Maintenance Contracts (AMC)",
  "HVAC service and maintenance",
  "Sewage and water treatment plant maintenance",
  "Hot water and hydro-pneumatic system service",
  "Access control and CCTV maintenance",
  "General technical support and troubleshooting",
];

export default function ServiceSupportPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service & Support" }]}
        eyebrow="After the handover"
        heading="Airtech stays involved after the project is complete."
        description="A trained technical team supports installed systems through Annual Maintenance Contracts, scheduled service and rapid response — engineers trained at manufacturer training centres in Germany, Japan, Italy, Malaysia, China and India support the designs, selection and installation needs of major customer applications."
      />

      <Section>
        <SectionHeader eyebrow="Coverage" heading="What's supported." />
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
          {coverage.map((item) => (
            <li key={item} className="flex gap-3 border-b border-(--color-line) pb-4 text-(--color-ink)">
              <span aria-hidden="true" className="text-(--color-signal) font-mono">—</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="ink" className="text-center">
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
          Existing Airtech customer?
        </p>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold max-w-2xl mx-auto text-balance">
          Request an AMC or raise a service call.
        </h2>
        <div className="mt-8">
          <ButtonLink href="/contact" size="lg">
            Request Service
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
