import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Airtech's engineering disciplines: HVAC, Electrical, Plumbing & Public Health, Fire Protection, ELV/Security, BMS/Systems Integration and Engineering/Advisory.",
};

// An engineering index, not the homepage repeated (brief §08): large
// typographic rows rather than a grid of boxes. Each discipline's own
// sub-services surface inline as a drawing-sheet-style specification line.
export default function ExpertisePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Expertise" }]}
        eyebrow="Engineering disciplines"
        heading="Every discipline a complex building needs, under one team."
        description="Airtech coordinates HVAC, electrical, plumbing, fire protection, ELV and building-systems integration as a single engineering practice, so responsibility for how systems work together never falls between contractors."
      />
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 0.04}>
            <Link
              href={`/expertise/${service.slug}`}
              className="group grid gap-3 border-t border-(--color-line) py-10 transition-colors hover:bg-(--color-paper-raised) sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8 sm:py-12"
            >
              <span className="font-mono text-sm text-(--color-signal) shrink-0">{service.disciplineCode}</span>
              <div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[0.98] group-hover:text-(--color-blueprint) transition-colors text-balance">
                  {service.name}
                </h2>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-(--color-steel) leading-relaxed">
                  {service.shortDescription}
                </p>
                {service.subServices.length > 0 && (
                  <p className="mt-4 font-mono text-[11px] tracking-[0.06em] uppercase text-(--color-steel-soft)">
                    {service.subServices.slice(0, 5).join(" · ")}
                  </p>
                )}
              </div>
              <span
                aria-hidden="true"
                className="hidden shrink-0 self-center text-2xl text-(--color-signal) transition-transform group-hover:translate-x-1.5 sm:block"
              >
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
