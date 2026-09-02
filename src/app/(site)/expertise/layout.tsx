import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ExpertiseRail } from "@/components/expertise/ExpertiseRail";

/**
 * Expertise is one page with a persistent left-rail switcher. This layout
 * owns the parts that don't change between disciplines — the centred page
 * header and the rail — so `/expertise` and every `/expertise/[slug]` only
 * swap the right-hand column. The nav entry for "Expertise" is a plain link
 * (no dropdown); the discipline is chosen here, inside the page.
 */
export default function ExpertiseLayout({ children }: LayoutProps<"/expertise">) {
  return (
    <>
      <section className="border-b border-(--color-line) pt-8 pb-14 sm:pt-12 sm:pb-16">
        <Container className="flex flex-col items-center text-center">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Expertise" }]}
            className="[&_ol]:justify-center"
          />
          <p className="mt-9 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            Engineering disciplines
          </p>
          <h1 className="mt-5 max-w-[20ch] font-display text-display-xl font-normal leading-[1.05] tracking-[-0.014em] text-balance">
            Every discipline a complex building needs, under one team.
          </h1>
          <p className="mt-6 max-w-[44rem] text-body-l text-(--color-steel) leading-relaxed">
            Airtech coordinates HVAC, electrical, plumbing, fire protection, ELV and
            building-systems integration as a single engineering practice — so responsibility
            for how systems work together never falls between contractors.
          </p>
        </Container>
      </section>

      <Container className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <ExpertiseRail />
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </>
  );
}
