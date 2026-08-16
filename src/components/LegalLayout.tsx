import { formatLegalDate, siteConfig } from "@/lib/site-config";

/**
 * Shared shell for legal documents: title, effective date, a lightweight note
 * that these are startup templates, and readable prose styling for children.
 */
export function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-14 sm:py-20">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm font-medium text-ink-500">
          Last updated {formatLegalDate(siteConfig.legalEffectiveDate)}
        </p>
        {intro && <p className="mt-4 text-lg text-ink-700 text-pretty">{intro}</p>}

        <div className="mt-6 rounded-2xl border border-butter-400/40 bg-butter-400/10 p-4 text-sm text-ink-700">
          This document is a startup template provided for transparency. It has
          not necessarily been reviewed by an attorney, and it isn&apos;t legal
          advice. We&apos;ll keep it up to date as Pilk grows.
        </div>

        <article className="legal-prose mt-4">{children}</article>
      </div>
    </div>
  );
}
