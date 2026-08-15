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

      {/* Header band — -mt-16 pulls behind sticky nav */}
      <div
        className="-mt-16 relative overflow-hidden bg-forest-900"
        style={{ minHeight: "13rem" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=50")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-10 pt-24 lg:px-10">
          <span className="ledger-index text-[12px] text-forest-300">
            {mode === "cruise" ? "Line them up" : "Side by side"}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {mode === "cruise" ? "Compare the ogas" : "Compare officials"}
          </h1>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-white/60">
            {mode === "cruise"
              ? "Pick any two ogas. Ten categories. Numbers go do the dragging."
              : "Put any two officials next to each other, scored across every category."}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <Suspense fallback={null}>
          <CompareView />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
