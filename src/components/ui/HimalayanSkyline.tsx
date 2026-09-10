/**
 * A quiet, recurring Nepali motif — a Himalayan skyline silhouette in thin
 * line art, not a literal mountain photo. Added 2026-09-11 per the client's
 * ask for "that Nepali essence": something distinctly Nepal without leaning
 * on flag colours or temple-carving clichés. The valley-to-peak profile
 * echoes the real Kathmandu-to-Himalaya geography Airtech actually builds
 * in, ties back to the hero photo's own mountain backdrop, and reads as a
 * drafting-line detail rather than a stock illustration.
 */
export function HimalayanSkyline({ className, opacity = 1 }: { className?: string; opacity?: number }) {
  return (
    <svg
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      style={{ opacity }}
    >
      <path
        d="M0 160 L0 128 L90 84 L150 112 L230 48 L280 76 L360 20 L420 60 L520 8 L610 66 L680 40 L760 96 L840 52 L900 84 L980 36 L1060 72 L1140 24 L1220 68 L1310 44 L1440 92 L1440 160 Z"
        fill="currentColor"
      />
      <path
        d="M0 128 L90 84 L150 112 L230 48 L280 76 L360 20 L420 60 L520 8 L610 66 L680 40 L760 96 L840 52 L900 84 L980 36 L1060 72 L1140 24 L1220 68 L1310 44 L1440 92"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
        opacity={0.5}
      />
    </svg>
  );
}
