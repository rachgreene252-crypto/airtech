import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { services } from "@/content/services";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-(--color-line) bg-(--color-paper)">
      <HeroSchematic />
      <Container className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-signal)">
          Airtech Industries — Est. 2000, Kathmandu
        </p>
        <h1 className="mt-5 max-w-4xl min-h-[185px] sm:min-h-[230px] lg:min-h-[260px] font-display text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[0.95] text-balance">
          The engineering partner behind buildings that can&apos;t afford to fail.
        </h1>
        <p className="mt-7 max-w-xl text-lg sm:text-xl text-(--color-steel) leading-relaxed">
          Airtech is Nepal&apos;s integrated MEP partner — a single engineering team for HVAC,
          electrical, plumbing, fire protection and building systems, from design through
          procurement, installation, testing, commissioning and long-term support.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <ButtonLink href="/contact" size="lg">
            Discuss Your Project
          </ButtonLink>
          <ButtonLink href="/projects" size="lg" variant="secondary">
            View Our Projects
          </ButtonLink>
        </div>

        <div className="mt-16 lg:mt-24 flex flex-wrap gap-x-8 gap-y-3 border-t border-(--color-line) pt-6">
          {services.map((s) => (
            <span key={s.slug} className="font-mono text-xs tracking-[0.08em] uppercase text-(--color-steel)">
              <span className="text-(--color-ink) font-semibold">{s.disciplineCode}</span> — {s.name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Decorative coordination-drawing linework — the subject's own visual vocabulary. */
function HeroSchematic() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16] text-(--color-blueprint)"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M900 0 V220 H1160 V420 H1440" />
        <path d="M1020 0 V140 H1440" />
        <path d="M960 900 V680 H1280 V500 H1440" />
        <path d="M1200 900 V760 H1440" />
        <circle cx="1160" cy="420" r="5" fill="currentColor" stroke="none" />
        <circle cx="1020" cy="140" r="5" fill="currentColor" stroke="none" />
        <circle cx="1280" cy="500" r="5" fill="currentColor" stroke="none" />
        <rect x="1100" y="360" width="120" height="60" strokeWidth="1" />
        <rect x="1240" y="440" width="90" height="90" strokeWidth="1" />
      </g>
      <g stroke="currentColor" strokeWidth="0.75" opacity="0.6">
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={900 + i * 90} y1="0" x2={900 + i * 90} y2="900" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1="900" y1={i * 120} x2="1440" y2={i * 120} />
        ))}
      </g>
    </svg>
  );
}
