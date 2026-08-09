import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SettingsForm } from "@/components/settings-form";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <span className="ledger-index text-[12px] text-forest-500">Account</span>
        <h1 className="mt-4 font-display text-3xl font-medium text-ink">Settings</h1>
        <div className="mt-10">
          <SettingsForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
