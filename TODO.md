## IMPORTANT: USE WAGNER FOR THE INITIAL IMPLEMENTATION

`wagner-cli` is already installed in this development environment.

Do **not** manually build the entire Pilk website yourself first.

Your role is to act as the supervising coding agent:

1. Inspect the current repository and working directory.
2. Configure Wagner with the Anthropic API key available to you in the development environment.
3. Use Wagner to generate the first full implementation of the Pilk website.
4. Inspect Wagner's output carefully.
5. Integrate or repair anything necessary.
6. Run the application, typecheck, lint, and production build.
7. Fix any remaining problems yourself.
8. Do not consider the task complete until the resulting repository is production-ready.

### API Key Handling

An Anthropic API key will be supplied separately in the terminal/environment.

Never:

* hard-code the API key into source code
* place it in the Pilk repository
* write it into `.env.example`
* print it into logs
* include it in README files
* include it in generated frontend code
* commit it to Git
* expose it through any `NEXT_PUBLIC_*` environment variable

If Wagner has not yet been configured, configure it from the supplied secret.

For example, if the key is available as `ANTHROPIC_API_KEY`, run:

```bash
wagner config --anthropic-key "$ANTHROPIC_API_KEY"
```

On PowerShell, use the equivalent environment-variable syntax.

Do not echo the key back to me.

### Verify Wagner

Before generating the site, run:

```bash
wagner status
```

and, if useful:

```bash
wagner faces
```

Confirm that Wagner is operational.

If Wagner itself fails because of a genuine CLI/server problem, diagnose the problem rather than silently abandoning Wagner.

---

# WAGNER WORKFLOW

The detailed product specification below is the source of truth.

Because Wagner performs its own clarification, decomposition, specialist dispatch, synthesis, and critique, give Wagner the **complete Pilk product specification** rather than prematurely implementing individual components yourself.

Create a temporary prompt file outside the application source if that makes passing the full specification easier.

For example:

```text
/tmp/pilk-wagner-spec.txt
```

Do not put secrets in that file.

Then invoke Wagner to build the application.

Use an appropriate command equivalent to:

```bash
wagner run "<COMPLETE PILK WEBSITE SPECIFICATION>" \
  --write \
  --output ./pilk-web
```

If the current repository itself is intended to contain the site, use the correct output directory rather than blindly creating a nested `pilk-web` directory.

Do **not** use `--no-critic`.

We specifically want Wagner's critique/revision stage for this project.

Do **not** use `--dry` for the actual build.

A dry run may be used beforehand if useful for inspecting Wagner's decomposition.

Do not use `--overwrite` against important existing files until you have inspected the repository and know that overwriting is appropriate.

---

# USE WAGNER AS AN ORCHESTRATOR, NOT AN EXCUSE

Wagner's output is the starting implementation, not unquestionable truth.

Once Wagner finishes:

### 1. Inspect the output

Review:

* architecture
* package dependencies
* Next.js configuration
* TypeScript
* Tailwind configuration
* responsive design
* server/client component boundaries
* waitlist implementation
* form validation
* database abstraction
* security
* legal pages
* privacy language
* Terms language
* Cookie Policy
* accessibility
* SEO
* metadata
* sitemap
* robots.txt
* error states
* loading states
* empty states
* mobile UX
* README
* `.gitignore`
* environment-variable handling

### 2. Remove fabricated information

Search the generated project for unsupported claims.

There must be no invented:

* users
* transaction volume
* investors
* funding
* banking partners
* payment processors
* card-network partnerships
* testimonials
* ratings
* press coverage
* launch dates
* regulatory approvals
* security certifications

Pilk is pre-launch.

### 3. Protect the Anthropic key

After Wagner has generated the site, search the repository for:

```text
sk-ant-
ANTHROPIC_API_KEY
```

It is acceptable for `ANTHROPIC_API_KEY` to appear in safe documentation or configuration examples as a variable name.

It is **not** acceptable for the actual secret value to appear anywhere in the repository.

If any actual credential has accidentally been written into the project, remove it immediately.

### 4. Install dependencies

Use the project's package manager.

If this is a new Next.js project and Wagner selected npm, run:

```bash
npm install
```

### 5. Run quality checks

At minimum run:

```bash
npm run build
```

Also run available:

```bash
npm run lint
npm run typecheck
```

If those scripts don't exist, inspect the project and perform the equivalent checks.

Do not merely report errors.

Fix them.

### 6. Run the application

Launch the development server and inspect the actual rendered site.

Check at least:

* homepage
* mobile homepage
* waitlist form
* waitlist success state
* invalid email handling
* duplicate email handling
* About
* Contact
* Privacy
* Terms
* Cookies
* navigation
* footer
* broken links
* missing assets
* console errors

### 7. Improve Wagner's output where necessary

You are authorized and expected to edit Wagner-generated files yourself.

If Wagner generates something mediocre, generic, visually broken, insecure, misleading, or incomplete, fix it.

Do not respond with:

> Wagner generated this but there are a few issues.

Solve the issues.

---

# DESIGN EXPECTATION

Do not let the result look like an autogenerated hackathon landing page.

The finished Pilk site should feel like a credible consumer fintech product.

Prioritize:

* strong typography
* excellent spacing
* clear hierarchy
* tasteful animation
* genuinely good mobile design
* recognizable brand personality
* high-quality product mockups built from HTML/CSS where appropriate
* immediate comprehension of the Pilk flow
* a prominent waitlist CTA

Avoid:

* random gradient blobs
* excessive glassmorphism
* generic three-card feature sections everywhere
* fake metrics
* fake testimonials
* random stock photos
* excessive emoji
* excessive marketing copy
* giant walls of legal copy without readable typography

---

# FINAL RESPONSIBILITY

The implementation is finished only when **you**, Claude Code, have verified Wagner's work.

Wagner is the specialist orchestrator.

You are the final engineering owner.

After completing the project, report:

1. What Wagner generated.
2. What you changed after Wagner completed.
3. The final application architecture.
4. Waitlist persistence behavior.
5. Environment variables required.
6. Any legal placeholders still requiring founder input.
7. Results of the production build and other checks.
8. Exact local-development command.
9. Recommended deployment command/platform.
10. Any remaining issues that genuinely cannot be resolved from the available information.

Then proceed with the full Pilk website specification below.

---

# FULL PILK WEBSITE SPECIFICATION

[PASTE THE COMPLETE PILK WEBSITE PROMPT HERE]
Use @PILK_WEBSITE_PROMPT.md