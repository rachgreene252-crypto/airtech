import { CinematicHero } from "@/components/home/CinematicHero";
import { ProofBar } from "@/components/home/ProofBar";
import { WhyAirtech } from "@/components/home/WhyAirtech";
import { projects, getProjectsByIndustry } from "@/content/projects";
import { TrustedBy } from "@/components/home/TrustedBy";
import { TheBuilding } from "@/components/home/TheBuilding";
import { ProjectRadar } from "@/components/home/ProjectRadar";
import { AirtechMethod } from "@/components/home/AirtechMethod";
import { FinalCTA } from "@/components/home/FinalCTA";

// Homepage sequence (2026-09-29): who Airtech is (hero, stats, why, the
// organisations that rely on it), then one continuous numbered narrative —
// 01 THE BUILDING (what we engineer) → 02 THE PROJECT RADAR (where we have
// done it) → 03 THE AIRTECH METHOD (how we deliver it) → 04 the enquiry
// CTA. The three middle sections share one building model
// (src/components/engineering), which is what makes them read as one
// system. They replace SystemsReveal, BuildingFor and the compact
// ClientJourney.
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <ProofBar />
      <WhyAirtech
        projectCount={projects.length}
        healthcareCount={getProjectsByIndustry("healthcare").length}
      />
      <TrustedBy />
      <TheBuilding />
      <ProjectRadar />
      <AirtechMethod />
      <FinalCTA />
    </>
  );
}
