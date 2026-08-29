import Image from "next/image";
import { cn } from "@/lib/cn";
import type { SanityImageRef } from "@/content/types";
import { BluePlaceholder } from "@/components/ui/BluePlaceholder";

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
          <BluePlaceholder label={label ? `${label} — photography to follow` : undefined} />
        )}
      </div>
      {showCaption && (image?.caption || (label && image?.src)) && (
        <figcaption className="mt-2 font-sans text-label text-(--color-steel)">
          {image?.caption ?? label}
        </figcaption>
      )}
    </figure>
  );
}
