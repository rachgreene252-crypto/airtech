"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "@/components/ui/Image";
import { Container } from "@/components/ui/Container";
import { journeySteps } from "@/content/journey";
import { cn } from "@/lib/cn";

/**
 * 02 — HOW WE DELIVER (rebuilt 2026-10-29).
 *
 * The old version reused section 01's layout (tab list beside the building
 * drawing) and read as the same section twice. This is a different object
 * entirely: a photograph-led narrative on a white ground (light, per the
 * client's "no dark blue block" feedback). The stage copy scrolls on the
 * right; on the left a pinned frame shows the real site photograph for the
 * stage being read, with its caption, a stage counter and a progress rail.
 * Plain scrolling drives it (IntersectionObserver), with no scroll
 * hijacking. Small screens get each stage as its own photo-and-text block.
 *
 * Stage text: src/content/journey.ts (shared with /how-we-work), stage
 * names per the brief. Photographs are Airtech's own site and office
 * photography from published projects; captions say only what the
 * photograph shows.
 */
const STAGES = [
  {
    title: "Understanding the project",
    photo: { src: "/images/team/team-showroom-meeting.jpg", alt: "Airtech engineers in a project meeting, air-conditioning units on the wall behind them" },
    caption: "Project meeting · Airtech",
  },
  {
    title: "Engineering and system design",
    photo: { src: "/images/team/team-strategy-meeting.jpg", alt: "Airtech's engineering team reviewing a project schedule on screen" },
    caption: "Engineering review · Airtech",
  },
  {
    title: "Equipment selection and procurement",
    photo: { src: "/images/projects/jai-nepal-cinema-5.jpg", alt: "VRF outdoor units set on steel stands in the plant area at Jai Nepal Cinema" },
    caption: "VRF outdoor units · Jai Nepal Cinema",
    href: "/projects/jai-nepal-cinema",
  },
  {
    title: "Coordinated installation",
    photo: { src: "/images/projects/club-nova-5.jpg", alt: "An indoor unit and insulated ductwork installed above the ceiling at Club NOVA" },
    caption: "Indoor unit and ductwork · Club NOVA",
    href: "/projects/club-nova",
  },
  {
    title: "Testing and commissioning",
    photo: { src: "/images/projects/golyan-tower-5.jpg", alt: "Rooftop outdoor units and red fire-fighting pipework at Golyan Tower" },
    caption: "Rooftop plant and fire pipework · Golyan Tower",
    href: "/projects/golyan-tower",
  },
  {
    title: "After-sales support and maintenance",
    photo: { src: "/images/projects/jai-nepal-cinema-2.jpg", alt: "Visitors in the air-conditioned lobby of Jai Nepal Cinema" },
    caption: "In daily operation · Jai Nepal Cinema",
    href: "/projects/jai-nepal-cinema",
  },
] as const;

export function DeliveryJourney() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.stage));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const steps = journeySteps.slice(0, STAGES.length);

  return (
    <section
      id="how-we-deliver"
      aria-labelledby="delivery-heading"
      className="relative border-t border-(--color-line) bg-white text-(--color-ink)"
    >
      <Container className="pt-20 sm:pt-24 lg:pt-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
              02 · How we deliver
            </p>
            <h2
              id="delivery-heading"
              className="mt-4 max-w-[18ch] font-display text-display-xl font-semibold leading-[1.04] tracking-[-0.022em] text-balance"
            >
              One team, from the first brief to years after handover.
            </h2>
          </div>
          <p className="max-w-md text-body-l leading-relaxed text-(--color-steel) lg:col-span-5">
            Six stages, one accountable engineering partner. Follow a project from the first site
            conversation to the maintenance visits that keep it running.
          </p>
        </div>

        {/* Stage index, doubling as the progress indicator */}
        <ol className="mt-12 hidden grid-cols-6 gap-3 lg:grid" aria-label="Delivery stages">
          {STAGES.map((s, i) => (
            <li key={s.title}>
              <a
                href={`#stage-${i + 1}`}
                className="group block pt-3 outline-offset-4"
                aria-current={i === active ? "step" : undefined}
              >
                <span className="relative block h-[2px] overflow-hidden bg-(--color-line)">
                  <span
                    className={cn(
                      "absolute inset-0 origin-left bg-(--color-brand-blue-vivid) transition-transform duration-500",
                      i <= active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </span>
                <span className={cn("mt-3 block font-mono text-[0.75rem] tracking-[0.14em] transition-colors", i === active ? "text-(--color-brand-blue)" : "text-(--color-steel) group-hover:text-(--color-ink)")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn("mt-1 block text-small leading-snug transition-colors", i === active ? "font-semibold text-(--color-ink)" : "text-(--color-steel) group-hover:text-(--color-ink)")}>
                  {s.title}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="pb-20 sm:pb-24 lg:pb-16">
        <div className="mt-12 grid gap-14 lg:mt-6 lg:grid-cols-12 lg:gap-12">
          {/* Pinned photograph (lg+) */}
          <div className="hidden lg:col-span-7 lg:block">
            <div className="sticky top-24 h-[calc(100svh-8rem)] max-h-[46rem] py-6">
              <figure className="relative h-full overflow-hidden rounded-[3px] bg-(--color-paper-raised)">
                {STAGES.map((s, i) => (
                  <div
                    key={s.photo.src}
                    aria-hidden={i !== active}
                    className={cn(
                      "absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                    )}
                  >
                    <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width: 1024px) 56vw, 1px" className="object-cover" />
                  </div>
                ))}
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span aria-hidden="true" className="absolute left-0 top-0 bg-white px-5 pb-3 pt-4 font-display text-[3rem] font-semibold leading-none tracking-[-0.04em] text-(--color-brand-blue-vivid) tabular-nums">
                  {String(active + 1).padStart(2, "0")}
                  <span className="text-[1rem] tracking-normal text-(--color-steel)"> / 06</span>
                </span>
                <figcaption className="absolute inset-x-6 bottom-5 flex items-center justify-between gap-4 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-white/85">
                  <span>{STAGES[active].caption}</span>
                  <span className="text-white/60">Site photograph</span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Stage narrative */}
          <ol className="lg:col-span-5">
            {STAGES.map((s, i) => {
              const step = steps[i];
              const on = i === active;
              return (
                <li
                  key={s.title}
                  id={`stage-${i + 1}`}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  data-stage={i}
                  className="scroll-mt-28 border-t border-(--color-line) py-10 first:border-t-0 lg:flex lg:min-h-[64svh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0"
                >
                  <div className={cn("transition-opacity duration-500 lg:opacity-40", on && "lg:opacity-100")}>
                    <figure className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[3px] lg:hidden">
                      <Image src={s.photo.src} alt={s.photo.alt} fill sizes="(min-width: 640px) 90vw, 100vw" className="object-cover" />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-10 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-white/90">
                        {s.caption}
                      </figcaption>
                    </figure>
                    <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-(--color-brand-blue)">
                      Stage {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-display text-display-m font-semibold leading-[1.1] tracking-[-0.012em]">
                      {s.title}
                    </h3>
                    {step && (
                      <>
                        <p className="mt-4 text-body-l leading-relaxed text-(--color-steel)">
                          {step.sentence} {step.description}
                        </p>
                        <ul className="mt-6 border-t border-(--color-line)">
                          {step.points.map((pt) => (
                            <li key={pt} className="flex items-center gap-3 border-b border-(--color-line) py-2.5 text-body text-(--color-ink-soft)">
                              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand-blue-vivid)" />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    {"href" in s && (
                      <Link
                        href={s.href}
                        className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--color-brand-blue) hover:underline"
                      >
                        See the project <span aria-hidden="true">&rarr;</span>
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-(--color-line) pt-8 lg:mt-0">
          <Link
            href="/how-we-work"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--color-brand-blue) hover:underline"
          >
            The full delivery process <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/service-support"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-(--color-ink-soft) hover:text-(--color-brand-blue)"
          >
            Service, AMC and support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
