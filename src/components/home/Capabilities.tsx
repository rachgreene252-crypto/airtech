import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/content/services";

export function Capabilities() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Disciplines — 01"
        heading="One engineering team, every building system."
        description="Airtech coordinates the full set of MEP disciplines under one delivery team, so nothing falls through the gaps between contractors."
      />
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-(--color-line)">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={(i % 3) * 0.06}>
            <Link
              href={`/expertise/${service.slug}`}
              className="group relative block h-full border-b border-r border-(--color-line) p-7 lg:p-8 transition-colors hover:bg-(--color-paper-raised)"
            >
              <span className="font-mono text-xs tracking-[0.1em] text-(--color-signal)">
                {service.disciplineCode}
              </span>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">
                {service.name}
              </h3>
              <p className="mt-3 text-sm text-(--color-steel) leading-relaxed">
                {service.shortDescription}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-blueprint) group-hover:gap-2.5 transition-all">
                Explore capability
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
