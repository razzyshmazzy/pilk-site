"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Minimal, privacy-conscious notice. The site ships with NO analytics or
 * advertising trackers by default, so this is a transparency notice rather than
 * a consent gate. Dismissal is remembered in localStorage. If you later add
 * analytics, this is the natural place to wire in real consent.
 */
const STORAGE_KEY = "pilk.notice.dismissed.v1";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* localStorage unavailable — just don't show it */
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* no-op */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 p-4 animate-fade-up"
      role="region"
      aria-label="Cookie notice"
    >
      <div className="container-page">
        <div className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-cream-50 p-4 shadow-lift sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
          <p className="text-sm text-ink-700">
            Pilk uses only the essential storage needed to run this site — no
            advertising trackers. See our{" "}
            <Link href="/cookies" className="font-semibold text-pilk-400 underline underline-offset-2">
              Cookie Policy
            </Link>{" "}
            for details.
          </p>
          <button
            type="button"
            onClick={dismiss}
            className="btn-primary shrink-0 py-2.5 text-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
