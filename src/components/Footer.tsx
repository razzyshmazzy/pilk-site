import Link from "next/link";
import { Logo } from "./Logo";
import { footerNav, legalNav } from "@/lib/nav";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-cream-50">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              A faster way for groups to split the restaurant check. Scan in,
              pick your share, and skip the post-dinner Venmo chase.
            </p>
            <p className="mt-4 text-sm font-semibold text-pilk-400">
              Split the check. Not the friendship.
            </p>
          </div>

          <nav aria-label="Footer" className="text-sm">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-ink-500">
              Pilk
            </h2>
            <ul className="mt-4 space-y-3">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-700 transition-colors hover:text-pilk-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="text-sm">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-ink-500">
              Legal
            </h2>
            <ul className="mt-4 space-y-3">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-700 transition-colors hover:text-pilk-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="text-ink-700 transition-colors hover:text-pilk-400"
                >
                  {siteConfig.supportEmail}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink/10 pt-6 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          {/* No legal entity is claimed in the copyright line until one exists. */}
          <p>© {year} Pilk. All rights reserved.</p>
          <p>Pilk is pre-launch. Nothing here is an offer of financial services.</p>
        </div>
      </div>
    </footer>
  );
}
