import { ReceiptIcon, UsersIcon, BoltIcon, HeartIcon } from "./icons";
import type { ComponentType, SVGProps } from "react";

interface Reason {
  title: string;
  body: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const reasons: Reason[] = [
  {
    title: "No post-dinner Venmo chase",
    body: "Everyone settles their part at the table. You're not texting reminders three days later.",
    Icon: ReceiptIcon,
  },
  {
    title: "No pile of cards at checkout",
    body: "The server isn't running six cards. The Captain pays once, the restaurant's night stays simple.",
    Icon: UsersIcon,
  },
  {
    title: "No twenty-minute tax-and-tip debate",
    body: "Pilk splits the real total — tax and tip included — so nobody's doing arithmetic over dessert.",
    Icon: BoltIcon,
  },
  {
    title: "No one stuck floating the bill",
    body: "The Captain doesn't become everyone's least favorite debt collector. Their part comes back automatically.",
    Icon: HeartIcon,
  },
];

export function WhyPilk() {
  return (
    <section id="why-pilk" className="scroll-mt-24 bg-cream-50 py-20 text-ink sm:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-pilk-400">
            Why Pilk
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Dinner was fun. The spreadsheet afterward wasn&apos;t.
          </h2>
          <p className="mt-4 text-lg text-ink-600 text-pretty">
            Splitting a check is something people do constantly, and somehow it&apos;s
            still awkward. Pilk fixes the part everyone dreads.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {reasons.map(({ title, body, Icon }) => (
            <div
              key={title}
              className="flex gap-4 rounded-3xl border border-ink/10 bg-cream-200 p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pilk-500/15 text-pilk-400">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-ink">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
