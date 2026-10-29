import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ExpertiseAtlas, type AtlasDiscipline } from "@/components/expertise/ExpertiseAtlas";
import { FinalCTA } from "@/components/home/FinalCTA";
import { services } from "@/content/services";
import { getProjectsByService } from "@/content/projects";
import type { SystemSlug } from "@/components/engineering/model";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Airtech's engineering disciplines: HVAC, Electrical, Public Health Engineering (PHE), Fire Fighting & Fire Protection, Extra Low-Voltage (ELV), and BMS/Systems Integration, coordinated as one practice.",
};

// Real site photographs, only where one shows the discipline itself.
// Disciplines without one lean on the drawing beside the chapters.
const PHOTO: Partial<Record<SystemSlug, AtlasDiscipline["photo"]>> = {
  hvac: {
    src: "/images/projects/mit-college-2.jpg",
    alt: "VRF outdoor units installed on the roof of MIT College",
    caption: "VRF outdoor units · MIT College",
  },
  "fire-protection": {
    src: "/images/process/fire-pump-room.jpg",
    alt: "A fire-fighting pump room: sprinkler and hydrant pumps, a diesel fire pump, valves and gauges",
    caption: "Fire-fighting pump room · Airtech site",
  },
  electrical: {
    src: "/images/projects/mit-college-4.jpg",
    alt: "A cable tray run beside a ceiling cassette unit at MIT College",
    caption: "Cable tray and services coordination · MIT College",
  },
};

// The client's signature hotels lead where they apply (2026-10-12).
const SIGNATURE = ["hyatt-regency-kathmandu", "fairfield-by-marriott-thamel", "the-soaltee"];

/**
 * /expertise (2026-10-29 rebuild): a technical atlas instead of a rail and
 * a card grid. See ExpertiseAtlas. Server-rendered and static; only the
 * atlas is a client component.
 */
export default function ExpertiseOverviewPage() {
  const disciplines: AtlasDiscipline[] = services.map((s) => {
    const all = getProjectsByService(s.slug);
    const ordered = [...all.filter((p) => SIGNATURE.includes(p.slug)), ...all.filter((p) => !SIGNATURE.includes(p.slug))];
    return {
      slug: s.slug as SystemSlug,
      name: s.name,
      code: s.disciplineCode,
      summary: s.homeSummary,
      description: s.shortDescription,
      systems: s.subServices,
      applications: s.applications,
      photo: PHOTO[s.slug as SystemSlug],
      projects: ordered.slice(0, 4).map((p) => ({ slug: p.slug, name: p.name })),
    };
  });

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Expertise" }]}
        eyebrow="Engineering disciplines"
        heading="Six disciplines. One team accountable for all of them."
        description="HVAC, electrical, public health engineering, fire protection, extra low-voltage and building-systems integration, designed, installed and commissioned as one practice, so how the systems work together never falls between contractors."
      />
      <ExpertiseAtlas disciplines={disciplines} />
      <FinalCTA />
    </>
  );
}
