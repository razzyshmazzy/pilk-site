import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { siteConfig, canonical } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of the ${siteConfig.name} website and services.`,
  alternates: { canonical: canonical("/terms") },
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      intro="These Terms govern your use of the Pilk website and, as they become available, Pilk's services. Because Pilk is still developing its product, some sections describe functionality that is not yet live."
    >
      <h2 id="acceptance">1. Acceptance of terms</h2>
      <p>
        By accessing or using the Pilk website or services (the
        &ldquo;Services&rdquo;), you agree to these Terms of Service (the
        &ldquo;Terms&rdquo;). If you do not agree, do not use the Services. The
        Services are operated by <strong>{siteConfig.legalName}</strong>{" "}
        (&ldquo;{siteConfig.name},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
        &ldquo;our&rdquo;).
      </p>

      <h2 id="eligibility">2. Eligibility</h2>
      <p>
        You must be at least 18 years old, or the age of majority in your
        jurisdiction, to use the Services. By using the Services, you represent
        that you meet this requirement and that you are able to enter into a
        binding agreement.
      </p>

      <h2 id="accounts">3. Accounts and accurate information</h2>
      <p>
        If we introduce accounts, you agree to provide accurate and complete
        information and to keep it up to date. You are responsible for
        maintaining the confidentiality of your credentials and for activity that
        occurs under your account. Notify us promptly of any unauthorized use.
      </p>

      <h2 id="pilks-role">4. Pilk&apos;s role</h2>
      <p>
        Pilk provides software designed to help groups split and settle
        restaurant checks. <strong>Pilk is not a bank</strong>, is not a card
        network, and is not a money transmitter or other financial institution.
        Pilk&apos;s software is separate from the third-party financial
        infrastructure that may be used to move money.
      </p>

      <h2 id="payment-services">5. Payment services and third-party providers</h2>
      <p>
        To enable payments, Pilk may work with banks, payment processors, card
        networks, financial-technology providers, and other third parties. Your
        use of payment functionality may be subject to those providers&apos; own
        terms and privacy policies. Pilk does not control, and is not responsible
        for, the services those third parties provide, except as required by law.
      </p>

      <h3 id="authorizations">Authorizations</h3>
      <p>
        When payment features are available, you authorize Pilk and its payment
        providers to initiate the transactions you approve, such as paying your
        share of a check. You are responsible for ensuring you have sufficient
        funds or available credit and for the accuracy of the payment methods you
        provide.
      </p>

      <h2 id="group-responsibilities">6. Group payment responsibilities</h2>
      <h3 id="captain">Captain responsibilities</h3>
      <p>
        The person who starts a Pilk room (the &ldquo;Captain&rdquo;) is
        responsible for the payment they make to the restaurant. The Captain
        should confirm the total and the split are correct before paying.
      </p>
      <h3 id="diners">Other diner responsibilities</h3>
      <p>
        Each diner is responsible for confirming and authorizing their own share.
        By confirming your share, you agree to pay the amount you approve through
        the payment method you select.
      </p>

      <h2 id="failed-payments">7. Failed payments, refunds, and disputes</h2>
      <p>
        Payments may fail for reasons outside Pilk&apos;s control, such as
        insufficient funds or a declined payment method. Refunds and adjustments,
        where applicable, will follow the processes we and our payment providers
        make available. If you believe there is an error, contact us promptly at{" "}
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
        Chargebacks and payment disputes may also be subject to the rules of the
        applicable payment provider or card network.
      </p>

      <h2 id="prohibited-conduct">8. Prohibited conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use the Services for any unlawful, fraudulent, or abusive purpose;</li>
        <li>attempt to gain unauthorized access to the Services or other accounts;</li>
        <li>interfere with or disrupt the integrity or performance of the Services;</li>
        <li>misrepresent your identity or your authority to make a payment;</li>
        <li>use the Services to launder money or finance illegal activity.</li>
      </ul>

      <h2 id="fraud-abuse">9. Fraud and abuse</h2>
      <p>
        We may investigate and take action against suspected fraud or abuse,
        including suspending or terminating access to the Services and reporting
        activity to appropriate authorities where warranted.
      </p>

      <h2 id="ip">10. Intellectual property and feedback</h2>
      <p>
        The Services, including our name, logo, and content, are owned by Pilk or
        our licensors and are protected by law. We grant you a limited,
        non-exclusive, non-transferable right to use the Services as intended. If
        you send us feedback or suggestions, you grant us the right to use them
        without obligation to you.
      </p>

      <h2 id="third-party">11. Third-party services</h2>
      <p>
        The Services may link to or rely on third-party services. We are not
        responsible for third-party content or services, and your use of them may
        be governed by separate terms.
      </p>

      <h2 id="availability">12. Availability, beta features, and changes</h2>
      <p>
        The Services are offered on an &ldquo;as available&rdquo; basis and may
        include pre-release or beta functionality that can change, be limited, or
        be discontinued at any time. We may modify or discontinue all or part of
        the Services, and we will try to provide notice of material changes where
        practical.
      </p>

      <h2 id="disclaimers">13. Disclaimers</h2>
      <p>
        To the fullest extent permitted by law, the Services are provided
        &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of
        any kind, whether express or implied, including implied warranties of
        merchantability, fitness for a particular purpose, and non-infringement.
        We do not warrant that the Services will be uninterrupted, error-free, or
        secure.
      </p>

      <h2 id="liability">14. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Pilk and its officers, directors,
        employees, and agents will not be liable for any indirect, incidental,
        special, consequential, or punitive damages, or for any loss of profits
        or data, arising out of or related to your use of the Services. Our total
        liability for any claim relating to the Services will not exceed the
        greater of the amount you paid us for the Services in the twelve months
        before the claim or one hundred US dollars (US $100).
      </p>

      <h2 id="indemnification">15. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless Pilk from claims, damages, and
        expenses (including reasonable legal fees) arising from your use of the
        Services or your violation of these Terms.
      </p>

      <h2 id="termination">16. Termination</h2>
      <p>
        We may suspend or terminate your access to the Services at any time,
        including if we believe you have violated these Terms. You may stop using
        the Services at any time. Provisions that by their nature should survive
        termination will survive.
      </p>

      <h2 id="governing-law">17. Governing law</h2>
      <p>
        These Terms are governed by the laws of{" "}
        <strong>{siteConfig.governingLaw}</strong>, without regard to its
        conflict-of-laws rules.
      </p>

      <h2 id="dispute-resolution">18. Dispute resolution</h2>
      <p>
        <strong>[DISPUTE RESOLUTION TERMS TO BE CONFIRMED.]</strong> The parties
        intend to include a dispute-resolution process here, which may provide for
        informal resolution first and, if included after review,{" "}
        <strong>[binding arbitration and a class-action waiver]</strong>. These
        provisions will be finalized before launch and reviewed by counsel. Until
        then, nothing in this section waives any right you have under applicable
        law.
      </p>

      <h2 id="changes">19. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. When we do, we will revise
        the &ldquo;Last updated&rdquo; date above. Your continued use of the
        Services after changes take effect means you accept the updated Terms.
      </p>

      <h2 id="contact">20. Contact</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>.
      </p>
    </LegalLayout>
  );
}
