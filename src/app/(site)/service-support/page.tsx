import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { StickyEnquiryBar } from "@/components/ui/StickyEnquiryBar";

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

// Real, sourced fact (Master Source of Truth) — used as a technical strip
// rather than a fabricated stat, matching the site's content-truth rules.
const trainingLocations = ["Germany", "Japan", "Italy", "Malaysia", "China", "India"];

export default function ServiceSupportPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service & Support" }]}
        eyebrow="After the handover"
        heading="Airtech stays involved after the project is complete."
        description="A trained technical team supports installed systems through Annual Maintenance Contracts, scheduled service and rapid response. Engineers trained at manufacturer training centres support the design, selection and installation needs of major customer applications."
      />

      <Section>
        <SectionHeader eyebrow="Coverage" heading="What's supported." />
        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-x-14 gap-y-4 text-left sm:grid-cols-2">
          {coverage.map((item) => (
            <li key={item} className="flex gap-4 text-body leading-relaxed text-(--color-ink-soft)">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-(--color-brand-blue)" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-3xl text-center font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-(--color-steel-soft)">
          Engineers trained at manufacturer centres · {trainingLocations.join(" · ")}
        </p>
      </Section>

      <Section tone="ink" className="text-center">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
          Existing Airtech customer?
        </p>
        <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold max-w-2xl mx-auto text-balance">
          Request an AMC or raise a service call.
        </h2>
        <div className="mt-8">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Request Service
          </ButtonLink>
        </div>
      </Section>
      <div className="lg:hidden h-[68px]" aria-hidden="true" />
      <StickyEnquiryBar />
    </>
  );
}
