import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Capabilities } from "@/components/home/Capabilities";
import { EngineeringSystemsExplorer } from "@/components/home/EngineeringSystemsExplorer";
import { IndustriesShowcase } from "@/components/home/IndustriesShowcase";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { DeliveryApproach } from "@/components/home/DeliveryApproach";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { FinalCTA } from "@/components/home/FinalCTA";

// Section order per AIRTECH_FINAL_EXPERIENCE_SPEC.md §2: capability -> relevance -> proof.
// Industries now precedes Featured Projects (proof only lands once the visitor knows Airtech
// understands their sector), and the Engineering Systems Explorer is new.
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Capabilities />
      <EngineeringSystemsExplorer />
      <IndustriesShowcase />
      <FeaturedProjects />
      <DeliveryApproach />
      <PartnersStrip />
      <FinalCTA />
    </>
  );
}
