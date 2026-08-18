import { Opening } from "@/components/home/Opening";
import { SystemsReveal } from "@/components/home/SystemsReveal";
import { SystemShowcase } from "@/components/home/SystemShowcase";
import { HVACSpotlight } from "@/components/home/HVACSpotlight";
import { DataMoments } from "@/components/home/DataMoments";
import { TrustBar } from "@/components/home/TrustBar";
import { IndustriesShowcase } from "@/components/home/IndustriesShowcase";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { DeliveryApproach } from "@/components/home/DeliveryApproach";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { FinalCTA } from "@/components/home/FinalCTA";

// Phase 1 of the visual redesign (docs/superpowers/specs — homepage cinematic
// sequence): Opening -> SystemsReveal -> SystemShowcase -> HVACSpotlight ->
// DataMoments replace the old hero/capabilities-grid/systems-accordion stack.
// Sections below DataMoments are unchanged in structure for this phase but
// inherit the new architectural-white/cobalt/amber token system automatically
// (see src/app/globals.css) so the page reads as one design system already.
export default function HomePage() {
  return (
    <>
      <Opening />
      <SystemsReveal />
      <SystemShowcase />
      <HVACSpotlight />
      <DataMoments />
      <TrustBar />
      <IndustriesShowcase />
      <FeaturedProjects />
      <DeliveryApproach />
      <PartnersStrip />
      <FinalCTA />
    </>
  );
}
