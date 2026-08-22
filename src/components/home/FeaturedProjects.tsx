"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getFeaturedProjects, getIndustryBySlug } from "@/content";

/**
 * Horizontal project carousel — the reference image's information
 * architecture (large image-led cards, sector/name/location, arrow +
 * pagination controls), translated into this site's own restrained visual
 * language: hairline crop-frame corners instead of the reference's heavy
 * rounded cards/drop shadows, matching every other gallery frame on the
 * site. Built on native scroll-snap rather than a carousel dependency — no
 * carousel library exists in package.json and this doesn't need one.
 */
export function FeaturedProjects() {
  const projects = getFeaturedProjects().filter((p) => p.heroImage?.src);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-project-card]");
    const cardWidth = card ? card.offsetWidth + 20 : 360;
    track.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.querySelector<HTMLElement>("[data-project-card]");
      const cardWidth = card ? card.offsetWidth + 20 : 360;
      setActiveIndex(Math.round(track.scrollLeft / cardWidth));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="border-t border-(--color-line) bg-(--color-paper) py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal-soft)">
              Featured Projects — 08
            </p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-normal leading-[0.98] text-(--color-ink) text-balance">
              See our expertise.
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-(--color-signal-soft) hover:gap-2.5 transition-all"
            >
              View All Projects
              <span aria-hidden="true">→</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Previous project"
                className="flex h-10 w-10 items-center justify-center border border-(--color-line-strong) text-(--color-ink) hover:border-(--color-signal) transition-colors"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Next project"
                className="flex h-10 w-10 items-center justify-center border border-(--color-line-strong) text-(--color-ink) hover:border-(--color-signal) transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </Container>

      <div
        ref={trackRef}
        className="mt-12 flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-5 pb-4 sm:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => {
          const industry = getIndustryBySlug(project.industrySlug);
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              data-project-card
              className="group crop-frame relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden text-(--color-line) sm:w-[min(46vw,420px)] lg:w-[min(30vw,400px)]"
            >
              <Image
                src={project.heroImage!.src}
                alt={project.heroImage!.alt}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 400px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink)/92 from-0% via-(--color-ink)/35 via-45% to-transparent to-75%" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-(--color-blueprint)">
                  {industry?.name ?? project.projectType}
                </p>
                <h3 className="mt-2 font-display text-2xl font-normal leading-tight text-(--color-paper)">
                  {project.name}
                </h3>
                {project.location && (
                  <p className="mt-1 text-sm text-(--color-paper)/80">{project.location}</p>
                )}
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-(--color-paper) opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  View Project
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <Container>
        <div className="mt-8 flex items-center justify-center gap-2" role="tablist" aria-label="Project pagination">
          {projects.map((project, i) => (
            <span
              key={project.slug}
              role="tab"
              aria-selected={i === activeIndex}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-(--color-signal)" : "w-1.5 bg-(--color-line-strong)"
              }`}
            />
          ))}
        </div>
        <Link
          href="/projects"
          className="mt-8 flex sm:hidden items-center justify-center gap-1.5 text-sm font-medium text-(--color-signal-soft)"
        >
          View All Projects
          <span aria-hidden="true">→</span>
        </Link>
      </Container>
    </section>
  );
}
