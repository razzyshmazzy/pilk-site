"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Shows a friendly message and never leaks internal
 * error detail to visitors. The digest lets us correlate with server logs.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Logged for diagnostics; not shown to the user.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center py-20">
      <div className="container-page max-w-xl text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink">
          Something went wrong.
        </h1>
        <p className="mt-3 text-lg text-ink-600 text-pretty">
          Sorry about that — an unexpected error occurred. You can try again, or
          head back home.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn-primary">
            Try again
          </button>
          <Link href="/" className="btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
