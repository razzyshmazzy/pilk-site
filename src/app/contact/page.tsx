import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, canonical } from "@/lib/site-config";
import { MailIcon, ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team.`,
  alternates: { canonical: canonical("/contact") },
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container-page max-w-2xl">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink text-balance sm:text-5xl">
          Say hello.
        </h1>
        <p className="mt-4 text-lg text-ink-700 text-pretty">
          Questions, press, partnerships, or just curious about what we&apos;re
          building? We read every message.
        </p>

        <div className="mt-10 rounded-3xl border border-ink/10 bg-cream-50 p-8">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pilk-600 text-white">
              <MailIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-medium text-ink-500">Email us</p>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="font-display text-xl font-bold text-ink hover:text-pilk-400"
              >
                {siteConfig.supportEmail}
              </a>
            </div>
          </div>
          <p className="mt-5 text-sm text-ink-600">
            We&apos;re a small team and Pilk is still pre-launch, so please give
            us a little time to reply.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-ink/10 bg-cream-50 p-8 text-ink">
          <h2 className="font-display text-xl font-bold">
            Looking for early access?
          </h2>
          <p className="mt-2 text-ink-600">
            The fastest way to hear about Pilk is the waitlist.
          </p>
          <Link href="/#waitlist" className="btn-primary mt-5">
            Join the waitlist
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
