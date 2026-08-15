import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Engineering guidelines, technical bulletins and insights from Airtech.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
        eyebrow="Resources"
        heading="Engineering resources and insights."
        description="Technical guidelines, bulletins and project insights from Airtech's engineering team."
      />
      <Section>
        {resources.length > 0 ? (
          <div>{/* resource list renders here once content exists */}</div>
        ) : (
          <EmptyState
            title="Resource centre in progress"
            description="Technical guidelines and insight articles are being prepared for publication. Check back soon, or contact us directly for technical documentation."
          />
        )}
      </Section>
    </>
  );
}
