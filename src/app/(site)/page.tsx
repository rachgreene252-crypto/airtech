import { CinematicHero } from "@/components/home/CinematicHero";
import { MEPSequence } from "@/components/home/MEPSequence";
import { ProofBar } from "@/components/home/ProofBar";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ClientJourney } from "@/components/journey/ClientJourney";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrustedBy } from "@/components/home/TrustedBy";

// Homepage sequence (2026-09-02 editorial reset):
// CinematicHero (parallax still + choreography) -> MEPSequence (five
// disciplines converge) -> ProofBar -> WhatWeDo (discipline taxonomy) ->
// ClientJourney (compact) -> FeaturedProjects -> TrustedBy.
// EngineeringStatement was cut here — it duplicated the hero and WhatWeDo.
// It stays in src/components/home for reuse elsewhere.
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <MEPSequence />
      <ProofBar />
      <WhatWeDo />
      <ClientJourney variant="compact" />
      <FeaturedProjects />
      <TrustedBy />
    </>
  );
}
