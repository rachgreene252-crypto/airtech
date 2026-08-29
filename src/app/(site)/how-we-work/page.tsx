import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "Airtech's project lifecycle: from the first conversation through engineering, procurement, execution, testing and commissioning, to long-term support.",
};

// Stub — Task 16 (Phase 4) replaces the EmptyState below with
// <ClientJourney variant="full" /> once the component and its data exist.
export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How We Work" }]}
        eyebrow="How we work"
        heading="One partner, the whole lifecycle."
        description="Airtech is a single engineering partner across the whole project lifecycle — from the first conversation to long-term support."
      />
      <Section>
        <EmptyState title="Lifecycle detail in progress" />
      </Section>
    </>
  );
}
