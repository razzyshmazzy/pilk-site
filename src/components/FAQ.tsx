import { faqItems } from "@/lib/faq";
import { PlusIcon } from "./icons";

/**
 * FAQ accordion built on native <details>/<summary>, so it works without any
 * JavaScript and is keyboard + screen-reader accessible out of the box.
 */
export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink text-balance sm:text-4xl">
            Questions, answered honestly.
          </h2>
          <p className="mt-4 text-lg text-ink-700 text-pretty">
            Pilk is pre-launch, so we&apos;ll always tell you what&apos;s decided
            and what&apos;s still in progress.
          </p>
        </div>

        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {faqItems.map((item) => (
            <li key={item.q}>
              <details className="group py-1">
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-4 py-4
                    text-left font-display text-lg font-bold text-ink
                    marker:content-none focus-visible:rounded-lg"
                >
                  {item.q}
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                      border border-ink/15 text-ink-600 transition-transform duration-200
                      group-open:rotate-45 group-open:border-pilk-600 group-open:bg-pilk-600 group-open:text-white"
                    aria-hidden
                  >
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </summary>
                <p className="pb-5 pr-12 text-base leading-relaxed text-ink-600">
                  {item.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
