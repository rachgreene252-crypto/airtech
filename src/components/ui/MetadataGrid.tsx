export interface MetadataItem {
  label: string;
  value: string;
}

/**
 * Technical spec table — an "at a glance" grid of real project facts, never
 * fabricated data (only items with a real value render at all). Redesigned
 * 2026-09-24 from a plain definition list to icon-led tiles — per direct
 * feedback that the project page read "bland and robotic": most projects
 * have no sourced case-study narrative (challenge/approach/outcome are
 * empty for the entire portfolio today), so this spec grid is often the
 * *only* content-bearing element between the hero and the gallery. It needed
 * to carry real visual weight on its own, not read as an apologetic fallback.
 */
const ICONS: Record<string, React.ReactNode> = {
  Client: <path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6M4 21h16" />,
  Location: <path d="M12 21s7-6.1 7-11.3A7 7 0 0 0 5 9.7C5 14.9 12 21 12 21ZM12 12a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z" />,
  Industry: <path d="M4 21V9l6-4 6 4v12M4 21h16M10 21v-5h4v5M9 12h.01M9 15h.01M15 12h.01M15 15h.01" />,
  "Airtech role": <path d="m9 12 2 2 4-4M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />,
  "Project type": <path d="M3 7 12 3l9 4-9 4-9-4Zm0 5 9 4 9-4M3 17l9 4 9-4" />,
  Completion: <path d="M7 3v3M17 3v3M4 8h16M5 6h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm3 8 2.5 2.5L15.5 12" />,
  "Installed capacity": <path d="M12 3a9 9 0 1 0 6.4 15.4M12 3v6l4 2" />,
  Status: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-3-9 2 2 4-4" />,
};

function FieldIcon({ label }: { label: string }) {
  return (
    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-(--color-brand-blue-tint) text-(--color-brand-blue)">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {ICONS[label] ?? <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />}
      </svg>
    </span>
  );
}

export function MetadataGrid({ items }: { items: MetadataItem[] }) {
  const visible = items.filter((item) => Boolean(item.value));
  if (visible.length === 0) return null;

  return (
    <dl className="grid grid-cols-1 gap-4 border-t border-(--color-line-strong) pt-8 sm:grid-cols-2 lg:grid-cols-3">
      {visible.map((item) => (
        <div
          key={item.label}
          className="flex items-start gap-4 border border-(--color-line) bg-(--color-paper) p-5 transition-colors hover:border-(--color-brand-blue-soft)"
        >
          <FieldIcon label={item.label} />
          <div className="min-w-0">
            <dt className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-(--color-steel-soft)">
              {item.label}
            </dt>
            <dd className="mt-1.5 text-body-l leading-snug text-(--color-ink)">{item.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
