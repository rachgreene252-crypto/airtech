"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 06 — Selected work.
 *
 * Rebuilt 2026-09-10: was a GSAP-pinned horizontal scroll-jack (vertical
 * scroll drove the card row, forcing the visitor through every card before
 * the page would continue down). Client feedback: a visitor should be able
 * to keep scrolling past this section freely, and slide the row themselves
 * only if they want to — so this is now a plain, un-pinned horizontal
 * carousel: native drag/swipe/scroll on the row, optional arrow buttons,
 * edge fades (mask-image) so it reads as "more to see" rather than a hard
 * crop. Vertical page scroll is never intercepted.
 *
 * Names/locations/sectors are limited to what the brochure and questionnaire
 * establish — no scope or capacity invented.
 */
const PROJECTS = [
  { name: "Ncell Iconic Building", location: "Kathmandu", sector: "Telecom / Corporate", image: "/images/landmarks/ncell-iconic-building.jpg", href: "/projects/ncell-corporate-office" },
  { name: "Nepal Mediciti Hospital", location: "Lalitpur", sector: "Healthcare", image: "/images/landmarks/nepal-mediciti-hospital.jpg", href: "/projects/nepal-mediciti" },
  { name: "Tiger Palace Resort", location: "Bhairahawa", sector: "Hospitality", image: "/images/landmarks/tiger-palace-resort.jpg", href: "/projects/tiger-palace-resort" },
  { name: "Laxmi Motors KD Plant", location: "Parasi", sector: "Industrial", image: "/images/landmarks/laxmi-motors-kd-plant.jpg", href: "/projects/laxmi-motor-corporation" },
  { name: "CAAN Office Building", location: "Kathmandu", sector: "Aviation / Corporate", image: "/images/landmarks/caan-office-building.jpg", href: "/projects/caan-civil-aviation-authority" },
  { name: "Hyatt Centric", location: "Kathmandu", sector: "Hospitality", image: "/images/landmarks/hyatt-centric.jpg", href: "/projects/hyatt-centric" },
  { name: "Dusit Princess", location: "Kathmandu", sector: "Hospitality", image: "/images/landmarks/dusit-princess.jpg", href: "/projects/dusit-princess" },
  { name: "Skyline Mall", location: "Birgunj", sector: "Retail", image: "/images/landmarks/skyline-mall-birgunj.jpg", href: "/projects/skyline-mall-birgunj" },
] as const;

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  return (
    <Link
      href={project.href as Route}
      className="group relative block aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden rounded-[4px] sm:w-[360px] lg:aspect-[4/3] lg:w-[420px]"
    >
      <Image
        src={project.image}
        alt={`${project.name}, ${project.location}`}
        fill
        sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 78vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
      <span className="absolute left-5 top-5 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-white/70">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0">
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/45 to-transparent" />
        <div className="relative p-6">
          <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue-soft)">
            {project.sector}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-white">{project.name}</h3>
          <p className="mt-1 text-sm text-white/75">{project.location}</p>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProjects() {
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
                Selected work
              </p>
              <h2 className="mt-5 font-display text-display-l font-semibold leading-[1.08] tracking-[-0.015em] text-(--color-ink) text-balance">
                The buildings behind the systems.
              </h2>
              <p className="mt-4 text-body-l leading-relaxed text-(--color-steel)">
                Hospitality, healthcare, aviation, industry and institutional buildings.
              </p>
            </div>

            {/* Arrow controls — reference pattern: circular buttons, disabled
                at each end rather than hidden, so the row's extent is always
                legible. */}
            <div className="hidden shrink-0 items-center gap-3 sm:flex">
              <button
                type="button"
                onClick={() => slide(-1)}
                disabled={!canScrollLeft}
                aria-label="Scroll projects left"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line-strong) text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue) disabled:opacity-30 disabled:pointer-events-none"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => slide(1)}
                disabled={!canScrollRight}
                aria-label="Scroll projects right"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line-strong) text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue) disabled:opacity-30 disabled:pointer-events-none"
              >
                →
              </button>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Edge fades — mask-image, not a solid overlay, so the crop reads as
          "more to see" rather than a hard cut. */}
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
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
          <Link
            href="/projects"
            className="group flex aspect-[4/5] w-[78vw] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-[4px] border border-(--color-line-strong) text-center sm:w-[360px] lg:aspect-[4/3] lg:w-[380px]"
          >
            <span className="font-display text-title font-semibold text-(--color-ink)">All projects</span>
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
