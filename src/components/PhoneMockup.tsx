import { QrCode } from "./QrCode";
import { CheckIcon } from "./icons";

/**
 * A pure HTML/CSS/SVG product mockup of the Pilk "split" screen, framed inside a
 * phone. No images, no external assets — crisp at any size and fast to render.
 * Decorative overall, so the frame is aria-hidden; the surrounding copy carries
 * the meaning for assistive tech.
 */

interface Diner {
  name: string;
  amount: string;
  tone: string; // avatar background
  status: "paid" | "you" | "pending";
}

const diners: Diner[] = [
  { name: "Maya", amount: "$28.40", tone: "bg-pilk-500", status: "paid" },
  { name: "You", amount: "$24.50", tone: "bg-cream-200", status: "you" },
  { name: "Devin", amount: "$31.10", tone: "bg-teal-500", status: "paid" },
  { name: "Priya", amount: "$19.75", tone: "bg-butter-500", status: "pending" },
];

function Avatar({ name, tone }: { name: string; tone: string }) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone} text-sm font-bold text-white`}
    >
      {name === "You" ? "Y" : name[0]}
    </span>
  );
}

export function PhoneMockup() {
  return (
    <div aria-hidden className="relative mx-auto w-[300px] select-none sm:w-[340px]">
      {/* Phone frame */}
      <div className="relative rounded-[2.75rem] border-[6px] border-black bg-black p-2 shadow-phone">
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.25rem] bg-cream-50">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-4 text-[11px] font-semibold text-ink">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-pilk-500" /> Table 12
            </span>
          </div>

          {/* App header */}
          <div className="px-5 pt-4">
            <p className="text-xs font-medium text-ink-500">Da Vinci Trattoria</p>
            <div className="mt-1 flex items-baseline justify-between">
              <h3 className="font-display text-xl font-extrabold text-ink">
                Your share
              </h3>
              <span className="rounded-full bg-pilk-100 px-2.5 py-1 text-xs font-bold text-pilk-800">
                4 diners
              </span>
            </div>
          </div>

          {/* Your amount card */}
          <div className="mx-5 mt-3 rounded-2xl bg-pilk-600 p-4 text-white">
            <p className="text-xs font-medium text-white/70">You owe</p>
            <p className="font-display text-3xl font-extrabold tracking-tight">
              $24.50
            </p>
            <p className="mt-0.5 text-[11px] text-white/70">
              Includes tax &amp; 18% tip
            </p>
          </div>

          {/* Diner list */}
          <ul className="mt-3 space-y-1 px-5 pb-2">
            {diners.map((d) => (
              <li
                key={d.name}
                className={`flex items-center gap-3 rounded-xl px-2 py-2 ${
                  d.status === "you" ? "bg-pilk-50" : ""
                }`}
              >
                <Avatar name={d.name} tone={d.tone} />
                <span className="flex-1 text-sm font-semibold text-ink">
                  {d.name}
                </span>
                <span className="text-sm font-semibold text-ink-700">
                  {d.amount}
                </span>
                {d.status === "paid" ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-white">
                    <CheckIcon className="h-3 w-3" strokeWidth={3} />
                  </span>
                ) : (
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      d.status === "you" ? "bg-pilk-500" : "bg-ink-400/40"
                    }`}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Pay button */}
          <div className="px-5 pb-6 pt-1">
            <div className="flex w-full items-center justify-center gap-2 rounded-full bg-pilk-600 py-3 text-sm font-bold text-white shadow-soft">
              Confirm &amp; pay my part
            </div>
          </div>
        </div>
      </div>

      {/* Floating QR "join" card. Links to razzyshmazzy.com for now; later this
          will point at the app-store download and only show on mobile.
          tabIndex -1 keeps it out of the tab order since the mockup is
          decorative (aria-hidden). */}
      <a
        href="https://razzyshmazzy.com"
        tabIndex={-1}
        className="group absolute -right-8 top-24 hidden rotate-[6deg] animate-fade-up rounded-2xl bg-cream-50 p-3 shadow-lift ring-1 ring-ink/10 transition-transform duration-200 hover:rotate-0 hover:shadow-phone sm:block"
      >
        <QrCode className="h-24 w-24" />
        <p className="mt-1.5 text-center text-[10px] font-semibold text-ink-600">
          Scan to join
        </p>
      </a>

      {/* Floating "settled" chip */}
      <div className="absolute -right-4 bottom-16 flex items-center gap-2 rounded-full bg-cream-50 px-3 py-2 shadow-lift ring-1 ring-ink/10">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-white">
          <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        <span className="pr-1 text-xs font-bold text-ink">Settled up</span>
      </div>
    </div>
  );
}
