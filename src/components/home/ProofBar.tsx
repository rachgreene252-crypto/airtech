import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 05 — Proof bar. Only claims confirmed in source material
 * (site-settings.ts / docs/AIRTECH_OPEN_DECISIONS.md B3): 25+ years,
 * established 2000, MEP operations commenced 2013. Team/headcount figures
 * ("300+") remain `needs_verification` per the open-decisions log, so the
 * fourth slot is a qualitative proof point rather than an invented number —
 * matching the brief's own fallback instruction ("leave this statistic easy
 * to replace" if not yet a verified value).
 */
const STATS = [
  { value: "25+", label: "Years of engineering experience" },
  { value: "2000", label: "Established in Nepal" },
  { value: "2013", label: "MEP operations commenced" },
  { value: "In-house", label: "Multidisciplinary engineering & technical team" },
] as const;

export function ProofBar() {
  return (
    <section className="border-b border-(--color-line) bg-(--color-paper-raised) py-12 sm:py-14">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-8">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06} className="border-t border-(--color-line-strong) pt-4">
              <p className="font-display text-4xl sm:text-5xl font-bold leading-none text-(--color-ink)">
                {stat.value}
              </p>
              <p className="mt-3 font-mono text-[11px] sm:text-xs tracking-[0.06em] uppercase text-(--color-steel)">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
