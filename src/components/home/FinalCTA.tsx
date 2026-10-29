import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Offices } from "@/components/layout/Offices";

/**
 * Closing CTA. Kept light (client: no dark blue blocks, no stretched
 * background photo; see git history for 2026-09-16). 2026-10-29: now
 * carries the offices beside the enquiry, so a regional office (India,
 * src/content/offices.ts) joins the page by data alone.
 */
export function FinalCTA() {
  return (
    <section aria-labelledby="cta-heading" className="relative bg-site-texture py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
              Your project
            </p>
            <h2
              id="cta-heading"
              className="mt-4 max-w-[16ch] font-display text-display-xl font-semibold leading-[1.04] tracking-[-0.022em] text-balance text-(--color-ink)"
            >
              Let&apos;s engineer your project.
            </h2>
            <p className="mt-6 max-w-lg text-body-l leading-relaxed text-(--color-steel)">
              Tell us what you&apos;re building and we&apos;ll respond within one business day.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <ButtonLink href="/contact/project-enquiry" size="lg">
                Inquire for Services
              </ButtonLink>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--color-line-strong) px-7 py-3.5 text-base font-medium text-(--color-ink) transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
              >
                Contact us
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <Offices />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
