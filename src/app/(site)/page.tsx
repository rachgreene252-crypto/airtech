import { CinematicHero } from "@/components/home/CinematicHero";
import { ProofBar } from "@/components/home/ProofBar";
import { BuildingFor } from "@/components/home/BuildingFor";
import { BuiltForNepal } from "@/components/home/BuiltForNepal";
import { SystemsReveal } from "@/components/home/SystemsReveal";
import { ClientJourney } from "@/components/journey/ClientJourney";
import { TrustedBy } from "@/components/home/TrustedBy";
import { FinalCTA } from "@/components/home/FinalCTA";

// Homepage sequence: CinematicHero, then ProofBar (stats, right under the
// hero per direct feedback), SystemsReveal ("what Airtech does" — the
// interactive engineering visualization, closing with its own named-
// project proof), BuiltForNepal ("that Nepali essence"), BuildingFor
// (sector carousel), ClientJourney (the process timeline), TrustedBy
// (client logos), FinalCTA.
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <ProofBar />
      <SystemsReveal />
      <BuiltForNepal />
      <BuildingFor />
      <ClientJourney variant="compact" />
      <TrustedBy />
      <FinalCTA />
    </>
  );
}
