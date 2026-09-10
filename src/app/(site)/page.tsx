import { CinematicHero } from "@/components/home/CinematicHero";
import { BuildingFor } from "@/components/home/BuildingFor";
import { ProofBar } from "@/components/home/ProofBar";
import { SystemsReveal } from "@/components/home/SystemsReveal";
import { ClientJourney } from "@/components/journey/ClientJourney";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrustedBy } from "@/components/home/TrustedBy";
import { FinalCTA } from "@/components/home/FinalCTA";

// Homepage sequence (reordered 2026-09-10, client: "what Airtech does"
// should follow the hero directly): CinematicHero -> SystemsReveal ("what
// Airtech does" — the isometric interactive building-systems diagram, brief
// §2) -> BuildingFor ("what are you trying to build?", photo-led sector
// grid) -> FeaturedProjects (free horizontal carousel) -> ClientJourney
// (compact, the process timeline) -> ProofBar (stats) -> TrustedBy (client
// logos) -> FinalCTA.
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <SystemsReveal />
      <BuildingFor />
      <FeaturedProjects />
      <ClientJourney variant="compact" />
      <ProofBar />
      <TrustedBy />
      <FinalCTA />
    </>
  );
}
