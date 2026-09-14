import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getProjectBySlug } from "@/content/projects";
import { getIndustryBySlug } from "@/content/industries";

/**
 * "Selected work" — named, real projects on the homepage.
 *
 * Added 2026-09-14 per "enhance the UI even more": SystemsReveal explains
 * what Airtech does, but nothing on the homepage itself names a specific
 * building it's been done on — BuildingFor's carousel is deliberately
 * sector-first (a client-directed redesign, see commit b1cdbc3), so it
 * labels its photos by industry, not by project. This section is the
 * project-first counterpart: three landmark projects, by name, each
 * linking straight to its case study. Airtech, projects and technical
 * capability are the proof, not corporate adjectives, per
 * airtech-digital-experience skill §1.
 *
 * Only the three highest-resolution sourced hero photos are used here
 * (2400x1088, 1400x686, 872x654) — this section runs large, so the
 * smaller/softer landmark photos (Hyatt Centric, Skyline Mall, etc.) are
 * deliberately left for the denser /projects grid instead, per the
 * "high quality images only" standard and the airtech-visual-art-direction
 * skill's "reject mediocre imagery outright."
 */
const SLUGS = ["dusit-princess", "ncell-corporate-office", "caan-civil-aviation-authority"] as const;

export function LandmarkProjects() {
  const items = SLUGS.map((slug) => getProjectBySlug(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p?.heroImage)
  );
  if (items.length === 0) return null;

  return (
    <section className="border-t border-(--color-line) py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
                Selected work
              </p>
              <h2 className="mt-5 font-display text-display-l font-semibold leading-[1.08] tracking-[-0.015em] text-(--color-ink) text-balance">
                Buildings running on Airtech-engineered systems.
              </h2>
              <p className="mt-4 text-body-l leading-relaxed text-(--color-steel)">
                A small selection of the 29 projects in Airtech&apos;s portfolio.
              </p>
            </div>
            <Link
              href="/projects"
              className="shrink-0 text-sm font-medium text-(--color-ink-soft) underline-offset-4 transition-colors hover:text-(--color-brand-blue) hover:underline"
            >
              View all projects →
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {items.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} industryName={getIndustryBySlug(project.industrySlug)?.name} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
