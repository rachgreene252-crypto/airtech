/**
 * Journey step 5 — Test & Commission. A ring gauge fills 0->100% once the
 * step becomes active, with a check mark on completion — "System: 100%
 * ready." pathLength="1" normalizes the dash math to a 0..1 fraction;
 * animation-fill-mode: forwards (gauge-fill, globals.css) holds the
 * completed ring after the fill finishes.
 */
export function Commission({ active }: { active: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-28 w-28">
        <circle cx={50} cy={50} r={40} fill="none" stroke="var(--color-line-strong)" strokeWidth={4} />
        <circle
          cx={50}
          cy={50}
          r={40}
          fill="none"
          stroke="var(--color-brand-blue)"
          strokeWidth={4}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={active ? 0 : 1}
          className={active ? "animate-gauge-fill" : undefined}
          transform="rotate(-90 50 50)"
        />
        {active && (
          <path
            d="M36 51 L46 61 L66 39"
            fill="none"
            stroke="var(--color-brand-blue)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
      <p className="font-sans text-(--text-label) font-medium text-(--color-brand-blue)">System: 100% ready</p>
    </div>
  );
}
