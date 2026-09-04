import { CinematicHero } from "@/components/home/CinematicHero";
import { ProofBar } from "@/components/home/ProofBar";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ClientJourney } from "@/components/journey/ClientJourney";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrustedBy } from "@/components/home/TrustedBy";

// Homepage sequence (2026-09-04):
// CinematicHero -> ProofBar -> WhatWeDo (positioning + discipline taxonomy)
// -> ClientJourney (compact) -> FeaturedProjects (GSAP horizontal) ->
// TrustedBy. MEPSequence and EngineeringStatement were folded into
// WhatWeDo / the hero — both duplicated the "what we do" message. Both
// files stay in src/components/home for reuse elsewhere.
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <ProofBar />
      <WhatWeDo />
      <ClientJourney variant="compact" />
      <FeaturedProjects />
      <TrustedBy />
    </>
  );
}
