import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

/**
 * Pilk wordmark + mark. The mark is a rounded "drop" glyph (a nod to the milk
 * in "Pilk") with a subtle check tick inside — split + settled.
 */

export function PilkMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Pilk logo"
    >
      <path
        d="M16 2.5c4.6 5.2 9 9.9 9 15.4A9 9 0 0 1 16 27a9 9 0 0 1-9-9.1c0-5.5 4.4-10.2 9-15.4Z"
        className="fill-pilk-600"
      />
      <path
        d="m11.8 17.6 3 3 5.4-6"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 rounded-lg ${className}`}
      aria-label={`${siteConfig.name} — home`}
    >
      <PilkMark className="h-8 w-8 transition-transform duration-200 group-hover:-rotate-6" />
      {withText && (
        <span className="font-display text-2xl font-extrabold tracking-tight text-ink">
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}
