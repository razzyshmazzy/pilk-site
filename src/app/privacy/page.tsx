import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="This Privacy Policy explains what information Pilk collects, how we use it, and the choices you have. Because Pilk is early-stage, some sections describe how information will be handled once specific features are live."
    >
      <h2 id="who-we-are">Who operates Pilk</h2>
      <p>
        Pilk (&ldquo;{siteConfig.name},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
        or &ldquo;our&rdquo;) operates this website and is building a service to
        help groups split restaurant checks. Pilk is operated by{" "}
        <strong>{siteConfig.legalName}</strong>. If you have questions about this
        policy, contact us at{" "}
        <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>.
      </p>

      <h2 id="scope">Scope</h2>
      <p>
        This policy applies to information we collect through this website,
        including when you join our waitlist or contact us. As Pilk launches
        additional products and features, we may update this policy or provide
        additional notices.
      </p>

      <h2 id="information-you-provide">Information you provide</h2>
      <p>We collect information you choose to give us, which currently includes:</p>
      <ul>
        <li>
          <strong>Waitlist information.</strong> When you join the waitlist, we
          collect your email address and, if you provide them, your first name,
          school or organization, and how you expect to use Pilk. If you arrive
          through a referral link, we may store the associated referral code.
        </li>
        <li>
          <strong>Communications.</strong> If you email us or otherwise contact
          us, we keep the contents of those messages and our replies.
        </li>
      </ul>

      <h2 id="future-information">Information collected once features are live</h2>
      <p>
        As Pilk&apos;s product becomes available, we expect to collect additional
        information necessary to provide the service, which may include:
      </p>
      <ul>
        <li>
          <strong>Account information</strong>, such as your name and login
          details, if we introduce accounts.
        </li>
        <li>
          <strong>Payment information.</strong> To enable payments, payment
          details may be collected and processed by third-party payment
          providers. In many cases, sensitive payment credentials (such as full
          card numbers) are handled directly by those providers rather than
          stored by Pilk. We will describe this in more detail when payment
          features launch.
        </li>
        <li>
          <strong>Transaction information</strong>, such as the amounts, dates,
          and participants involved in a split, so the service can function and
          so we can support you.
        </li>
      </ul>

      <h2 id="automatic-information">Device, technical, and usage information</h2>
      <p>
        Like most websites, we may automatically receive certain technical
        information when you visit, such as your browser type, device
        information, general location inferred from your IP address, and how you
        interact with our pages. See our{" "}
        <a href="/cookies">Cookie Policy</a> for details on cookies and similar
        technologies.
      </p>

      <h2 id="how-we-use">Why we process information</h2>
      <p>We use information to:</p>
      <ul>
        <li>operate, maintain, and improve this website and the Pilk service;</li>
        <li>manage the waitlist and notify you about early access;</li>
        <li>respond to your questions and provide support;</li>
        <li>
          detect, prevent, and address fraud, abuse, security issues, and
          technical problems;
        </li>
        <li>comply with legal obligations and enforce our terms.</li>
      </ul>

      <h2 id="cookies-analytics">Cookies and analytics</h2>
      <p>
        This website uses only the essential storage needed to function and does
        not load advertising trackers. If we add privacy-conscious analytics in
        the future, we will update our <a href="/cookies">Cookie Policy</a> to
        describe it. We do not add advertising pixels or session-replay tools
        without consideration.
      </p>

      <h2 id="how-we-share">How we share information</h2>
      <p>
        We do not sell your personal information for money, and we do not intend
        to operate an advertising-data business. We may share information in the
        following limited circumstances:
      </p>
      <ul>
        <li>
          <strong>Service providers.</strong> With vendors who help us operate
          the site and service (for example, hosting, email delivery, and, in the
          future, payment providers), under obligations to protect the
          information.
        </li>
        <li>
          <strong>Payment providers.</strong> Once payment features launch, with
          banks, payment processors, and financial-technology providers as needed
          to enable payments.
        </li>
        <li>
          <strong>Legal and safety.</strong> When we believe disclosure is
          required by law or legal process, or is necessary to protect the
          rights, property, or safety of Pilk, our users, or others.
        </li>
        <li>
          <strong>Corporate transactions.</strong> In connection with a merger,
          acquisition, financing, or sale of assets, information may be
          transferred as part of that transaction.
        </li>
      </ul>

      <h2 id="retention">Data retention</h2>
      <p>
        We keep information for as long as needed to provide the service and for
        legitimate business or legal purposes. For example, we retain waitlist
        information until you ask us to remove it or until it is no longer needed.
      </p>

      <h2 id="security">Security</h2>
      <p>
        We take reasonable measures designed to protect your information. However,
        no method of transmission or storage is completely secure, and we cannot
        guarantee absolute security. If we become aware of a security incident
        that affects you, we will act in accordance with applicable law.
      </p>

      <h2 id="childrens-privacy">Children&apos;s privacy</h2>
      <p>
        Pilk is not directed to children under 13, and we do not knowingly
        collect personal information from children under 13. If you believe a
        child has provided us information, please contact us so we can address it.
      </p>

      <h2 id="us-state-rights">US state privacy rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct,
        delete, or receive a copy of your personal information, and to appeal a
        decision about your request. To exercise any right, contact us at{" "}
        <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>.
        We will not discriminate against you for exercising these rights.
      </p>

      <h3 id="california">California privacy disclosures</h3>
      <p>
        If you are a California resident, you may have additional rights under
        California law, including the right to know what personal information we
        collect and how we use it, the right to request deletion, and the right
        to opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal
        information as those terms are defined by law. As noted above, we do not
        sell personal information for money and do not intend to operate an
        advertising-data business.
      </p>

      <h2 id="international">International users</h2>
      <p>
        Pilk is based in the United States and is intended for users in the
        United States. If you access the site from outside the US, understand
        that your information may be processed in the US, where privacy laws may
        differ from those in your location.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will revise
        the &ldquo;Last updated&rdquo; date above. Material changes may be
        communicated through the site or by other means.
      </p>

      <h2 id="contact">Contact us</h2>
      <p>
        Questions about this policy or your information? Email{" "}
        <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>.
      </p>
    </LegalLayout>
  );
}
