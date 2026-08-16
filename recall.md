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
- **Static export** (`output: "export"`) — deploys to **GitHub Pages** (or any
  static host) with no server required.
- Server Components by default; only the mobile menu, waitlist form, and cookie
  notice ship client-side JavaScript.
- Favicon (`public/icon.png`) and social card (`public/og.png`) were generated
  with `next/og` and are served as static assets.

> **Note:** Because the site is a static export, there is no server at runtime.
> The waitlist form posts to an external service (Formspree) — see
> [Waitlist](#waitlist) below.

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

All are optional for local development. Copy `.env.example` to `.env.local`. In
CI these are set by the deploy workflow and repo variables (see [Deployment](#deployment)).

| Variable                   | Required | Purpose                                                                                  |
| -------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Prod     | Deployment **origin** (no path), e.g. `https://gotpilk.com`. Used for absolute URLs.      |
| `NEXT_PUBLIC_BASE_PATH`    | Prod     | Base path the site is served under. Empty (`""`) for the custom domain; `/<repo>` for a project page. |
| `NEXT_PUBLIC_FORMSPREE_ID` | No       | Formspree form id to enable real waitlist submissions. Blank → email fallback.            |
| `NEXT_PUBLIC_BRAND_DOMAIN` | No       | Brand domain for contact emails (e.g. `gotpilk.com`). Independent of the hosting URL.     |
| `NEXT_PUBLIC_ANALYTICS_*`  | No       | Reserved for a privacy-conscious analytics provider (not wired by default).              |

`NEXT_PUBLIC_BASE_PATH` must match `basePath` in `next.config.mjs` — both read
the same variable, defaulting to `""` (root). The deploy workflow sets it
automatically: empty when `public/CNAME` exists, `/<repo>` otherwise.

**Never commit real secrets.** `.env` and `.env*.local` are gitignored.

---

## Waitlist

Static hosting has no server, so the waitlist form (`src/components/WaitlistForm.tsx`)
submits to an external form service rather than an internal API route.

**Enable real submissions (Formspree):**

1. Create a free form at [formspree.io](https://formspree.io).
2. Take the form id — the part after `/f/` in your endpoint
   (`https://formspree.io/f/**xxxxxxx**`).
3. Set it as a repo **variable** named `NEXT_PUBLIC_FORMSPREE_ID`
   (**Settings → Secrets and variables → Actions → Variables**), or in
   `.env.local` for local testing.

Signups then arrive in your Formspree inbox (email, first name, organization,
use case, and any referral code).

**If no Formspree id is set**, the form gracefully falls back to opening a
pre-filled email to your support address — so it is never broken, just manual.

What still runs entirely in the browser:

- **Client-side validation** and email formatting before submit.
- **Honeypot** field (`_gotcha`, which Formspree also respects) to deter bots.
- **Referral readiness**: a `?ref=CODE` query parameter is captured and sent as
  `referralCode` for future attribution.

> Duplicate prevention and server-side rate limiting are not possible on a pure
> static host. If you later move to a host with serverless functions (Vercel,
> Cloudflare, Netlify), you can reintroduce a real API route with dedupe.

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
.github/workflows/
  deploy.yml              # Build static export + deploy to GitHub Pages
public/
  icon.png                # Favicon (static)
  og.png                  # Social / Open Graph card (static)
  .nojekyll               # Tell GitHub Pages not to run Jekyll
src/
  app/
    layout.tsx            # Root layout, fonts, metadata, nav/footer/notice
    page.tsx              # Homepage (Hero, HowItWorks, WhyPilk, Waitlist, FAQ)
    about/                # /about
    contact/              # /contact
    privacy/ terms/ cookies/   # Legal pages
    error.tsx             # Route error boundary (friendly, no stack leaks)
    not-found.tsx         # 404
    sitemap.ts            # /sitemap.xml   (force-static)
    robots.ts             # /robots.txt    (force-static)
    globals.css           # Tailwind layers + base/component styles
  components/             # Navbar, Hero, PhoneMockup, WaitlistForm, Footer, ...
  lib/
    site-config.ts        # Central company/site configuration (edit this first)
    validation.ts         # Email/field validation + normalization
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

The site deploys to **GitHub Pages** via GitHub Actions
(`.github/workflows/deploy.yml`) on every push to `main`. It is served at the
custom domain **https://gotpilk.com** (configured via `public/CNAME`).

**One-time setup:**

1. In the repo: **Settings → Pages → Build and deployment → Source = GitHub
   Actions**.
2. Confirm the custom domain under **Settings → Pages → Custom domain** is
   `gotpilk.com` and that DNS points at GitHub Pages
   (`CNAME`/`ALIAS` to `<user>.github.io`, or the four Pages `A` records).
3. (Recommended) Add a repo **variable** `NEXT_PUBLIC_FORMSPREE_ID`
   (**Settings → Secrets and variables → Actions → Variables**) so the waitlist
   form submits real signups. See [Waitlist](#waitlist).
4. Push to `main`. The workflow builds the static export and publishes it.

The workflow adapts automatically: because `public/CNAME` exists, it builds for
`https://gotpilk.com` at the root. Delete `public/CNAME` and it falls back to a
project page at `https://<owner>.github.io/<repo>/`. Nothing is hardcoded in the
source — the domain lives only in `public/CNAME`.

> **Keep `public/CNAME`.** It's what makes the custom domain survive each
> deploy; without it in the build output, GitHub Pages can drop the domain.

**Build locally** (output lands in `out/`):

```bash
npm run build
npx serve out            # or any static file server
```

> By default (no base path) `npm run dev` serves at `http://localhost:3000`,
> matching the production root. To emulate a project-page path locally, set
> `NEXT_PUBLIC_BASE_PATH="/pilk-site"` in `.env.local`.

> **Security headers** (HSTS, `X-Frame-Options`, etc.) can't be set by a static
> host like GitHub Pages. If you move to a host that supports headers, add them
> back in `next.config.mjs` via `headers()`.

---

## Before Public Launch

Items requiring input from the Pilk founders or a legal review. Placeholders in
code are wrapped in brackets like `[PILK LEGAL ENTITY NAME]`.

- [ ] Insert Pilk legal entity name (`src/lib/site-config.ts` → `legalName`)
- [ ] Insert official business address if legally required (`site-config.ts` → `businessAddress`)
- [ ] Set official support/privacy contact email (`site-config.ts` — currently `hello@`/`privacy@` the brand domain; set `NEXT_PUBLIC_BRAND_DOMAIN`)
- [ ] Set governing law (`site-config.ts` → `governingLaw`)
- [ ] Decide arbitration / dispute-resolution terms (`src/app/terms/page.tsx` → section 18)
- [ ] Have the Privacy Policy reviewed by counsel
- [ ] Have the Terms of Service reviewed by counsel
- [ ] Confirm actual payment providers before describing them
- [ ] Confirm analytics/cookie behavior matches the Cookie Policy
- [ ] Enable GitHub Pages (Settings → Pages → Source = GitHub Actions)
- [ ] Set `NEXT_PUBLIC_FORMSPREE_ID` repo variable so waitlist signups are captured
- [ ] Test waitlist submissions end-to-end (check the Formspree inbox)
- [ ] Test mobile layouts on real devices
- [ ] Test accessibility (keyboard, screen reader, contrast)
- [ ] Verify the production build (`npm run build`)

---

## Notes on honesty

Pilk is pre-launch. This site deliberately contains **no** fabricated users,
transaction volume, investors, funding, partners, testimonials, ratings, press,
launch dates, or certifications. Please keep it that way until those things are
real and confirmed.
