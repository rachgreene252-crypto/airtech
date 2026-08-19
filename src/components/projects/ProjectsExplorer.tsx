"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ProjectFeatureRow } from "./ProjectFeatureRow";
import { ProjectListRow } from "./ProjectListRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import type { Project, Industry, Service } from "@/content/types";

/**
 * An editorial portfolio index, not a uniform card grid (brief §12): projects
 * with real, sourced photography get a large alternating image band; the
 * rest render as a compact typographic list rather than a placeholder-filled
 * card. Location is deliberately not offered as a filter — most location
 * strings are free-text ("Gairidhara, Kathmandu", "Parasi, Nepal") rather
 * than clean city tags, and normalizing them would mean inventing
 * categorization the source data doesn't actually support.
 */
export function ProjectsExplorer({
  projects,
  industries,
  services,
}: {
  projects: Project[];
  industries: Industry[];
  services: Service[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const industryFilter = searchParams.get("industry") ?? "";
  const serviceFilter = searchParams.get("service") ?? "";

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (industryFilter && p.industrySlug !== industryFilter) return false;
      if (serviceFilter && !p.serviceSlugsDelivered.includes(serviceFilter)) return false;
      return true;
    });
  }, [projects, industryFilter, serviceFilter]);

  const featured = filtered.filter((p) => p.heroImage?.src);
  const listed = filtered.filter((p) => !p.heroImage?.src);

  function setFilter(key: "industry" | "service", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.push((qs ? `${pathname}?${qs}` : pathname) as never, { scroll: false });
  }

  function industryName(project: Project) {
    return industries.find((i) => i.slug === project.industrySlug)?.name;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-6 border-b border-(--color-line) pb-8">
        <FilterGroup
          label="Industry"
          value={industryFilter}
          onChange={(v) => setFilter("industry", v)}
          options={industries.map((i) => ({ value: i.slug, label: i.name }))}
        />
        <FilterGroup
          label="Service"
          value={serviceFilter}
          onChange={(v) => setFilter("service", v)}
          options={services.map((s) => ({ value: s.slug, label: s.name }))}
        />
        {(industryFilter || serviceFilter) && (
          <button
            type="button"
            onClick={() => router.push(pathname as never, { scroll: false })}
            className="self-end mb-0.5 font-mono text-xs uppercase tracking-[0.06em] text-(--color-signal) hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="mt-6 font-mono text-xs tracking-[0.06em] uppercase text-(--color-steel)">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      {filtered.length === 0 && (
        <div className="mt-10">
          <EmptyState title="No projects match these filters" description="Try clearing a filter or browse the full portfolio." />
        </div>
      )}

      {featured.length > 0 && (
        <div className="mt-10 border-t border-(--color-line)">
          {featured.map((project, i) => (
            <ProjectFeatureRow
              key={project.slug}
              project={project}
              industryName={industryName(project)}
              index={i + 1}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      )}

      {listed.length > 0 && (
        <div className={cn(featured.length > 0 && "mt-16")}>
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-(--color-steel)">
            Also in the portfolio
          </p>
          <div className="mt-2">
            {listed.map((project) => (
              <ProjectListRow key={project.slug} project={project} industryName={industryName(project)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block font-mono text-[11px] tracking-[0.1em] uppercase text-(--color-steel) mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        <FilterChip active={value === ""} onClick={() => onChange("")}>
          All
        </FilterChip>
        {options.map((o) => (
          <FilterChip key={o.value} active={value === o.value} onClick={() => onChange(o.value)}>
            {o.label}
          </FilterChip>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-11 px-3 py-1.5 text-xs border transition-colors",
        active
          ? "border-(--color-ink) bg-(--color-ink) text-(--color-paper)"
          : "border-(--color-line-strong) text-(--color-steel) hover:border-(--color-ink) hover:text-(--color-ink)"
      )}
    >
      {children}
    </button>
  );
}
