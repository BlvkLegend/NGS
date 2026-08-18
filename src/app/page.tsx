import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/landing/hero";
import { FeaturesBento } from "@/components/landing/features-bento";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FeaturedLeaders } from "@/components/landing/featured-leaders";
import { ClosingCta } from "@/components/landing/closing-cta";
import { DonationSection } from "@/components/donation-section";
import { AdOverlay } from "@/components/ad-overlay";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      <AdOverlay />
      <SiteHeader />
      <main>
        <Hero />
        <FeaturesBento />
        <HowItWorks />
        <FeaturedLeaders />
        <ClosingCta />
        <DonationSection />
      </main>
      <SiteFooter />
    </div>
  );
}
