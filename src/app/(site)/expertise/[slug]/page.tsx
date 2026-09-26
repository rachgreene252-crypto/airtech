import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { services, getServiceBySlug } from "@/content/services";
import { industries, getIndustryBySlug } from "@/content/industries";
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
  const photoProjects = relatedProjects.filter((p) => p.heroImage).slice(0, 3);
  // "Where it's deployed" is common across every discipline — Airtech runs
  // all six as one integrated scope on every project, so the sector list is
  // the same regardless of which discipline you're reading (hospitality first).
  const sectors = industries;

  return (
    <article>
      <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
        Discipline <span className="text-(--color-steel-soft)">/ {service.disciplineCode}</span>
      </p>
      <h2 className="mt-4 font-display text-display-m font-semibold leading-[1.1] tracking-[-0.016em] text-balance">
        {service.name}
      </h2>
      <p className="mt-5 max-w-2xl text-body-l leading-relaxed text-(--color-steel)">
        {service.detailedDescription}
      </p>

      {/* Photography — real project stills where this discipline has a
          sourced hero image, so text-heavy discipline pages carry evidence,
          not just prose. Omitted entirely where no photo is sourced yet
          (elv-security / bms currently have none) rather than padded with a
          stand-in image. */}
      {photoProjects.length > 0 && (
        <section className="mt-12">
          <h3 className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
            Delivered on site
          </h3>
          <div
            className={`mt-4 grid gap-4 ${
              photoProjects.length === 1
                ? "grid-cols-1"
                : photoProjects.length === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-3"
            }`}
          >
            {photoProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}` as Route}
                className="crop-frame group relative block aspect-[4/3] overflow-hidden border border-(--color-line-strong) text-white"
              >
                <span className="crop-tick-tl" />
                <span className="crop-tick-br" />
                <Image
                  src={project.heroImage!.src}
                  alt={project.heroImage!.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-(--color-blue-deep)/85 via-transparent to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 p-4">
                  <span className="font-display text-small font-medium leading-tight">
                    {project.name}
                  </span>
                  {project.location && (
                    <span className="font-mono text-[0.8125rem] uppercase tracking-[0.1em] text-white/70">
                      {project.location}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Capabilities — a scannable grid of quiet cards, not a long plain
          list; each carries a numbered mark and a hairline frame so a
          fact-dense discipline page still reads as designed, not texty. */}
      <section className="mt-14">
        <h3 className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
          What Airtech delivers
        </h3>
        <ol className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {service.capabilities.map((c, i) => (
            <li
              key={c}
              className="flex items-start gap-4 border border-(--color-line) bg-(--color-paper) px-5 py-4 transition-colors hover:border-(--color-brand-blue-soft)"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--color-brand-blue-tint) font-mono text-[0.8125rem] font-medium text-(--color-brand-blue)">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="pt-0.5 text-body leading-relaxed text-(--color-ink-soft)">{c}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Systems within the discipline */}
      {service.subServices.length > 0 && (
        <section className="mt-12">
          <h3 className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
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
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
              Where it&apos;s deployed
            </h3>
            <p className="text-[0.7rem] uppercase tracking-[0.08em] text-(--color-steel-soft)">
              Common across every discipline
            </p>
          </div>
          <ul className="mt-4 border-t border-(--color-line)">
            {sectors.map((sector) => (
              <li key={sector.slug}>
                <Link
                  href={`/projects?industry=${sector.slug}`}
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
        <h3 className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
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
                  <span className="shrink-0 font-mono text-[0.8125rem] uppercase tracking-[0.12em] text-(--color-steel-soft)">
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
          Planning a project that needs {service.name}?
        </p>
        <div className="mt-6">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Enquire
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
