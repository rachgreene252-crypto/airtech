import { CinematicHero } from "@/components/home/CinematicHero";
import { BuildingFor } from "@/components/home/BuildingFor";
import { ProofBar } from "@/components/home/ProofBar";
import { SystemsReveal } from "@/components/home/SystemsReveal";
import { ClientJourney } from "@/components/journey/ClientJourney";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrustedBy } from "@/components/home/TrustedBy";
import { FinalCTA } from "@/components/home/FinalCTA";

// Homepage sequence (rebuilt 2026-09-10 against the client's reference
// layout): CinematicHero -> BuildingFor ("what are you trying to build?",
// photo-led sector grid) -> SystemsReveal (the isometric interactive
// building-systems diagram — brief §2) -> FeaturedProjects (GSAP
// horizontal) -> ClientJourney (compact, the process timeline) -> ProofBar
// (stats) -> TrustedBy (client logos) -> FinalCTA.
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <BuildingFor />
      <SystemsReveal />
      <FeaturedProjects />
      <ClientJourney variant="compact" />
      <ProofBar />
      <TrustedBy />
      <FinalCTA />
    </>
  );
}
