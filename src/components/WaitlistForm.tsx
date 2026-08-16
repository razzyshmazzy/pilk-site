"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { USE_CASES, isValidEmail } from "@/lib/validation";
import { CheckCircleIcon, SpinnerIcon, ArrowRightIcon } from "./icons";

type Status = "idle" | "submitting" | "success" | "duplicate" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [organization, setOrganization] = useState("");
  const [useCase, setUseCase] = useState("");
  const [honeypot, setHoneypot] = useState(""); // must stay empty
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  // Captured once on mount: form render time (bot heuristic) + ?ref= code.
  const renderedAt = useRef<number>(Date.now());
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    renderedAt.current = Date.now();
    try {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      if (ref) setReferralCode(ref);
    } catch {
      /* no-op */
    }
  }, []);

  const emailValid = useMemo(() => isValidEmail(email), [email]);
  const showEmailError = touched && email.length > 0 && !emailValid;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    setError(null);

    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName,
          organization,
          useCase,
          referralCode,
          company_website: honeypot,
          renderedAt: renderedAt.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        status?: string;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus(data.status === "duplicate" ? "duplicate" : "success");
    } catch {
      setStatus("error");
      setError("We couldn't reach the server. Please check your connection and try again.");
    }
  }

  if (status === "success" || status === "duplicate") {
    return (
      <div
        className="rounded-3xl border border-pilk-200 bg-pilk-50 p-8 text-center animate-pop-in sm:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pilk-600 text-white">
          <CheckCircleIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">
          {status === "duplicate" ? "You're already on the list." : "You're on the list."}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-ink-600">
          {status === "duplicate"
            ? "Looks like this email already joined — no need to sign up twice. We'll email you when Pilk is ready for early access."
            : "Thanks for joining. We'll email you when Pilk is ready for early access — no spam, just the important stuff."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-ink/10 bg-cream-50 p-6 shadow-soft sm:p-8"
    >
      {/* Honeypot: hidden from humans, tempting to bots. Not focusable, not read. */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
            Email <span className="text-pilk-700">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
            aria-invalid={showEmailError}
            aria-describedby={showEmailError ? "email-error" : undefined}
            className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink
              placeholder:text-ink-400 focus-visible:border-pilk-600
              focus-visible:ring-2 focus-visible:ring-pilk-600/40"
          />
          {showEmailError && (
            <p id="email-error" className="mt-1.5 text-sm font-medium text-melon-500">
              That email doesn&apos;t look quite right.
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-ink">
              First name <span className="font-normal text-ink-400">(optional)</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Alex"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink
                placeholder:text-ink-400 focus-visible:border-pilk-600
                focus-visible:ring-2 focus-visible:ring-pilk-600/40"
            />
          </div>
          <div>
            <label htmlFor="organization" className="mb-1.5 block text-sm font-semibold text-ink">
              School / company <span className="font-normal text-ink-400">(optional)</span>
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              autoComplete="organization"
              placeholder="Where you're at"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink
                placeholder:text-ink-400 focus-visible:border-pilk-600
                focus-visible:ring-2 focus-visible:ring-pilk-600/40"
            />
          </div>
        </div>

        <div>
          <label htmlFor="useCase" className="mb-1.5 block text-sm font-semibold text-ink">
            How would you use Pilk most often?{" "}
            <span className="font-normal text-ink-400">(optional)</span>
          </label>
          <select
            id="useCase"
            name="useCase"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink
              focus-visible:border-pilk-600 focus-visible:ring-2 focus-visible:ring-pilk-600/40"
          >
            <option value="">Pick one…</option>
            {USE_CASES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {status === "error" && error && (
          <p role="alert" className="text-sm font-medium text-melon-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary mt-1 w-full text-base disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <SpinnerIcon className="h-5 w-5" /> Joining…
            </>
          ) : (
            <>
              Join the waitlist
              <ArrowRightIcon className="h-5 w-5" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-ink-500">
          Just your email to start. We&apos;ll only use it to tell you about early
          access. No spam.
        </p>
      </div>
    </form>
  );
}
