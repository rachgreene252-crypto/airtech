import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ExpertiseRail } from "@/components/expertise/ExpertiseRail";

/**
 * Expertise is one page with a persistent left-rail switcher. This layout
 * owns the parts that don't change between disciplines — the page header
 * (the shared PageHero) and the rail — so `/expertise` and every `/expertise/[slug]` only
 * swap the right-hand column. The nav entry for "Expertise" is a plain link
 * (no dropdown); the discipline is chosen here, inside the page.
 */
export default function ExpertiseLayout({ children }: LayoutProps<"/expertise">) {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Expertise" }]}
        eyebrow="Engineering disciplines"
        heading="Every discipline a complex building needs, under one team."
        description="HVAC, electrical, public health engineering (PHE), fire fighting & fire protection, extra low-voltage (ELV) and building-systems integration, coordinated as one engineering practice, so how the systems work together never falls between contractors."
      />

      <Container className="py-8 sm:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <ExpertiseRail />
          <div className="min-w-0 max-w-[60rem]">{children}</div>
        </div>
      </Container>
    </>
  );
}
