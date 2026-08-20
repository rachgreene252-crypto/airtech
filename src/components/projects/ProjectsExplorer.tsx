"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ProjectFeatureRow, type FeatureVariant } from "./ProjectFeatureRow";
import { ProjectListRow } from "./ProjectListRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import type { Project, Industry, Service } from "@/content/types";

const VARIANT_CYCLE: FeatureVariant[] = ["side", "overlay", "side-reversed", "typographic"];

/**
 * An editorial portfolio, not a filterable grid — no bordered filter-chip
 * row, no "N projects" counter, no card wall. Filters are plain typography;
 * featured projects cycle through four distinct compositions rather than
 * repeating image-left/text-right for every entry (brief's explicit
 * acceptance test: first impression should read "premium engineering
 * portfolio," not "filterable grid").
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
      <div className="flex flex-col gap-4">
        <FilterRow
          label="Industry"
          value={industryFilter}
          onChange={(v) => setFilter("industry", v)}
          options={industries.map((i) => ({ value: i.slug, label: i.name }))}
        />
        <FilterRow
          label="Service"
          value={serviceFilter}
          onChange={(v) => setFilter("service", v)}
          options={services.map((s) => ({ value: s.slug, label: s.name }))}
        />
      </div>

      {filtered.length === 0 && (
        <div className="mt-16">
          <EmptyState title="No projects match these filters" description="Try clearing a filter or browse the full portfolio." />
        </div>
      )}

      {featured.length > 0 && (
        <div className="mt-4">
          {featured.map((project, i) => (
            <ProjectFeatureRow
              key={project.slug}
              project={project}
              industryName={industryName(project)}
              index={i + 1}
              variant={VARIANT_CYCLE[i % VARIANT_CYCLE.length]}
            />
          ))}
        </div>
      )}

      {listed.length > 0 && (
        <div className={cn(featured.length > 0 && "mt-16 border-t border-(--color-line) pt-4")}>
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

/**
 * Filters as inline typography, not bordered pill buttons — a plain
 * label + comma-separated links, the active one distinguished by color and
 * weight rather than a filled box. Disappears into the reading experience
 * rather than reading as an admin control panel.
 */
function FilterRow({
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
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
      <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-(--color-steel-soft)">{label}</span>
      <FilterLink active={value === ""} onClick={() => onChange("")}>
        All
      </FilterLink>
      {options.map((o) => (
        <FilterLink key={o.value} active={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </FilterLink>
      ))}
    </div>
  );
}

function FilterLink({
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
        "text-sm transition-colors",
        active ? "font-semibold text-(--color-ink) underline underline-offset-4" : "text-(--color-steel) hover:text-(--color-ink)"
      )}
    >
      {children}
    </button>
  );
}
