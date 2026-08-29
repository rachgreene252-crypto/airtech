/**
 * Journey step 6 — Support. A line that continues past the building edge
 * with a slow, steady pulse — "this doesn't end." Reuses the existing
 * energy-pulse keyframe at a slower duration than its other call sites.
 */
export function Support({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      <rect x={40} y={30} width={110} height={110} fill="none" stroke="var(--color-brand-blue-soft)" strokeWidth={1} opacity={0.5} />
      <path d="M150 85 H230" stroke="var(--color-brand-blue)" strokeWidth={1.5} strokeDasharray="4 4" />
      <circle
        cx={230}
        cy={85}
        r={5}
        fill="var(--color-brand-blue)"
        className={active ? "animate-energy-pulse" : undefined}
        style={active ? { animationDuration: "3.6s" } : undefined}
      />
    </svg>
  );
}
