import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { ClientJourney } from "@/components/journey/ClientJourney";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "Airtech's project lifecycle: from the first conversation through engineering, procurement, execution, testing and commissioning, to long-term support.",
};

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How We Work" }]}
        eyebrow="How we work"
        heading="One partner, the whole lifecycle."
        description="Airtech is a single engineering partner across the whole project lifecycle — from the first conversation to long-term support."
      />
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
