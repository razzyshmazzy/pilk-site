You are building the official public website for **Pilk**, a startup creating a faster way for groups to split restaurant checks.

Your job is to create a polished, production-quality website that can be deployed publicly and used immediately to collect a waitlist.

## 1. Product Context

Pilk solves the awkward restaurant bill-splitting problem.

The core experience is:

1. One person at the table becomes the **Captain**.
2. The Captain starts a Pilk room.
3. Pilk displays a QR code.
4. Everyone at the table scans it and joins.
5. Diners select/confirm what they owe.
6. Each diner authorizes their own payment method.
7. The Captain pays the restaurant normally.
8. Pilk handles getting the other diners' portions back to the Captain.

The user-facing idea should feel dramatically simpler than the financial infrastructure underneath it.

The customer should think:

**Scan. Split. Pay. Done.**

Do NOT overwhelm visitors with payment-rail terminology, card networks, issuing, acquiring, settlement, reimbursement infrastructure, fraud models, or backend complexity.

Pilk is still pre-launch / early-stage, so do NOT make claims implying that:

* Pilk is currently processing live payments if it is not.
* Pilk has partnerships with Stripe, Visa, Mastercard, TabaPay, banks, or other providers unless explicitly provided.
* Pilk is a bank.
* Pilk itself provides FDIC insurance.
* Pilk has launched nationally.
* Pilk has regulatory approvals that have not actually been obtained.

Use language such as:

* "Join the waitlist"
* "Coming soon"
* "We're building..."
* "Get early access"

where appropriate.

---

# 2. Technical Stack

Use:

* **Next.js**
* **TypeScript**
* **React**
* **Tailwind CSS**
* App Router
* Responsive/mobile-first design

Use a clean project structure and reusable components.

Do not create a giant monolithic page component.

Components should include things like:

* Navbar
* Hero
* HowItWorks
* ProductDemo / phone mockup
* Benefits
* FAQ
* WaitlistForm
* Footer
* LegalLayout
* Cookie/analytics notice if needed

The site must run correctly with:

```bash
npm install
npm run dev
```

and must successfully build with:

```bash
npm run build
```

Before finishing, run the build and fix all TypeScript, linting, hydration, accessibility, and compilation errors.

---

# 3. Visual Direction

Pilk should feel like a modern consumer fintech startup rather than a corporate bank.

Think:

* extremely clean
* playful but credible
* youthful
* fast
* minimal
* mobile-native
* slightly irreverent
* trustworthy enough to handle money

Avoid generic crypto aesthetics.

Avoid excessive gradients, floating blobs, glassmorphism everywhere, stock photography, fake dashboards, and generic AI-startup design.

The website should look distinctive enough that somebody remembers **Pilk** afterward.

Create a simple visual identity for now if one doesn't already exist.

Use **Pilk** prominently as the wordmark.

Primary CTA:

**Join the Waitlist**

Secondary CTA can be something like:

**See how it works**

Create subtle interaction and movement with CSS or lightweight animation, but prioritize speed.

Respect `prefers-reduced-motion`.

---

# 4. Homepage

Create `/`.

## Navigation

Desktop:

* Pilk logo / wordmark
* How it works
* FAQ
* About
* Join waitlist button

Mobile:

* compact responsive navigation / menu

Keep the CTA visible.

---

# 5. Hero

The hero must communicate the product in a few seconds.

Possible positioning:

**Split the check without doing the math.**

Supporting idea:

Pilk lets everyone at the table pay their part while one person handles the restaurant check.

CTA:

**Join the Waitlist**

Include an interactive-looking phone/product mockup illustrating the flow.

Do NOT simply put paragraphs of copy next to a gradient rectangle.

Make the product visually understandable.

---

# 6. Product Walkthrough

Create an attractive visual explanation of the experience.

Something like:

### 1. Start a table

One person starts the Pilk room.

### 2. Scan in

Friends scan the QR code and join instantly.

### 3. Split it

Everyone confirms their share.

### 4. Pay

The Captain pays the restaurant. Pilk handles the rest.

The exact wording can be improved, but preserve this simplicity.

Show the QR/joining interaction visually.

The site should make users think:

> "Why isn't paying with a group already this easy?"

---

# 7. Why Pilk

Explain pain points without being melodramatic.

Possible ideas:

* No chasing friends for Venmo afterward.
* No handing six cards to a server.
* No twenty-minute argument over tax and tip.
* No one person getting stuck waiting for everyone to repay them.
* Works around the restaurant's existing checkout experience instead of requiring diners to learn something complicated.

Be careful not to claim capabilities we have not launched.

---

# 8. Waitlist

This is one of the most important pieces of the website.

Create a real functional waitlist form.

Fields:

Required:

* Email

Optional:

* First name
* School / company / organization

Optional segmentation question:

**How would you use Pilk most often?**

Options:

* Dinner with friends
* College / student groups
* Work meals
* Trips
* Something else

Keep initial signup friction low.

The email field alone should be enough to join.

After submission, show a polished success state:

**You're on the list.**

Add brief language saying we'll email them when Pilk is ready for early access.

### Data

Create a clean abstraction for saving waitlist submissions.

If no external database credentials are available, implement the code so it can easily be connected to something like Supabase/Postgres later.

Preferably support environment variables such as:

```env
DATABASE_URL=
NEXT_PUBLIC_SITE_URL=
```

Do NOT hard-code private credentials.

If a database is unavailable during development, provide a safe development fallback rather than breaking the entire site.

Prevent obvious duplicate waitlist entries by email.

Normalize emails.

Add server-side validation.

Add basic spam protection / honeypot protection.

Do not expose the database directly from the browser.

Use a server action or API route.

Create an appropriate database schema or migration if the selected persistence layer requires it.

---

# 9. Referral Readiness

Architect the waitlist so we can eventually add referrals such as:

`pilk.com/?ref=ABC123`

You do not need to build a huge referral system right now, but retain the `ref` query parameter with the waitlist signup when present.

Store it as something like:

`referralCode`

This should make future referral attribution straightforward.

---

# 10. Legal Pages

Create:

* `/privacy`
* `/terms`
* `/cookies`

Also add links to them in the footer.

These must be professionally formatted, readable, and mobile responsive.

IMPORTANT:

These documents are **startup legal templates**, not a claim that attorneys have reviewed them.

Do not invent Pilk's:

* legal corporate entity name
* registered address
* state of incorporation
* financial institution partners
* bank relationships
* regulatory licenses

Where legally important company information is currently unknown, use clearly marked placeholders such as:

`[PILK LEGAL ENTITY NAME]`

and place all unresolved legal placeholders in an obvious developer checklist in the README.

Do not display ugly developer comments to ordinary website visitors unnecessarily.

---

# 11. Privacy Policy

Create a comprehensive Privacy Policy appropriate for an early-stage US consumer technology / fintech-oriented service.

It should cover, as applicable:

* Effective date
* Who operates Pilk
* Scope
* Information users provide
* Waitlist information
* Account information
* Payment information once applicable
* Transaction information once applicable
* Device and technical information
* Usage information
* Communications
* Cookies
* Analytics
* Fraud prevention and security
* Why information is processed
* Service providers
* Payment providers
* Legal disclosures
* Corporate transactions
* Data retention
* Security
* Children's privacy
* US state privacy rights where applicable
* California privacy disclosures where applicable
* International users
* Changes to the policy
* Contact information

Make it accurate to an early-stage product.

For payment information, explain that payment credentials may eventually be processed by third-party payment providers rather than claiming Pilk necessarily stores full card numbers itself.

Do not promise absolute security.

Do not say:

"We will never share your information"

because legitimate service providers and legal disclosures may require sharing.

Do not say:

"We sell your data"

unless that's actually intended.

Default assumption: **Pilk does not sell personal information for money and does not intend to operate an advertising-data business.**

Do not falsely claim regulatory compliance or certifications.

---

# 12. Terms of Service

Create comprehensive Terms of Service appropriate for a pre-launch US startup that intends to facilitate group payments.

Include sections covering:

* Acceptance of terms
* Eligibility
* Accounts
* Accurate information
* Pilk's role
* Payment services
* Third-party payment providers
* Authorizations
* Group payment responsibilities
* Captain responsibilities
* Other diner responsibilities
* Failed payments
* Refunds
* Disputes
* Chargebacks
* Prohibited conduct
* Fraud
* Abuse
* Intellectual property
* Feedback
* Third-party services
* Availability
* Beta / pre-release functionality
* Modification of services
* Disclaimers
* Limitation of liability
* Indemnification
* Termination
* Governing law placeholder
* Dispute resolution placeholder
* Arbitration / class action waiver placeholder if appropriate
* Changes to terms
* Contact

Be especially careful with language describing Pilk's payment role.

Do not claim Pilk is itself a bank, card network, or financial institution.

Clearly distinguish Pilk's software/service from third-party financial infrastructure.

Because Pilk is still developing its final payment architecture, avoid unnecessarily locking us into one exact processor or settlement mechanism.

Use flexible wording like:

> Pilk may work with banks, payment processors, card networks, financial technology providers, and other third parties to enable payment functionality.

Do not mention specific payment companies unless they are intentionally being disclosed.

---

# 13. Cookie Policy

Create a cookie policy describing:

* Essential cookies/storage
* Preferences
* Analytics
* Marketing cookies if eventually enabled
* Third-party technology
* Browser controls
* Changes
* Contact

Only describe technologies actually included in the website.

If the site currently uses no advertising cookies, say so rather than pretending it does.

---

# 14. Cookie / Analytics Consent

Design the website so privacy-invasive analytics are not silently added without consideration.

If analytics are included:

* keep the integration isolated
* support consent where appropriate
* do not load unnecessary advertising trackers
* make it easy to replace the analytics provider

For initial implementation, prefer privacy-conscious basic analytics.

Do not add Facebook Pixel, TikTok Pixel, advertising trackers, or session-replay software without explicit instruction.

---

# 15. Contact

Create `/contact`.

It should contain a simple contact interface or mail link.

Use a placeholder configurable through environment variables or site config:

`hello@[DOMAIN]`

Do not invent an operational email address if we have not supplied one.

---

# 16. About

Create `/about`.

Keep it short.

The story should focus on the problem:

Paying for dinner with friends is bizarrely complicated for something everyone does constantly.

Pilk is building a payment experience designed around the fact that purchases are often made by groups rather than individuals.

Do not write fake founder biographies or fake employee counts.

Do not fabricate funding, partners, traction, user numbers, transaction volume, press quotes, testimonials, or investors.

---

# 17. FAQ

Create a strong FAQ.

Include questions such as:

**What is Pilk?**

**How does Pilk work?**

**Does the restaurant need Pilk?**

**Do all my friends need the app?**

**When is Pilk launching?**

**Where will Pilk be available?**

**How much will Pilk cost?**

**Is Pilk a bank?**

**How does Pilk keep payments secure?**

Since pricing and final payment infrastructure are not finalized, be transparent.

For example:

> We're still finalizing pricing ahead of launch. Waitlist members will hear about pricing and early access before Pilk becomes broadly available.

Do not make up launch dates.

---

# 18. SEO

Implement proper SEO metadata.

Create:

* page titles
* descriptions
* Open Graph metadata
* Twitter/X metadata
* sitemap
* robots.txt
* favicon support
* canonical URL support

Suggested homepage title:

**Pilk | Split the check. Not the friendship.**

or something equally memorable if you produce something better.

Suggested description:

**Pilk makes splitting restaurant checks simple. Scan in, choose your share, and get everyone paid without the post-dinner Venmo chase.**

Adjust wording if necessary to avoid claiming unreleased functionality as currently available.

---

# 19. Social Preview

Create an attractive Open Graph/social-card design consistent with the site.

It should prominently feature:

**Pilk**

and a short line such as:

**Split the check. Not the friendship.**

Do not rely on an external image URL that may disappear.

---

# 20. Accessibility

Meet strong accessibility standards.

Include:

* semantic HTML
* keyboard navigation
* visible focus states
* labels on inputs
* sufficient contrast
* useful alt text
* ARIA only where needed
* reduced-motion support
* accessible mobile menu
* form validation understandable by screen readers

Aim for WCAG 2.1 AA.

---

# 21. Performance

Prioritize excellent Core Web Vitals.

Avoid:

* huge JS bundles
* unnecessary client components
* giant dependencies for trivial effects
* enormous images
* layout shifts
* render-blocking assets

Use Next.js server components where appropriate.

Use `next/image` appropriately.

---

# 22. Security

Follow standard web-security practices.

At minimum:

* validate waitlist submissions server-side
* sanitize/normalize inputs
* no secrets in client-side code
* no database credentials shipped to browser
* protect against obvious spam submissions
* safe error handling
* avoid returning internal stack traces to users
* add reasonable security headers where practical
* avoid dangerouslySetInnerHTML unless truly necessary

Do not build authentication unless needed for the current marketing site.

---

# 23. Site Configuration

Create one central configuration file for information that will change later, such as:

* company display name
* legal entity name
* domain
* support email
* social profiles
* effective dates
* governing state
* waitlist settings

Example concept:

```ts
export const siteConfig = {
  name: "Pilk",
  domain: "...",
  legalName: "...",
  supportEmail: "...",
};
```

Legal documents should pull reusable company values from configuration where practical so we aren't hunting through multiple files when things change.

---

# 24. README

Create an excellent README explaining:

* what the project is
* installation
* development
* production build
* deployment
* environment variables
* waitlist/database setup
* analytics setup
* directory structure
* how to modify site copy
* how to update legal pages

Also include a section:

## Before Public Launch

with a checklist including unresolved items such as:

* [ ] Insert Pilk legal entity name
* [ ] Insert official business address if legally required
* [ ] Set official support/privacy contact email
* [ ] Set governing law
* [ ] Decide arbitration/dispute-resolution terms
* [ ] Have Privacy Policy reviewed
* [ ] Have Terms of Service reviewed
* [ ] Confirm actual payment providers before describing them
* [ ] Confirm analytics/cookie behavior matches Cookie Policy
* [ ] Configure production database
* [ ] Configure production domain
* [ ] Configure email infrastructure
* [ ] Test waitlist submissions
* [ ] Test mobile layouts
* [ ] Test accessibility
* [ ] Test production build

---

# 25. Copywriting Rules

Write like a very good consumer startup.

Short sentences.

Strong headlines.

Minimal jargon.

Confident without being dishonest.

Do not use phrases like:

* "revolutionizing payments"
* "seamless ecosystem"
* "next-generation financial infrastructure"
* "AI-powered" unless describing a real feature
* "world-class"
* "industry-leading"
* "game-changing"

Prefer concrete language.

Example:

Bad:

> Pilk revolutionizes the group dining payment ecosystem through seamless financial technology.

Good:

> Dinner was fun. Paying for it should be too.

or:

> One check. Five friends. Zero Venmo reminders.

Feel free to create better copy throughout the site.

---

# 26. Product Personality

Pilk's personality can have some humor.

Good examples of the general attitude:

**Dinner was fun. The spreadsheet afterward wasn't.**

**One check. Everyone pays their part.**

**Stop becoming your friends' least favorite debt collector.**

**Split the check. Not the friendship.**

Don't overdo jokes. The product still involves money and needs to feel trustworthy.

---

# 27. Mobile Experience

The majority of early users may encounter Pilk on their phone.

Treat mobile as the primary design rather than merely shrinking the desktop page.

The waitlist CTA must be extremely easy to find and submit from a phone.

Test common viewport widths.

---

# 28. Footer

Include:

Pilk wordmark

Links:

* How it works
* About
* FAQ
* Contact
* Privacy
* Terms
* Cookies

And:

`© [current year] Pilk. All rights reserved.`

If the legal entity has not been created, don't invent one in the copyright line.

---

# 29. Do Not Fabricate Social Proof

This is critical.

DO NOT invent:

* user counts
* waitlist size
* transaction volume
* investors
* partners
* bank relationships
* press coverage
* awards
* app-store reviews
* testimonials
* star ratings

If there is no social proof yet, make the site look great without it.

---

# 30. Final QA

Once implementation is finished:

1. Review every page visually.
2. Make sure all navigation works.
3. Verify mobile responsiveness.
4. Verify waitlist submission.
5. Verify duplicate behavior.
6. Verify validation.
7. Verify legal-page links.
8. Verify SEO metadata.
9. Verify sitemap and robots.
10. Run the production build.
11. Fix every build/type error.
12. Search the entire codebase for unfinished placeholder copy.
13. Leave ONLY placeholders that genuinely require information from the Pilk founders.
14. Put those unresolved items in the README checklist.

Do not stop after creating scaffolding.

Actually implement the finished site.

When done, give me:

1. A concise summary of what you built.
2. The project structure.
3. Any environment variables I need to configure.
4. Any remaining legal/business placeholders.
5. Exact commands to run it locally.
6. Recommended deployment steps.
