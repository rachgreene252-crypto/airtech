export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex items-center gap-3 font-sans text-(--text-label) text-(--color-steel)">
        <span
          aria-hidden="true"
          className="h-3 w-3 border-2 border-(--color-signal) border-t-transparent rounded-full animate-spin"
        />
        Loading
      </div>
    </div>
  );
}
