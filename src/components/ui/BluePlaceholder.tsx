import { cn } from "@/lib/cn";

/**
 * Replaces TechnicalPlaceholder everywhere a photograph is missing. Never
 * renders a fake photo — a graded blue field with faint architectural
 * line-work (a simplified echo of SystemMotif's stroke language) plus an
 * honest, sentence-case caption instead.
 */
export function BluePlaceholder({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("absolute inset-0 flex items-end overflow-hidden p-5", className)}
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--color-blue-deep) 0%, var(--color-brand-blue) 100%)",
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.14]"
        viewBox="0 0 300 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 150 H300 M50 0 V200 M150 0 V200 M250 0 V200 M0 55 H300 M0 105 H300"
          stroke="white"
          strokeWidth={0.75}
          fill="none"
        />
        <circle cx={150} cy={55} r={3} fill="white" />
        <circle cx={250} cy={105} r={3} fill="white" />
      </svg>
      {label && (
        <p className="relative font-sans text-label font-medium text-white/80">
          {label}
        </p>
      )}
    </div>
  );
}
