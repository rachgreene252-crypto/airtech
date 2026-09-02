import type { Metadata } from "next";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { services, getServiceBySlug } from "@/content/services";
import { getIndustryBySlug } from "@/content/industries";
import { getProjectsByService } from "@/content/projects";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/expertise/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.seo.title, description: service.seo.description };
}

/**
 * A single discipline, rendered as the right-hand panel inside the shared
 * Expertise layout (the page header + rail come from expertise/layout.tsx).
 * No hero section of its own — switching disciplines swaps only this panel.
 */
export default async function ServiceDetailPage({ params }: PageProps<"/expertise/[slug]">) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedProjects = getProjectsByService(service.slug).slice(0, 6);
  const sectors = service.relatedIndustrySlugs
    .map((s) => getIndustryBySlug(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <article>
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
        Discipline <span className="text-(--color-steel-soft)">/ {service.disciplineCode}</span>
      </p>
      <h2 className="mt-4 font-display text-display-m font-normal leading-[1.1] tracking-[-0.012em] text-balance">
        {service.name}
      </h2>
      <p className="mt-5 max-w-2xl text-body-l leading-relaxed text-(--color-steel)">
        {service.detailedDescription}
      </p>

      {/* Capabilities */}
      <section className="mt-12">
        <h3 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
          What Airtech delivers
        </h3>
        <ol className="mt-4 border-t border-(--color-line)">
          {service.capabilities.map((c, i) => (
            <li
              key={c}
              className="flex items-baseline gap-5 border-b border-(--color-line) py-4"
            >
              <span className="font-mono text-xs text-(--color-brand-blue)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-body leading-relaxed text-(--color-ink-soft)">{c}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Systems within the discipline */}
      {service.subServices.length > 0 && (
        <section className="mt-12">
          <h3 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
            Systems within this discipline
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {service.subServices.map((s) => (
              <li
                key={s}
                className="border border-(--color-line-strong) px-3 py-1.5 text-small text-(--color-ink-soft)"
              >
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Sectors */}
      {sectors.length > 0 && (
        <section className="mt-12">
          <h3 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
            Where it&apos;s deployed
          </h3>
          <ul className="mt-4 border-t border-(--color-line)">
            {sectors.map((sector) => (
              <li key={sector.slug}>
                <Link
                  href={`/industries/${sector.slug}` as Route}
                  className="group flex items-center justify-between gap-4 border-b border-(--color-line) py-4 transition-colors hover:bg-(--color-paper-raised)"
                >
                  <span className="font-display text-body font-normal text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                    {sector.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-(--color-brand-blue) transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related projects */}
      <section className="mt-12">
        <h3 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
          Where this discipline has been delivered
        </h3>
        {relatedProjects.length > 0 ? (
          <ul className="mt-4 border-t border-(--color-line)">
            {relatedProjects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}` as Route}
                  className="group flex items-baseline justify-between gap-4 border-b border-(--color-line) py-4 transition-colors hover:bg-(--color-paper-raised)"
                >
                  <span className="font-display text-body font-normal text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                    {project.name}
                  </span>
                  <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-(--color-steel-soft)">
                    {getIndustryBySlug(project.industrySlug)?.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 border-t border-(--color-line) pt-4 text-small text-(--color-steel)">
            Project documentation for this discipline is being confirmed for publication.
          </p>
        )}
      </section>

      <div className="mt-14 border-t border-(--color-line) pt-10">
        <p className="font-display text-title font-normal text-balance">
          Planning a project that needs {service.name.toLowerCase()}?
        </p>
        <div className="mt-6">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Discuss your project
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
