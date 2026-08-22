"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/ui/Container";

/**
 * Section 08 — Featured Projects. Real landmark photography from
 * /public/images/landmarks (sourced from the supplied ASSETS/project hero
 * folder). Names/locations/sectors are limited to what the brochure and
 * client questionnaire already establish — no scope or capacity invented.
 * Cards without an existing case-study route (docs/AIRTECH_OPEN_DECISIONS.md
 * #14 — extended landmark list not yet added to the project database) link
 * to the projects index rather than a fabricated slug.
 */
const PROJECTS = [
  {
    name: "Ncell Iconic Building",
    location: "Kathmandu",
    sector: "Telecom / Corporate",
    image: "/images/landmarks/ncell-iconic-building.jpg",
    href: "/projects/ncell-corporate-office",
  },
  {
    name: "Nepal Mediciti Hospital",
    location: "Lalitpur",
    sector: "Healthcare",
    image: "/images/landmarks/nepal-mediciti-hospital.jpg",
    href: "/projects/nepal-mediciti",
  },
  {
    name: "Tiger Palace Resort",
    location: "Bhairahawa",
    sector: "Hospitality",
    image: "/images/landmarks/tiger-palace-resort.jpg",
    href: "/projects",
  },
  {
    name: "Laxmi Motors KD Plant",
    location: "Parasi",
    sector: "Industrial",
    image: "/images/landmarks/laxmi-motors-kd-plant.jpg",
    href: "/projects/laxmi-motor-corporation",
  },
  {
    name: "CAAN Office Building",
    location: "Kathmandu",
    sector: "Aviation / Corporate",
    image: "/images/landmarks/caan-office-building.jpg",
    href: "/projects/caan-civil-aviation-authority",
  },
  {
    name: "Hyatt Centric",
    location: "Kathmandu",
    sector: "Hospitality",
    image: "/images/landmarks/hyatt-centric.jpg",
    href: "/projects",
  },
  {
    name: "Dusit Princess",
    location: "Kathmandu",
    sector: "Hospitality",
    image: "/images/landmarks/dusit-princess.jpg",
    href: "/projects",
  },
  {
    name: "Skyline Mall",
    location: "Birgunj",
    sector: "Retail",
    image: "/images/landmarks/skyline-mall-birgunj.jpg",
    href: "/projects",
  },
] as const;

export function FeaturedProjects() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 360) + 20;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section className="border-t border-(--color-line) bg-(--color-paper) py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
              Featured Projects
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold leading-[0.98] text-(--color-ink) text-balance">
              See our expertise
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/projects"
              className="text-sm font-medium text-(--color-ink) hover:text-(--color-signal) transition-colors"
            >
              View All Projects →
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous project"
                onClick={() => scrollByCard(-1)}
                className="flex h-10 w-10 items-center justify-center border border-(--color-line-strong) text-(--color-ink) hover:border-(--color-signal) hover:text-(--color-signal) transition-colors"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => scrollByCard(1)}
                className="flex h-10 w-10 items-center justify-center border border-(--color-line-strong) text-(--color-ink) hover:border-(--color-signal) hover:text-(--color-signal) transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-12 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {PROJECTS.map((project) => (
            <Link
              key={project.name}
              data-card
              href={project.href as Route}
              className="group relative shrink-0 snap-start overflow-hidden rounded-[3px] w-[78vw] sm:w-[380px] lg:w-[400px] aspect-[4/5]"
            >
              <Image
                src={project.image}
                alt={`${project.name}, ${project.location}`}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 380px, 78vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-(--color-signal-soft)">
                  {project.sector}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-(--color-paper)">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-(--color-paper)/75">{project.location}</p>
                <span className="mt-4 inline-flex translate-y-2 items-center gap-1.5 text-sm font-medium text-(--color-paper) opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  View Project
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
