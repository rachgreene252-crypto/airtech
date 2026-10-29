"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "@/components/ui/Image";
import { cn } from "@/lib/cn";

export interface IndustryOption {
  slug: string;
  name: string;
  /** Lead photograph for the sector, if one exists. */
  thumb?: { src: string };
}

/**
 * The industry dropdown (2026-10-29; the client asked for "what you'd done
 * earlier with the dropdown to see projects based on industries"). Not a
 * native <select>: the trigger reads as a headline ("Hospitality ▾") and
 * opens a visual menu, each sector with its lead photograph. ARIA listbox
 * pattern: arrows / Home / End move, Enter or Space picks, Escape and Tab
 * close, typing a letter jumps to the next sector starting with it.
 */
export function IndustrySelect({
  options,
  value,
  onChange,
}: {
  options: IndustryOption[];
  value: string;
  onChange: (slug: string) => void;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.slug === value) ?? options[0];

  function openList() {
    setActive(Math.max(0, options.findIndex((o) => o.slug === value)));
    setOpen(true);
  }

  function close(focusButton = true) {
    setOpen(false);
    if (focusButton) buttonRef.current?.focus();
  }

  function pick(i: number) {
    onChange(options[i].slug);
    close();
  }

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    function onDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(`${id}-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, id]);

  function onListKey(e: React.KeyboardEvent) {
    const last = options.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: Math.min(last, active + 1),
      ArrowUp: Math.max(0, active - 1),
      Home: 0,
      End: last,
    };
    if (e.key in moves) {
      e.preventDefault();
      setActive(moves[e.key]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      setOpen(false);
    } else if (/^[a-z]$/i.test(e.key)) {
      const k = e.key.toLowerCase();
      const order = [...options.slice(active + 1), ...options.slice(0, active + 1)];
      const hit = order.find((o) => o.name.toLowerCase().startsWith(k));
      if (hit) setActive(options.indexOf(hit));
    }
  }

  return (
    <div ref={rootRef} className="relative min-w-0">
      <span id={`${id}-label`} className="block font-mono text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--color-steel)">
        Projects in
      </span>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => (open ? close() : openList())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            openList();
          }
        }}
        className="group mt-1 flex max-w-full items-center gap-3 rounded-[3px] text-left outline-offset-4"
      >
        <span
          id={`${id}-value`}
          className="font-display text-[1.5rem] font-semibold leading-[1.12] text-balance tracking-[-0.02em] text-(--color-ink) transition-colors group-hover:text-(--color-brand-blue) sm:text-[2.5rem]"
        >
          {current.name}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--color-line-strong) bg-(--color-paper) text-(--color-brand-blue) transition-all duration-300 group-hover:border-(--color-brand-blue-vivid) group-hover:bg-(--color-brand-blue-vivid) group-hover:text-white",
            open && "rotate-180 border-(--color-brand-blue-vivid) bg-(--color-brand-blue-vivid) text-white"
          )}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 6l4.5 4.5L12.5 6" />
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-30 mt-3 w-[min(46rem,calc(100vw-2.5rem))] overflow-hidden rounded-[4px] border border-(--color-line-strong) bg-white shadow-[0_30px_60px_-30px_rgba(5,29,43,0.45)]"
          >
            <ul
              ref={listRef}
              id={`${id}-list`}
              role="listbox"
              tabIndex={-1}
              aria-labelledby={`${id}-label`}
              aria-activedescendant={`${id}-opt-${active}`}
              onKeyDown={onListKey}
              className="grid max-h-[min(70vh,34rem)] grid-cols-1 overflow-y-auto p-2 outline-none sm:grid-cols-2"
            >
              {options.map((o, i) => {
                const selected = o.slug === value;
                return (
                  <li
                    key={o.slug}
                    id={`${id}-opt-${i}`}
                    role="option"
                    aria-selected={selected}
                    onClick={() => pick(i)}
                    onPointerMove={() => setActive(i)}
                    className={cn(
                      "flex min-h-14 cursor-pointer items-center gap-3 rounded-[3px] p-2 transition-colors",
                      i === active && "bg-(--color-brand-blue-tint)",
                      selected && "ring-1 ring-inset ring-(--color-brand-blue-vivid)"
                    )}
                  >
                    <span className="relative block aspect-[4/3] w-14 shrink-0 overflow-hidden rounded-[2px] bg-gradient-to-br from-(--color-blue-deep) to-(--color-brand-blue)">
                      {o.thumb && <Image src={o.thumb.src} alt="" fill sizes="56px" className="object-cover" />}
                    </span>
                    <span className={cn("flex-1 text-[0.9375rem] font-medium leading-snug", selected ? "text-(--color-brand-blue)" : "text-(--color-ink)")}>
                      {o.name}
                    </span>
                    {selected && (
                      <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="var(--color-brand-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8.5l3.2 3L13 4.5" />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
