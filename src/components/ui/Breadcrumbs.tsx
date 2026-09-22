import Link from "next/link";
import type { Route } from "next";
import { Fragment } from "react";
import { cn } from "@/lib/cn";

export interface Crumb {
  label: string;
  href?: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.airtech.com.np";

export function Breadcrumbs({
  items,
  className,
  visuallyHidden = false,
}: {
  items: Crumb[];
  className?: string;
  /** Keeps the BreadcrumbList JSON-LD (real SEO value) but drops the visible
   * "Home / X" trail from page heroes — client feedback 2026-09-16 ("i dont
   * want the 'Home/...'"), which read as clutter above an otherwise clean,
   * attractive heading. */
  visuallyHidden?: boolean;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("font-sans text-label text-(--color-steel)", visuallyHidden ? "sr-only" : "", className)}
    >
      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 && <span aria-hidden="true">/</span>}
            <li>
              {item.href ? (
                <Link href={item.href as Route} className="hover:text-(--color-ink) transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-(--color-ink)">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
