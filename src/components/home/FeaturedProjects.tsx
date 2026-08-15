import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechnicalFrame } from "@/components/ui/TechnicalFrame";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { getFeaturedProjects, getIndustryBySlug } from "@/content";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();
  if (featured.length === 0) return null;

  return (
    <Section tone="raised">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader
          eyebrow="Projects — 02"
          heading="Selected work."
          description="A representative cross-section of Airtech's engineering scope. Full case-study detail is being expanded as project documentation is confirmed."
        />
        <ButtonLink href="/projects" variant="secondary" className="shrink-0">
          All projects
        </ButtonLink>
      </div>

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        {featured.map((project, i) => {
          const industry = getIndustryBySlug(project.industrySlug);
          return (
            <Reveal key={project.slug} delay={(i % 3) * 0.08}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <TechnicalFrame
                  image={project.heroImage}
                  label={project.name}
                  aspect="aspect-[4/3]"
                  showCaption={false}
                />
                <div className="mt-4">
                  <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-(--color-signal)">
                    {industry?.name ?? project.projectType}
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl font-semibold leading-tight group-hover:text-(--color-blueprint) transition-colors">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-sm text-(--color-steel)">
                    {project.location} · {project.airtechRole}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
