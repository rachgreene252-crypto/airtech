import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { getServiceBySlug } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Six engineering disciplines as six distinct product reveals — not six
 * repetitions of the same [image / title / description] template. Each gets
 * its own image (real Airtech project photography, "Our Landmark Projects" —
 * AIPL PROFILE 2026.pptx slide 8), its own visual metaphor, and its own
 * animation treatment, so the visitor discovers a different engineering
 * world each time rather than reading the same card six times.
 */
const PANELS = [
  {
    slug: "hvac",
    index: "01",
    image: "/images/projects/nepal-mediciti-hospital.jpg",
    imageAlt: "Nepal Mediciti hospital, Lalitpur",
    motif: "airflow" as const,
  },
  {
    slug: "electrical",
    index: "02",
    image: "/images/projects/laxmi-motors-kd-plant.jpg",
    imageAlt: "Laxmi Motors KD Plant, Parasi",
    motif: "energy" as const,
  },
  {
    slug: "plumbing-public-health",
    index: "03",
    image: "/images/projects/caan-office-building.jpg",
    imageAlt: "CAAN Office Building, Kathmandu",
    motif: "flow" as const,
  },
  {
    slug: "fire-protection",
    index: "04",
    image: "/images/projects/ncell-iconic-building.jpg",
    imageAlt: "Ncell Iconic Building, Kathmandu",
    motif: "detect" as const,
  },
  {
    slug: "elv-security",
    index: "05",
    image: "/images/projects/nepal-mediciti-hospital.jpg",
    imageAlt: "Nepal Mediciti hospital, Lalitpur — entrance detail",
    motif: "signal" as const,
  },
  {
    slug: "bms-systems-integration",
    index: "06",
    image: "/images/projects/caan-office-building.jpg",
    imageAlt: "CAAN Office Building, Kathmandu — facade detail",
    motif: "converge" as const,
  },
];

export function SystemShowcase() {
  return (
    <section className="bg-(--color-paper)">
      {PANELS.map((panel, i) => {
        const service = getServiceBySlug(panel.slug);
        if (!service) return null;
        const reversed = i % 2 === 1;

        return (
          <div
            key={panel.slug}
            className={cn(
              "grid min-h-[92vh] items-stretch border-t border-(--color-line) lg:grid-cols-2",
              i === 0 && "border-t-0"
            )}
          >
            <div
              className={cn(
                "relative min-h-[42vh] overflow-hidden bg-(--color-ink)",
                reversed && "lg:order-2"
              )}
            >
              <Image
                src={panel.image}
                alt={panel.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={cn("object-cover", panel.motif === "detect" && "grayscale-[0.3]")}
              />
              <div className="absolute inset-0 bg-(--color-ink)/45" />
              <div className="absolute inset-0 bg-(--color-blueprint) mix-blend-color opacity-30" />
              <SystemMotif motif={panel.motif} />
            </div>

            <div className={cn("flex items-center px-6 py-16 sm:px-10 lg:px-16", reversed && "lg:order-1")}>
              <Reveal>
                <p className="font-mono text-xs tracking-[0.18em] uppercase text-(--color-blueprint)">
                  {panel.index} — {service.disciplineCode}
                </p>
                <h3 className="mt-4 font-display text-4xl sm:text-5xl font-semibold leading-[0.98] text-balance">
                  {service.name}
                </h3>
                <p className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-(--color-steel)">
                  {service.shortDescription}
                </p>
                <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-(--color-line) pt-5 font-mono text-xs tracking-[0.05em] uppercase text-(--color-steel-soft)">
                  {service.subServices.slice(0, 5).map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <Link
                  href={`/expertise/${service.slug}`}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-signal) hover:gap-2.5 transition-all"
                >
                  Explore {service.name}
                  <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}

/**
 * One distinct animated motif per discipline. Pure CSS keyframe animation —
 * the project's global `prefers-reduced-motion` rule already zeroes every
 * CSS animation's duration, so these need no extra motion-safety wiring.
 */
function SystemMotif({ motif }: { motif: "airflow" | "energy" | "flow" | "detect" | "signal" | "converge" }) {
  if (motif === "airflow") {
    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute left-[-20%] h-px w-[60%] bg-(--color-paper)/50 animate-airflow"
            style={{ top: `${28 + i * 20}%`, animationDelay: `${i * 1.3}s`, animationDuration: "6s" }}
          />
        ))}
      </div>
    );
  }

  if (motif === "energy") {
    return (
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g stroke="var(--color-signal)" strokeWidth={1.5} opacity={0.7}>
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="20%"
              y1="85%"
              x2={`${30 + i * 18}%`}
              y2={`${20 + i * 5}%`}
              className="animate-energy-pulse"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </g>
      </svg>
    );
  }

  if (motif === "flow") {
    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-[-10%] w-px h-[22%] bg-(--color-paper)/45 animate-flow-drop"
            style={{ left: `${15 + i * 18}%`, animationDelay: `${i * 0.6}s`, animationDuration: "3.4s" }}
          />
        ))}
      </div>
    );
  }

  if (motif === "detect") {
    return (
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-0" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="m-auto h-1.5 w-1.5 rounded-full bg-(--color-amber) animate-detect-ping"
            style={{ animationDelay: `${(i % 5) * 0.5}s` }}
          />
        ))}
      </div>
    );
  }

  if (motif === "signal") {
    return (
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="70%" cy="30%" r={4} fill="var(--color-signal)" />
        <circle cx="40%" cy="60%" r={4} fill="var(--color-signal)" />
        <circle cx="60%" cy="80%" r={4} fill="var(--color-signal)" />
        <line x1="70%" y1="30%" x2="40%" y2="60%" stroke="var(--color-signal)" strokeWidth={1} strokeDasharray="2 4" opacity={0.6} />
        <line x1="40%" y1="60%" x2="60%" y2="80%" stroke="var(--color-signal)" strokeWidth={1} strokeDasharray="2 4" opacity={0.6} />
        <circle cx="70%" cy="30%" r={4} fill="var(--color-amber)" className="animate-signal-travel" />
      </svg>
    );
  }

  // converge — the "one team" node
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
      {[
        [15, 20],
        [85, 15],
        [10, 80],
        [88, 82],
      ].map(([x, y], i) => (
        <line
          key={i}
          x1={`${x}%`}
          y1={`${y}%`}
          x2="50%"
          y2="50%"
          stroke="var(--color-signal)"
          strokeWidth={1}
          opacity={0.5}
        />
      ))}
      <circle cx="50%" cy="50%" r={6} fill="var(--color-amber)" className="animate-converge-pulse" />
    </svg>
  );
}
