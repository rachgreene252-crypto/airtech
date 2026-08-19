/**
 * One distinct animated visual metaphor per engineering discipline — shared
 * between the homepage SystemShowcase and the /expertise/[slug] detail pages
 * so each discipline reads as its own engineering world rather than the same
 * template with a different heading (brief §10: "visual composition should
 * adapt to the subject"). Pure CSS keyframe animation — the project's global
 * `prefers-reduced-motion` rule already zeroes every CSS animation's
 * duration, so these need no extra motion-safety wiring.
 */
export type SystemMotifKind = "airflow" | "energy" | "flow" | "detect" | "signal" | "converge" | "advisory";

export const SERVICE_MOTIFS: Record<string, SystemMotifKind> = {
  hvac: "airflow",
  electrical: "energy",
  "plumbing-public-health": "flow",
  "fire-protection": "detect",
  "elv-security": "signal",
  "bms-systems-integration": "converge",
  "engineering-advisory": "advisory",
};

export function SystemMotif({ motif }: { motif: SystemMotifKind }) {
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

  if (motif === "converge") {
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

  // advisory — a scanning review line settling on a verified point, for
  // Engineering/Advisory (audit, peer review, commissioning checks).
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
      <line x1="10%" y1="0%" x2="10%" y2="100%" stroke="var(--color-paper)" strokeWidth={1} opacity={0.2} />
      <line x1="90%" y1="0%" x2="90%" y2="100%" stroke="var(--color-paper)" strokeWidth={1} opacity={0.2} />
      <line
        x1="10%"
        y1="0%"
        x2="90%"
        y2="0%"
        stroke="var(--color-signal)"
        strokeWidth={1.5}
        opacity={0.8}
        className="animate-advisory-scan"
      />
      <circle cx="50%" cy="50%" r={4} fill="var(--color-amber)" />
    </svg>
  );
}
