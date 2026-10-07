import { CinematicHero } from "@/components/home/CinematicHero";
import { ProofBar } from "@/components/home/ProofBar";
import { WhyAirtech } from "@/components/home/WhyAirtech";
import { projects, getProjectsByIndustry } from "@/content/projects";
import { TrustedBy } from "@/components/home/TrustedBy";
import { TheBuilding } from "@/components/home/TheBuilding";
import { ProjectRadar } from "@/components/home/ProjectRadar";
import { AirtechMethod } from "@/components/home/AirtechMethod";
import { FinalCTA } from "@/components/home/FinalCTA";

// Homepage sequence (2026-10-07 client: "once the visitor understands what
// the company does and how you do it, the experience and client trust
// sections will have much more impact"): the hero says what Airtech is,
// then 01 WHAT WE ENGINEER → 02 HOW WE DELIVER → 03 WHERE WE WORK (the three
// share one building model, src/components/engineering), and only then the
// proof — years, why Airtech, the organisations that rely on it — before
// the enquiry CTA.
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <TheBuilding />
      <AirtechMethod />
      <ProjectRadar />
      <ProofBar />
      <WhyAirtech
        projectCount={projects.length}
        healthcareCount={getProjectsByIndustry("healthcare").length}
      />
      <TrustedBy />
      <FinalCTA />
    </>
  );
}
