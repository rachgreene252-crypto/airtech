/**
 * Journey step 1 — Understand. Two abstract profile/marker nodes with a
 * connecting pulse: the first conversation between client and engineer.
 */
export function Conversation({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      <line
        x1={60}
        y1={80}
        x2={180}
        y2={80}
        stroke="var(--color-brand-blue-soft)"
        strokeWidth={1}
        strokeDasharray="3 5"
        opacity={0.6}
      />
      <circle cx={60} cy={80} r={16} fill="none" stroke="var(--color-brand-blue)" strokeWidth={1.5} />
      <circle cx={180} cy={80} r={16} fill="none" stroke="var(--color-brand-blue)" strokeWidth={1.5} />
      <circle
        cx={120}
        cy={80}
        r={5}
        fill="var(--color-brand-blue-soft)"
        className={active ? "animate-energy-pulse" : undefined}
      />
    </svg>
  );
}
