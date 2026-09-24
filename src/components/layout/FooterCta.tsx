"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Footer CTA card. Hidden where the page itself already is the call to
 * action: the homepage closes with its own FinalCTA ("Ready to build
 * what's next?") directly above the footer, and the contact pages (contact,
 * project enquiry form) have their own enquire prompts — a second CTA
 * right after reads as a duplicate.
 */
export function FooterCta() {
  const pathname = usePathname();
  if (pathname === "/" || pathname.startsWith("/contact")) return null;

  return (
      <div className="relative isolate mb-16 overflow-hidden rounded-[8px] border border-(--color-line) bg-(--color-paper) px-7 py-10 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14">
        <div className="max-w-xl">
          <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
            Start a project
          </p>
          <p className="mt-4 font-display text-display-m font-semibold leading-[1.08] tracking-[-0.015em] text-(--color-ink) text-balance">
            Let&apos;s engineer your next building.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-0 lg:shrink-0">
          <Link
            href="/contact/project-enquiry"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-(--color-brand-blue-vivid) px-7 py-3.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-(--color-brand-blue-hover) hover:shadow-[0_12px_28px_-8px_rgba(0,152,209,0.6)]"
          >
            Inquire for Services
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-full border border-(--color-line-strong) px-6 py-3.5 text-sm font-medium text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
          >
            See our work
          </Link>
        </div>
      </div>
  );
}
