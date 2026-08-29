import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-(--color-line-strong) px-2.5 py-1 font-sans text-label text-(--color-steel)",
        className
      )}
    >
      {children}
    </span>
  );
}
