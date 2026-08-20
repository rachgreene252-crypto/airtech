import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <Section tone="raised" className="relative overflow-hidden text-center">
      <FinalCTASchematic />
      <div className="relative">
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
          Have a project in planning?
        </p>
        <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold max-w-3xl mx-auto text-balance">
          Bring the engineering scope to us before the RFP does.
        </h2>
        <p className="mt-6 text-lg text-(--color-steel) max-w-xl mx-auto">
          Tell us what you&apos;re building and we&apos;ll respond within one business day.
        </p>
        <div className="mt-9">
          <ButtonLink href="/contact/project-enquiry" size="lg">
            Discuss Your Project
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}

/** A quiet closing echo of the site's coordination-drawing vocabulary. */
function FinalCTASchematic() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 500"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06] text-(--color-blueprint)"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.25">
        <rect x="560" y="120" width="320" height="280" />
        <line x1="560" y1="190" x2="880" y2="190" />
        <line x1="560" y1="260" x2="880" y2="260" />
        <line x1="560" y1="330" x2="880" y2="330" />
        <line x1="720" y1="0" x2="720" y2="120" />
        <line x1="720" y1="400" x2="720" y2="500" />
        <circle cx="720" cy="260" r="6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
