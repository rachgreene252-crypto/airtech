import { CinematicHero } from "@/components/home/CinematicHero";
import { EngineeringStatement } from "@/components/home/EngineeringStatement";
import { MEPSequence } from "@/components/home/MEPSequence";
import { ProofBar } from "@/components/home/ProofBar";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { SolutionsExperience } from "@/components/home/SolutionsExperience";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrustedBy } from "@/components/home/TrustedBy";
import { ClientRecognition } from "@/components/home/ClientRecognition";

// Homepage sequence — same section order as the 2026-08-22 implementation
// brief, elevated by the same-day "premium visual reconception" brief
// (richtext_converted_to_markdown (1).md): GSAP cinematic frame-sequence
// hero, full light/white + Airtech-blue palette, center-aligned editorial
// text sections. 01 Navigation -> 02 Cinematic hero -> 03 Engineering
// headline -> 04 MEP system sequence -> 05 Proof bar -> 06 What We Do -> 07
// Our Solutions -> 08 Featured Projects -> 09 Trusted By. Order and section
// count are unchanged; ClientRecognition is a deliberately slim closing
// strip (not a new numbered section). Prior components remain in
// src/components/home for reuse elsewhere (e.g. SystemShowcase's
// per-discipline panels fit /expertise better) and are not deleted.
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <EngineeringStatement />
      <MEPSequence />
      <ProofBar />
      <WhatWeDo />
      <SolutionsExperience />
      <FeaturedProjects />
      <TrustedBy />
      <ClientRecognition />
    </>
  );
}
