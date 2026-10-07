"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { useScrollGsap } from "@/components/motion/useScrollGsap";

export type HeroStat = { value: string; label: string };

/**
 * /company opening (2026-10-07, "still very boring and simple").
 *
 * On desktop the page opens on a giant "25" knocked out of a paper-white
 * sheet: the 25th-anniversary team photo shows through the numerals. As the
 * visitor scrolls, a window opens from between the digits until the whole
 * team fills the screen, then the headline and the company's numbers land
 * on top. The paper sheet uses `mix-blend-mode: screen`, so anything drawn
 * in black on it becomes a window onto the photo.
 *
 * Phones and reduced-motion visitors get the finished state directly (the
 * motion-safe / md variants below), with no pinned scroll.
 */
export function CompanyHero({ stats, careersHref }: { stats: HeroStat[]; careersHref: Route }) {
  const ref = useRef<HTMLElement>(null);

  useScrollGsap(ref, (gsap) => {
    const q = gsap.utils.selector(ref);
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
    });
    tl.fromTo(q("[data-photo]"), { scale: 1.22 }, { scale: 1, duration: 1 }, 0)
      .to(q("[data-intro]"), { opacity: 0, y: -40, duration: 0.18 }, 0)
      .fromTo(q("[data-digits]"), { scale: 1 }, { scale: 1.9, duration: 0.5 }, 0)
      .fromTo(q("[data-window]"), { scaleX: 0, scaleY: 0.06 }, { scaleX: 1, scaleY: 0.06, duration: 0.22 }, 0.06)
      .to(q("[data-window]"), { scaleY: 1, duration: 0.26 }, 0.28)
      .to(q("[data-mask]"), { opacity: 0, duration: 0.08 }, 0.52)
      .fromTo(q("[data-shade]"), { opacity: 0 }, { opacity: 1, duration: 0.18 }, 0.5)
      .fromTo(q("[data-content]"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.22 }, 0.62)
      .fromTo(q("[data-stat]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.14 }, 0.74)
      .to({}, { duration: 0.12 });
  });

  return (
    <section ref={ref} className="relative bg-(--color-blue-deep) md:motion-safe:h-[300vh]">
      <div className="relative flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden md:h-[calc(100svh-4.5rem)] md:min-h-[600px] md:motion-safe:sticky md:motion-safe:top-18">
        <div data-photo className="absolute inset-0 will-change-transform">
          <Image
            src="/images/team/anniversary-team.jpg"
            alt="The Airtech team gathered for the company's 25th anniversary"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_60%]"
          />
        </div>
        <div
          data-shade
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,29,43,0.3)_0%,rgba(5,29,43,0.45)_30%,rgba(5,29,43,0.88)_58%,rgba(5,29,43,0.97)_100%)] md:motion-safe:opacity-0"
        />

        {/* The paper sheet with the "25" window (desktop, motion only). */}
        <div
          data-mask
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden items-center justify-center overflow-hidden bg-(--color-paper) mix-blend-screen md:motion-safe:flex"
        >
          <span
            data-digits
            className="select-none font-display text-[min(62vh,44vw)] leading-[0.8] font-bold tracking-[-0.07em] text-black will-change-transform"
          >
            25
          </span>
          <span data-window className="absolute inset-0 origin-center bg-black will-change-transform" style={{ transform: "scale(0, 0.06)" }} />
        </div>

        <div data-intro aria-hidden="true" className="pointer-events-none absolute inset-0 hidden flex-col items-center justify-between py-10 md:motion-safe:flex">
          <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.3em] text-(--color-brand-blue)">
            Airtech Industries · 2000 — 2025
          </p>
          <div className="flex flex-col items-center gap-3">
            <p className="font-display text-2xl font-semibold tracking-[-0.01em] text-(--color-ink)">
              years of <span className="text-(--color-brand-blue)">reliability</span>.
            </p>
            <span className="flex flex-col items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.3em] text-(--color-steel)">
              Scroll
              <span className="block h-10 w-px animate-pulse bg-(--color-brand-blue)" />
            </span>
          </div>
        </div>

        <div aria-hidden="true" className="absolute inset-0 bg-(--color-blue-deep)/45 md:hidden" />
        <div data-content className="relative flex flex-1 flex-col md:motion-safe:opacity-0">
        <Container className="flex flex-1 flex-col justify-end pt-48 pb-10 sm:pb-14 md:pt-0">
          <p className="flex items-center gap-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-white/85">
            <span aria-hidden="true" className="h-px w-8 bg-(--color-brand-blue-soft)" />
            About Airtech · Est. 2000
          </p>
          <h1 className="mt-5 max-w-[18ch] font-display text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.03em] text-balance text-white sm:text-[3.5rem] lg:text-[4.5rem]">
            Built around one idea: <span className="text-(--color-brand-blue-soft)">reliability matters.</span>
          </h1>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <ButtonLink href={"#story" as Route} size="lg">
              Our story
            </ButtonLink>
            <Link
              href={careersHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/45 px-7 py-3.5 text-base font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-(--color-ink)"
            >
              Careers at Airtech <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-x-5 gap-y-6 border-t border-white/20 pt-7 lg:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label} data-stat>
                <dd className="font-display text-[1.75rem] leading-none font-semibold tracking-[-0.03em] text-white tabular-nums sm:text-[2.25rem] lg:text-[2.75rem]">
                  {s.value}
                </dd>
                <dt className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/60">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
        </div>
      </div>
    </section>
  );
}
