"use client";

import Link from "next/link";
import { ArrowRight, FileSearch, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DepthButton } from "@/components/ui/depth-button";
import { useMode } from "@/lib/mode-context";

const COPY = {
  taxpayer: {
    eyebrow: "Entry not found",
    title: "This record doesn't exist.",
    body: "It may have moved, or the official you're looking for hasn't been added to the Nigeria Governance Scorecard yet.",
    cta: "Back to the Scorecard",
  },
  cruise: {
    eyebrow: "No gist here",
    title: "This page no dey.",
    body: "E don move, or maybe the person wey you dey find never enter the Scorecard yet.",
    cta: "Go back home",
  },
};

export default function NotFound() {
  const { mode } = useMode();
  const copy = COPY[mode];

  return (
    <div className="relative min-h-screen overflow-hidden bg-paper">
      {/* Full-page faint Lagos street background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1648023199223-25d3622bcb13?auto=format&fit=crop&w=1400&q=40")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Strong paper wash so text is always clear */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: "color-mix(in srgb, var(--paper) 88%, transparent)" }}
      />

      <div className="relative z-10">
        <SiteHeader />
        <main className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
          {/* Large numerals, typographic only */}
          <p className="select-none font-mono text-[8rem] font-black leading-none text-forest-500/10 sm:text-[11rem]">
            404
          </p>
          <div className="-mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-forest-tint text-forest-500">
            <FileSearch size={28} strokeWidth={1.5} />
          </div>

          <span className="ledger-index mt-6 text-[12px] text-forest-500">{copy.eyebrow}</span>
          <p className="mt-3 text-xl font-bold text-ink">{copy.title}</p>
          <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-ink-muted">{copy.body}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <DepthButton href="/">
              {copy.cta} <ArrowRight size={15} />
            </DepthButton>
            <Link
              href="/leaders"
              className="flex items-center gap-1.5 text-[14px] font-medium text-ink hover:text-forest-500"
            >
              <ArrowLeft size={14} /> Browse leaders
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
