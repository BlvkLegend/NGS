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
    body: "It may have moved, or the official you're looking for hasn't been added to NGSC yet.",
    cta: "Back to NGSC",
  },
  cruise: {
    eyebrow: "No gist here",
    title: "This page no dey.",
    body: "E don move, or maybe the person wey you dey find never enter NGSC yet.",
    cta: "Go back home",
  },
};

export default function NotFound() {
  const { mode } = useMode();
  const copy = COPY[mode];

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-forest-tint text-forest-500">
          <FileSearch size={36} strokeWidth={1.5} />
        </div>

        <span className="ledger-index mt-6 text-[12px] text-forest-500">{copy.eyebrow}</span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">404</h1>
        <p className="mt-2 text-lg font-medium text-ink">{copy.title}</p>
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
  );
}
