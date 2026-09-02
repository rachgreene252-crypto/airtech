"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Persistent discipline switcher for the Expertise section. Lives in the
 * shared layout, so moving between disciplines swaps only the right-hand
 * content — the page header and this rail stay put.
 *
 * Desktop (lg+): a vertical list with a blue active marker.
 * Mobile: a single select — a horizontal row of 8 pills is too cramped to
 * tap reliably.
 */
const ITEMS = [
  { label: "Overview", href: "/expertise" as Route },
  ...services.map((s) => ({ label: s.name, href: `/expertise/${s.slug}` as Route })),
];

export function ExpertiseRail() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav aria-label="Engineering disciplines" className="lg:sticky lg:top-28">
      {/* Mobile */}
      <div className="lg:hidden">
        <label
          htmlFor="discipline-select"
          className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)"
        >
          Discipline
        </label>
        <select
          id="discipline-select"
          value={pathname}
          onChange={(e) => router.push(e.target.value as Route)}
          className="select-field mt-2 w-full"
        >
          {ITEMS.map((item) => (
            <option key={item.href} value={item.href}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
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
                    "flex items-baseline gap-3 border-l-2 py-3 pl-4 text-body transition-colors",
                    active
                      ? "border-(--color-brand-blue) text-(--color-brand-blue)"
                      : "border-(--color-line) text-(--color-steel) hover:border-(--color-line-strong) hover:text-(--color-ink)"
                  )}
                >
                  {i > 0 && (
                    <span className="font-mono text-[0.6875rem] text-(--color-steel-soft)">
                      {String(i).padStart(2, "0")}
                    </span>
                  )}
                  <span className="font-display font-medium leading-tight">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
