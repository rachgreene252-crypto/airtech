import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { IndustrySlug } from "@/content/types";

/**
 * "What are you trying to build?" — a bright photo-led sector index. Real
 * photography only where sourced (src/content — same set already used on
 * /expertise and /industries); Pharmaceuticals has none yet, so it renders
 * as a clean colour tile instead of a stand-in photo.
 *
 * Redesigned 2026-09-11: was six equal cards in a uniform grid — flagged in
 * review as the default "3-column grid" answer. Hospitality has the
 * strongest photo of the set (Tiger Palace Resort, dusk, real depth and
 * light) and is Airtech's largest sector by volume of work, so it now runs
 * as one full-width featured banner above the rest, instead of being
 * shrunk into the same cell as everything else.
 */
const FEATURED_SECTOR: { slug: IndustrySlug; label: string; descriptor: string; photo: { src: string; alt: string } } = {
  slug: "hospitality",
  label: "Hospitality",
  descriptor: "Hotels · Resorts · Luxury developments — Airtech's largest sector by volume of delivered work.",
  photo: { src: "/images/landmarks/tiger-palace-resort.jpg", alt: "Tiger Palace Resort, Bhairahawa" },
};

const SECTORS: {
  slug: IndustrySlug;
  label: string;
  descriptor: string;
  photo?: { src: string; alt: string };
}[] = [
  {
    slug: "healthcare",
    label: "Healthcare",
    descriptor: "Hospitals · Medical centres · Critical environments",
    photo: { src: "/images/projects/nepal-mediciti-hospital.jpg", alt: "Nepal Mediciti hospital, Lalitpur" },
  },
  {
    slug: "pharmaceuticals",
    label: "Pharmaceuticals",
    descriptor: "Labs · Manufacturing · Controlled environments",
  },
  {
    slug: "industrial",
    label: "Industrial",
    descriptor: "Factories · Process facilities · Manufacturing",
    photo: { src: "/images/projects/laxmi-motors-kd-plant.jpg", alt: "Laxmi Motors KD Plant, Parasi" },
  },
  {
    slug: "corporate-commercial",
    label: "Commercial",
    descriptor: "Corporate · Retail · Institutional",
    photo: { src: "/images/projects/caan-office-building.jpg", alt: "CAAN Office Building, Kathmandu" },
  },
  {
    slug: "telecom-data-centres",
    label: "Mission Critical",
    descriptor: "Telecom · Data centres · Critical infrastructure",
    photo: { src: "/images/projects/ncell-iconic-building.jpg", alt: "Ncell Iconic Building, Kathmandu" },
  },
];

export function BuildingFor() {
  return (
    <section className="border-t border-(--color-line) bg-soft-glow py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
                Sectors
              </p>
              <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.015em] text-(--color-ink) text-balance">
                What are you trying to build?
              </h2>
              <p className="mt-4 max-w-xl text-body-l leading-relaxed text-(--color-steel)">
                Different buildings have different demands. We bring the engineering
                expertise to make them work — safely, efficiently and for the long term.
              </p>
            </div>
            <Link
              href="/industries"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-(--color-brand-blue)"
            >
              Explore all industries
              <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        {/* Featured banner — one exceptional photo run large, not shrunk
            into the same grid cell as everything else. */}
        <Reveal>
          <Link
            href={`/projects?industry=${FEATURED_SECTOR.slug}`}
            className="group relative mt-10 flex aspect-[21/9] w-full flex-col justify-end overflow-hidden border border-(--color-line-strong) transition-shadow duration-300 hover:shadow-[0_28px_60px_-20px_rgba(0,153,218,0.4)] sm:aspect-[3/1]"
          >
            <Image
              src={FEATURED_SECTOR.photo.src}
              alt={FEATURED_SECTOR.photo.alt}
              fill
              sizes="100vw"
              priority={false}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-(--color-blue-deep)/92 via-(--color-blue-deep)/20 to-transparent"
            />
            <div className="relative z-10 flex items-end justify-between gap-6 p-6 sm:p-9">
              <div>
                <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">
                  {FEATURED_SECTOR.label}
                </h3>
                <p className="mt-2 max-w-md text-small text-white/80 sm:text-body">
                  {FEATURED_SECTOR.descriptor}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-(--color-brand-blue)"
              >
                →
              </span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector, i) => (
            <Reveal key={sector.slug} delay={i * 0.05}>
              <Link
                href={`/projects?industry=${sector.slug}`}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden border border-(--color-line-strong) bg-(--color-paper-raised) transition-shadow duration-300 hover:shadow-[0_20px_40px_-16px_rgba(0,153,218,0.35)]"
              >
                {sector.photo ? (
                  <>
                    <Image
                      src={sector.photo.src}
                      alt={sector.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-(--color-blue-deep)/90 via-(--color-blue-deep)/10 to-transparent"
                    />
                  </>
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-(--color-brand-blue-vivid)"
                  />
                )}
                <div className="relative z-10 flex items-center justify-between gap-3 p-5">
                  <div>
                    <h3 className="font-display text-title font-semibold text-white">{sector.label}</h3>
                    <p className="mt-1 text-small text-white/80">{sector.descriptor}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-(--color-brand-blue)"
                  >
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
