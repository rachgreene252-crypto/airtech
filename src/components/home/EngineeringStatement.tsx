import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Slim intro band — demoted from the former full-height second hero (spec
 * §5.2). The hero's own headline layer (CinematicHero.tsx) is now the
 * page's h1, so this is a supporting h2 statement rather than a second
 * competing full-height headline. One block fade instead of the previous
 * line-by-line stagger.
 */
export function EngineeringStatement() {
  return (
    <section className="bg-site-texture py-16 sm:py-20 lg:py-24">
      <Container className="max-w-4xl text-center">
        <Reveal>
          <span aria-hidden="true" className="mx-auto mb-6 block h-px w-14 bg-(--color-brand-blue-soft)" />

          <h2 className="font-display text-display-m font-semibold leading-[1.05] tracking-tight text-(--color-ink) text-balance">
            Engineering the systems behind extraordinary spaces.
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-body-l leading-relaxed text-(--color-steel)">
            Integrated MEP and HVAC engineering for complex buildings, specialised environments
            and projects where reliability matters.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-body leading-relaxed text-(--color-ink-soft)">
            Airtech brings engineering, procurement, execution, commissioning and long-term
            technical support together, giving clients a single engineering partner for the
            systems that make buildings perform.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-7">
            <ButtonLink href="/contact/project-enquiry" size="lg">
              Discuss your project
            </ButtonLink>
            <Link
              href="/projects"
              className="text-sm font-medium text-(--color-ink)/75 hover:text-(--color-ink) transition-colors"
            >
              Explore our work →
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
