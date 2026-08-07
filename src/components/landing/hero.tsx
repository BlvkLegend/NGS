"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Info, Briefcase, Zap } from "lucide-react";
import { useMode } from "@/lib/mode-context";
import { CivicMotif } from "@/components/landing/civic-motif";

const HERO_IMG_DAY = "https://images.unsplash.com/photo-1648023199223-25d3622bcb13?auto=format&fit=crop&w=1400&q=75";
const HERO_IMG_NIGHT = "https://images.unsplash.com/photo-1593717191400-84f38ee95485?auto=format&fit=crop&w=1400&q=75";

export function Hero() {
  const { mode, setMode } = useMode();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <section className="relative mx-auto max-w-[1400px] overflow-hidden px-6 pb-10 pt-10 lg:px-10 lg:pb-14 lg:pt-14">
      {/* Background cityscape */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <img
          src={mode === "cruise" ? HERO_IMG_NIGHT : HERO_IMG_DAY}
          alt=""
          className="h-full w-full object-cover object-center opacity-[0.12] dark:opacity-[0.18]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/80 to-transparent" />
      </div>
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-10 h-[520px] w-[640px] opacity-40 lg:-right-16 lg:h-[620px] lg:w-[760px]">
        <CivicMotif className="h-full w-full" />
      </div>

      <div className="relative max-w-2xl">
        <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="ledger-index text-[12px] text-forest-500">
          01 / Entry
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 max-w-xl text-[2.75rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-[3.5rem]"
        >
          Score the people you elected.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-muted"
        >
          Ten structured questions. One shareable NGSC card. A grade, a score, and a public record that holds up.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex items-center gap-2"
        >
          <Link
            href="/start"
            className="group flex items-center gap-1.5 rounded-xl bg-forest-500 px-5 py-2.5 text-[15px] font-semibold text-paper transition-colors hover:bg-forest-700"
          >
            Get started <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Mode selection cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="relative mt-10 max-w-2xl"
      >
        <div className="mb-3 flex items-center gap-2">
          <p className="text-[13px] font-medium text-ink-muted">Choose your experience</p>
          <button
            onClick={() => setInfoOpen((v) => !v)}
            aria-label="What are the two modes?"
            className="text-ink-muted hover:text-ink"
          >
            <Info size={14} />
          </button>
        </div>

        {infoOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 rounded-xl border border-line bg-paper-raised p-4 text-[13px] text-ink-muted shadow-sm"
          >
            Both modes evaluate the same 10 questions and produce the same NGSC card. The only difference is language: Taxpayer uses formal, editorial English. Cruise uses current Nigerian Pidgin and street slang.
          </motion.div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Taxpayer card */}
          <button
            onClick={() => setMode("taxpayer")}
            className={`group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all ${
              mode === "taxpayer"
                ? "border-forest-500 bg-forest-tint shadow-md"
                : "border-line bg-paper-raised hover:border-forest-300"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-500/15 text-forest-500">
                <Briefcase size={18} />
              </div>
              {mode === "taxpayer" && (
                <span className="rounded-full bg-forest-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-paper">Active</span>
              )}
            </div>
            <h3 className="mt-3 text-[15px] font-bold text-ink">Taxpayer Mode</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
              Formal, editorial English. For policy-minded citizens, journalists, and researchers who want a clean, data-first experience.
            </p>
            {/* Mini preview */}
            <div className="mt-4 space-y-1.5 opacity-70">
              <div className="h-1.5 w-full rounded-full bg-line">
                <div className="h-1.5 w-[74%] rounded-full bg-forest-500" />
              </div>
              <p className="text-[10px] text-ink-muted">Infrastructure: 74 / 100</p>
            </div>
          </button>

          {/* Cruise card */}
          <button
            onClick={() => setMode("cruise")}
            className={`group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all ${
              mode === "cruise"
                ? "border-cruise-500 bg-cruise-tint shadow-md"
                : "border-line bg-paper-raised hover:border-cruise-500/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cruise-500/15 text-cruise-500">
                <Zap size={18} />
              </div>
              {mode === "cruise" && (
                <span className="rounded-full bg-cruise-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-paper">Active</span>
              )}
            </div>
            <h3 className="mt-3 text-[15px] font-bold text-ink">Cruise Mode</h3>
            <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
              Sharp Nigerian Pidgin and street satire. Same evaluation, same card — different energy. Built for the timeline.
            </p>
            {/* Mini copy preview */}
            <div className="mt-4 rounded-lg bg-cruise-500/10 px-3 py-2">
              <p className="text-[11px] italic text-cruise-700">&ldquo;Road wey dem promise, e don show for ground?&rdquo;</p>
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
