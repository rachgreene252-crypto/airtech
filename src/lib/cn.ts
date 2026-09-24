import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The project's custom type-scale tokens (globals.css @theme) must be
// registered as font sizes: unregistered, tailwind-merge reads e.g.
// `text-label` as a text *colour* and silently drops it whenever a real
// colour class like `text-(--color-brand-blue)` follows — which is how
// every SectionHeader eyebrow was rendering at body size.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display-2xl", "display-xl", "display-l", "display-m", "title", "body-l", "body", "small", "label"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
