import { HeroVisual } from "@/components/home/HeroVisual";
import { EngineeringStatement } from "@/components/home/EngineeringStatement";
import { MEPSequence } from "@/components/home/MEPSequence";
import { ProofBar } from "@/components/home/ProofBar";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { SolutionsExperience } from "@/components/home/SolutionsExperience";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TrustedBy } from "@/components/home/TrustedBy";
import { ClientRecognition } from "@/components/home/ClientRecognition";

// Homepage sequence per the 2026-08-22 homepage implementation brief
// (prompt.docx) and its same-day visual-correction pass
// (richtext_converted_to_markdown.md): 01 Navigation (site layout) -> 02
// Hero visual -> 03 Engineering headline -> 04 MEP system sequence -> 05
// Proof bar -> 06 What We Do -> 07 Our Solutions -> 08 Featured Projects ->
// 09 Trusted By. The correction pass explicitly keeps this exact order and
// forbids adding new major sections; ClientRecognition is a deliberately
// slim closing strip (not a new numbered section) added at the user's
// direct request, not the written brief. This supersedes the earlier
// 11-section sequence (Opening/SystemsReveal/SystemShowcase/etc.); the
// prior components remain in src/components/home for reuse elsewhere (e.g.
// SystemShowcase's per-discipline panels fit /expertise better) and are
// not deleted.
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
      <ClientRecognition />
    </>
  );
}
