import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getProofStats } from "@/content/stats";

/**
 * Deliberately renders only whatever getProofStats() returns — currently
 * three figures (25+ years / Est. 2000 / MEP since 2013). Team size is
 * defined in stats.ts but held back at "needs_verification" (see that
 * file's comment), so it does not appear here until confirmed — no
 * placeholder or invented figure fills the gap.
 */
export function ProofBar() {
  const stats = getProofStats();
  if (stats.length === 0) return null;

  return (
    <section className="border-b border-(--color-line) bg-(--color-paper) py-12 sm:py-14">
      <Container>
        <div className="grid grid-cols-2 divide-x divide-(--color-line) border-t border-(--color-line) sm:grid-cols-3 lg:auto-cols-fr lg:grid-flow-col lg:divide-x">
          {stats.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.06} className="px-6 py-8 text-center first:pl-0 sm:text-left sm:px-8">
              <p className="font-display text-4xl sm:text-5xl font-normal text-(--color-ink)">{stat.value}</p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.1em] uppercase text-(--color-steel)">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
