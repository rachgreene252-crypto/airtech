export interface MetadataItem {
  label: string;
  value: string;
}

/**
 * Technical spec table — an "at a glance" definition list, not icon-badge
 * pills. Renders only items that have a value; never shows fabricated data.
 */
export function MetadataGrid({ items }: { items: MetadataItem[] }) {
  const visible = items.filter((item) => Boolean(item.value));
  if (visible.length === 0) return null;

  return (
    <dl className="grid grid-cols-1 gap-x-14 gap-y-7 border-t border-(--color-line-strong) pt-8 sm:grid-cols-2">
      {visible.map((item) => (
        <div key={item.label} className="border-b border-(--color-line) pb-5">
          <dt className="font-sans text-label font-medium tracking-[0.01em] text-(--color-steel)">
            {item.label}
          </dt>
          <dd className="mt-2 text-lg text-(--color-ink)">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
