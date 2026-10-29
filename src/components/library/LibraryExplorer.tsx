"use client";

import { useMemo, useState } from "react";
import { RESOURCE_KIND_LABELS as KIND_LABELS } from "@/content/resources";
import { siteSettings } from "@/content/site-settings";
import { cn } from "@/lib/cn";
import type { Resource } from "@/content/types";

/**
 * The Engineering Library as a document register (2026-10-29). It used to be
 * a grid of blank blue "PDF in preparation" tiles, which read as unfinished.
 * Each document is now a row with what it covers and a working action:
 * "Download" once Airtech supplies the file (set `fileUrl` in
 * src/content/resources.ts), until then "Request a copy", an email to the
 * engineering team with the document named in the subject.
 */
export function LibraryExplorer({ resources }: { resources: Resource[] }) {
  const kinds = useMemo(() => Array.from(new Set(resources.map((r) => r.kind))), [resources]);
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
      {kinds.length > 1 && (
        <div role="group" aria-label="Filter by document type" className="flex flex-wrap gap-2">
          {[{ value: "", label: "All documents" }, ...kinds.map((k) => ({ value: k, label: KIND_LABELS[k] }))].map((k) => {
            const on = kindFilter === k.value;
            return (
              <button
                key={k.value || "all"}
                type="button"
                aria-pressed={on}
                onClick={() => setKind(k.value)}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors",
                  on
                    ? "border-(--color-brand-blue-vivid) bg-(--color-brand-blue-vivid) text-white"
                    : "border-(--color-line-strong) bg-(--color-paper) text-(--color-ink-soft) hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
                )}
              >
                {k.label}
              </button>
            );
          })}
        </div>
      )}

      <h2 className="sr-only">Documents</h2>
      <ol className="mt-8 border-t border-(--color-line-strong)">
        {filtered.map((resource, i) => (
          <li key={resource.slug} className="grid gap-4 border-b border-(--color-line) py-6 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6">
            <span aria-hidden="true" className="hidden font-mono text-[0.75rem] tabular-nums text-(--color-steel) sm:block">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-(--color-brand-blue)">
                {KIND_LABELS[resource.kind]}
                <span className="text-(--color-steel)"> · {resource.fileUrl ? "PDF" : "On request"}</span>
              </p>
              <h3 className="mt-1.5 font-display text-[1.25rem] font-semibold leading-snug text-(--color-ink)">{resource.title}</h3>
              <p className="mt-1.5 max-w-2xl text-body leading-relaxed text-(--color-steel)">{resource.summary}</p>
            </div>
            {resource.fileUrl ? (
              <a
                href={resource.fileUrl}
                download
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-(--color-brand-blue-vivid) px-5 text-sm font-semibold text-white transition-colors hover:bg-(--color-brand-blue)"
              >
                Download <span aria-hidden="true">&darr;</span>
              </a>
            ) : (
              <a
                href={`mailto:${siteSettings.primaryEmail}?subject=${encodeURIComponent(`Document request: ${resource.title}`)}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-(--color-line-strong) bg-(--color-paper) px-5 text-sm font-semibold text-(--color-ink) transition-colors hover:border-(--color-brand-blue) hover:text-(--color-brand-blue)"
              >
                Request a copy
                <span className="sr-only">of the {resource.title}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
