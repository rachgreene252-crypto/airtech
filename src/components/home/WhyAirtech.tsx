import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Why Airtech" — replaced "Built for Nepal" 2026-09-24. Rebuilt
 * 2026-09-27 ("this section looks really bad"): the accordion + oversized
 * blue figure card became a calm four-column proof row in the Air Experts /
 * Midea "Engineering Standards" idiom — figure, caption, reason, one line
 * of proof — so all four reasons are visible at once instead of hidden
 * behind clicks.
 *
 * Every figure and name here is source-backed: 6 = the live disciplines in
 * content/services.ts; est. 2000 = siteSettings.establishedYear; project
 * and healthcare counts are passed in from content/projects.ts; named
 * buildings all have published project entries.
 */
type Reason = {
  label: string;
  figure: string;
  caption: string;
  body: string;
};

export function WhyAirtech({
  projectCount,
  healthcareCount,
}: {
  projectCount: number;
  healthcareCount: number;
}) {
  const reasons: Reason[] = [
    {
      label: "One team, every system",
      figure: "6",
      caption: "engineering disciplines under one roof",
      body: "HVAC, electrical, plumbing, fire protection, ELV and BMS, designed, installed and commissioned by one accountable team.",
    },
    {
      label: "Chosen by global brands",
      figure: `${Math.floor(projectCount / 5) * 5}+`,
      caption: "landmark projects in our portfolio",
      body: "Hyatt Regency, Fairfield by Marriott, Hilton, The Soaltee and Dusit Princess trust Airtech with their buildings.",
    },
    {
      label: "Where failure isn't an option",
      figure: `${healthcareCount}`,
      caption: "hospitals & medical institutions served",
      body: "Hospitals, the Parliament Building and the British Embassy: critical environments where systems must run around the clock.",
    },
    {
      label: "25 years of expertise",
      figure: "25+",
      caption: "years of engineering since 2000",
      body: "Seismic zones, monsoon humidity and high altitude: engineered for some of the most demanding conditions anywhere.",
    },
  ];

  return (
    <section className="relative bg-site-texture py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
              <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
              Why Airtech
              <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
            </p>
            <h2 className="mt-5 font-display text-display-l font-semibold leading-[1.08] text-balance text-(--color-ink)">
              The engineering behind landmark buildings.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-body-l leading-relaxed text-(--color-steel)">
              When a building can&apos;t afford a system to fail, its owners call Airtech.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 border-t border-(--color-line) sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, i) => (
            <Reveal key={reason.label} delay={i * 0.08} className="h-full">
              <div
                className={[
                  "h-full border-b border-(--color-line) px-1 py-8 sm:px-6 lg:border-b-0 lg:py-10",
                  i % 2 === 1 ? "sm:border-l" : "",
                  i > 0 ? "lg:border-l" : "",
                ].join(" ")}
              >
                <p className="font-display text-5xl font-semibold leading-none tracking-[-0.03em] text-(--color-brand-blue-vivid) tabular-nums">
                  {reason.figure}
                </p>
                <p className="mt-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-(--color-steel-soft)">
                  {reason.caption}
                </p>
                <h3 className="mt-6 font-display text-title font-semibold leading-snug text-(--color-ink)">
                  {reason.label}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-(--color-steel)">{reason.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
