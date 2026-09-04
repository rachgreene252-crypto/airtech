import type { ReactNode } from "react";

/**
 * Passthrough. Was an opacity scroll-reveal wrapped around most sections;
 * the brief calls for restrained motion, and a fade on every section on
 * every page read as noise (and left content invisible if the observer was
 * slow to fire). The site's intentional motion now lives in three places
 * only: the hero choreography, the Featured Projects horizontal scroll, and
 * the client-journey step console. Kept as a component so the ~12 call
 * sites don't need touching and a reveal can be reintroduced centrally if
 * wanted.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return className ? <div className={className}>{children}</div> : <>{children}</>;
}
