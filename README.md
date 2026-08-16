# Pilk — Website

The official public website for **Pilk**, a faster way for groups to split
restaurant checks. It explains the product, captures a waitlist, and hosts the
legal pages. Built to be deployed publicly and used immediately.

> **Scan. Split. Pay. Done.**

Pilk is **pre-launch**. This site intentionally avoids claiming capabilities,
partnerships, or metrics that don't exist yet.

---

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 3**
- Server Components by default; only the mobile menu, waitlist form, and cookie
  notice ship client-side JavaScript.
- Favicon and social/Open Graph image are **generated at build time** (`next/og`)
  — no binary assets to maintain.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

## Scripts

| Command             | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the dev server (http://localhost:3000)  |
| `npm run build`     | Production build                              |
| `npm run start`     | Serve the production build                    |
| `npm run lint`      | ESLint (next/core-web-vitals + typescript)    |
| `npm run typecheck` | TypeScript type check (`tsc --noEmit`)        |

---

## Environment variables

All are optional for local development. Copy `.env.example` to `.env.local`.

| Variable                      | Required | Purpose                                                                 |
| ----------------------------- | -------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | Prod     | Canonical URL for metadata, sitemap, Open Graph. e.g. `https://pilk.com`|
| `DATABASE_URL`                | No       | Postgres connection string for waitlist storage. If empty, a local JSON file is used. |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN`| No       | Reserved for a privacy-conscious analytics provider (not wired by default). |
| `NEXT_PUBLIC_ANALYTICS_SRC`   | No       | Reserved for an analytics script src (not wired by default).            |

**Never commit real secrets.** `.env` and `.env*.local` are gitignored.

---

## Waitlist & database

The waitlist is a real, functional form backed by a small storage abstraction
(`src/lib/waitlist.ts`). It selects an adapter automatically:

- **No `DATABASE_URL`** → **file store** (development fallback). Writes to
  `.data/waitlist.json` (gitignored). Zero setup — great for local work.
- **`DATABASE_URL` set** → **Postgres store**. Works with Supabase, Neon, RDS,
  etc. Requires the optional `pg` package:

  ```bash
  npm install pg
  ```

The Postgres adapter creates its table on first use. Schema:

```sql
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id            BIGSERIAL PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  first_name    TEXT,
  organization  TEXT,
  use_case      TEXT,
  referral_code TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Submission handling** (`src/app/api/waitlist/route.ts`):

- Server-side validation and email normalization (lowercased, trimmed).
- Duplicate prevention by email (case-insensitive).
- Spam defenses: hidden **honeypot** field, minimum fill-time check, and a
  best-effort per-IP **rate limit** (in-memory; back it with Redis/Upstash for
  multi-instance production).
- **Referral readiness**: a `?ref=CODE` query parameter is captured and stored as
  `referralCode` for future referral attribution.
- Safe errors: never returns stack traces or internal detail to the client.

To add another backend (e.g. an HTTP form service), implement the
`WaitlistStore` interface and wire it into `getWaitlistStore()`.

---

## Analytics

No analytics or advertising trackers are included by default. The Cookie Policy
reflects this. If you add a privacy-conscious provider later (e.g. Plausible,
Fathom), keep the integration isolated, wire consent into
`src/components/CookieNotice.tsx` where appropriate, and update
`src/app/cookies/page.tsx` to describe it.

---

## Project structure

```
src/
  app/
    layout.tsx            # Root layout, fonts, metadata, nav/footer/notice
    page.tsx              # Homepage (Hero, HowItWorks, WhyPilk, Waitlist, FAQ)
    about/                # /about
    contact/              # /contact
    privacy/              # /privacy
    terms/                # /terms
    cookies/              # /cookies
    api/waitlist/route.ts # Waitlist POST endpoint
    error.tsx             # Route error boundary (friendly, no stack leaks)
    not-found.tsx         # 404
    icon.tsx              # Favicon (generated)
    opengraph-image.tsx   # Social card (generated)
    sitemap.ts            # /sitemap.xml
    robots.ts             # /robots.txt
    globals.css           # Tailwind layers + base/component styles
  components/             # Navbar, Hero, PhoneMockup, WaitlistForm, Footer, ...
  lib/
    site-config.ts        # Central company/site configuration (edit this first)
    validation.ts         # Email/field validation + normalization
    waitlist.ts           # Storage abstraction (file + Postgres adapters)
    rate-limit.ts         # In-memory rate limiter
    nav.ts                # Navigation link definitions
    faq.ts                # FAQ content (also feeds FAQ structured data)
```

---

## Editing content

- **Company-wide values** (name, domain, support email, effective dates,
  governing law, waitlist settings): `src/lib/site-config.ts`. Legal pages and
  metadata read from here, so change values once.
- **Homepage copy**: the relevant component in `src/components/`.
- **FAQ**: `src/lib/faq.ts` (updates both the on-page FAQ and its structured data).
- **Legal pages**: `src/app/{privacy,terms,cookies}/page.tsx`, which use the
  shared `LegalLayout` and pull entity/contact values from `site-config.ts`.

---

## Deployment

Recommended: **Vercel** (first-class Next.js support).

1. Push this repo to GitHub/GitLab and import it into Vercel.
2. Set environment variables in the Vercel project settings:
   - `NEXT_PUBLIC_SITE_URL` = your production URL (e.g. `https://pilk.com`)
   - `DATABASE_URL` (if using Postgres) — and add `pg` to dependencies.
3. Deploy. Build command `next build`, output is handled automatically.

Any Node host works too:

```bash
npm run build
npm run start   # serves the production build
```

Security headers (HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`) are set in `next.config.mjs`.

---

## Before Public Launch

Items requiring input from the Pilk founders or a legal review. Placeholders in
code are wrapped in brackets like `[PILK LEGAL ENTITY NAME]`.

- [ ] Insert Pilk legal entity name (`src/lib/site-config.ts` → `legalName`)
- [ ] Insert official business address if legally required (`site-config.ts` → `businessAddress`)
- [ ] Set official support/privacy contact email (`site-config.ts` — currently derived as `hello@`/`privacy@` your domain)
- [ ] Set the production domain (`NEXT_PUBLIC_SITE_URL`)
- [ ] Set governing law (`site-config.ts` → `governingLaw`)
- [ ] Decide arbitration / dispute-resolution terms (`src/app/terms/page.tsx` → section 18)
- [ ] Have the Privacy Policy reviewed by counsel
- [ ] Have the Terms of Service reviewed by counsel
- [ ] Confirm actual payment providers before describing them
- [ ] Confirm analytics/cookie behavior matches the Cookie Policy
- [ ] Configure a production database (`DATABASE_URL` + `npm install pg`)
- [ ] Configure email infrastructure for waitlist notifications
- [ ] Test waitlist submissions end-to-end in production
- [ ] Test mobile layouts on real devices
- [ ] Test accessibility (keyboard, screen reader, contrast)
- [ ] Verify the production build (`npm run build`)

---

## Notes on honesty

Pilk is pre-launch. This site deliberately contains **no** fabricated users,
transaction volume, investors, funding, partners, testimonials, ratings, press,
launch dates, or certifications. Please keep it that way until those things are
real and confirmed.
