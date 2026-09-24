import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/ui/Container";
import type { Project } from "@/content/types";

/**
 * Image-led spotlight for Airtech's hotel / resort work — the strongest,
 * most visually prominent part of the Projects experience (client brief,
 * hospitality-focus pass). Projects with an approved photo lead as large
 * cards; the rest follow as a clean index. Uses existing project data only;
 * BluePlaceholder stands in where no approved photo exists.
 */
function HotelCard({
  project,
  aspect,
  priority,
}: {
  project: Project;
  aspect: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}` as Route}
      className={`group relative block overflow-hidden rounded-[4px] ${aspect}`}
    >
      {project.heroImage?.src && (
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          fill
          priority={priority}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/45 to-(--color-ink)/5" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue-soft)">
          Hospitality
        </p>
        <h3 className="mt-2 font-display text-2xl font-normal text-white">{project.name}</h3>
        {project.location && <p className="mt-1 text-sm text-white/75">{project.location}</p>}
      </div>
    </Link>
  );
}

// The large lead card (client request 2026-09-24: Hyatt Regency leads,
// Barahi moves into the smaller row beneath it).
const LEAD_SLUG = "hyatt-regency-kathmandu";

export function HospitalitySpotlight({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const withPhoto = projects
    .filter((p) => p.heroImage?.src)
    .sort((a, b) => Number(b.slug === LEAD_SLUG) - Number(a.slug === LEAD_SLUG));
  const withoutPhoto = projects.filter((p) => !p.heroImage?.src);

  return (
    <section className="border-y border-(--color-line) bg-(--color-paper-raised) py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            Hospitality
          </p>
          <h2 className="mt-5 font-display text-display-l font-semibold leading-[1.08] tracking-[-0.016em] text-(--color-ink) text-balance">
            Hotels and resorts across Nepal.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-body-l leading-relaxed text-(--color-steel)">
            Zone-specific HVAC, electrical, PHE, fire fighting and ELV, delivered
            as one integrated scope for the country&apos;s leading hotel and resort brands.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {withPhoto[0] && (
            <HotelCard project={withPhoto[0]} aspect="aspect-[16/10] sm:aspect-[21/9]" priority />
          )}
          {withPhoto.length > 1 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {withPhoto.slice(1, 4).map((project) => (
                <HotelCard key={project.slug} project={project} aspect="aspect-[4/3]" />
              ))}
            </div>
          )}
        </div>

        {withoutPhoto.length > 0 && (
          <ul className="mx-auto mt-12 max-w-3xl border-t border-(--color-line)">
            {withoutPhoto.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}` as Route}
                  className="group flex items-baseline justify-between gap-4 border-b border-(--color-line) py-4 transition-colors hover:bg-(--color-paper)"
                >
                  <span className="font-display text-body-l font-normal text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                    {project.name}
                  </span>
                  {project.location && (
                    <span className="shrink-0 text-small text-(--color-steel)">{project.location}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 text-center">
          <Link
            href={"/projects?industry=hospitality" as Route}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) transition-all hover:gap-2.5"
          >
            Filter to all hospitality projects
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
