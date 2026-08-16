"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { primaryNav } from "@/lib/nav";
import { MenuIcon, CloseIcon, ArrowRightIcon } from "./icons";

/**
 * Accessible mobile navigation.
 * - Toggle button with aria-expanded / aria-controls.
 * - Focus moves into the panel on open and returns to the toggle on close.
 * - Escape closes; body scroll is locked while open.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus to the first link for keyboard users.
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn-ghost -mr-2 h-11 w-11 rounded-full p-0"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/40 animate-fade-in"
            tabIndex={-1}
          />
          <div
            ref={panelRef}
            id="mobile-menu"
            className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col
              bg-cream-50 p-6 shadow-lift animate-fade-in"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold">Menu</span>
              <button
                type="button"
                onClick={close}
                className="btn-ghost h-11 w-11 rounded-full p-0"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-1" aria-label="Primary">
              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="rounded-xl px-3 py-3 text-lg font-medium text-ink hover:bg-ink/5"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-6">
              <Link
                href="/#waitlist"
                onClick={close}
                className="btn-primary w-full text-lg"
              >
                Join the waitlist
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
