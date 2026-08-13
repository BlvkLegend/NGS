import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CompareView } from "@/components/compare-view";

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <span className="ledger-index text-[12px] text-forest-500">Side by side</span>
        <h1 className="mt-4 font-display text-3xl font-medium text-ink">Compare officials</h1>
        <p className="mt-3 max-w-lg text-[14px] text-ink-muted">
          Put any two officials next to each other, across every scored category.
        </p>
        <div className="mt-10">
          <Suspense fallback={null}>
            <CompareView />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
