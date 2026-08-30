"use client";

import { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";
import { Label } from "@/components/ui/Label";
import type { Resource } from "@/content/types";

const KIND_LABELS: Record<Resource["kind"], string> = {
  guideline: "Guideline",
  bulletin: "Bulletin",
  download: "Download",
  insight: "Insight",
};

export function LibraryExplorer({ resources }: { resources: Resource[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const kindFilter = searchParams.get("kind") ?? "";

  const kinds = useMemo(() => Array.from(new Set(resources.map((r) => r.kind))), [resources]);

  const filtered = useMemo(
    () => (kindFilter ? resources.filter((r) => r.kind === kindFilter) : resources),
    [resources, kindFilter]
  );

  function setKind(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("kind", value);
    else params.delete("kind");
    const qs = params.toString();
    router.replace((qs ? `${pathname}?${qs}` : pathname) as never, { scroll: false });
  }

  return (
    <div>
      <div className="flex justify-center">
        <select
          value={kindFilter}
          onChange={(e) => setKind(e.target.value)}
          aria-label="Filter by document type"
          className="border border-(--color-line-strong) bg-(--color-paper-raised) px-5 py-2.5 text-sm font-medium text-(--color-ink) focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--color-brand-blue)"
        >
          <option value="">All document types</option>
          {kinds.map((kind) => (
            <option key={kind} value={kind}>
              {KIND_LABELS[kind]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((resource) => (
          <div key={resource.slug} className="group flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <BluePlaceholder label={resource.fileUrl ? undefined : "Document coming soon"} />
            </div>
            <Label tone="muted" className="mt-4">
              {KIND_LABELS[resource.kind]}
            </Label>
            <h3 className="mt-1 font-display text-xl font-semibold text-(--color-ink)">{resource.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-(--color-steel)">{resource.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
