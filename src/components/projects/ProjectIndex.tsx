import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/ui/Container";
import type { Industry, Project } from "@/content/types";

/**
 * Every project name in one scannable list, grouped by sector
 * (2026-10-05 client: "incorporate the names of the projects in a list").
 * The photo blocks above stay the main way in; this is the at-a-glance
 * index a consultant can read in ten seconds.
 */
export function ProjectIndex({ projects, industries }: { projects: Project[]; industries: Industry[] }) {
  const groups = industries
    .map((industry) => ({ industry, items: projects.filter((p) => p.industrySlug === industry.slug) }))
    .filter((g) => g.items.length > 0);

  return (
    <section aria-labelledby="project-index-heading" className="border-t border-(--color-line) bg-(--color-paper-raised)">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-end lg:gap-16">
          <div>
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
              Project list
            </p>
            <h2
              id="project-index-heading"
              className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.016em] text-balance text-(--color-ink)"
            >
              <span className="text-(--color-brand-blue)">{projects.length}</span> projects, by sector.
            </h2>
          </div>
          <p className="max-w-xl text-body leading-relaxed text-(--color-steel)">
            Every project in the portfolio by name. Select one to see the building and the systems Airtech
            delivered.
          </p>
        </div>

        <div className="mt-12 columns-1 gap-x-12 sm:columns-2 lg:columns-3">
          {groups.map(({ industry, items }) => (
            <div key={industry.slug} className="mb-10 break-inside-avoid">
              <h3 className="flex items-baseline justify-between border-b-2 border-(--color-brand-blue-vivid) pb-2 font-display text-lg font-semibold text-(--color-ink)">
                <Link
                  href={`/projects?industry=${industry.slug}` as Route}
                  className="transition-colors hover:text-(--color-brand-blue)"
                >
                  {industry.name}
                </Link>
                <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-(--color-steel-soft)">
                  {String(items.length).padStart(2, "0")}
                </span>
              </h3>
              <ul>
                {items.map((p) => (
                  <li key={p.slug} className="border-b border-(--color-line)">
                    <Link
                      href={`/projects/${p.slug}` as Route}
                      className="group flex items-baseline justify-between gap-4 py-2.5"
                    >
                      <span className="text-body text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                        {p.name}
                        {p.projectStatus === "ongoing" && (
                          <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-(--color-brand-blue)">
                            Ongoing
                          </span>
                        )}
                      </span>
                      {p.location && (
                        <span className="shrink-0 text-small text-(--color-steel)">{p.location.split(",").pop()?.trim()}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
