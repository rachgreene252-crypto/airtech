export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="crop-frame border border-dashed border-(--color-line-strong) px-6 py-16 text-center text-(--color-steel)">
      <p className="font-mono text-xs tracking-[0.1em] uppercase text-(--color-steel-soft)">{title}</p>
      {description && <p className="mt-2 text-sm max-w-md mx-auto">{description}</p>}
    </div>
  );
}
