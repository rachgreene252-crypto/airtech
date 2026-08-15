import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Airtech's engineering disciplines: HVAC, Electrical, Plumbing & Public Health, Fire Protection, ELV/Security, BMS/Systems Integration and Engineering/Advisory.",
};

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Expertise" }]}
        eyebrow="Engineering disciplines"
        heading="Every discipline a complex building needs, under one team."
        description="Airtech coordinates HVAC, electrical, plumbing, fire protection, ELV and building-systems integration as a single engineering practice, so responsibility for how systems work together never falls between contractors."
      />
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-(--color-line)">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/expertise/${service.slug}`}
              className="group block border-b border-r border-(--color-line) p-7 lg:p-8 hover:bg-(--color-paper-raised) transition-colors"
            >
              <span className="font-mono text-xs tracking-[0.1em] text-(--color-signal)">
                {service.disciplineCode}
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-tight">{service.name}</h2>
              <p className="mt-3 text-sm text-(--color-steel) leading-relaxed">{service.shortDescription}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-blueprint) group-hover:gap-2.5 transition-all">
                Explore capability <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
