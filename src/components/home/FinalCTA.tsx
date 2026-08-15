import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <Section tone="raised" className="text-center">
      <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
        Have a project in planning?
      </p>
      <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold max-w-3xl mx-auto text-balance">
        Bring the engineering scope to us before the RFP does.
      </h2>
      <p className="mt-6 text-lg text-(--color-steel) max-w-xl mx-auto">
        Tell us what you&apos;re building and we&apos;ll respond within one business day.
      </p>
      <div className="mt-9">
        <ButtonLink href="/contact" size="lg">
          Discuss Your Project
        </ButtonLink>
      </div>
    </Section>
  );
}
