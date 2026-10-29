import { getPublishedOffices } from "@/content/offices";
import { cn } from "@/lib/cn";

/**
 * Office cards, straight from src/content/offices.ts. Only published
 * offices render, and only the fields that exist, so the India office
 * appears the moment its record is filled in and published, with no
 * layout change. Pattern after Arup's regional pages: place, address,
 * direct contact, map.
 */
export function Offices({ className, tone = "light" }: { className?: string; tone?: "light" | "raised" }) {
  const list = getPublishedOffices();
  return (
    <ul className={cn("grid gap-4", list.length > 1 && "sm:grid-cols-2", className)}>
      {list.map((o) => (
        <li
          key={o.id}
          className={cn(
            "flex flex-col rounded-[3px] border border-(--color-line) p-6",
            tone === "raised" ? "bg-(--color-paper-raised)" : "bg-white"
          )}
        >
          <p className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] text-(--color-brand-blue)">
            {o.country}
            {!o.published && <span className="ml-2 text-(--color-steel)">· Preview, not published</span>}
          </p>
          <h3 className="mt-2 font-display text-[1.25rem] font-semibold text-(--color-ink)">
            {o.label}
            {o.city && <span className="font-normal text-(--color-steel)"> · {o.city}</span>}
          </h3>
          {o.address && <p className="mt-3 text-body leading-relaxed text-(--color-ink-soft)">{o.address}</p>}
          {o.regionNote && <p className="mt-2 text-small leading-relaxed text-(--color-steel)">{o.regionNote}</p>}
          {!o.address && !o.email && (
            <p className="mt-3 text-small leading-relaxed text-(--color-steel)">Office details to be announced.</p>
          )}
          <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1 pt-4">
            {o.email && (
              <a href={`mailto:${o.email}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-(--color-brand-blue) hover:underline">
                {o.email}
              </a>
            )}
            {o.phone && (
              <a href={`tel:${o.phone.replace(/[^+\d]/g, "")}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-(--color-brand-blue) hover:underline">
                {o.phone}
              </a>
            )}
            {o.mapUrl && (
              <a
                href={o.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-(--color-ink-soft) hover:text-(--color-brand-blue)"
              >
                Directions <span aria-hidden="true">&#8599;</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
