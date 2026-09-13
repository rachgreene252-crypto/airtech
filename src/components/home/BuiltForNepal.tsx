import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Built for Nepal" — the four facts below are general, well-established
 * engineering context for Nepal (seismic hazard zone, monsoon climate,
 * altitude's effect on air-handling equipment, dense historic urban
 * fabric) — not invented Airtech-specific claims — used to ground "great
 * at their work" in the actual place they work, rather than a generic
 * MEP-anywhere pitch.
 *
 * Redesigned 2026-09-11: was a 4-up equal-weight card grid, flagged in
 * review as the generic "stack four cards" default. Rebuilt as an
 * asymmetric editorial split instead — a fixed statement on the left, a
 * plain rule-separated list on the right (no boxes, no cards) so
 * hierarchy comes from typography and layout, not a repeated component.
 * 2026-09-13: dropped the illustrated mountain-skyline motif ("i hate the
 * hill design"). 2026-09-15: dropped the dark navy fill too, per explicit
 * "no dark blue block anywhere" feedback — the site is light throughout
 * now, so this section carries its weight through type and the sitewide
 * background artwork showing through, not an inverted colour band.
 */
const FACTS = [
  {
    label: "Seismic zone",
    body: "The Kathmandu Valley sits in one of the world's most active seismic regions. Every system is designed and fixed accordingly, not as an afterthought.",
  },
  {
    label: "Monsoon climate",
    body: "Four months of monsoon humidity a year shape how HVAC, electrical and drainage systems are specified here — not just how they're installed.",
  },
  {
    label: "Altitude & air density",
    body: "Kathmandu's elevation changes how air-conditioning and ventilation equipment actually performs. Selection accounts for it from the outset.",
  },
  {
    label: "Dense historic fabric",
    body: "Narrow lanes, older foundations, live neighbouring structures — retrofit and new-build work here both demand a different kind of coordination.",
  },
] as const;

export function BuiltForNepal() {
  return (
    <section className="relative overflow-hidden border-t border-(--color-line) bg-site-texture py-20 sm:py-28">
      <Container className="relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="flex items-center gap-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
                <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
                Engineered for Nepal
              </p>
              <h2 className="mt-6 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.015em] text-balance text-(--color-ink)">
                Built for the Kathmandu Valley — and everywhere in between.
              </h2>
              <p className="mt-6 max-w-md text-body-l leading-relaxed text-(--color-steel)">
                A design that works in Nepal has to work with Nepal — its geology, its
                climate and its cities, not a generic template dropped in from elsewhere.
              </p>
            </div>
          </Reveal>

          <div className="divide-y divide-(--color-line) border-t border-(--color-line)">
            {FACTS.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 0.07}>
                <div className="grid grid-cols-1 gap-3 py-8 sm:grid-cols-[1fr_1.5fr] sm:gap-10">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-(--color-ink)">
                    {fact.label}
                  </h3>
                  <p className="text-body leading-relaxed text-(--color-steel)">{fact.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
