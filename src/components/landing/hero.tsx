"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { useMode } from "@/lib/mode-context";

// Same Danfo/street background for BOTH modes. No swap.
const HERO_BG = "https://images.unsplash.com/photo-1648023199223-25d3622bcb13?auto=format&fit=crop&w=1400&q=75";

// Real Unsplash photos — no SVG icons
const TAXPAYER_PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80";
const CRUISE_PHOTO   = "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&w=200&q=80";

export function Hero() {
  const { mode, setMode } = useMode();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <section className="relative mx-auto max-w-[1400px] overflow-hidden px-6 pb-10 pt-10 lg:px-10 lg:pb-14 lg:pt-14">
      {/* Background: Danfo buses, always visible on right side */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        {/*
          Gradient fades LEFT side (text area) to paper, then becomes transparent
          by ~75% so the RIGHT side and BOTTOM show the real photo clearly.
        */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--paper) 0%, var(--paper) 30%, color-mix(in srgb, var(--paper) 70%, transparent) 55%, transparent 75%), " +
              "linear-gradient(to top, transparent 0%, transparent 70%, color-mix(in srgb, var(--paper) 30%, transparent) 88%, var(--paper) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-2xl">
        <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-500">
          Nigeria Governance Scorecard
        </motion.span>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 max-w-xl text-[2.75rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-[3.5rem]">
          {mode === "cruise"
            ? "Drag the people wey you vote for."
            : "Score the people you elected."}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-muted">
          {mode === "cruise"
            ? "Ten questions. One card. Your honest rating of who is delivering and who is forming. Built for group chat."
            : "Ten structured questions. One shareable NGSC card. A grade, a score, and a public record that holds up."}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex items-center gap-3">
          <Link href="/start"
            className="group flex items-center gap-1.5 text-[15px] font-semibold text-ink underline-offset-4 hover:underline">
            {mode === "cruise" ? "Who you wan drag?" : "Get started"}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Mode selection cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
        className="relative mt-10 max-w-2xl">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-semibold text-ink">How do you want to rate?</p>
          <button onClick={() => setInfoOpen((v) => !v)} aria-label="About the two modes"
            className="flex items-center gap-1 text-[12px] text-ink-muted hover:text-ink">
            <Info size={13} /> What is this?
          </button>
        </div>

        {infoOpen && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="mb-3 rounded-xl border border-line bg-paper-raised p-4 text-[13px] leading-relaxed text-ink-muted shadow-sm">
            Same 10 questions. Same NGSC card at the end. The only difference is how the questions are phrased.
            Taxpayer is straight and clear. Cruise is sharp Pidgin with real Nigerian energy.
            Switch anytime from the toggle in the nav.
          </motion.div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {/* TAXPAYER */}
          <button onClick={() => setMode("taxpayer")}
            className={`relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all ${
              mode === "taxpayer" ? "border-forest-500 bg-forest-tint" : "border-line bg-paper-raised hover:border-forest-300"
            }`}>
            {mode === "taxpayer" && (
              <span className="absolute right-3 top-3 rounded-full bg-forest-500 px-2 py-0.5 text-[10px] font-bold uppercase text-paper">Active</span>
            )}

            {/* Real photo: serious professional */}
            <div className="mb-3 h-16 w-16 overflow-hidden rounded-xl">
              <img
                src={TAXPAYER_PHOTO}
                alt="Taxpayer mode"
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>

            <h3 className="text-[15px] font-bold text-ink">Taxpayer Mode</h3>
            <p className="mt-1 text-[12px] leading-snug text-ink-muted">
              Clean, editorial English. For when you want facts and not vibes.
            </p>

            {/* Preview of a taxpayer-mode question */}
            <div className="mt-3 rounded-lg border border-line bg-paper p-2.5">
              <p className="text-[11px] font-medium text-ink">Has this official published verifiable budgets?</p>
              <div className="mt-1.5 flex gap-1">
                {["A","B","C","D","F"].map((g) => (
                  <span key={g} className="flex h-6 w-6 items-center justify-center rounded border border-line text-[10px] font-mono font-bold text-ink-muted">{g}</span>
                ))}
              </div>
            </div>
          </button>

          {/* CRUISE */}
          <button onClick={() => setMode("cruise")}
            className={`relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all ${
              mode === "cruise" ? "border-cruise-500 bg-cruise-tint" : "border-line bg-paper-raised hover:border-cruise-500/50"
            }`}>
            {mode === "cruise" && (
              <span className="absolute right-3 top-3 rounded-full bg-cruise-500 px-2 py-0.5 text-[10px] font-bold uppercase text-paper">Active</span>
            )}

            {/* Real photo: cool, DJ energy */}
            <div className="mb-3 h-16 w-16 overflow-hidden rounded-xl">
              <img
                src={CRUISE_PHOTO}
                alt="Cruise mode"
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>

            <h3 className="text-[15px] font-bold text-ink">Agbado Cruise Mode</h3>
            <p className="mt-1 text-[12px] leading-snug text-ink-muted">
              Street Pidgin, timeline energy. For when you have things to say and you mean every word.
            </p>

            {/* Cruise preview: same topic, sharper language */}
            <div className="mt-3 rounded-lg border border-cruise-500/30 bg-cruise-tint p-2.5">
              <p className="text-[11px] font-medium text-ink">Dem dey show us where the budget enter, or e just disappear?</p>
              <p className="mt-1 text-[10px] italic text-cruise-700">Same question. Different energy.</p>
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
