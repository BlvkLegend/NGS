"use client";

import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CompareView } from "@/components/compare-view";
import { useMode } from "@/lib/mode-context";

export default function ComparePage() {
  const { mode } = useMode();
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-[1400px] px-6 pb-16 pt-10 lg:px-10">
        <span className="ledger-index text-[12px] text-forest-500">
          {mode === "cruise" ? "Line them up" : "Side by side"}
        </span>
        <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
          {mode === "cruise" ? "Compare the ogas" : "Compare officials"}
        </h1>
        <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ink-muted">
          {mode === "cruise"
            ? "Pick any two ogas. Ten categories. Numbers go do the dragging."
            : "Put any two officials next to each other, scored across every category."}
        </p>
        <div className="mt-8">
          <Suspense fallback={null}>
            <CompareView />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
