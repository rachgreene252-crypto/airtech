import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 03 — Proof. Only claims confirmed in source material
 * (site-settings.ts / docs/AIRTECH_OPEN_DECISIONS.md #3): 25+ years,
 * established 2000, MEP operations from 2013, seven engineering disciplines
 * (src/content/services.ts). Headcount / project-count figures stay
 * `needs_verification` and are not shown.
 *
 * A quiet editorial row — a Fraunces figure, a hairline, a label — not a
 * boxed spec sheet with count-up animation.
 */
const STATS = [
  { value: "25+", label: "Years of engineering experience" },
  { value: "2000", label: "Established in Nepal" },
  { value: "2013", label: "MEP operations commenced" },
  { value: "7", label: "Engineering disciplines, coordinated as one" },
] as const;

export function ProofBar() {
  return (
    <section className="border-t border-(--color-line) py-12 sm:py-14 lg:py-16">
      <Container>
        <Reveal className="mx-auto grid max-w-4xl grid-cols-2 gap-y-10 border-y border-(--color-line) py-10 sm:grid-cols-4 sm:gap-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-3 text-center sm:px-5">
              <p className="font-display text-[2.5rem] font-normal leading-none tracking-[-0.02em] text-(--color-ink) sm:text-[2.75rem]">
                {stat.value}
              </p>
              <span aria-hidden="true" className="mx-auto mt-4 block h-px w-8 bg-(--color-brand-blue)" />
              <p className="mx-auto mt-4 max-w-[12rem] text-small leading-relaxed text-(--color-steel)">
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
