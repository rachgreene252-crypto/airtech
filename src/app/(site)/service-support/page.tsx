import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
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
      {/* Asymmetric photo/text hero — systems Airtech delivered are the same
          ones this page is about supporting, an honest pairing rather than
          a generic centered text block. */}
      <section className="grid border-b border-(--color-line) lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-16 lg:order-2 lg:px-14 lg:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service & Support" }]} />
          <p className="mt-8 font-sans text-label font-medium text-(--color-brand-blue)">
            After the handover
          </p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-[0.98] text-balance">
            Airtech stays involved after the project is complete.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-(--color-steel) leading-relaxed">
            A trained technical team supports installed systems through Annual Maintenance Contracts,
            scheduled service and rapid response. Engineers trained at manufacturer training centres
            support the designs, selection and installation needs of major customer applications.
          </p>
        </div>
        <div className="relative min-h-[42vh] lg:order-1 lg:min-h-[70vh]">
          <Image
            src="/images/projects/laxmi-motors-kd-plant.jpg"
            alt="Laxmi Motors KD Plant, Parasi: a system Airtech continues to support after handover"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="Coverage" heading="What's supported." />
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
          {coverage.map((item) => (
            <li key={item} className="flex gap-3 text-(--color-ink)">
              <span aria-hidden="true" className="text-(--color-signal) font-mono">—</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-10 font-sans text-label text-(--color-steel)">
          Engineers trained at manufacturer centres: {trainingLocations.join(" · ")}
        </p>
      </Section>

      <Section tone="ink" className="text-center">
        <p className="font-sans text-label font-medium text-(--color-brand-blue)">
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
