import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/ui/Container";
import type { Project } from "@/content/types";
import { ProjectCard } from "./ProjectCard";

/**
 * Image-led spotlight for Airtech's hotel / resort work — the strongest,
 * most visually prominent part of the Projects experience (client brief,
 * hospitality-focus pass). One large lead card, then every other hotel as a
 * card block (2026-09-28: "all projects should come as blocks ... not as a
 * list"). ProjectCard's BluePlaceholder stands in where no photo exists.
 */
function HotelCard({
  project,
  aspect,
  priority,
  diptych,
}: {
  project: Project;
  aspect: string;
  priority?: boolean;
  /** Lead card: hero + first gallery photo side by side, so neither is stretched. */
  diptych?: boolean;
}) {
  const second = diptych ? project.gallery[0] : undefined;
  return (
    <Link
      href={`/projects/${project.slug}` as Route}
      className={`group relative block overflow-hidden rounded-[4px] ${aspect}`}
    >
      {project.heroImage?.src && !second && (
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          fill
          priority={priority}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      )}
      {project.heroImage?.src && second && (
        <div className="absolute inset-0 grid grid-cols-1 gap-1 sm:grid-cols-2">
          {[project.heroImage, second].map((img, i) => (
            <div key={img.src} className={`relative overflow-hidden ${i === 1 ? "hidden sm:block" : ""}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={priority}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          ))}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/45 to-(--color-ink)/5" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue-soft)">
          Hospitality
        </p>
        <h3 className="mt-2 font-display text-2xl font-normal text-white">{project.name}</h3>
        {project.location && <p className="mt-1 text-sm text-white/75">{project.location}</p>}
      </div>
    </Link>
  );
}

// The large lead card. 2026-10-05 client: Hotel Yak & Yeti is now the
// first photo (supersedes the 2026-09-24 "Hyatt Regency leads" request).
const LEAD_SLUG = "hotel-yak-and-yeti";

export function HospitalitySpotlight({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const withPhoto = projects
    .filter((p) => p.heroImage?.src)
    .sort((a, b) => Number(b.slug === LEAD_SLUG) - Number(a.slug === LEAD_SLUG));
  const withoutPhoto = projects.filter((p) => !p.heroImage?.src);
  // Photographed hotels first, then the rest — all as cards.
  const [lead, ...others] = [...withPhoto, ...withoutPhoto];

  return (
    <section className="border-t border-(--color-line) bg-band py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
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
          {lead && <HotelCard project={lead} aspect="aspect-[16/10] sm:aspect-[21/9]" priority diptych={lead.gallery.length > 0} />}
          {others.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((project) => (
                <ProjectCard key={project.slug} project={project} industryName="Hospitality" />
              ))}
            </div>
          )}
        </div>

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
