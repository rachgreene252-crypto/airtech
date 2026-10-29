import Link from "next/link";
import Image from "@/components/ui/Image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { milestones } from "@/content/history";
import { services } from "@/content/services";
import { SYSTEM_COLOR, SYSTEM_SHORT, type SystemSlug } from "@/components/engineering/model";

/**
 * How Airtech grew (2026-10-29). The milestones as a ledger, each row
 * showing the six engineering disciplines as slots, filled in their drawing
 * colour once Airtech offered them: HVAC alone in 2000, the MEP division in
 * 2013, every discipline today. The evolution reads at a glance, and every
 * slot comes straight from src/content/history.ts (no invented milestones).
 * The 2025 anniversary row carries its photograph instead.
 */
export function CapabilityGrowth() {
  const order = services.map((s) => s.slug as SystemSlug);
  return (
    <section aria-labelledby="growth-heading" className="border-t border-(--color-line) bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">How Airtech grew</p>
            <h2 id="growth-heading" className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.018em] text-balance text-(--color-ink)">
              From one discipline to every system in the building.
            </h2>
          </div>
          <Link href="/company/history" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--color-brand-blue) hover:underline lg:col-span-5 lg:justify-self-end">
            The full history <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Column key for the slots (desktop) */}
        <div aria-hidden="true" className="mt-12 hidden grid-cols-12 gap-8 border-b border-(--color-ink) pb-3 lg:grid">
          <span className="col-span-7 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-(--color-steel)">Milestone</span>
          <span className="col-span-5 grid grid-cols-6 gap-1.5">
            {order.map((s) => (
              <span key={s} className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-(--color-steel)">
                {SYSTEM_SHORT[s]}
              </span>
            ))}
          </span>
        </div>

        <ol className="mt-6 lg:mt-0">
          {milestones.map((m, i) => (
            <li key={m.year} className="border-b border-(--color-line-strong)">
              <Reveal delay={i * 0.05}>
                <div className="grid gap-6 py-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-10">
                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-5 sm:grid-cols-[9rem_minmax(0,1fr)] lg:col-span-7">
                    <span className="font-display text-[2.5rem] font-bold leading-none tracking-[-0.04em] text-(--color-brand-blue-vivid) sm:text-[3.5rem]">
                      {m.year}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.375rem] font-semibold leading-snug text-(--color-ink)">{m.title}</h3>
                      <p className="mt-2 text-body leading-relaxed text-(--color-steel)">{m.body}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    {m.disciplines ? (
                      <ul aria-label={`Disciplines offered: ${m.disciplines.map((d) => SYSTEM_SHORT[d as SystemSlug]).join(", ")}`} className="grid grid-cols-6 gap-1.5">
                        {order.map((s) => {
                          const on = m.disciplines!.includes(s);
                          return (
                            <li
                              key={s}
                              aria-hidden="true"
                              className="flex h-12 items-end rounded-[2px] border p-1.5 font-mono text-[0.625rem] font-semibold uppercase leading-none lg:h-14"
                              style={
                                on
                                  ? { background: SYSTEM_COLOR[s], borderColor: SYSTEM_COLOR[s], color: "white" }
                                  : { borderColor: "var(--color-line-strong)", borderStyle: "dashed", color: "transparent" }
                              }
                            >
                              <span className="lg:hidden">{SYSTEM_SHORT[s].slice(0, 4)}</span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <div className="relative aspect-[21/9] overflow-hidden rounded-[2px]">
                        <Image src="/images/team/anniversary-stage.jpg" alt="Airtech's leadership on stage at the 25th-anniversary celebration" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
