import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 03 — Proof. Only claims confirmed in source material
 * (site-settings.ts / docs/AIRTECH_OPEN_DECISIONS.md B3): 25+ years,
 * established 2000, MEP operations from 2013. Headcount ("300+") stays
 * `needs_verification`, so the fourth slot is a qualitative point, not an
 * invented number.
 *
 * Presented as a quiet editorial row — a Fraunces figure, a hairline, a
 * label — not a boxed spec sheet with count-up animation (counting up to a
 * calendar year reads as a gimmick, and the brief asks for editorial data,
 * not a dashboard).
 */
const STATS = [
  { value: "25+", label: "Years of engineering experience" },
  { value: "2000", label: "Established in Nepal" },
  { value: "2013", label: "MEP operations commenced" },
  { value: "In-house", label: "Multidisciplinary engineering and technical team" },
] as const;

export function ProofBar() {
  return (
    <section className="border-t border-(--color-line) py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal className="mx-auto grid max-w-4xl grid-cols-2 gap-y-12 border-y border-(--color-line) py-12 sm:grid-cols-4 sm:gap-y-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-3 text-center sm:px-5">
              <p className="font-display font-normal leading-none tracking-[-0.02em] text-(--color-ink) text-[2.25rem] sm:text-[2.75rem]">
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
