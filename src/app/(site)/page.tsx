import { Opening } from "@/components/home/Opening";
import { MEPSequence } from "@/components/home/MEPSequence";
import { ProofBar } from "@/components/home/ProofBar";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { SystemsReveal } from "@/components/home/SystemsReveal";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrustedBy } from "@/components/home/TrustedBy";

// Homepage sequence — locked structure per the 2026-08-22 homepage brief:
// 01 Navigation (layout header) -> 02/03 Hero + engineering headline
// (Opening, which already interleaves both) -> 04 MEP system sequence ->
// 05 Proof bar -> 06 What We Do -> 07 Our Solutions (SystemsReveal's
// building-systems diagram, restyled) -> 08 Featured Projects -> 09 Trusted
// By. Sections not in this locked list (IndustryJourney, EngineeringLifecycle,
// DataMoments, TrustBar, PartnersStrip, SystemShowcase, HVACSpotlight,
// FinalCTA) were removed from the homepage route only — the components
// still exist for reuse on their own pages (industries, service-support,
// about, expertise).
export default function HomePage() {
  return (
    <>
      <Opening />
      <MEPSequence />
      <ProofBar />
      <WhatWeDo />
      <SystemsReveal />
      <FeaturedProjects />
      <TrustedBy />
    </>
  );
}
