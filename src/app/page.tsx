import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyPilk } from "@/components/WhyPilk";
import { WaitlistSection } from "@/components/WaitlistSection";
import { FAQ } from "@/components/FAQ";
import { faqItems } from "@/lib/faq";
import { siteConfig } from "@/lib/site-config";

/**
 * FAQ structured data helps search engines surface answers. Built from the same
 * source as the on-page FAQ so the two never drift apart.
 */
function FaqJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // Content is fully static and author-controlled (no user input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

function PersonalityBand() {
  return (
    <section className="py-8">
      <div className="container-page">
        <div className="rounded-[2rem] bg-pilk-600 px-8 py-12 text-center sm:py-16">
          <p className="mx-auto max-w-3xl font-display text-2xl font-extrabold leading-tight text-white text-balance sm:text-4xl">
            Stop becoming your friends&apos; least favorite debt collector.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-pilk-100 text-pretty">
            One check. Everyone pays their part. Nobody chases anybody.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <Hero />
      <HowItWorks />
      <WhyPilk />
      <PersonalityBand />
      <WaitlistSection />
      <FAQ />

      {/* Organization structured data. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            email: siteConfig.supportEmail,
          }),
        }}
      />
    </>
  );
}
