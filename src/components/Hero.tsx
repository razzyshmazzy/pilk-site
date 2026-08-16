import Link from "next/link";
import { PhoneMockup } from "./PhoneMockup";
import { ArrowRightIcon, BoltIcon } from "./icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft, contained background wash — no floating blobs. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px]
          bg-[radial-gradient(60%_60%_at_70%_10%,rgba(247,107,21,0.14),transparent_70%)]"
      />

      <div className="container-page relative grid gap-12 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:pb-24">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-pilk-200 bg-pilk-50 px-3 py-1 text-sm font-semibold text-pilk-800">
            <BoltIcon className="h-4 w-4" />
            Pilk is coming soon — get early access
          </span>

          <h1 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-ink text-balance sm:text-6xl">
            Split the check without doing the math.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700 text-pretty">
            Pilk lets everyone at the table pay their part while one person
            handles the restaurant check. Scan in, pick your share, and skip the
            post-dinner Venmo chase.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#waitlist" className="btn-primary text-base">
              Join the waitlist
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <Link href="/#how-it-works" className="btn-secondary text-base">
              See how it works
            </Link>
          </div>

          {/* Four-word promise — the whole product in one breath. */}
          <div className="mt-9 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-ink-600">
            {["Scan.", "Split.", "Pay.", "Done."].map((word, i) => (
              <span key={word} className="flex items-center gap-2">
                <span className={i === 3 ? "text-pilk-400" : "text-ink"}>
                  {word}
                </span>
                {i < 3 && <span aria-hidden className="text-ink-400">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Right: product mockup */}
        <div className="animate-fade-up [animation-delay:120ms]">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
