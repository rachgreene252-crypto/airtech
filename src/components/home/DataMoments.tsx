import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Brand history as three typographic moments, not a stats dashboard. Only
 * the two client-confirmed dates are used — established 2000, MEP operations
 * commenced 2013 (AIRTECH WEBSITE REDESIGN.docx §1.2 / Master Source of
 * Truth §2). No intermediate milestones are invented, and no revenue figure
 * is shown here — that's gated behind separate publication approval.
 */
const MOMENTS = [
  { mark: "2000", label: "Airtech begins." },
  { mark: "2013", label: "MEP operations." },
  { mark: "Today", label: "Integrated engineering." },
] as const;

export function DataMoments() {
  return (
    <section className="relative overflow-hidden border-t border-(--color-line) bg-(--color-paper) py-24 sm:py-32">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-5 sm:px-8 lg:px-12">
        {/* The through-line: continuity from 2000 to today, burgundy marking each moment. */}
        <div
          aria-hidden="true"
          className="absolute left-5 top-6 bottom-6 w-px bg-(--color-line-strong) sm:left-8 lg:left-12"
        />

        {MOMENTS.map((m, i) => (
          <Reveal key={m.mark} delay={i * 0.08} className="relative">
            <div
              className={`flex items-baseline gap-6 sm:gap-10 ${i > 0 ? "mt-16 sm:mt-24" : ""} pl-8 sm:pl-12`}
            >
              <span
                aria-hidden="true"
                className="absolute left-5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-(--color-heritage) sm:left-8 lg:left-12"
              />
              <h3 className="font-display text-[16vw] sm:text-8xl lg:text-9xl font-bold leading-none tracking-tight text-(--color-ink)">
                {m.mark}
              </h3>
              <p className="font-mono text-sm sm:text-base tracking-[0.08em] uppercase text-(--color-blueprint)">
                {m.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* A real, current photo grounds "Today" — no imagery invented for 2000/2013. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] lg:block">
        <Image
          src="/images/projects/ncell-iconic-building.jpg"
          alt=""
          fill
          sizes="38vw"
          className="object-cover opacity-[0.09] grayscale"
        />
      </div>
    </section>
  );
}
