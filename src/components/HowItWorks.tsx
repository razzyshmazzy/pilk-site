import { QrIcon, UsersIcon, SplitIcon, CheckCircleIcon } from "./icons";
import type { ComponentType, SVGProps } from "react";

interface Step {
  n: string;
  title: string;
  body: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const steps: Step[] = [
  {
    n: "01",
    title: "Start a table",
    body: "One person becomes the Captain and starts a Pilk room. That's the whole setup.",
    Icon: UsersIcon,
  },
  {
    n: "02",
    title: "Scan in",
    body: "Everyone scans the QR code and joins instantly — no accounts to create at the table.",
    Icon: QrIcon,
  },
  {
    n: "03",
    title: "Split it",
    body: "Each person confirms their share. Tax and tip are handled, so there's no napkin math.",
    Icon: SplitIcon,
  },
  {
    n: "04",
    title: "Pay",
    body: "The Captain pays the restaurant like normal. Pilk gets everyone else's part back to them.",
    Icon: CheckCircleIcon,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink text-balance sm:text-4xl">
            Four steps from “ready to go” to “already paid.”
          </h2>
          <p className="mt-4 text-lg text-ink-700 text-pretty">
            Pilk works around the restaurant&apos;s normal checkout instead of
            asking everyone to learn something new.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ n, title, body, Icon }) => (
            <li
              key={n}
              className="group relative flex flex-col rounded-3xl border border-ink/8 bg-cream-50 p-6
                transition-shadow duration-200 hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pilk-600 text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-display text-2xl font-extrabold text-ink-400/50">
                  {n}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{body}</p>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-base text-ink-600">
          The idea underneath is simple:{" "}
          <span className="font-semibold text-ink">
            why isn&apos;t paying as a group already this easy?
          </span>
        </p>
      </div>
    </section>
  );
}
