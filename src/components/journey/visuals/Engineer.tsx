/**
 * Journey step 2 — Engineer. Four states cross-fade in a slow loop while
 * active: drawing grid, CAD wireframe, calculation sheet, equipment
 * schematic. Each <g> shares the engineer-crossfade keyframe (globals.css)
 * with a staggered animation-delay so exactly one is visible at a time;
 * resting (inactive) state shows the drawing grid only.
 */
const STATES = [
  <g key="grid">
    <path
      d="M20 20 H220 M20 60 H220 M20 100 H220 M20 140 H220 M60 10 V150 M110 10 V150 M160 10 V150"
      stroke="var(--color-brand-blue-soft)"
      strokeWidth={0.75}
      opacity={0.6}
      fill="none"
    />
  </g>,
  <g key="wireframe" fill="none" stroke="var(--color-brand-blue)" strokeWidth={1.25}>
    <path d="M50 130 V50 L120 20 L190 50 V130 L120 160 Z" />
    <path d="M50 50 L120 80 L190 50 M120 80 V160" />
  </g>,
  <g key="sheet" stroke="var(--color-brand-blue)" strokeWidth={1} fill="none">
    <rect x={70} y={15} width={100} height={130} />
    {[35, 55, 75, 95, 115, 135].map((y) => (
      <path key={y} d={`M80 ${y} H160`} opacity={0.55} />
    ))}
  </g>,
  <g key="schematic" fill="none" stroke="var(--color-brand-blue)" strokeWidth={1.25}>
    <rect x={40} y={60} width={40} height={40} />
    <rect x={160} y={60} width={40} height={40} />
    <path d="M80 80 H160 M120 20 V60 M120 100 V140" />
    <circle cx={120} cy={80} r={6} fill="var(--color-brand-blue-soft)" stroke="none" />
  </g>,
];

export function Engineer({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      {STATES.map((state, i) => (
        <g
          key={i}
          className={active ? "animate-engineer-crossfade" : undefined}
          style={{
            // Non-first layers stay opacity:0 by default so they're hidden
            // during their animation-delay window — the keyframe has no
            // fill-mode and its 0% frame is opacity:1, so `backwards` can't
            // help. The running animation overrides this inline value once
            // each layer's delay elapses.
            opacity: i === 0 ? (active ? undefined : 1) : 0,
            animationDelay: active ? `${i * 2}s` : undefined,
          }}
        >
          {state}
        </g>
      ))}
    </svg>
  );
}
