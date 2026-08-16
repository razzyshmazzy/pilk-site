import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { primaryNav } from "@/lib/nav";

/**
 * Sticky top navigation. Server-rendered; only the mobile menu ships JS.
 * The waitlist CTA stays visible at every breakpoint.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {primaryNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-700
                transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/#waitlist" className="btn-primary text-sm">
            Join the waitlist
          </Link>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
