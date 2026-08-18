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
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
        {shown.map((industry, i) => (
          <Reveal key={industry.slug} delay={(i % 4) * 0.05}>
            <Link href={`/industries/${industry.slug}`} className="group block border-t border-(--color-line-strong) pt-5">
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-(--color-blueprint)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold leading-tight group-hover:text-(--color-signal) transition-colors">
                {industry.name}
              </h3>
              <p className="mt-2 text-sm text-(--color-steel) leading-relaxed line-clamp-3">
                {industry.overview}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-signal) opacity-0 group-hover:opacity-100 group-hover:gap-2.5 transition-all">
                View sector <span aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <Link href="/industries" className="text-sm font-medium text-(--color-signal) hover:underline">
          View all industries →
        </Link>
      </div>
    </Section>
  );
}
