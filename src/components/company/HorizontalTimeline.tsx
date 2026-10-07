"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollGsap } from "@/components/motion/useScrollGsap";

export type Milestone = {
  year: string;
  title: string;
  body: string;
  image?: { src: string; alt: string };
};

/**
 * 25 years as a sideways journey (2026-10-07). On desktop the section pins
 * and the milestones slide past horizontally as the visitor scrolls down,
 * each year set huge, with a progress rail along the top. On phones and for
 * reduced motion it is a plain vertical list.
 */
export function HorizontalTimeline({ milestones }: { milestones: Milestone[] }) {
  const ref = useRef<HTMLElement>(null);

  useScrollGsap(
    ref,
    (gsap) => {
      const track = ref.current!.querySelector<HTMLElement>("[data-track]")!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top+=72",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      gsap.fromTo(
        ref.current!.querySelector("[data-progress]"),
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top+=72", end: () => `+=${distance()}`, scrub: 0.6 } }
      );
      // Years drift a little faster than their panels for depth.
      gsap.utils.toArray<HTMLElement>(ref.current!.querySelectorAll("[data-year]")).forEach((el) => {
        gsap.fromTo(
          el,
          { x: 60 },
          { x: -30, ease: "none", scrollTrigger: { trigger: el, containerAnimation: tween, start: "left right", end: "right left", scrub: true } }
        );
      });
    },
    1024
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-(--color-paper) py-20 lg:flex lg:h-[calc(100svh-4.5rem)] lg:flex-col lg:justify-center lg:py-0">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">Our journey</p>
            <h2 className="mt-3 font-display text-display-l font-semibold leading-[1.04] text-(--color-ink)">25 years, one direction.</h2>
          </div>
          <Link href="/company/history" className="hidden text-sm font-medium text-(--color-brand-blue) hover:underline sm:inline">
            Full history &rarr;
          </Link>
        </div>
        <div className="relative mt-8 hidden h-0.5 bg-(--color-line) lg:block">
          <span data-progress className="absolute inset-0 origin-left bg-(--color-brand-blue-vivid)" />
        </div>
      </div>

      <div
        data-track
        className="mt-10 flex flex-col gap-12 px-5 sm:px-8 lg:mt-10 lg:w-max lg:flex-row lg:gap-0 lg:pr-[10vw] lg:pl-[max(3rem,calc((100vw-1320px)/2+3rem))]"
      >
        {milestones.map((m, i) => (
          <article key={m.year} className={`relative lg:shrink-0 lg:pr-20 ${m.image ? "lg:w-[64vw] lg:max-w-[60rem]" : "lg:w-[34vw] lg:max-w-[30rem]"}`}>
            <div className={`grid grid-cols-1 gap-6 lg:items-end lg:gap-12 ${m.image ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : ""}`}>
              <div>
                <p
                  data-year
                  className="font-display text-[5rem] leading-[0.82] font-bold tracking-[-0.06em] text-(--color-brand-blue) sm:text-[7rem] lg:text-[8rem]"
                >
                  {m.year}
                </p>
                <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-(--color-steel-soft)">
                  {String(i + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-[1.625rem] leading-tight font-semibold tracking-[-0.015em] text-(--color-ink)">{m.title}</h3>
                <p className="mt-3 max-w-sm text-body leading-relaxed text-(--color-steel)">{m.body}</p>
              </div>
              {m.image ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] shadow-[0_30px_60px_-36px_rgba(5,29,43,0.55)]">
                  <Image src={m.image.src} alt={m.image.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover object-center" />
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
