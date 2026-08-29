const HOTSPOTS = [
  { label: "HVAC", x: 70, y: 50 },
  { label: "Electrical", x: 170, y: 50 },
  { label: "Plumbing", x: 70, y: 110 },
  { label: "Fire Protection", x: 170, y: 110 },
] as const;

/**
 * Journey step 4 — Execute. A line-art building section with four hotspots
 * pulsing in sequence, one per discipline landing on site. The text legend
 * beneath doubles as the mobile-simplified "hotspots -> labelled legend"
 * treatment the spec calls for (§7.2) and as an accessible label list,
 * since the in-SVG <text> is aria-hidden with the rest of the drawing.
 */
export function Site({ active }: { active: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <svg viewBox="0 0 240 160" className="h-full max-h-40 w-full" aria-hidden="true">
        <rect x={30} y={20} width={180} height={130} fill="none" stroke="var(--color-brand-blue-soft)" strokeWidth={1} opacity={0.5} />
        <path d="M30 80 H210 M120 20 V150" stroke="var(--color-brand-blue-soft)" strokeWidth={0.75} opacity={0.4} />
        {HOTSPOTS.map((spot, i) => (
          <circle
            key={spot.label}
            cx={spot.x}
            cy={spot.y}
            r={5}
            fill="var(--color-brand-blue)"
            className={active ? "animate-detect-ping" : undefined}
            style={active ? { animationDelay: `${i * 0.5}s` } : undefined}
          />
        ))}
      </svg>
      <p className="font-sans text-(--text-small) text-(--color-steel)">
        {HOTSPOTS.map((h) => h.label).join(" · ")}
      </p>
    </div>
  );
}
