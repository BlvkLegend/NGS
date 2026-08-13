import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OnboardingGate } from "@/components/onboarding-gate";

export default function StartPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <OnboardingGate />
      </main>
      <SiteFooter />
    </div>
  );
}
