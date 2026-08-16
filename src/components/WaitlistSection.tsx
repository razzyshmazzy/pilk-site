import { WaitlistForm } from "./WaitlistForm";
import { CheckIcon } from "./icons";

const perks = [
  "Be first in line when early access opens",
  "Help shape how Pilk works before launch",
  "No spam — only the occasional important update",
];

export function WaitlistSection() {
  return (
    <section id="waitlist" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <div className="overflow-hidden rounded-[2.5rem] border border-ink/10 bg-cream-50 shadow-soft">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <p className="eyebrow">Get early access</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink text-balance sm:text-4xl">
                Join the waitlist.
              </h2>
              <p className="mt-4 text-lg text-ink-700 text-pretty">
                Pilk isn&apos;t open to everyone yet. Drop your email and
                you&apos;ll be among the first to try it when early access opens.
              </p>
              <ul className="mt-6 space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-ink-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pilk-100 text-pilk-700">
                      <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[15px]">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
