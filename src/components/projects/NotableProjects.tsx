"use client";

import { useDeferredValue, useId, useMemo, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import Image from "@/components/ui/Image";
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";
import { Container } from "@/components/ui/Container";
import type { Industry, Project } from "@/content/types";

const PAGE = 12;

/**
 * Notable Projects (2026-10-29; replaces "The rest of the portfolio" and the
 * sector-by-sector name list). A compact, searchable, filterable index of
 * the portfolio beyond the featured set, modelled on Foster + Partners'
 * list view: one search field, one sector filter, compact rows that still
 * carry a photograph, and progressive "show more" instead of one endless
 * page.
 */
export function NotableProjects({ projects, industries }: { projects: Project[]; industries: Industry[] }) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const q = useDeferredValue(query.trim().toLowerCase());
  const searchId = useId();
  const sectorId = useId();

  const nameOf = (slug: string) => industries.find((i) => i.slug === slug)?.name ?? "";
  const sectorsWithWork = industries.filter((i) => projects.some((p) => p.industrySlug === i.slug));

  const results = useMemo(
    () =>
      projects.filter(
        (p) =>
          (!sector || p.industrySlug === sector) &&
          (!q || `${p.name} ${p.client ?? ""} ${p.location ?? ""}`.toLowerCase().includes(q))
      ),
    [projects, sector, q]
  );
  const shown = results.slice(0, limit);

  return (
    <section aria-labelledby="notable-heading" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-brand-blue)">
              Portfolio index
            </p>
            <h2
              id="notable-heading"
              className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.018em] text-(--color-ink)"
            >
              Notable Projects
            </h2>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] lg:max-w-[38rem]">
            <div>
              <label htmlFor={searchId} className="sr-only">
                Search projects
              </label>
              <div className="relative">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-steel)" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="9" cy="9" r="5.5" />
                  <path d="m13.2 13.2 3.8 3.8" strokeLinecap="round" />
                </svg>
                <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setLimit(PAGE);
                  }}
                  placeholder="Search by name or place"
                  className="h-12 w-full rounded-full border border-(--color-line-strong) bg-(--color-paper) pl-11 pr-4 text-body text-(--color-ink) placeholder:text-(--color-steel) focus:border-(--color-brand-blue) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-brand-blue)/30"
                />
              </div>
            </div>
            <div>
              <label htmlFor={sectorId} className="sr-only">
                Filter by industry
              </label>
              <select
                id={sectorId}
                value={sector}
                onChange={(e) => {
                  setSector(e.target.value);
                  setLimit(PAGE);
                }}
                className="select-field h-12 w-full rounded-full"
              >
                <option value="">All industries</option>
                {sectorsWithWork.map((i) => (
                  <option key={i.slug} value={i.slug}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p aria-live="polite" className="mt-8 text-small text-(--color-steel)">
          {results.length === 0
            ? "No project matches that search."
            : `Showing ${shown.length} of ${results.length}`}
        </p>

        <ul className="mt-4 grid grid-cols-1 border-t border-(--color-line) sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug} className="border-b border-(--color-line)">
              <Link
                href={`/projects/${p.slug}` as Route}
                className="group flex items-center gap-4 py-3.5 outline-offset-2"
              >
                <span className="relative block aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-[2px] bg-(--color-paper-raised) sm:w-28">
                  {p.heroImage?.src ? (
                    <Image
                      src={p.heroImage.src}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
                    />
                  ) : (
                    <BluePlaceholder className="p-0" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.0625rem] font-semibold leading-snug text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue)">
                    {p.name}
                  </span>
                  <span className="mt-1 block text-small text-(--color-steel)">
                    {[nameOf(p.industrySlug), p.location?.split(",").pop()?.trim()].filter(Boolean).join(" · ")}
                    {p.projectStatus === "ongoing" && <span className="ml-2 font-medium text-(--color-brand-blue)">Ongoing</span>}
                  </span>
                </span>
                <span aria-hidden="true" className="text-(--color-brand-blue) opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {results.length > shown.length && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setLimit((l) => l + PAGE)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-(--color-line-strong) bg-(--color-paper) px-6 text-sm font-semibold text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
            >
              Show more projects
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
