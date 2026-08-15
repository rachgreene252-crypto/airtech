import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Sectors Airtech engineers for: healthcare, hospitality, pharmaceuticals, industrial, corporate, telecom/data centres, banking, auditoriums, embassies/INGOs and education.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        eyebrow="Sectors"
        heading="Designed around what each sector actually needs."
        description="Healthcare, pharmaceuticals, hospitality, industrial and telecom environments each carry distinct operational demands. Airtech designs to the requirement, not a generic template."
      />
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-(--color-line)">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group flex flex-col justify-between bg-(--color-paper) p-7 hover:bg-(--color-paper-raised) transition-colors"
            >
              <div>
                <h2 className="font-display text-2xl font-semibold leading-tight">{industry.name}</h2>
                <p className="mt-3 text-sm text-(--color-steel) leading-relaxed line-clamp-4">
                  {industry.overview}
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-blueprint) group-hover:gap-2.5 transition-all">
                View sector <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
