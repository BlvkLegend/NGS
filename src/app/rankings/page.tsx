import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RankingsList } from "@/components/rankings-list";

export default function RankingsPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <span className="ledger-index text-[12px] text-forest-500">National register</span>
        <h1 className="mt-4 font-display text-4xl font-medium text-ink">Rankings</h1>
        <p className="mt-3 max-w-lg text-[14px] text-ink-muted">
          Ranked by the same governance score used on every NGSC card, drawn from public evaluations.
        </p>
        <div className="mt-10">
          <RankingsList />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
