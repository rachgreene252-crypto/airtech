import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { getFeaturedProjects, getIndustryBySlug, getServiceBySlug } from "@/content";

/**
 * Projects treated as the strongest proof, one at a time — not a card grid.
 * Deliberately restricted to the projects with real, sourced photography
 * (AIPL PROFILE - 2026.pptx, slide 8): a placeholder "photography pending"
 * pattern-fill would undercut the premium, physical feel this section needs.
 * The full 13-project list, including unphotographed entries, still lives on
 * the honest card-grid /projects index — this is the homepage's flagship
 * sequence, not a replacement for that page.
 */
export function ProjectShowcase() {
  const projects = getFeaturedProjects().filter((p) => p.heroImage?.src);

  if (projects.length === 0) return null;

  return (
    <section className="bg-(--color-ink)">
      {projects.map((project, i) => {
        const industry = getIndustryBySlug(project.industrySlug);
        const systems = project.serviceSlugsDelivered
          .map((slug) => getServiceBySlug(slug)?.name)
          .filter((n): n is string => Boolean(n));

        return (
          <div
            key={project.slug}
            className={`relative flex min-h-[92vh] items-end border-t border-(--color-ink-soft) ${i === 0 ? "border-t-0" : ""}`}
          >
            <div className="absolute inset-0">
              <Image
                src={project.heroImage!.src}
                alt={project.heroImage!.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink)/88 from-0% via-(--color-ink)/68 via-52% to-transparent to-70%" />
            </div>

            {i === 0 && (
              <div className="absolute inset-x-0 top-0 z-10 px-5 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-16">
                <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal-soft)">
                  Projects — 04
                </p>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold leading-[0.98] text-(--color-paper) max-w-xl text-balance">
                  Selected work.
                </h2>
              </div>
            )}

            <div className="relative z-10 w-full px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
              <Reveal>
                <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal-soft)">
                  {String(i + 1).padStart(2, "0")} — {industry?.name ?? project.projectType}
                </p>
                <h3 className="mt-4 max-w-3xl font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] text-(--color-paper) text-balance">
                  {project.name}
                </h3>

                <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-(--color-paper)/20 pt-6 max-w-3xl">
                  {project.location && (
                    <div>
                      <dt className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel-soft)">
                        Location
                      </dt>
                      <dd className="mt-1 text-sm text-(--color-paper)/90">{project.location}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel-soft)">
                      Airtech&apos;s Role
                    </dt>
                    <dd className="mt-1 text-sm text-(--color-paper)/90 max-w-xs">{project.airtechRole}</dd>
                  </div>
                  {systems.length > 0 && (
                    <div>
                      <dt className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel-soft)">
                        Systems
                      </dt>
                      <dd className="mt-1 text-sm text-(--color-paper)/90">{systems.join(" · ")}</dd>
                    </div>
                  )}
                </dl>

                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-9 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-signal-soft) hover:gap-2.5 transition-all"
                >
                  View case study
                  <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}
