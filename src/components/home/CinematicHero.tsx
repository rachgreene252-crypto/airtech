import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Section 01, Hero.
 *
 * Rebuilt 2026-09-15, replacing the scroll-scrubbed logo-reveal canvas
 * entirely, per direct feedback ("remove the frame animation/scroll
 * thing"). The client supplied a real 3D engineering-visualisation video
 * (an exploded MEP assembly: AHU, ductwork, fire-protection and domestic
 * water pipework, cable tray, a pump skid, on a clean white stage), a
 * genuinely premium, on-brand asset that needs no interaction gimmick to
 * land. It just autoplays, muted and looped, the moment the page opens.
 *
 * 2026-09-16, fixed the video panel reading as "pasted on" rather than
 * part of the page: it used a flat white backing and cut off sharply where
 * the text panel began. The bottom edge now fades into the exact same
 * background colour the text panel sits on, so the video dissolves into
 * the page instead of ending at a hard rectangle.
 */
export function CinematicHero() {
  return (
    <div className="relative w-full">
      <div className="relative h-[62svh] min-h-[380px] w-full overflow-hidden bg-(--color-paper) sm:h-[74svh]">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero/poster.webp"
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="A 3D visualisation of a coordinated MEP installation: ductwork, fire-protection and domestic water pipework, cable tray and a pump skid"
        >
          <source src="/videos/hero-mep.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 sm:h-32"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-paper))" }}
        />
      </div>
      <Reveal>
        <HeroTextPanel />
      </Reveal>
    </div>
  );
}

function HeroTextPanel() {
  return (
    <section
      className="relative bg-site-texture px-6 py-14 text-center sm:px-10 sm:py-20"
      aria-label="Airtech Industries: keeping Nepal moving"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <p className="font-mono text-label uppercase tracking-[0.24em] text-(--color-brand-blue)">
          Engineering behind the places that matter
        </p>
        <h1 className="mt-7 max-w-[15ch] font-display text-display-2xl font-semibold leading-[1.01] tracking-[-0.025em] text-balance text-(--color-ink)">
          Keeping Nepal moving.
        </h1>
        <p className="mt-7 max-w-lg text-body-l leading-relaxed text-(--color-steel)">
          Integrated MEP and HVAC, from first drawing to commissioning, and
          the years of support that follow.
        </p>
        <div className="mt-11 flex flex-wrap items-center justify-center gap-7">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Enquire
          </ButtonLink>
          <Link
            href="/projects"
            className="text-sm font-medium text-(--color-ink-soft) underline-offset-4 hover:text-(--color-brand-blue) hover:underline transition-colors"
          >
            Explore our work →
          </Link>
        </div>

        <div className="mt-14 flex items-center gap-3 text-(--color-steel-soft)">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand-blue) animate-energy-pulse" />
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em]">
            Reliability matters · Est. 2000 · Integrated MEP since 2013
          </span>
        </div>
      </div>
    </section>
  );
}
