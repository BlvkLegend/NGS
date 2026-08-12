"use client";

import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CompareView } from "@/components/compare-view";
import { useMode } from "@/lib/mode-context";

const COPY = {
  taxpayer: {
    eyebrow: "Side by side",
    title: "Compare officials",
    body: "Put any two officials next to each other, across every scored category.",
  },
  cruise: {
    eyebrow: "Who dey win?",
    title: "Line them up and see",
    body: "Put two ogas side by side. Same questions, same scale — numbers go tell you who sabi do the work.",
  },
};

export default function ComparePage() {
  const { mode } = useMode();
  const c = COPY[mode];
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-500">{c.eyebrow}</span>
        <h1 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">{c.title}</h1>
        <p className="mt-3 max-w-lg text-[14px] text-ink-muted">{c.body}</p>
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
