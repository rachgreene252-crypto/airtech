"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clientGroups, clientCount, type Client } from "@/content/clients";
import { cn } from "@/lib/cn";

/**
 * The client register (2026-10-01): every organisation in the client's own
 * sector lists (src/content/clients.ts), browsable by sector and
 * searchable across all of them. It sits under the project portfolio so a
 * sector with few or no published case studies (pharma, banks) still shows
 * its real depth of work. `initialSector` follows the page's `?industry=`
 * filter; the parent re-keys this component when that changes.
 */
export function ClientRegister({ initialSector = "" }: { initialSector?: string }) {
  const reduceMotion = useReducedMotion();
  const seed = clientGroups.some((g) => g.industrySlug === initialSector)
    ? initialSector
    : clientGroups[0].industrySlug;
  const [sector, setSector] = useState<string>(seed);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const group = clientGroups.find((g) => g.industrySlug === sector) ?? clientGroups[0];

  // A search runs across every sector, so a visitor looking for one name
  // doesn't have to guess which tab it lives under.
  const results = useMemo(() => {
    if (!q) return null;
    return clientGroups.flatMap((g) =>
      g.clients
        .filter((c) => `${c.name} ${c.city ?? ""}`.toLowerCase().includes(q))
        .map((c) => ({ ...c, sectorLabel: g.label }))
    );
  }, [q]);

  const list: (Client & { sectorLabel?: string })[] = results ?? group.clients;
  const logos = results ? [] : group.clients.filter((c) => c.logo);

  return (
    <section aria-labelledby="client-register-heading" className="border-t border-(--color-line) py-16 sm:py-20 lg:py-24">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-end lg:gap-16">
        <div>
          <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
            Client register
          </p>
          <h2
            id="client-register-heading"
            className="mt-4 font-display text-display-l font-semibold leading-[1.06] tracking-[-0.016em] text-balance text-(--color-ink)"
          >
            <span className="text-(--color-brand-blue)">{clientCount}</span> organisations we&rsquo;ve
            engineered for.
          </h2>
        </div>
        <p className="max-w-xl text-body leading-relaxed text-(--color-steel)">
          Hospitals, pharmaceutical plants, banks, embassies, factories and broadcast studios
          across Nepal. Pick a sector, or search for a name.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="Client sectors"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {clientGroups.map((g) => {
            const active = !results && g.industrySlug === sector;
            return (
              <button
                key={g.industrySlug}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setSector(g.industrySlug);
                  setQuery("");
                }}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-(--color-brand-blue-vivid) bg-(--color-brand-blue-vivid) text-white"
                    : "border-(--color-line-strong) bg-(--color-paper) text-(--color-ink-soft) hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
                )}
              >
                {g.label}
                <span className={cn("font-mono text-[0.6875rem] tabular-nums", active ? "text-white/80" : "text-(--color-steel-soft)")}>
                  {g.clients.length}
                </span>
              </button>
            );
          })}
        </div>
        <label className="relative block w-full shrink-0 lg:w-64">
          <span className="sr-only">Search clients</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--color-steel-soft)"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <circle cx="9" cy="9" r="5.5" />
            <path d="m13.2 13.2 3.8 3.8" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search clients"
            className="w-full rounded-full border border-(--color-line-strong) bg-(--color-paper) py-2 pl-10 pr-4 text-sm text-(--color-ink) placeholder:text-(--color-steel-soft) focus:border-(--color-brand-blue) focus:outline-none"
          />
        </label>
      </div>

      <div role="tabpanel" aria-live="polite" className="mt-10">
        {results && (
          <p className="mb-6 text-small text-(--color-steel)">
            {results.length} {results.length === 1 ? "match" : "matches"} for &ldquo;{query.trim()}&rdquo;
          </p>
        )}

        {logos.length > 0 && (
          <motion.ul
            key={`logos-${sector}`}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 flex flex-wrap gap-3"
          >
            {logos.map((c) => (
              <li
                key={c.logo}
                className="flex h-20 w-36 items-center justify-center border border-(--color-line) bg-white p-4 transition-colors hover:border-(--color-brand-blue-vivid)"
              >
                {/* Mixed supplied asset set — same plain contained <img> as TrustedBy. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/clients/${c.logo}`}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain"
                />
              </li>
            ))}
          </motion.ul>
        )}

        {list.length === 0 ? (
          <p className="py-10 text-center text-body text-(--color-steel)">
            No client by that name in the register.
          </p>
        ) : (
          <motion.ol
            key={results ? `q-${q}` : sector}
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: reduceMotion ? 0 : 0.015 } } }}
            className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((c, i) => (
              <motion.li
                key={`${c.name}-${c.sectorLabel ?? ""}`}
                variants={{
                  hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
                className="group flex items-baseline gap-4 border-b border-(--color-line) py-3.5"
              >
                <span className="w-7 shrink-0 font-mono text-[0.6875rem] tabular-nums text-(--color-steel-soft) transition-colors group-hover:text-(--color-brand-blue)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-body font-medium leading-snug text-(--color-ink)">{c.name}</span>
                  {(c.city || c.sectorLabel) && (
                    <span className="mt-0.5 block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-(--color-steel-soft)">
                      {[c.city, c.sectorLabel].filter(Boolean).join(" · ")}
                    </span>
                  )}
                </span>
              </motion.li>
            ))}
          </motion.ol>
        )}
      </div>
    </section>
  );
}
