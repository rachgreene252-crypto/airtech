import { CinematicHero } from "@/components/home/CinematicHero";
import { ProofBar } from "@/components/home/ProofBar";
import { SystemsReveal } from "@/components/home/SystemsReveal";
import { ClientJourney } from "@/components/journey/ClientJourney";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrustedBy } from "@/components/home/TrustedBy";

// Homepage sequence (2026-09-04):
// CinematicHero -> ProofBar -> SystemsReveal (the interactive
// building-systems diagram — brief §2, "what does Airtech actually do")
// -> ClientJourney (compact) -> FeaturedProjects (GSAP horizontal) ->
// TrustedBy. SystemsReveal replaces the earlier flat WhatWeDo list (kept in
// src/components/home for reuse); MEPSequence / EngineeringStatement were
// deleted as duplicative.
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <ProofBar />
      <SystemsReveal />
      <ClientJourney variant="compact" />
      <FeaturedProjects />
      <TrustedBy />
    </>
  );
}
