import { Opening } from "@/components/home/Opening";
import { SystemsReveal } from "@/components/home/SystemsReveal";
import { SystemShowcase } from "@/components/home/SystemShowcase";
import { HVACSpotlight } from "@/components/home/HVACSpotlight";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { IndustryJourney } from "@/components/home/IndustryJourney";
import { EngineeringLifecycle } from "@/components/home/EngineeringLifecycle";
import { DataMoments } from "@/components/home/DataMoments";
import { TrustBar } from "@/components/home/TrustBar";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { FinalCTA } from "@/components/home/FinalCTA";

// Homepage sequence per the reformation brief §07: Opening (01) -> The
// Airtech Idea (02, SystemsReveal) -> Systems as Products (03, SystemShowcase
// + HVACSpotlight) -> Projects (04, ProjectShowcase) -> Industries (05,
// IndustryJourney) -> Engineering Lifecycle (06) -> [Proof (07) held —
// gated on the reference-letter publication decision, docs/AIRTECH_OPEN_DECISIONS.md #11]
// -> Airtech Through Time (08, DataMoments) -> TrustBar/PartnersStrip (lightweight
// interim proof) -> Final CTA. Service & Support (09) homepage teaser is a
// later pass; /service-support already exists as its own page.
export default function HomePage() {
  return (
    <>
      <Opening />
      <SystemsReveal />
      <SystemShowcase />
      <HVACSpotlight />
      <ProjectShowcase />
      <IndustryJourney />
      <EngineeringLifecycle />
      <DataMoments />
      <TrustBar />
      <PartnersStrip />
      <FinalCTA />
    </>
  );
}
