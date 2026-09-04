"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

/**
 * Section 06 — Selected work.
 *
 * Desktop: a GSAP ScrollTrigger horizontal gallery. The section is a tall
 * track; a `position: sticky` viewport pins for its duration (CSS sticky,
 * NOT ScrollTrigger `pin: true` — the pin-spacer div it inserts breaks
 * Next's Cache Components reconciliation, same reason CinematicHero avoids
 * it) while GSAP scrubs the card row sideways in step with vertical scroll.
 *
 * Mobile / reduced-motion: a normal horizontal swipe carousel, no pinning.
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
      className="group relative block aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden rounded-[4px] sm:w-[360px] lg:aspect-[4/3] lg:w-[440px]"
    >
      <Image
        src={project.image}
        alt={`${project.name}, ${project.location}`}
        fill
        sizes="(min-width: 1024px) 440px, (min-width: 640px) 360px, 78vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
      <span className="absolute left-5 top-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white/70">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-0 bottom-0">
        <div className="absolute inset-0 bg-gradient-to-t from-(--color-ink) via-(--color-ink)/45 to-transparent" />
        <div className="relative p-6">
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue-soft)">
            {project.sector}
          </p>
          <h3 className="mt-2 font-display text-2xl font-normal text-white">{project.name}</h3>
          <p className="mt-1 text-sm text-white/75">{project.location}</p>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProjects() {
  const reduceMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!wrapper || !sticky || !track) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const maxX = () => Math.max(0, track.scrollWidth - sticky.clientWidth + 48);
      // The wrapper has to be exactly tall enough for one viewport of pin
      // plus the horizontal travel, or the last card gets clipped / a dead
      // zone opens at the end. Set here (not in CSS) because the travel
      // depends on measured content width; kept in sync on refresh/resize.
      const sizeWrapper = () => {
        wrapper.style.height = window.innerHeight + maxX() + "px";
      };
      sizeWrapper();

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -maxX(),
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => "+=" + maxX(),
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefresh: sizeWrapper,
          },
        });
      }, wrapper);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
      if (wrapper) wrapper.style.height = "";
    };
  }, [reduceMotion]);

  return (
    <section className="border-t border-(--color-line) py-14 sm:py-16 lg:py-0 motion-reduce:lg:py-16">
      {/* lg + motion allowed: a tall track + sticky viewport that GSAP
          scrubs sideways. Reduced-motion (and every smaller screen): a
          plain horizontal swipe carousel — the motion-reduce: overrides
          neutralise the sticky/clip classes purely in CSS, no JS branch. */}
      <div ref={wrapperRef}>
        <div
          ref={stickyRef}
          className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden motion-reduce:lg:static motion-reduce:lg:block motion-reduce:lg:h-auto motion-reduce:lg:overflow-visible"
        >
          <Container className="lg:pb-10 motion-reduce:lg:pb-0">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
                Selected work
              </p>
              <h2 className="mt-5 font-display text-display-l font-normal leading-[1.08] tracking-[-0.012em] text-(--color-ink) text-balance">
                The buildings behind the systems.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-body-l leading-relaxed text-(--color-steel) lg:hidden">
                Hospitality, healthcare, aviation, industry and institutional buildings.
              </p>
            </div>
          </Container>

          <div
            ref={trackRef}
            className="mt-8 flex gap-5 overflow-x-auto px-5 pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 lg:mt-0 lg:overflow-visible lg:px-12 motion-reduce:lg:mt-8 motion-reduce:lg:overflow-x-auto"
          >
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} />
            ))}
            <Link
              href="/projects"
              className="group flex aspect-[4/5] w-[78vw] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-[4px] border border-(--color-line-strong) text-center sm:w-[360px] lg:aspect-[4/3] lg:w-[380px]"
            >
              <span className="font-display text-title font-normal text-(--color-ink)">All projects</span>
              <span
                aria-hidden="true"
                className="text-(--color-brand-blue) transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
