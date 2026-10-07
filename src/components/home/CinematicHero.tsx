import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import type { Route } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { SYSTEM_COLOR } from "@/components/engineering/model";

// 2026-10-07 client: the first thing after the video should say what
// Airtech does. The service line is now the headline; "Keeping Nepal
// moving" drops to the meta line, and the six disciplines sit right under it.
const DISCIPLINES = [
  { label: "HVAC", href: "/expertise/hvac", color: SYSTEM_COLOR.hvac },
  { label: "Electrical", href: "/expertise/electrical", color: SYSTEM_COLOR.electrical },
  { label: "PHE", href: "/expertise/plumbing-public-health", color: SYSTEM_COLOR["plumbing-public-health"] },
  { label: "Fire Protection", href: "/expertise/fire-protection", color: SYSTEM_COLOR["fire-protection"] },
  { label: "ELV", href: "/expertise/elv-security", color: SYSTEM_COLOR["elv-security"] },
  { label: "BMS", href: "/expertise/bms-systems-integration", color: SYSTEM_COLOR["bms-systems-integration"] },
];

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
      <HeroTextPanel />
    </div>
  );
}

// Every line arrives on its own beat instead of the whole panel fading up
// as one flat block, per "add animation to this as well" — eyebrow,
// headline, subcopy, buttons, then the meta line, each a touch later than
// the last. Reveal already handles prefers-reduced-motion and fires
// on-mount for above-the-fold content like this since it's in view
// immediately.
function HeroTextPanel() {
  return (
    <section
      className="relative bg-site-texture px-6 py-14 text-center sm:px-10 sm:py-20"
      aria-label="Airtech Industries: integrated MEP and HVAC engineering"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <Reveal delay={0}>
          <p className="font-mono text-label uppercase tracking-[0.14em] text-(--color-brand-blue)">
            Integrated MEP &amp; HVAC engineering · Nepal · Since 2000
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="mt-7 max-w-[22ch] font-display text-display-xl font-semibold leading-[1.05] tracking-[-0.025em] text-balance text-(--color-ink) lg:text-[3.75rem]">
            Integrated MEP and HVAC, from first drawing to{" "}
            <span className="text-(--color-brand-blue)">commissioning</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mt-7 max-w-xl text-body-l leading-relaxed text-(--color-steel)">
            And the years of support that follow. Six building systems designed, installed and
            maintained by one accountable engineering team.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <ul className="mt-8 flex max-w-2xl flex-wrap justify-center gap-2" aria-label="Engineering disciplines">
            {DISCIPLINES.map((d) => (
              <li key={d.href}>
                <Link
                  href={d.href as Route}
                  className="inline-flex items-center gap-2 rounded-full border border-(--color-line-strong) bg-(--color-paper)/80 px-3.5 py-1.5 text-sm font-medium text-(--color-ink) transition-colors hover:border-(--color-brand-blue-vivid) hover:text-(--color-brand-blue)"
                >
                  <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.36}>
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
        </Reveal>

        <Reveal delay={0.48}>
          <div className="mt-14 flex items-center gap-3 text-(--color-steel-soft)">
            <span aria-hidden="true" className="hidden h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-brand-blue) animate-energy-pulse sm:block" />
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-balance">
              Keeping Nepal moving · Reliability matters · Est. 2000
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
