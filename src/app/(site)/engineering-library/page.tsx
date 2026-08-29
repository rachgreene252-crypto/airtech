import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Engineering Library",
  description:
    "Technical documentation for consultants, architects and specifiers: discipline capability decks, company profile and certifications from Airtech's engineering team.",
};

export default function EngineeringLibraryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Engineering Library" }]}
        eyebrow="Engineering library"
        heading="Technical documentation for consultants and specifiers."
        description="Discipline capability decks, company documents and certifications — published as Airtech supplies the source files."
      />
      <Section>
        {resources.length > 0 ? (
          <div>{/* resource list renders here once content exists */}</div>
        ) : (
          <EmptyState
            title="Library in progress"
            description="Technical documentation is being prepared for publication. Contact us directly for anything you need in the meantime."
          />
        )}
      </Section>
    </>
  );
}
