"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Persistent discipline switcher for the Expertise section. Lives in the
 * shared layout, so moving between disciplines swaps only the right-hand
 * content — the page header and this rail stay put.
 *
 * Desktop (lg+): a vertical list with a blue active marker.
 * Mobile: a horizontally scrolling strip of the same links.
 */
const ITEMS = [
  { label: "Overview", href: "/expertise" as Route },
  ...services.map((s) => ({ label: s.name, href: `/expertise/${s.slug}` as Route })),
];

export function ExpertiseRail() {
  const pathname = usePathname();

  return (
    <nav aria-label="Engineering disciplines" className="min-w-0 lg:sticky lg:top-28">
      {/* Mobile: a scrollable strip of real links (2026-10-29). The old
          <select> navigated on every change, so keyboard users browsing its
          options were thrown to a new page on the first arrow press. */}
      <div className="lg:hidden">
        <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-steel)">
          Disciplines
        </p>
        <ul className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8">
          {ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  ref={
                    active
                      ? (el) => {
                          // Centre the current discipline in the strip
                          // without scrolling the page itself.
                          const strip = el?.closest("ul");
                          if (el && strip) strip.scrollLeft = el.offsetLeft - (strip.clientWidth - el.clientWidth) / 2;
                        }
                      : undefined
                  }
                  className={cn(
                    "inline-flex min-h-11 items-center whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors",
                    active
                      ? "border-(--color-brand-blue-vivid) bg-(--color-brand-blue-vivid) text-white"
                      : "border-(--color-line-strong) bg-(--color-paper) text-(--color-ink-soft) hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-(--color-steel-soft)">
          Disciplines
        </p>
        <ul className="mt-4 flex flex-col">
          {ITEMS.map((item, i) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 border-l-2 py-2.5 pl-4 text-[0.9375rem] transition-colors",
                    active
                      ? "border-(--color-brand-blue) text-(--color-brand-blue)"
                      : "border-(--color-line) text-(--color-steel) hover:border-(--color-line-strong) hover:text-(--color-ink)"
                  )}
                >
                  {i > 0 && (
                    <span className="font-mono text-[0.75rem] text-(--color-steel-soft)">
                      {String(i).padStart(2, "0")}
                    </span>
                  )}
                  <span className="font-medium leading-snug">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
