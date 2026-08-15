import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/content/industries";

export function IndustriesShowcase() {
  const shown = industries.slice(0, 8);

  return (
    <Section>
      <SectionHeader
        eyebrow="Industries — 03"
        heading="Built around what each sector actually needs."
        description="Healthcare, pharmaceuticals, hospitality, industrial and telecom environments each carry different operational demands — Airtech designs to the requirement, not a generic template."
      />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-(--color-line)">
        {shown.map((industry, i) => (
          <Reveal key={industry.slug} delay={(i % 4) * 0.05} className="bg-(--color-paper) h-full">
            <Link
              href={`/industries/${industry.slug}`}
              className="group flex h-full flex-col justify-between p-6 hover:bg-(--color-paper-raised) transition-colors"
            >
              <div>
                <h3 className="font-display text-xl font-semibold leading-tight">{industry.name}</h3>
                <p className="mt-2 text-sm text-(--color-steel) leading-relaxed line-clamp-3">
                  {industry.overview}
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-blueprint) group-hover:gap-2.5 transition-all">
                View sector <span aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/industries" className="text-sm font-medium text-(--color-blueprint) hover:underline">
          View all industries →
        </Link>
      </div>
    </Section>
  );
}
