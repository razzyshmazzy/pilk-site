import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig, canonical } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${siteConfig.name} uses cookies and similar technologies.`,
  alternates: { canonical: canonical("/cookies") },
};

export default function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Policy"
      intro="This Cookie Policy explains how Pilk uses cookies and similar storage technologies. We describe only what this website actually uses today."
    >
      <h2 id="what-are-cookies">What cookies are</h2>
      <p>
        Cookies are small text files stored on your device by your browser.
        &ldquo;Similar technologies&rdquo; include things like local storage,
        which websites use to remember information between visits.
      </p>

      <h2 id="what-we-use">What this site uses today</h2>
      <p>
        This website is intentionally lightweight. Right now it uses only
        essential storage and does <strong>not</strong> load advertising
        trackers, marketing pixels, or session-replay tools.
      </p>
      <ul>
        <li>
          <strong>Essential storage.</strong> We use a small amount of local
          storage to remember that you dismissed the cookie notice, so it
          doesn&apos;t reappear on every visit. This stays on your device.
        </li>
        <li>
          <strong>Security and delivery.</strong> Standard technical requests
          needed to serve the site securely may involve short-lived data handled
          by our hosting provider.
        </li>
      </ul>

      <h2 id="preferences">Preferences</h2>
      <p>
        If we later add features that remember your preferences, we will describe
        them here and, where appropriate, give you controls over them.
      </p>

      <h2 id="analytics">Analytics</h2>
      <p>
        We do not currently load third-party analytics on this website. If we add
        analytics in the future, we intend to choose a privacy-conscious provider,
        keep the integration isolated, and update this policy to describe it —
        including any choices you have.
      </p>

      <h2 id="marketing">Marketing cookies</h2>
      <p>
        We do not use advertising or marketing cookies. If that ever changes, we
        will update this policy before enabling them and provide appropriate
        notice or controls.
      </p>

      <h2 id="third-party">Third-party technology</h2>
      <p>
        Some services we rely on to operate the site (such as hosting) may set
        technical data necessary to deliver the site. We do not use these to track
        you across other websites.
      </p>

      <h2 id="browser-controls">Your browser controls</h2>
      <p>
        You can control and delete cookies and local storage through your browser
        settings. Because this site relies only on essential storage, blocking it
        should not break core functionality, though your cookie-notice preference
        may not be remembered.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        We may update this Cookie Policy as the site evolves. When we do, we will
        revise the &ldquo;Last updated&rdquo; date above.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>.
      </p>
    </LegalLayout>
  );
}
