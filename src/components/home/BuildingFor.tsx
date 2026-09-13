"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";
import type { IndustrySlug } from "@/content/types";

/**
 * "What are you trying to build?" — a sector index.
 *
 * Rebuilt 2026-09-16 in the same carousel language as the (now-removed)
 * "Selected Work" project carousel, per direct feedback: numbered image
 * cards in a free horizontal scroll track, arrow controls, edge fades. The
 * sourced sector photography here (680-1010px native) sits comfortably
 * under this card's display width, so it reads sharp, not stretched — the
 * blur problem was the old full-width banner treatment, not this size.
 * Pharmaceuticals has no sourced photo, so it gets the honest
 * BluePlaceholder rather than a stand-in image.
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
    descriptor: "Hotels, resorts and luxury developments: Airtech's largest sector by volume of delivered work.",
    photo: { src: "/images/landmarks/tiger-palace-resort.jpg", alt: "Tiger Palace Resort, Bhairahawa" },
  },
  {
    slug: "healthcare",
    label: "Healthcare",
    descriptor: "Hospitals, medical centres and critical environments.",
    photo: { src: "/images/projects/nepal-mediciti-hospital.jpg", alt: "Nepal Mediciti hospital, Lalitpur" },
  },
  {
    slug: "corporate-commercial",
    label: "Commercial",
    descriptor: "Corporate, retail and institutional buildings.",
    photo: { src: "/images/projects/caan-office-building.jpg", alt: "CAAN Office Building, Kathmandu" },
  },
  {
    slug: "telecom-data-centres",
    label: "Mission Critical",
    descriptor: "Telecom, data centres and critical infrastructure.",
    photo: { src: "/images/projects/ncell-iconic-building.jpg", alt: "Ncell Iconic Building, Kathmandu" },
  },
  {
    slug: "industrial",
    label: "Industrial",
    descriptor: "Factories, process facilities and manufacturing.",
    photo: { src: "/images/projects/laxmi-motors-kd-plant.jpg", alt: "Laxmi Motors KD Plant, Parasi" },
  },
  {
    slug: "pharmaceuticals",
    label: "Pharmaceuticals",
    descriptor: "Labs, manufacturing and controlled environments.",
  },
] as const;

function SectorCard({ sector, index }: { sector: (typeof SECTORS)[number]; index: number }) {
  return (
    <Link
      href={`/projects?industry=${sector.slug}` as Route}
      className="group relative block aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden rounded-[4px] transition-shadow duration-300 hover:shadow-[0_20px_40px_-16px_rgba(0,153,218,0.35)] sm:w-[360px] lg:aspect-[4/3] lg:w-[420px]"
    >
      {sector.photo ? (
        <Image
          src={sector.photo.src}
          alt={sector.photo.alt}
          fill
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 78vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <BluePlaceholder />
      )}
      <span className="absolute left-5 top-5 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-white/70">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0">
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/45 to-transparent" />
        <div className="relative p-6">
          <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue-soft)">
            Sector
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-white">{sector.label}</h3>
          <p className="mt-1 max-w-[26ch] text-sm text-white/75">{sector.descriptor}</p>
        </div>
      </div>
    </Link>
  );
}

export function BuildingFor() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setCanScrollLeft(track.scrollLeft > 8);
      setCanScrollRight(track.scrollLeft < track.scrollWidth - track.clientWidth - 8);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function slide(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector("a")?.clientWidth ?? 400;
    track.scrollBy({ left: direction * (cardWidth + 20), behavior: "smooth" });
  }

  return (
    <section className="border-t border-(--color-line) py-14 sm:py-16 lg:py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
                Sectors
              </p>
              <h2 className="mt-5 font-display text-display-l font-semibold leading-[1.08] tracking-[-0.015em] text-(--color-ink) text-balance">
                What are you trying to build?
              </h2>
              <p className="mt-4 text-body-l leading-relaxed text-(--color-steel)">
                Different buildings have different demands, and Airtech engineers to the requirement.
              </p>
            </div>

            <div className="hidden shrink-0 items-center gap-3 sm:flex">
              <button
                type="button"
                onClick={() => slide(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll sectors left"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line-strong) text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue) disabled:opacity-30 disabled:pointer-events-none"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => slide(1)}
                disabled={!canScrollRight}
                aria-label="Scroll sectors right"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line-strong) text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue) disabled:opacity-30 disabled:pointer-events-none"
              >
                →
              </button>
            </div>
          </div>
        </Reveal>
      </Container>

      <div
        className="relative mt-8"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)",
        }}
      >
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto px-5 pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 lg:px-12"
        >
          {SECTORS.map((sector, i) => (
            <SectorCard key={sector.slug} sector={sector} index={i} />
          ))}
          <Link
            href="/industries"
            className="group flex aspect-[4/5] w-[78vw] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-[4px] border border-(--color-line-strong) text-center sm:w-[360px] lg:aspect-[4/3] lg:w-[380px]"
          >
            <span className="font-display text-title font-semibold text-(--color-ink)">All industries</span>
            <span
              aria-hidden="true"
              className="text-(--color-brand-blue) transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
