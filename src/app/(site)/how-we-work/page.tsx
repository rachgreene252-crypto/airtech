import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { DeliveryJourney } from "@/components/home/DeliveryJourney";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "Airtech's project lifecycle: requirements, design and engineering, procurement, installation, testing and commissioning, and after-sales maintenance.",
};

// 2026-10-29: the page is now the same photo-led delivery narrative as the
// homepage (src/components/home/DeliveryJourney.tsx), so the process is
// told one way across the site. The old ClientJourney and its photo strip
// were retired with it.
export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How We Work" }]}
        eyebrow="How we work"
        heading="One partner, the whole lifecycle."
        description="Airtech is a single engineering partner across the whole project lifecycle, from the first conversation to long-term support."
      />
      <DeliveryJourney eyebrow="The delivery process" onOwnPage />
      <FinalCTA />
    </>
  );
}
