import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { canonical } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Paying for dinner with friends is bizarrely complicated. Pilk is building a payment experience designed around the fact that purchases are often made by groups.",
  alternates: { canonical: canonical("/about") },
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="container-page max-w-3xl">
        <p className="eyebrow">About Pilk</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink text-balance sm:text-5xl">
          Paying for dinner shouldn&apos;t be the hard part.
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink-700 text-pretty">
          <p>
            Splitting a check is something people do all the time — and somehow
            it&apos;s still a mess. Someone fronts the whole bill. Everyone
            promises to pay them back. Then come the Venmo requests, the “I got
            you next time,” and the friend who quietly never settles up.
          </p>
          <p>
            We think that&apos;s strange. Most software assumes a purchase is
            made by one person. But real life is full of group purchases —
            dinners, trips, group gifts, the house tab. The tools just
            haven&apos;t caught up.
          </p>
          <p>
            Pilk is building a payment experience designed around groups from the
            start. One person handles the check with the restaurant, everyone
            else pays their own part, and nobody has to play accountant
            afterward.
          </p>
          <p>
            We&apos;re early, and we&apos;re building carefully — money deserves
            that. We&apos;d rather tell you what&apos;s real than dress up a
            pre-launch product with things it can&apos;t do yet.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-ink/10 bg-cream-50 p-8">
          <h2 className="font-display text-xl font-bold text-ink">
            Want to be part of the early group?
          </h2>
          <p className="mt-2 text-ink-600">
            Join the waitlist and you&apos;ll be among the first to try Pilk when
            early access opens.
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
