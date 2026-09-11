import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HimalayanSkyline } from "@/components/ui/HimalayanSkyline";

/**
 * "Built for Nepal" — new 2026-09-11, per the client's ask for "that Nepali
 * essence" alongside the premium positioning. The four facts below are
 * general, well-established engineering context for Nepal (seismic
 * hazard zone, monsoon climate, altitude's effect on air-handling
 * equipment, dense historic urban fabric) — not invented Airtech-specific
 * claims — used to ground "great at their work" in the actual place they
 * work, rather than a generic MEP-anywhere pitch.
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
    <section className="relative overflow-hidden border-t border-(--color-line) bg-(--color-blue-deep) pb-16 pt-16 text-white sm:pb-20 sm:pt-20">
      <HimalayanSkyline
        className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full text-(--color-brand-blue-soft) sm:h-32"
        opacity={0.22}
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue-soft)">
              Engineered for Nepal
            </p>
            <h2 className="mt-5 font-display text-display-l font-semibold leading-[1.08] tracking-[-0.015em] text-balance">
              Built for the Kathmandu Valley — and everywhere in between.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-body-l leading-relaxed text-white/70">
              A design that works in Nepal has to work with Nepal — its geology, its
              climate and its cities, not a generic template dropped in from elsewhere.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[4px] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 0.07} className="h-full">
              <div className="h-full bg-(--color-blue-deep) p-7">
                <span
                  aria-hidden="true"
                  className="block h-1.5 w-6 rounded-full bg-(--color-brand-blue-vivid)"
                />
                <h3 className="mt-5 font-display text-title font-semibold text-white">
                  {fact.label}
                </h3>
                <p className="mt-3 text-small leading-relaxed text-white/65">{fact.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
