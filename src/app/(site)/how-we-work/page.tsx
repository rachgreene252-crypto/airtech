import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ClientJourney } from "@/components/journey/ClientJourney";
import { journeySteps } from "@/content/journey";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "Airtech's project lifecycle: from the first conversation through engineering, procurement, execution, testing and commissioning, to long-term support.",
};

export default function HowWeWorkPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-(--color-line) bg-site-texture pt-8 pb-14 sm:pt-12 sm:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[24rem] w-[34rem] -translate-x-1/2 rounded-full bg-(--color-brand-blue-soft)/20 blur-[110px]"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "How We Work" }]}
              className="[&_ol]:justify-center"
              visuallyHidden
            />
            <div className="flex items-center justify-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
              <p className="font-mono text-label font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
                How we work
              </p>
              <span aria-hidden="true" className="h-px w-6 bg-(--color-brand-blue)" />
            </div>
            <h1 className="mt-6 font-display text-display-xl font-semibold leading-[1.04] tracking-[-0.018em] text-balance">
              One partner, the whole lifecycle.
            </h1>
            <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-16 rounded-full bg-(--color-brand-blue-vivid)" />
            <p className="mx-auto mt-6 max-w-[42rem] text-body-l text-(--color-steel) leading-relaxed">
              Airtech is a single engineering partner across the whole project lifecycle, from the
              first conversation to long-term support.
            </p>
          </div>

          {/* All six stages, visible at a glance before the scroll narrative. */}
          <ol className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-3">
            {journeySteps.map((step, i) => (
              <li key={step.index} className="flex items-center gap-3">
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[12px] text-(--color-brand-blue)">
                    {String(step.index).padStart(2, "0")}
                  </span>
                  <span className="font-display text-sm font-semibold text-(--color-ink)">
                    {step.label}
                  </span>
                </span>
                {i < journeySteps.length - 1 && (
                  <span aria-hidden="true" className="text-(--color-line-strong)">
                    /
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ClientJourney's own finale step ("Support" — "We stay with you.")
          already closes with its own Enquire CTA. A second "Ready to start
          the conversation?" section used to follow immediately after it —
          two closing CTAs back to back read as a mistake ("still looks very
          weird," client feedback 2026-09-16) — removed rather than kept as
          a duplicate. */}
      <ClientJourney variant="full" />
    </>
  );
}
