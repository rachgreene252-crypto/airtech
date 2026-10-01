import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

export interface StripPhoto {
  src: string;
  alt: string;
  caption: string;
  /** Project page this photo comes from. */
  href?: string;
}

/**
 * A row of real installation photographs for text-heavy pages
 * (2026-10-01, client: "add more photos on information heavy pages").
 * Every photo is the client's own site photography from a published
 * project, captioned with where it was taken and linked to that project.
 */
export function PhotoStrip({ photos, className }: { photos: StripPhoto[]; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6", className)}>
      {photos.map((photo, i) => {
        const body = (
          <>
            <span className="relative block aspect-[4/3] overflow-hidden border border-(--color-line) bg-(--color-paper-raised)">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </span>
            <span className="mt-3 flex items-baseline justify-between gap-3">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-(--color-steel) transition-colors group-hover:text-(--color-brand-blue)">
                {photo.caption}
              </span>
              {photo.href && (
                <span aria-hidden="true" className="text-(--color-brand-blue) transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              )}
            </span>
          </>
        );
        return (
          <li key={photo.src}>
            <Reveal delay={i * 0.08}>
              {photo.href ? (
                <Link href={photo.href as Route} className="group block">
                  {body}
                </Link>
              ) : (
                <figure className="group block">{body}</figure>
              )}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
