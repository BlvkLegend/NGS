import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NotificationsList } from "@/components/notifications-list";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <span className="ledger-index text-[12px] text-forest-500">Updates</span>
        <h1 className="mt-4 font-display text-3xl font-medium text-ink">Notifications</h1>
        <div className="mt-10">
          <NotificationsList />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
