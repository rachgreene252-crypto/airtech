import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
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
      <section className="border-b border-(--color-line) bg-site-texture pt-8 pb-14 sm:pt-12 sm:pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "How We Work" }]}
              className="[&_ol]:justify-center"
            />
            <p className="mt-9 font-sans text-label font-medium tracking-[0.01em] text-(--color-brand-blue)">
              How we work
            </p>
            <h1 className="mt-4 font-display text-display-l font-semibold leading-[1.03] tracking-[-0.018em] text-balance">
              One partner, the whole lifecycle.
            </h1>
            <p className="mx-auto mt-6 max-w-[44rem] text-lg text-(--color-steel) leading-relaxed">
              Airtech is a single engineering partner across the whole project lifecycle — from the
              first conversation to long-term support.
            </p>
          </div>

          {/* All six stages, visible at a glance before the scroll narrative. */}
          <ol className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-3">
            {journeySteps.map((step, i) => (
              <li key={step.index} className="flex items-center gap-3">
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-[11px] text-(--color-brand-blue)">
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

      <ClientJourney variant="full" />

      <Section className="text-center">
        <h2 className="font-display text-display-m font-semibold max-w-2xl mx-auto text-balance">
          Ready to start the conversation?
        </h2>
        <div className="mt-8">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Discuss your project
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
