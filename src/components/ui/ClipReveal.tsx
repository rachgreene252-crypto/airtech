"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Image-frame entrance: the frame wipes open from the bottom edge as it
 * scrolls into view, once. Used for large photographs only (text keeps the
 * plainer Reveal fade). Same initial state on server and client; reduced
 * motion makes it instant. clip-path + transform only — no layout work.
 */
export function ClipReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(18% 0% 0% 0%)", opacity: 0.001, y: 24 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
