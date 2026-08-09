"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { useMode } from "@/lib/mode-context";

// Same Danfo/street background for BOTH modes. No night-city swap.
const HERO_BG = "https://images.unsplash.com/photo-1648023199223-25d3622bcb13?auto=format&fit=crop&w=1400&q=75";

export function Hero() {
  const { mode, setMode } = useMode();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <section className="relative mx-auto max-w-[1400px] overflow-hidden px-6 pb-10 pt-10 lg:px-10 lg:pb-14 lg:pt-14">
      {/* Background: Danfo buses, visible, no bar chart overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt=""
          className="h-full w-full object-cover object-center opacity-[0.22]"
          loading="eager"
        />
        {/* Gradient only on LEFT to keep text readable; RIGHT stays open so buses show */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 to-paper/10" />
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

            {/* Mode character icon */}
            <div className="mb-3 h-16 w-16">
              <TaxpayerIcon />
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

            <div className="mb-3 h-16 w-16">
              <CruiseIcon />
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

function TaxpayerIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-full w-full">
      <circle cx="32" cy="24" r="14" fill="#2d5a3d" opacity="0.15" />
      <circle cx="32" cy="22" r="11" fill="#c8956a" />
      <path d="M21 22 Q21 10 32 10 Q43 10 43 22" fill="#3d2d1e" />
      <rect x="29" y="9" width="6" height="3" rx="1" fill="#3d2d1e" />
      <circle cx="27" cy="22" r="1.5" fill="#3d2d1e" />
      <circle cx="37" cy="22" r="1.5" fill="#3d2d1e" />
      <path d="M24 22 Q24 18 27 18 Q30 18 30 22" fill="none" stroke="#3d2d1e" strokeWidth="1.2" />
      <path d="M34 22 Q34 18 37 18 Q40 18 40 22" fill="none" stroke="#3d2d1e" strokeWidth="1.2" />
      <line x1="30" y1="20" x2="34" y2="20" stroke="#3d2d1e" strokeWidth="1" />
      <path d="M28 29 Q32 32 36 29" fill="none" stroke="#a87050" strokeWidth="1.2" />
      <path d="M16 55 Q24 40 32 40 Q40 40 48 55" fill="#167a4a" opacity="0.7" />
      <rect x="24" y="44" width="16" height="12" rx="2" fill="#fff" opacity="0.9" />
      <line x1="26" y1="48" x2="38" y2="48" stroke="#167a4a" strokeWidth="1.5" />
      <line x1="26" y1="51" x2="36" y2="51" stroke="#aaa" strokeWidth="1" />
    </svg>
  );
}

function CruiseIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className="h-full w-full">
      <circle cx="32" cy="22" r="11" fill="#8b6343" />
      <path d="M21 19 Q21 8 32 8 Q43 8 43 19" fill="#1a1a1a" />
      <circle cx="36" cy="25" r="1.5" fill="#c8a84b" />
      <path d="M22 20 Q22 15 27 15 Q32 15 32 20 Q32 15 37 15 Q42 15 42 20" fill="#1a1a1a" />
      <path d="M25 22 Q32 17 39 22" fill="#1a1a1a" />
      <path d="M25 24 Q32 21 39 24" fill="#1a1a1a" opacity="0.6" />
      <path d="M27 29 Q32 33 37 29" fill="none" stroke="#6b4a2d" strokeWidth="1.5" />
      <path d="M16 55 Q24 38 32 38 Q40 38 48 55" fill="#ff9d3d" opacity="0.85" />
      <rect x="40" y="36" width="10" height="16" rx="2" fill="#1a1a1a" />
      <rect x="41" y="38" width="8" height="12" rx="1" fill="#3d8bff" opacity="0.7" />
      <path d="M27 42 Q32 39 37 42" fill="#e88230" />
    </svg>
  );
}
