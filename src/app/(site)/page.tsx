import { CinematicHero } from "@/components/home/CinematicHero";
import { EngineeringStatement } from "@/components/home/EngineeringStatement";
import { MEPSequence } from "@/components/home/MEPSequence";
import { ProofBar } from "@/components/home/ProofBar";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ClientJourney } from "@/components/journey/ClientJourney";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrustedBy } from "@/components/home/TrustedBy";

// Homepage sequence per the 2026-08-28 blue-reset/ClientJourney spec (§5):
// CinematicHero -> EngineeringStatement (slim intro band) -> MEPSequence ->
// ProofBar -> WhatWeDo -> ClientJourney (compact) -> FeaturedProjects ->
// TrustedBy. ClientJourney replaces the retired SolutionsExperience
// component. Prior unused components remain in src/components/home for
// reuse elsewhere and are not deleted.
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <EngineeringStatement />
      <MEPSequence />
      <ProofBar />
      <WhatWeDo />
      <ClientJourney variant="compact" />
      <FeaturedProjects />
      <TrustedBy />
    </>
  );
}
