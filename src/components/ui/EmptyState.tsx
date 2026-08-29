/**
 * An intentional empty state, not a placeholder box — a dashed-border
 * rectangle reads as "something's missing"; this reads as a considered
 * status note, in the same drawing-sheet-annotation vocabulary used
 * throughout the site (a marked point + label, not a container).
 */
export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="border-l-2 border-(--color-line-strong) py-10 pl-6 sm:py-14 sm:pl-8">
      <p className="font-sans text-label font-medium text-(--color-brand-blue)">{title}</p>
      {description && (
        <p className="mt-3 max-w-md text-sm text-(--color-steel) leading-relaxed">{description}</p>
      )}
    </div>
  );
}
