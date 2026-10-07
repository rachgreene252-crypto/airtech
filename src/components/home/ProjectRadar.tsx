"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * 02 — THE PROJECT RADAR: "Where we have done it."
 *
 * Replaces the sector carousel (BuildingFor) and SystemsReveal's three-card
 * "Notable projects" row with one discovery surface: MAP → PLACE → PROJECT
 * → CASE STUDY. Every plotted project is a real entry in
 * src/content/projects.ts, placed at CITY level from its own `location`
 * field (see src/content/radar.ts for why no finer precision is claimed).
 * Projects with no published location are not plotted, and say so.
 * Hollow rings are cities from Airtech's healthcare client list (profile
 * deck slides 13-14): clients, not case studies, and labelled that way.
 */

const SHORT: Record<string, string> = {
  hospitality: "Hospitality",
  healthcare: "Healthcare",
  "corporate-commercial": "Commercial",
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

function placeFor(p: Project): RadarPlace | undefined {
  const loc = p.location?.toLowerCase();
  if (!loc) return undefined;
  return PLACES.find((pl) => pl.matches.some((m) => loc.includes(m)));
}

type View = { kind: "overview" } | { kind: "place"; id: string } | { kind: "project"; slug: string; placeId: string };

export function ProjectRadar() {
  const reduce = useReducedMotion();
  const [sector, setSector] = useState<string>("");
  const [view, setView] = useState<View>({ kind: "overview" });
  const [hover, setHover] = useState<string | null>(null);

  const located = useMemo(() => projects.map((p) => ({ p, place: placeFor(p) })), []);
  const unplotted = located.filter((x) => !x.place).length;

  const sectors = useMemo(() => {
    const counts = new Map<string, number>();
    for (const { p, place } of located) if (place) counts.set(p.industrySlug, (counts.get(p.industrySlug) ?? 0) + 1);
    return industries.filter((i) => counts.has(i.slug)).map((i) => ({ slug: i.slug, count: counts.get(i.slug)! }));
  }, [located]);

  const byPlace = useMemo(() => {
    const m = new Map<string, Project[]>();
    for (const { p, place } of located) {
      if (!place || (sector && p.industrySlug !== sector)) continue;
      m.set(place.id, [...(m.get(place.id) ?? []), p]);
    }
    return m;
  }, [located, sector]);

  const plottedCount = [...byPlace.values()].reduce((n, l) => n + l.length, 0);
  const projectPlaces = PLACES.filter((pl) => byPlace.has(pl.id));
  const clientPlaces = PLACES.filter((pl) => pl.clients?.length && !byPlace.has(pl.id));
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
              <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-(--color-brand-blue)">
                03 · Where we work
              </p>
              <h2 className="mt-4 font-display text-display-l font-semibold leading-[1.06] text-balance text-(--color-ink)">
                Where we have done it.
              </h2>
            </div>
            <p className="max-w-xl text-body-l leading-relaxed text-(--color-steel) lg:justify-self-end">
              Airtech projects across Nepal, plotted by city. Select a location to see the buildings,
              then open any project&apos;s case study.
            </p>
          </div>
        </Reveal>

        {/* Sector filter */}
        <div
          role="group"
          aria-label="Filter the map by sector"
          className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {[{ slug: "", count: located.length - unplotted }, ...sectors].map((s) => {
            const active = sector === s.slug;
            return (
              <button
                key={s.slug || "all"}
                type="button"
                onClick={() => changeSector(s.slug)}
                aria-pressed={active}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "border-(--color-ink) bg-(--color-ink) text-white"
                    : "border-(--color-line-strong) bg-(--color-paper) text-(--color-ink-soft) hover:border-(--color-ink)"
                )}
              >
                {s.slug ? SHORT[s.slug] ?? s.slug : "All sectors"}
                <span className={cn("font-mono text-[0.6875rem] tabular-nums", active ? "text-white/70" : "text-(--color-steel-soft)")}>
                  {s.count}
                </span>
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
                aria-label="Map of Nepal with Airtech project locations"
              >
                <defs>
                  <clipPath id="radar-frame">
                    <rect x={-40} y={-30} width={MAP_W + 80} height={MAP_H + 70} />
                  </clipPath>
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
                  fill="var(--color-paper-raised)"
                  stroke="var(--color-ink-soft)"
                  strokeOpacity={0.5}
                  strokeWidth={1.4}
                  strokeLinejoin="round"
                />

                {/* Network: head office → each project city */}
                <g aria-hidden="true">
                  {projectPlaces
                    .filter((pl) => pl.id !== "kathmandu-valley")
                    .map((pl, i) => {
                      const [x, y] = project(pl.lon, pl.lat);
                      const on = !focusId || focusId === pl.id;
                      return (
                        <motion.path
                          key={`${pl.id}-${sector}`}
                          d={`M${hx},${hy} Q${(hx + x) / 2},${Math.min(hy, y) - 60} ${x},${y}`}
                          fill="none"
                          stroke="var(--color-brand-blue-vivid)"
                          strokeWidth={1}
                          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                          whileInView={{ pathLength: 1, opacity: on ? 0.55 : 0.15 }}
                          animate={{ opacity: on ? 0.55 : 0.15 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        />
                      );
                    })}
                </g>

                {/* Client cities (hollow) */}
                {clientPlaces.map((pl) => {
                  const [x, y] = project(pl.lon, pl.lat);
                  const active = focusId === pl.id;
                  const dim = !!sector && sector !== "healthcare";
                  return (
                    <g
                      key={pl.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${pl.name}, ${pl.region}: healthcare clients`}
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
                      className="cursor-pointer outline-none [&:focus-visible>circle.ring]:stroke-(--color-brand-blue)"
                      opacity={dim ? 0.3 : 1}
                    >
                      <circle cx={x} cy={y} r={16} fill="transparent" />
                      <circle
                        className="ring"
                        cx={x}
                        cy={y}
                        r={active ? 6.5 : 4.5}
                        fill="var(--color-paper)"
                        stroke={active ? "var(--color-brand-blue-vivid)" : "var(--color-steel)"}
                        strokeWidth={1.4}
                      />
                      {active && (
                        <text x={x + 10} y={y + 4} fontSize={12} fontWeight={600} fill="var(--color-ink)" style={{ paintOrder: "stroke" }} stroke="var(--color-paper-raised)" strokeWidth={4}>
                          {pl.name}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Project cities (filled) */}
                {projectPlaces.map((pl, i) => {
                  const [x, y] = project(pl.lon, pl.lat);
                  const n = byPlace.get(pl.id)!.length;
                  const r = 6 + Math.sqrt(n) * 3.2;
                  const active = focusId === pl.id;
                  const dim = !!focusId && !active;
                  const valley = pl.id === "kathmandu-valley";
                  return (
                    <motion.g
                      key={pl.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${pl.name}: ${n} project${n === 1 ? "" : "s"}`}
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
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    >
                      <circle cx={x} cy={y} r={Math.max(r + 8, 18)} fill="transparent" />
                      <motion.circle
                        cx={x}
                        cy={y}
                        initial={false}
                        animate={{ r: active ? r + 7 : r + 3, opacity: active ? 0.25 : 0.12 }}
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
                      {n > 1 && (
                        <text x={x} y={y + 4} textAnchor="middle" fontSize={valley ? 12 : 10} fontWeight={700} fill="white" fontFamily="var(--font-mono)">
                          {n}
                        </text>
                      )}
                      <text
                        x={valley ? x + r + 8 : pl.labelSide === "left" ? x - r - 6 : x + r + 6}
                        y={valley ? y - r - 4 : pl.labelSide === "left" ? y + 14 : y + 4}
                        textAnchor={pl.labelSide === "left" ? "end" : "start"}
                        fontSize={valley ? 13 : 11.5}
                        fontWeight={600}
                        fill={dim ? "var(--color-steel-soft)" : "var(--color-ink)"}
                        // Below 640px the map is an overview; the location
                        // list under it carries the names at a readable size.
                        className={valley ? undefined : "max-sm:hidden"}
                        style={{ paintOrder: "stroke" }}
                        stroke="var(--color-paper-raised)"
                        strokeWidth={4}
                      >
                        {pl.name}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-(--color-line) px-4 py-3 text-xs text-(--color-steel)">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-(--color-brand-blue-vivid)" /> Project city (size = projects)
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-(--color-steel) bg-(--color-paper)" /> Healthcare client city
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-px w-4 bg-(--color-brand-blue-vivid)" /> Link to head office, Kathmandu
                </span>
                <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-[0.14em] text-(--color-steel-soft)">
                  City-level positions
                </span>
              </div>
            </div>

            {/* Panel: overview → place → project */}
            <div className="relative min-h-[26rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={view.kind === "overview" ? `o-${sector}` : view.kind === "place" ? `p-${view.id}` : `j-${view.slug}`}
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                  aria-live="polite"
                >
                  {view.kind === "overview" && (
                    <Overview
                      places={projectPlaces}
                      byPlace={byPlace}
                      total={plottedCount}
                      unplotted={sector ? 0 : unplotted}
                      onOpen={openPlace}
                      onHover={setHover}
                    />
                  )}
                  {view.kind === "place" && (
                    <PlacePanel
                      place={PLACES.find((p) => p.id === view.id)!}
                      items={byPlace.get(view.id) ?? []}
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
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-(--color-steel-soft)">{kicker}</p>
      <h3 className="mt-1 font-display text-title font-semibold leading-snug text-(--color-ink)">{title}</h3>
    </div>
  );
}

function Overview({
  places,
  byPlace,
  total,
  unplotted,
  onOpen,
  onHover,
}: {
  places: RadarPlace[];
  byPlace: Map<string, Project[]>;
  total: number;
  unplotted: number;
  onOpen: (id: string) => void;
  onHover: (id: string | null) => void;
}) {
  return (
    <div>
      <PanelHeader kicker="On the map" title={`${total} projects · ${places.length} ${places.length === 1 ? "city" : "cities"}`} />
      <ul onPointerLeave={() => onHover(null)}>
        {places.map((pl) => (
          <li key={pl.id} className="border-b border-(--color-line)">
            <button
              type="button"
              onClick={() => onOpen(pl.id)}
              onPointerEnter={() => onHover(pl.id)}
              onFocus={() => onHover(pl.id)}
              onBlur={() => onHover(null)}
              className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-(--color-paper-raised)"
            >
              <span className="flex-1">
                <span className="block text-[0.9375rem] font-medium text-(--color-ink)">{pl.name}</span>
                <span className="block text-xs text-(--color-steel)">{pl.region}</span>
              </span>
              <span className="font-mono text-sm tabular-nums text-(--color-brand-blue)">{byPlace.get(pl.id)!.length}</span>
              <span aria-hidden="true" className="text-(--color-steel-soft)">&rarr;</span>
            </button>
          </li>
        ))}
      </ul>
      {unplotted > 0 && (
        <p className="px-5 py-4 text-xs leading-relaxed text-(--color-steel)">
          {unplotted} further project{unplotted === 1 ? " has" : "s have"} no published location yet and{" "}
          {unplotted === 1 ? "is" : "are"} listed on the{" "}
          <Link href="/projects" className="text-(--color-brand-blue) hover:underline">
            projects page
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
  items: Project[];
  onBack: () => void;
  onOpenProject: (slug: string) => void;
}) {
  if (items.length === 0 && place.clients?.length) {
    return (
      <div>
        <PanelHeader kicker={place.region} title={place.name} onBack={onBack} backLabel="All locations" />
        <div className="px-5 py-4">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-(--color-brand-blue)">Healthcare clients</p>
          <ul className="mt-3 space-y-2">
            {place.clients.map((c) => (
              <li key={c} className="text-[0.9375rem] text-(--color-ink)">
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-(--color-steel)">
            From Airtech&apos;s published client list. Case studies for these sites have not been published yet.
          </p>
          <Link
            href={"/projects?industry=healthcare" as Route}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-(--color-brand-blue) hover:underline"
          >
            Healthcare projects <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <PanelHeader
        kicker={`${place.region} · ${items.length} project${items.length === 1 ? "" : "s"}`}
        title={place.name}
        onBack={onBack}
        backLabel="All locations"
      />
      <ul className="max-h-[30rem] overflow-y-auto">
        {items.map((p) => (
          <li key={p.slug} className="border-b border-(--color-line)">
            <button
              type="button"
              onClick={() => onOpenProject(p.slug)}
              className="flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors hover:bg-(--color-paper-raised)"
            >
              <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-[2px] bg-(--color-ink)">
                {p.heroImage?.src ? (
                  <Image src={p.heroImage.src} alt="" fill sizes="56px" className="object-cover object-center" />
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
            <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">Location</dt>
            <dd className="mt-0.5 text-(--color-ink)">{p.location}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">Sector</dt>
            <dd className="mt-0.5 text-(--color-ink)">{industry}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">Systems</dt>
            <dd className="mt-0.5 text-(--color-ink)">{systems.join(", ") || "—"}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-(--color-steel-soft)">Status</dt>
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
