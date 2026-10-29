"use client";

import { useMemo, useState } from "react";
import Image from "@/components/ui/Image";
import Link from "next/link";
import type { Route } from "next";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";
import { projects } from "@/content/projects";
import { industries } from "@/content/industries";
import { getServiceBySlug } from "@/content/services";
import { GRATICULE, HQ, MAP_H, MAP_W, NEPAL_PATH, PLACES, project, type RadarPlace } from "@/content/radar";
import { clientGroups, type Client } from "@/content/clients";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * 03 — WHERE WE WORK.
 *
 * Rebuilt 2026-10-12 ("this map is not accurate + it showcases only a few
 * projects although we have done much more"):
 *  - the outline is Natural Earth 1:10m (was 1:50m);
 *  - every city now gathers BOTH the published case studies
 *    (src/content/projects.ts, by `location`) AND the client register
 *    (src/content/clients.ts, by `city`), so the map shows the full spread
 *    of Airtech's work, not just the 40-odd case studies;
 *  - embassies and INGOs carry no city in the register but can only be in
 *    Kathmandu, so they are placed there; other clients with no listed city
 *    (banks, corporates, telecoms) are counted, not guessed onto the map.
 * Positions stay city-level (see src/content/radar.ts).
 */

const SHORT: Record<string, string> = {
  hospitality: "Hospitality",
  healthcare: "Healthcare",
  "corporate-commercial": "Corporate",
  "commercial-buildings": "Commercial",
  "education-institutional": "Education",
  "telecom-data-centres": "Telecom",
  industrial: "Industrial",
  "embassies-ingos": "Embassies",
  "auditoriums-studios": "Auditoriums",
  pharmaceuticals: "Pharma",
  "banking-financial": "Banking",
};

const STATUS: Record<Project["projectStatus"], string> = {
  completed: "Completed",
  ongoing: "Ongoing",
  provisional: "Case study in progress",
};

const GENERIC_ROLE = "Featured in Airtech's project portfolio.";

// Small cities packed tightly together: labelled on hover / selection only,
// so their names don't overprint each other.
const CLUSTERED = new Set(["tansen", "butwal", "parasi", "dhulikhel"]);

type RadarClient = Client & { industrySlug: string };

function placeForText(text?: string): RadarPlace | undefined {
  const t = text?.toLowerCase();
  if (!t) return undefined;
  return PLACES.find((pl) => pl.matches.some((m) => t.includes(m)));
}

const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

type View = { kind: "overview" } | { kind: "place"; id: string } | { kind: "project"; slug: string; placeId: string };

export function ProjectRadar() {
  const reduce = useReducedMotion();
  const [sector, setSector] = useState<string>("");
  const [view, setView] = useState<View>({ kind: "overview" });
  const [hover, setHover] = useState<string | null>(null);

  // Everything placed once: case studies by location, clients by city.
  const data = useMemo(() => {
    const projectsAt = new Map<string, Project[]>();
    for (const p of projects) {
      const pl = placeForText(p.location);
      if (pl) projectsAt.set(pl.id, [...(projectsAt.get(pl.id) ?? []), p]);
    }
    const clientsAt = new Map<string, RadarClient[]>();
    let unplaced = 0;
    for (const g of clientGroups) {
      for (const c of g.clients) {
        const city = c.city ?? (g.industrySlug === "embassies-ingos" ? "Kathmandu" : undefined);
        const pl = placeForText(city);
        if (!pl) {
          unplaced++;
          continue;
        }
        // Skip a client that is already a case study in the same city.
        const dup = (projectsAt.get(pl.id) ?? []).some((p) => {
          const a = norm(p.name), b = norm(c.name);
          return a.includes(b) || b.includes(a);
        });
        if (dup) continue;
        clientsAt.set(pl.id, [...(clientsAt.get(pl.id) ?? []), { ...c, industrySlug: g.industrySlug }]);
      }
    }
    return { projectsAt, clientsAt, unplaced };
  }, []);

  const filtered = useMemo(() => {
    const m = new Map<string, { projects: Project[]; clients: RadarClient[] }>();
    for (const pl of PLACES) {
      const ps = (data.projectsAt.get(pl.id) ?? []).filter((p) => !sector || p.industrySlug === sector);
      const cs = (data.clientsAt.get(pl.id) ?? []).filter((c) => !sector || c.industrySlug === sector);
      if (ps.length + cs.length) m.set(pl.id, { projects: ps, clients: cs });
    }
    return m;
  }, [data, sector]);

  const sectors = useMemo(() => {
    const counts = new Map<string, number>();
    for (const l of data.projectsAt.values()) for (const p of l) counts.set(p.industrySlug, (counts.get(p.industrySlug) ?? 0) + 1);
    for (const l of data.clientsAt.values()) for (const c of l) counts.set(c.industrySlug, (counts.get(c.industrySlug) ?? 0) + 1);
    return industries.filter((i) => counts.has(i.slug)).map((i) => ({ slug: i.slug, count: counts.get(i.slug)! }));
  }, [data]);

  const total = (id: string) => {
    const e = filtered.get(id);
    return e ? e.projects.length + e.clients.length : 0;
  };
  const places = PLACES.filter((pl) => filtered.has(pl.id)).sort((a, b) => total(b.id) - total(a.id));
  const shownCount = places.reduce((n, pl) => n + total(pl.id), 0);
  const activePlaceId = view.kind === "overview" ? null : view.kind === "place" ? view.id : view.placeId;
  const focusId = hover ?? activePlaceId;

  const [hx, hy] = project(HQ.lon, HQ.lat);

  function openPlace(id: string) {
    setView({ kind: "place", id });
  }

  function changeSector(slug: string) {
    setSector(slug);
    setView({ kind: "overview" });
  }

  return (
    <section id="project-radar" className="relative border-t border-(--color-line) bg-band py-16 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                04 · Where we work
              </p>
              <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.06] text-balance text-(--color-ink)">
                Across Nepal, <span className="text-(--color-brand-blue)">{PLACES.length} cities</span> and counting.
              </h2>
            </div>
            <p className="max-w-xl text-body-l leading-relaxed text-(--color-steel) lg:justify-self-end">
              Every city where Airtech has engineered for a client, from Mustang to Birtamode. Select a
              city to see who we worked for there, and open any case study.
            </p>
          </div>
        </Reveal>

        {/* Sector filter */}
        <div
          role="group"
          aria-label="Filter the map by sector"
          className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {[{ slug: "" }, ...sectors].map((s) => {
            const active = sector === s.slug;
            return (
              <button
                key={s.slug || "all"}
                type="button"
                onClick={() => changeSector(s.slug)}
                aria-pressed={active}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
                  active
                    ? "border-(--color-ink) bg-(--color-ink) text-white"
                    : "border-(--color-line-strong) bg-(--color-paper) text-(--color-ink-soft) hover:border-(--color-ink)"
                )}
              >
                {/* No counts beside sector names (client brief, 2026-10-29). */}
                {s.slug ? SHORT[s.slug] ?? s.slug : "All sectors"}
              </button>
            );
          })}
        </div>

        <div className="mt-5 overflow-hidden rounded-[4px] border border-(--color-line-strong) bg-(--color-paper)">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)]">
            {/* Map */}
            <div className="relative border-b border-(--color-line) lg:border-r lg:border-b-0">
              <svg
                viewBox={`-40 -30 ${MAP_W + 80} ${MAP_H + 70}`}
                className="block h-auto w-full"
                role="group"
                aria-label="Map of Nepal with the cities where Airtech has worked"
              >
                <defs>
                  <clipPath id="radar-frame">
                    <rect x={-40} y={-30} width={MAP_W + 80} height={MAP_H + 70} />
                  </clipPath>
                  <linearGradient id="radar-land" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--color-brand-blue-tint)" />
                    <stop offset="100%" stopColor="var(--color-paper-raised)" />
                  </linearGradient>
                </defs>

                {/* Graticule + coordinate ticks */}
                <g clipPath="url(#radar-frame)" aria-hidden="true">
                  {GRATICULE.lons.map((lon) => {
                    const [x] = project(lon, 28);
                    return (
                      <g key={`lon${lon}`}>
                        <line x1={x} x2={x} y1={-30} y2={MAP_H + 40} stroke="var(--color-line)" strokeWidth={0.8} />
                        <text x={x + 4} y={MAP_H + 32} fontSize={10} fontFamily="var(--font-mono)" fill="var(--color-steel-soft)">
                          {lon}°E
                        </text>
                      </g>
                    );
                  })}
                  {GRATICULE.lats.map((lat) => {
                    const [, y] = project(84, lat);
                    return (
                      <g key={`lat${lat}`}>
                        <line x1={-40} x2={MAP_W + 40} y1={y} y2={y} stroke="var(--color-line)" strokeWidth={0.8} />
                        <text x={-34} y={y - 4} fontSize={10} fontFamily="var(--font-mono)" fill="var(--color-steel-soft)">
                          {lat}°N
                        </text>
                      </g>
                    );
                  })}
                </g>

                <path
                  d={NEPAL_PATH}
                  fill="url(#radar-land)"
                  stroke="var(--color-brand-blue)"
                  strokeOpacity={0.45}
                  strokeWidth={1.3}
                  strokeLinejoin="round"
                />

                {/* Network: head office → every city */}
                <g aria-hidden="true">
                  {places
                    .filter((pl) => pl.id !== "kathmandu-valley")
                    .map((pl, i) => {
                      const [x, y] = project(pl.lon, pl.lat);
                      const on = !focusId || focusId === pl.id;
                      return (
                        <motion.path
                          key={`${pl.id}-${sector}`}
                          d={`M${hx},${hy} Q${(hx + x) / 2},${Math.min(hy, y) - 50} ${x},${y}`}
                          fill="none"
                          stroke="var(--color-brand-blue-vivid)"
                          strokeWidth={1}
                          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: on ? 0.5 : 0.12 }}
                          animate={{ opacity: on ? 0.5 : 0.12 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ duration: 0.9, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        />
                      );
                    })}
                </g>

                {/* Cities: size = organisations served there */}
                {places.map((pl, i) => {
                  const [x, y] = project(pl.lon, pl.lat);
                  const n = total(pl.id);
                  const r = 4.5 + Math.sqrt(n) * 2.6;
                  const active = focusId === pl.id;
                  const dim = !!focusId && !active;
                  const valley = pl.id === "kathmandu-valley";
                  const showLabel = valley || active || n >= 4 || !CLUSTERED.has(pl.id);
                  return (
                    <motion.g
                      key={pl.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${pl.name}: ${n} organisation${n === 1 ? "" : "s"}`}
                      aria-pressed={activePlaceId === pl.id}
                      onClick={() => openPlace(pl.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openPlace(pl.id);
                        }
                      }}
                      onPointerEnter={() => setHover(pl.id)}
                      onPointerLeave={() => setHover(null)}
                      className="cursor-pointer outline-none [&:focus-visible>circle.node]:stroke-(--color-ink)"
                      initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    >
                      <circle cx={x} cy={y} r={Math.max(r + 8, 16)} fill="transparent" />
                      {!reduce && valley && (
                        <circle cx={x} cy={y} r={r} fill="none" stroke="var(--color-brand-blue-vivid)" strokeWidth={1.5} className="radar-pulse" />
                      )}
                      <motion.circle
                        cx={x}
                        cy={y}
                        initial={false}
                        animate={{ r: active ? r + 7 : r + 3, opacity: active ? 0.28 : 0.12 }}
                        fill="var(--color-brand-blue-vivid)"
                        transition={{ duration: 0.3 }}
                      />
                      <circle
                        className="node"
                        cx={x}
                        cy={y}
                        r={r}
                        fill="var(--color-brand-blue-vivid)"
                        fillOpacity={dim ? 0.45 : 1}
                        stroke="white"
                        strokeWidth={1.5}
                      />
                      {n > 1 && r >= 9 && (
                        <text x={x} y={y + 4} textAnchor="middle" fontSize={valley ? 13 : 10} fontWeight={700} fill="white" fontFamily="var(--font-mono)">
                          {n}
                        </text>
                      )}
                      {showLabel && (
                        <text
                          x={valley ? x + r + 8 : pl.labelSide === "left" ? x - r - 6 : x + r + 6}
                          y={valley ? y - r - 4 : y + 4}
                          textAnchor={pl.labelSide === "left" && !valley ? "end" : "start"}
                          fontSize={valley ? 13 : 11.5}
                          fontWeight={600}
                          fill={dim ? "var(--color-steel-soft)" : "var(--color-ink)"}
                          className={valley ? undefined : "max-sm:hidden"}
                          style={{ paintOrder: "stroke" }}
                          stroke="var(--color-paper)"
                          strokeWidth={4}
                        >
                          {pl.name}
                        </text>
                      )}
                    </motion.g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-(--color-line) px-4 py-3 text-xs text-(--color-steel)">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-(--color-brand-blue-vivid)" /> City (size = clients &amp; projects)
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-px w-4 bg-(--color-brand-blue-vivid)" /> Served from head office, Kathmandu
                </span>
                <span className="ml-auto font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-(--color-steel-soft)">
                  City-level positions
                </span>
              </div>
            </div>

            {/* Panel: overview → place → project */}
            <div className="relative min-h-[26rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={view.kind === "overview" ? `o-${sector}` : view.kind === "place" ? `p-${view.id}-${sector}` : `j-${view.slug}`}
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                  aria-live="polite"
                >
                  {view.kind === "overview" && (
                    <Overview
                      places={places}
                      total={total}
                      shown={shownCount}
                      unplaced={sector ? 0 : data.unplaced}
                      onOpen={openPlace}
                      onHover={setHover}
                    />
                  )}
                  {view.kind === "place" && (
                    <PlacePanel
                      place={PLACES.find((p) => p.id === view.id)!}
                      items={filtered.get(view.id) ?? { projects: [], clients: [] }}
                      onBack={() => setView({ kind: "overview" })}
                      onOpenProject={(slug) => setView({ kind: "project", slug, placeId: view.id })}
                    />
                  )}
                  {view.kind === "project" && (
                    <ProjectPanel
                      project={projects.find((p) => p.slug === view.slug)!}
                      placeName={PLACES.find((p) => p.id === view.placeId)!.name}
                      onBack={() => setView({ kind: "place", id: view.placeId })}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PanelHeader({ kicker, title, onBack, backLabel }: { kicker: string; title: string; onBack?: () => void; backLabel?: string }) {
  return (
    <div className="border-b border-(--color-line) px-5 py-4">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-(--color-brand-blue) hover:underline"
        >
          <span aria-hidden="true">&larr;</span> {backLabel}
        </button>
      )}
      <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-(--color-steel-soft)">{kicker}</p>
      <h3 className="mt-1 font-display text-title font-semibold leading-snug text-(--color-ink)">{title}</h3>
    </div>
  );
}

function Overview({
  places,
  total,
  shown,
  unplaced,
  onOpen,
  onHover,
}: {
  places: RadarPlace[];
  total: (id: string) => number;
  shown: number;
  unplaced: number;
  onOpen: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <PanelHeader kicker="On the map" title={`${shown} clients & projects · ${places.length} ${places.length === 1 ? "city" : "cities"}`} />
      <ul onPointerLeave={() => onHover(null)} className="max-h-[27rem] overflow-y-auto">
        {places.map((pl) => (
          <li key={pl.id} className="border-b border-(--color-line)">
            <button
              type="button"
              onClick={() => onOpen(pl.id)}
              onPointerEnter={() => onHover(pl.id)}
              onFocus={() => onHover(pl.id)}
              onBlur={() => onHover(null)}
              className="flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors hover:bg-(--color-paper-raised)"
            >
              <span className="flex-1">
                <span className="block text-[0.9375rem] font-medium text-(--color-ink)">{pl.name}</span>
                <span className="block text-xs text-(--color-steel)">{pl.region}</span>
              </span>
              <span className="font-mono text-sm tabular-nums text-(--color-brand-blue)">{total(pl.id)}</span>
              <span aria-hidden="true" className="text-(--color-steel-soft)">&rarr;</span>
            </button>
          </li>
        ))}
      </ul>
      {unplaced > 0 && (
        <p className="mt-auto px-5 py-4 text-xs leading-relaxed text-(--color-steel)">
          Plus {unplaced} banks, corporates and telecoms whose site cities aren&apos;t listed. All of them
          are in the{" "}
          <Link href={"/projects#client-register-heading" as Route} className="text-(--color-brand-blue) hover:underline">
            client register
          </Link>
          .
        </p>
      )}
    </div>
  );
}

function PlacePanel({
  place,
  items,
  onBack,
  onOpenProject,
}: {
  place: RadarPlace;
  items: { projects: Project[]; clients: RadarClient[] };
  onBack: () => void;
  onOpenProject: (slug: string) => void;
}) {
  const n = items.projects.length + items.clients.length;
  return (
    <div>
      <PanelHeader kicker={`${place.region} · ${n} organisation${n === 1 ? "" : "s"}`} title={place.name} onBack={onBack} backLabel="All cities" />
      <div className="max-h-[30rem] overflow-y-auto">
        {items.projects.length > 0 && (
          <>
            <p className="px-5 pt-4 pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-(--color-brand-blue)">
              Case studies · {items.projects.length}
            </p>
            <ul>
              {items.projects.map((p) => (
                <li key={p.slug} className="border-b border-(--color-line)">
                  <button
                    type="button"
                    onClick={() => onOpenProject(p.slug)}
                    className="flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors hover:bg-(--color-paper-raised)"
                  >
                    <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-[2px] bg-(--color-ink)">
                      {p.heroImage?.src ? (
                        <Image src={p.heroImage.src} alt="" fill sizes="112px" className="object-cover object-center" />
                      ) : (
                        <BluePlaceholder />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-(--color-ink)">{p.name}</span>
                      <span className="block text-xs text-(--color-steel)">{SHORT[p.industrySlug] ?? p.projectType}</span>
                    </span>
                    <span aria-hidden="true" className="text-(--color-steel-soft)">&rarr;</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
        {items.clients.length > 0 && (
          <>
            <p className="px-5 pt-4 pb-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-(--color-brand-blue)">
              Clients · {items.clients.length}
            </p>
            <ul className="pb-3">
              {items.clients.map((c) => (
                <li key={`${c.industrySlug}-${c.name}`} className="flex items-center gap-3 border-b border-(--color-line) px-5 py-2">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm text-(--color-ink)">{c.name}</span>
                    <span className="block text-xs text-(--color-steel)">{SHORT[c.industrySlug] ?? ""}</span>
                  </span>
                  {c.scope && (
                    <span className="shrink-0 rounded-full bg-(--color-brand-blue-tint) px-2 py-0.5 font-mono text-[0.5625rem] font-medium uppercase tracking-[0.1em] text-(--color-brand-blue)">
                      {c.scope}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function ProjectPanel({ project: p, placeName, onBack }: { project: Project; placeName: string; onBack: () => void }) {
  const systems = p.serviceSlugsDelivered.map((s) => getServiceBySlug(s)?.name).filter(Boolean);
  const industry = industries.find((i) => i.slug === p.industrySlug)?.name;
  return (
    <div>
      <div className="px-5 pt-4">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-xs font-medium text-(--color-brand-blue) hover:underline">
          <span aria-hidden="true">&larr;</span> {placeName}
        </button>
      </div>
      <div className="relative mx-5 mt-3 aspect-[16/10] overflow-hidden rounded-[3px] bg-(--color-ink)">
        {p.heroImage?.src ? (
          <Image src={p.heroImage.src} alt={p.heroImage.alt} fill sizes="(min-width: 1024px) 23rem, 100vw" className="object-cover object-center" />
        ) : (
          <BluePlaceholder label="Photography to follow" />
        )}
      </div>
      <div className="px-5 py-4">
        <h3 className="font-display text-title font-semibold leading-snug text-(--color-ink)">{p.name}</h3>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">Location</dt>
            <dd className="mt-0.5 text-(--color-ink)">{p.location}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">Sector</dt>
            <dd className="mt-0.5 text-(--color-ink)">{industry}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">Systems</dt>
            <dd className="mt-0.5 text-(--color-ink)">{systems.join(", ") || "—"}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">Status</dt>
            <dd className="mt-0.5 text-(--color-ink)">{STATUS[p.projectStatus]}</dd>
          </div>
        </dl>
        {p.airtechRole && p.airtechRole !== GENERIC_ROLE && (
          <p className="mt-3 text-sm leading-relaxed text-(--color-steel)">{p.airtechRole}</p>
        )}
        <Link
          href={`/projects/${p.slug}` as Route}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-(--color-brand-blue-vivid) px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-(--color-brand-blue-hover)"
        >
          Open case study <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
