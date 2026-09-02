"use client";

import { useMemo, useState } from "react";
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";
import { Label } from "@/components/ui/Label";
import { RESOURCE_KIND_LABELS as KIND_LABELS } from "@/content/resources";
import type { Resource } from "@/content/types";

export function LibraryExplorer({ resources }: { resources: Resource[] }) {
  const kinds = useMemo(() => Array.from(new Set(resources.map((r) => r.kind))), [resources]);

  // Local filter state (not `useSearchParams`) so the full grid renders on the
  // server and ships in the initial HTML — keeps the route static and out of a
  // client-only Suspense boundary whose reveal shifts layout. Selecting a type
  // still writes `?kind=` for a shareable link.
  const [kindFilter, setKindFilter] = useState("");

  const filtered = useMemo(
    () => (kindFilter ? resources.filter((r) => r.kind === kindFilter) : resources),
    [resources, kindFilter]
  );

  function setKind(value: string) {
    setKindFilter(value);
    const params = new URLSearchParams(window.location.search);
    if (value) params.set("kind", value);
    else params.delete("kind");
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
  }

  return (
    <div>
      <div className="flex justify-center">
        <select
          value={kindFilter}
          onChange={(e) => setKind(e.target.value)}
          aria-label="Filter by document type"
          className="select-field"
        >
          <option value="">All document types</option>
          {kinds.map((kind) => (
            <option key={kind} value={kind}>
              {KIND_LABELS[kind]}
            </option>
          ))}
        </select>
      </div>

      <h2 className="sr-only">Documents</h2>
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
