import { CinematicHero } from "@/components/home/CinematicHero";
import { TheBuilding } from "@/components/home/TheBuilding";
import { DeliveryJourney } from "@/components/home/DeliveryJourney";
import { SectorWork, type SectorPreview } from "@/components/home/SectorWork";
import { ProjectRadar } from "@/components/home/ProjectRadar";
import { Credibility } from "@/components/home/Credibility";
import { TrustedBy } from "@/components/home/TrustedBy";
import { FinalCTA } from "@/components/home/FinalCTA";
import { projects, hasTileImage } from "@/content/projects";
import { industries } from "@/content/industries";
import { getClientsByIndustry } from "@/content/clients";

// Lead photograph per sector for "03 · The work": Yak & Yeti leads
// hospitality (client, 2026-10-05); elsewhere the first featured project
// with a photograph, then any photographed project in the sector.
const LEAD: Record<string, string> = { hospitality: "hotel-yak-and-yeti" };

function sectorPreviews(): SectorPreview[] {
  return industries.map((industry) => {
    const inSector = projects.filter((p) => p.industrySlug === industry.slug && hasTileImage(p));
    const lead =
      inSector.find((p) => p.slug === LEAD[industry.slug]) ?? inSector.find((p) => p.featured) ?? inSector[0];
    return {
      slug: industry.slug,
      name: industry.name,
      project: lead && {
        slug: lead.slug,
        name: lead.name,
        place: lead.location?.split(",").pop()?.trim(),
        image: { src: lead.heroImage!.src, alt: lead.heroImage!.alt },
      },
      clients: getClientsByIndustry(industry.slug).slice(0, 8).map((c) => c.name),
    };
  });
}

// Homepage sequence. The hero and 01 (what Airtech engineers) stay as the
// client approved them; 2026-10-29 rebuilt everything after them as one
// story with a different form per chapter: 02 how a project is delivered
// (photo narrative), 03 the work by sector, 04 where (map), 05 why clients
// return (team + named proof + logos), then the enquiry with the offices.
export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <TheBuilding />
      <DeliveryJourney />
      <SectorWork sectors={sectorPreviews()} />
      <ProjectRadar />
      <Credibility />
      <TrustedBy compact />
      <FinalCTA />
    </>
  );
}
