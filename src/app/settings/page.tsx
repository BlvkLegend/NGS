import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SettingsForm } from "@/components/settings-form";

// Subtle market texture for the page backdrop
const TEXTURE_PHOTO = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=40";

export default function SettingsPage() {
  return (
    <div className="relative min-h-screen bg-paper">
      {/* Very faint page texture — full bleed, behind everything */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("${TEXTURE_PHOTO}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="relative z-10">
        <SiteHeader />
        <main className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
          {/* Header with a left accent bar */}
          <div className="flex items-start gap-4">
            <div className="mt-1 h-10 w-1 shrink-0 rounded-full bg-forest-500" />
            <div>
              <span className="ledger-index text-[12px] text-forest-500">Preferences</span>
              <h1 className="mt-1 text-3xl font-bold text-ink">Settings</h1>
              <p className="mt-1 text-[13px] text-ink-muted">
                Stored on this device only. Nothing here is tied to your evaluations.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <SettingsForm />
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
