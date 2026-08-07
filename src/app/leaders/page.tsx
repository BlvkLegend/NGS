import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeadersDirectory } from "@/components/leaders-directory";
import { leaders } from "@/lib/data";

export default function LeadersPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <span className="ledger-index text-[12px] text-forest-500">Register</span>
        <h1 className="mt-4 font-display text-4xl font-medium text-ink">Browse leaders</h1>
        <p className="mt-3 max-w-lg text-[14px] text-ink-muted">
          {leaders.length} officials currently tracked across the federation.
        </p>
        <div className="mt-10">
          <Suspense fallback={null}>
            <LeadersDirectory />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
