/**
 * An intentional empty state, not a placeholder box — a marked point + a
 * short status note, in the same drawing-sheet-annotation vocabulary used
 * across the site. Centred by default to sit under the site's centred
 * section headers; pass align="left" where a left rail reads better.
 */
export function EmptyState({
  title,
  description,
  align = "center",
}: {
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  if (align === "left") {
    return (
      <div className="border-l-2 border-(--color-line-strong) py-10 pl-6 sm:py-12 sm:pl-8">
        <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
          {title}
        </p>
        {description && (
          <p className="mt-3 max-w-md text-small leading-relaxed text-(--color-steel)">{description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <span aria-hidden="true" className="mb-5 block h-px w-10 bg-(--color-brand-blue)" />
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-(--color-brand-blue)">
        {title}
      </p>
      {description && (
        <p className="mt-3 max-w-md text-small leading-relaxed text-(--color-steel)">{description}</p>
      )}
    </div>
  );
}
