import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center py-20">
      <div className="container-page max-w-xl text-center">
        <p className="font-display text-7xl font-extrabold tracking-tight text-pilk-600">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-ink">
          This page skipped out on the check.
        </h1>
        <p className="mt-3 text-lg text-ink-600 text-pretty">
          We couldn&apos;t find the page you were looking for. It may have moved,
          or the link might be out of date.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back to home
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
          <Link href="/#waitlist" className="btn-secondary">
            Join the waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}
