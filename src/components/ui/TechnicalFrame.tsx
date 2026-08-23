import Image from "next/image";
import { cn } from "@/lib/cn";
import type { SanityImageRef } from "@/content/types";

/**
 * Signature imagery device: drawing-sheet crop marks around every photograph,
 * with an optional title-block caption underneath (mono, like a coordination
 * drawing's figure reference). When no real photograph has been supplied,
 * renders an honest placeholder rather than a fabricated stock image — see
 * docs/IMPLEMENTATION_AUDIT.md §8.
 */
export function TechnicalFrame({
  image,
  label,
  aspect = "aspect-[4/3]",
  className,
  priority,
  sizes = "100vw",
  showCaption = true,
}: {
  image?: SanityImageRef;
  label?: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /** Set false when a heading already follows this frame (e.g. project cards) to avoid repeating the name. */
  showCaption?: boolean;
}) {
  return (
    <figure className={cn("crop-frame text-(--color-ink)", className)}>
      <div className={cn("relative w-full overflow-hidden bg-(--color-ink)", aspect)}>
        {image?.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        ) : (
          <TechnicalPlaceholder label={label} />
        )}
      </div>
      {showCaption && (image?.caption || (label && image?.src)) && (
        <figcaption className="mt-2 font-mono text-[11px] tracking-[0.06em] uppercase text-(--color-steel)">
          {image?.caption ?? label}
        </figcaption>
      )}
    </figure>
  );
}

function TechnicalPlaceholder({ label }: { label?: string }) {
  return (
    <div
      className="absolute inset-0 flex items-end p-5"
      style={{
        backgroundColor: "var(--color-ink)",
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(245,244,240,0.06) 0px, rgba(245,244,240,0.06) 1px, transparent 1px, transparent 14px)",
      }}
    >
      <p className="font-mono text-[11px] tracking-[0.08em] uppercase text-(--color-paper)/70">
        Photography pending{label ? `: ${label}` : ""}
      </p>
    </div>
  );
}
