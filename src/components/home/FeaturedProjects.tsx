"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Section 08 — Featured Projects. Real landmark photography from
 * /public/images/landmarks (sourced from the supplied ASSETS/project hero
 * folder). Names/locations/sectors are limited to what the brochure and
 * client questionnaire already establish — no scope or capacity invented.
 * Cards without an existing case-study route (docs/AIRTECH_OPEN_DECISIONS.md
 * #14 — extended landmark list not yet added to the project database) link
 * to the projects index rather than a fabricated slug. Per the 2026-08-22
 * visual-correction brief: rounded architectural cards, a gentler 4:3 crop
 * (the original portrait 4:5 cut too much off wide building photography),
 * and circular/pill controls instead of square buttons.
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
  const reduceMotion = useReducedMotion();
  const [activeCard, setActiveCard] = useState(0);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 380) + 24;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 380) + 24;
    setActiveCard(Math.round(track.scrollLeft / step));
  }

  return (
    <section className="bg-site-texture py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-brand-blue)">
            Featured Projects
          </p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold leading-[0.98] text-(--color-ink) text-balance">
            See our expertise
          </h2>
          <p className="mx-auto mt-4 max-w-md font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel)">
            {String(activeCard + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          <Link
            href="/projects"
            className="rounded-full border border-(--color-brand-blue) px-5 py-2 text-sm font-medium text-(--color-brand-blue) hover:bg-(--color-brand-blue) hover:text-white transition-colors"
          >
            View All Projects →
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => scrollByCard(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line-strong) text-(--color-ink) hover:border-(--color-brand-blue) hover:text-(--color-brand-blue) transition-colors"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => scrollByCard(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-line-strong) text-(--color-ink) hover:border-(--color-brand-blue) hover:text-(--color-brand-blue) transition-colors"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="mt-12 flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 snap-start"
            >
              <Link
                data-card
                href={project.href as Route}
                className="group relative block overflow-hidden rounded-3xl w-[80vw] sm:w-[400px] lg:w-[430px] aspect-[4/3]"
              >
                <Image
                  src={project.image}
                  alt={`${project.name}, ${project.location}`}
                  fill
                  sizes="(min-width: 1024px) 430px, (min-width: 640px) 400px, 80vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                <span className="absolute left-6 top-6 font-mono text-[11px] tracking-[0.1em] text-(--color-paper)/70 sm:left-7 sm:top-7">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-(--color-signal-soft)">
                    {project.sector}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-(--color-paper)">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-(--color-paper)/75">{project.location}</p>
                  <span className="mt-4 inline-flex translate-y-2 items-center gap-1.5 rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-xs font-medium text-(--color-paper) opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    View Project
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5" aria-hidden="true">
          {PROJECTS.map((project, i) => (
            <span
              key={project.name}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === activeCard ? "w-6 bg-(--color-brand-blue)" : "w-1.5 bg-(--color-line-strong)"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
