"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Route } from "next";
import type { NavGroup } from "@/lib/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function HeaderNav({ items }: { items: NavGroup[] }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenGroup(null);
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <>
      <div ref={navRef} className="hidden xl:flex items-center gap-1">
        {items.map((item) => (
          <div key={item.label} className="relative">
            {item.children ? (
              <button
                type="button"
                aria-expanded={openGroup === item.label}
                onClick={() => setOpenGroup((cur) => (cur === item.label ? null : item.label))}
                className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-(--color-ink) hover:text-(--color-brand-blue) transition-colors"
              >
                {item.label}
                <span aria-hidden="true" className={cn("text-[10px] transition-transform", openGroup === item.label && "rotate-180")}>
                  ▾
                </span>
              </button>
            ) : (
              <Link
                href={item.href as Route}
                className="block px-3.5 py-2 text-sm font-medium text-(--color-ink) hover:text-(--color-brand-blue) transition-colors"
              >
                {item.label}
              </Link>
            )}

            {item.children && openGroup === item.label && (
              <div className="absolute left-0 top-full mt-2 w-80 border border-(--color-line) bg-(--color-paper-raised) shadow-[0_12px_32px_-12px_rgba(13,21,36,0.25)] py-2">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href as Route}
                    onClick={() => setOpenGroup(null)}
                    className="block px-4 py-2.5 text-sm text-(--color-ink) hover:bg-(--color-paper) hover:text-(--color-brand-blue) transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-expanded={mobileOpen}
        aria-label="Open menu"
        onClick={() => setMobileOpen(true)}
        className="xl:hidden flex flex-col gap-1.5 p-2 -mr-2"
      >
        <span className="block h-[1.5px] w-6 bg-(--color-ink)" />
        <span className="block h-[1.5px] w-6 bg-(--color-ink)" />
        <span className="block h-[1.5px] w-4 bg-(--color-ink) self-end" />
      </button>

      {mobileOpen &&
        createPortal(
          <MobileMenu items={items} onClose={() => setMobileOpen(false)} />,
          document.body
        )}
    </>
  );
}

function MobileMenu({ items, onClose }: { items: NavGroup[]; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-(--color-paper) xl:hidden overflow-y-auto">
      <div className="flex items-center justify-between px-5 py-4 border-b border-(--color-line)">
        <span className="font-display text-title font-normal">Menu</span>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="p-2 -mr-2 font-mono text-2xl leading-none"
        >
          ×
        </button>
      </div>
      <nav className="px-5 py-4">
        {items.map((item) => (
          <div key={item.label} className="border-b border-(--color-line) py-1">
            {item.children ? (
              <>
                <button
                  type="button"
                  aria-expanded={expanded === item.label}
                  onClick={() => setExpanded((cur) => (cur === item.label ? null : item.label))}
                  className="flex w-full items-center justify-between py-3.5 text-lg font-medium"
                >
                  {item.label}
                  <span aria-hidden="true">{expanded === item.label ? "−" : "+"}</span>
                </button>
                {expanded === item.label && (
                  <div className="pb-3 pl-2 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href as Route}
                        onClick={onClose}
                        className="py-2.5 text-(--color-steel)"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link href={item.href as Route} onClick={onClose} className="block py-3.5 text-lg font-medium">
                {item.label}
              </Link>
            )}
          </div>
        ))}
        <div className="mt-6">
          <ButtonLink href="/contact/project-enquiry" size="lg" className="w-full" onClick={onClose}>
            Discuss Your Project
          </ButtonLink>
        </div>
      </nav>
    </div>
  );
}
