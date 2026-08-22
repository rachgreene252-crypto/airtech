import { HeroVisual } from "@/components/home/HeroVisual";
import { EngineeringStatement } from "@/components/home/EngineeringStatement";
import { MEPSequence } from "@/components/home/MEPSequence";
import { ProofBar } from "@/components/home/ProofBar";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { SolutionsExperience } from "@/components/home/SolutionsExperience";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrustedBy } from "@/components/home/TrustedBy";

// Homepage sequence per the 2026-08-22 homepage implementation brief
// (prompt.docx): 01 Navigation (site layout) -> 02 Hero visual -> 03
// Engineering headline -> 04 MEP system sequence -> 05 Proof bar -> 06 What
// We Do -> 07 Our Solutions -> 08 Featured Projects -> 09 Trusted By. This
// supersedes the previous 11-section sequence (Opening/SystemsReveal/
// SystemShowcase/etc.) per that brief's explicit exact-order instruction;
// the prior components remain in src/components/home for reuse elsewhere
// (e.g. SystemShowcase's per-discipline panels fit /expertise better) and
// are not deleted.
export default function HomePage() {
  return (
    <>
      <HeroVisual />
      <EngineeringStatement />
      <MEPSequence />
      <ProofBar />
      <WhatWeDo />
      <SolutionsExperience />
      <FeaturedProjects />
      <TrustedBy />
    </>
  );
}
