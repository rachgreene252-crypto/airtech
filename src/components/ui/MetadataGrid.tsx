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
    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 border-t border-(--color-line) pt-6">
      {visible.map((item) => (
        <div key={item.label} className="border-b border-(--color-line) pb-4">
          <dt className="font-sans text-(--text-label) font-medium text-(--color-steel)">
            {item.label}
          </dt>
          <dd className="mt-1.5 text-lg text-(--color-ink)">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
