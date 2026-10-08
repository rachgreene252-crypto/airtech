"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "@/components/ui/Image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { SanityImageRef } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Project "On site" gallery with a full-screen viewer (2026-09-29). The
 * client's installation photography (VRF plant, cassettes, ductwork) is
 * the strongest proof of engineering on the site, so every photo opens
 * large: click/Enter to open, ←/→ or swipe to move, Esc or the backdrop
 * to close. Thumbnails crop from the centre.
 */
function Thumb({
image,
index,
count,
onOpen,
className,
}: {
image: SanityImageRef;
index: number;
count: number;
onOpen: (index: number, trigger: HTMLButtonElement) => void;
className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(index, e.currentTarget)}
      className={cn(
        "group relative block w-full overflow-hidden rounded-[4px] bg-(--color-ink) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-blue)",
        className
      )}
      aria-label={`Open photo ${index + 1} of ${count}: ${image.alt}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 90vw, 120vw"
        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <span
        aria-hidden="true"
        className="absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" />
        </svg>
      </span>
    </button>
  );
}

export function ProjectGallery({ images, projectName }: { images: SanityImageRef[]; projectName: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);

  const count = images.length;
  const go = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + count) % count)),
    [count]
  );
  const close = useCallback(() => {
    setOpen(null);
    lastTrigger.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, go, close]);

  const [lead, ...rest] = images;
  const openAt = (index: number, trigger: HTMLButtonElement) => {
    lastTrigger.current = trigger;
    setOpen(index);
  };
  const current = open === null ? null : images[open];

  return (
    <>
      {count === 1 ? (
        // A lone photo is never stretched past its own pixel width (several
        // supplied gallery photos are 770–1020px wide); it centres instead.
        <div className="mx-auto w-full" style={lead.width ? { maxWidth: lead.width } : undefined}>
          <Thumb image={lead} index={0} count={count} onOpen={openAt} className="aspect-[16/9]" />
        </div>
      ) : rest.length === 4 ? (
        // 1 + 4: lead fills a 2×2 block beside a 2×2 of thumbnails — no gaps.
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          <Thumb image={lead} index={0} count={count} onOpen={openAt} className="col-span-2 row-span-2 aspect-[4/3] lg:aspect-auto lg:h-full" />
          {rest.map((img, i) => (
            <Thumb key={img.src} image={img} index={i + 1} count={count} onOpen={openAt} className="aspect-[4/3]" />
          ))}
        </div>
      ) : (
        // Any other count: wide lead, then one even row of thumbnails.
        <div className="space-y-4 sm:space-y-5">
          <Thumb image={lead} index={0} count={count} onOpen={openAt} className="aspect-[16/9] lg:aspect-[21/9]" />
          <div
            className={cn(
              "grid gap-4 sm:gap-5",
              rest.length === 1 ? "grid-cols-1" : rest.length === 2 ? "grid-cols-2" : "grid-cols-3"
            )}
          >
            {rest.map((img, i) => (
              <Thumb
                key={img.src}
                image={img}
                index={i + 1}
                count={count}
                onOpen={openAt}
                className={rest.length === 1 ? "aspect-[21/9]" : "aspect-[4/3]"}
              />
            ))}
          </div>
        </div>
      )}
      <p className={`mt-4 text-small text-(--color-steel) ${count === 1 ? "text-center" : ""}`}>
        {count} {count === 1 ? "photo" : "photos"} · select to enlarge
      </p>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${projectName} photo ${open + 1} of ${count}`}
            className="fixed inset-0 z-[100] flex flex-col bg-[rgba(8,14,20,0.97)] backdrop-blur-sm"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-white/70">
                {String(open + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M3 3l10 10M13 3 3 13" />
                </svg>
              </button>
            </div>

            <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.src}
                  className="absolute inset-0 mx-4 sm:mx-20"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <Image src={current.src} alt={current.alt} fill sizes="100vw" loading="eager" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              {/* Warm the neighbours so ←/→ is instant, not a fresh fetch. */}
              {count > 1 &&
                [open - 1, open + 1].map((n) => {
                  const img = images[(n + count) % count];
                  return (
                    <div key={`pre-${img.src}`} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
                      <Image src={img.src} alt="" fill sizes="100vw" loading="eager" className="object-contain" />
                    </div>
                  );
                })}
              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="absolute top-1/2 left-2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-5 sm:flex"
                    aria-label="Previous photo"
                  >
                    &larr;
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="absolute top-1/2 right-2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-5 sm:flex"
                    aria-label="Next photo"
                  >
                    &rarr;
                  </button>
                </>
              )}
            </div>

            <div className="px-4 py-4 text-center sm:px-6" onClick={(e) => e.stopPropagation()}>
              <p className="text-sm text-white/85">{current.alt}</p>
              {current.credit && <p className="mt-1 text-[0.6875rem] text-white/50">{current.credit}</p>}
              {count > 1 && (
                <div className="mt-3 flex justify-center gap-1.5">
                  {images.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setOpen(i)}
                      aria-label={`Show photo ${i + 1}`}
                      aria-current={i === open}
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        i === open ? "w-6 bg-(--color-brand-blue-vivid)" : "w-1.5 bg-white/35 hover:bg-white/60"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
