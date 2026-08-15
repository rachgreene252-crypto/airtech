"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Single restrained scroll-reveal: opacity fade only, once, respecting
 * reduced motion. Deliberately no y-transform — Chrome's Layout Instability
 * API counts transform-driven movement of an element's rendered rect toward
 * CLS, and any section that starts within the initial viewport (e.g. the
 * capabilities grid on shorter screens) was animating on first paint,
 * measured as a real, reproducible CLS regression independent of fonts.
 * Opacity has no geometry, so it can't contribute to layout shift.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
