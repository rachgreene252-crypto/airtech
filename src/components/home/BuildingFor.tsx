import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";
import type { IndustrySlug } from "@/content/types";

/**
 * "What are you trying to build?" — a sector index.
 *
 * Redesigned 2026-09-13, replacing the 2026-09-11 version (a full-width
 * photo banner + a grid of large aspect-[4/3] cards), which read as too
 * big and bland once built: the sourced sector photography here tops out
 * around 700-1000px wide, so blowing any of it up into a banner or a large
 * card upscaled it into visible softness — exactly the "bad quality image"
 * failure the art-direction skill warns against. The fix isn't a better
 * photo (none exists yet for most of these), it's the right display size:
 * a small, fixed-width crop-frame thumbnail — the same treatment already
 * proven on /industries — shows every sourced photo at roughly its native
 * resolution, so it reads sharp instead of stretched. Pharmaceuticals has
 * no sourced photo at all, so it gets the honest BluePlaceholder rather
 * than a stand-in image.
 */
const SECTORS: {
  slug: IndustrySlug;
  label: string;
  descriptor: string;
  photo?: { src: string; alt: string };
}[] = [
  {
    slug: "hospitality",
    label: "Hospitality",
    descriptor: "Hotels · Resorts · Luxury developments — Airtech's largest sector by volume of delivered work.",
    photo: { src: "/images/landmarks/tiger-palace-resort.jpg", alt: "Tiger Palace Resort, Bhairahawa" },
  },
  {
    slug: "healthcare",
    label: "Healthcare",
    descriptor: "Hospitals · Medical centres · Critical environments",
    photo: { src: "/images/projects/nepal-mediciti-hospital.jpg", alt: "Nepal Mediciti hospital, Lalitpur" },
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
  {
    slug: "industrial",
    label: "Industrial",
    descriptor: "Factories · Process facilities · Manufacturing",
    photo: { src: "/images/projects/laxmi-motors-kd-plant.jpg", alt: "Laxmi Motors KD Plant, Parasi" },
  },
  {
    slug: "pharmaceuticals",
    label: "Pharmaceuticals",
    descriptor: "Labs · Manufacturing · Controlled environments",
  },
];

export function BuildingFor() {
  return (
    <section className="border-t border-(--color-line) py-14 sm:py-16 lg:py-20">
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

        <div className="mt-8 border-t border-(--color-line)">
          {SECTORS.map((sector, i) => (
            <Reveal key={sector.slug} delay={i * 0.03}>
              <Link
                href={`/projects?industry=${sector.slug}`}
                className="group grid grid-cols-[92px_1fr_auto] items-center gap-5 border-b border-(--color-line) py-5 transition-colors hover:bg-(--color-paper-raised) sm:grid-cols-[120px_1fr_auto] sm:gap-8 sm:py-6"
              >
                <div className="crop-frame relative aspect-[4/3] w-full overflow-hidden border border-(--color-line-strong) text-(--color-brand-blue)">
                  <span className="crop-tick-tl" />
                  <span className="crop-tick-br" />
                  {sector.photo ? (
                    <Image
                      src={sector.photo.src}
                      alt={sector.photo.alt}
                      fill
                      sizes="120px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <BluePlaceholder />
                  )}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold leading-tight text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue) sm:text-2xl">
                    {sector.label}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-small text-(--color-steel) leading-relaxed">
                    {sector.descriptor}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-(--color-line-strong) text-(--color-brand-blue) transition-all duration-300 group-hover:translate-x-1 group-hover:border-(--color-brand-blue) group-hover:bg-(--color-brand-blue) group-hover:text-white sm:flex"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
