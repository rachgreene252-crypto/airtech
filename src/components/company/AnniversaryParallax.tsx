"use client";

import { useRef } from "react";
import Image from "@/components/ui/Image";
import { useScrollGsap } from "@/components/motion/useScrollGsap";

const PHOTOS = [
  { src: "/images/team/anniversary-stage.jpg", alt: "Airtech's leadership on stage under the '25 years of legacy, built together' backdrop", cls: "col-span-12 aspect-[16/9] lg:col-span-7", speed: -6 },
  { src: "/images/team/anniversary-md-address.jpg", alt: "The Managing Director addressing the team at the anniversary", cls: "col-span-6 aspect-[4/3] lg:col-span-5 lg:mt-24", speed: 14 },
  { src: "/images/team/anniversary-cake.jpg", alt: "Cutting the 25th-anniversary cake", cls: "col-span-6 aspect-[4/5] lg:col-span-4 lg:col-start-2 lg:-mt-10", speed: 10 },
  { src: "/images/team/anniversary-hall.jpg", alt: "The anniversary celebration hall", cls: "col-span-12 aspect-[16/9] lg:col-span-6 lg:mt-10", speed: -10 },
];

/**
 * The 25th anniversary (2026-10-07): a giant outlined "RELIABILITY MATTERS"
 * line runs across the section while the client's event photographs drift
 * at different speeds as the visitor scrolls.
 */
export function AnniversaryParallax() {
  const ref = useRef<HTMLElement>(null);

  useScrollGsap(ref, (gsap) => {
    gsap.utils.toArray<HTMLElement>(ref.current!.querySelectorAll("[data-speed]")).forEach((el) => {
      const speed = Number(el.dataset.speed);
      gsap.fromTo(el, { yPercent: speed }, { yPercent: -speed, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
    });
    gsap.fromTo(
      ref.current!.querySelector("[data-line]"),
      { xPercent: 5 },
      { xPercent: -30, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } }
    );
  });

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-(--color-blue-deep) py-20 text-white sm:py-28">
      <div aria-hidden="true" className="absolute -bottom-40 -left-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-(--color-brand-blue)/35 blur-[120px]" />
      <p
        data-line
        aria-hidden="true"
        className="pointer-events-none whitespace-nowrap font-display text-[16vw] leading-none font-bold tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_rgba(80,189,241,0.45)]"
      >
        Reliability matters · Reliability matters
      </p>

      <div className="mx-auto mt-6 w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue-soft)">2000 — 2025</p>
            <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.04] text-balance">25 years of legacy, built together.</h2>
          </div>
          <p className="max-w-md text-body-l leading-relaxed text-white/75 lg:justify-self-end">
            In 2025 the whole Airtech team came together to mark a quarter-century under the banner the
            company was built on.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-12 gap-4 sm:gap-6">
          {PHOTOS.map((p) => (
            <div key={p.src} className={p.cls}>
              <div data-speed={p.speed} className="relative h-full w-full overflow-hidden rounded-[6px] will-change-transform">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-center" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
