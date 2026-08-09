"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { useMode } from "@/lib/mode-context";

const HERO_BG = "https://images.unsplash.com/photo-1648023199223-25d3622bcb13?auto=format&fit=crop&w=1400&q=75";

// Specified image sources
const TAXPAYER_PHOTO = "https://cdn.pixabay.com/photo/2023/05/01/14/49/black-man-7963282_1280.png";
const CRUISE_PHOTO   = "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=600&q=80";

export function Hero() {
  const { mode, setMode } = useMode();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <section className="relative mx-auto max-w-[1400px] overflow-hidden px-6 pb-10 pt-10 lg:px-10 lg:pb-14 lg:pt-14">
      {/* Danfo street background, always same image both modes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <img src={HERO_BG} alt="" className="h-full w-full object-cover object-center" loading="eager" />
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
        <motion.span
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-500"
        >
          Nigeria Governance Scorecard
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 max-w-xl text-[2.75rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-[3.5rem]"
        >
          {mode === "cruise" ? "Drag the people wey you vote for." : "Score the people you elected."}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-muted"
        >
          {mode === "cruise"
            ? "Ten questions. One card. Your honest rating of who is delivering and who is forming. Built for group chat."
            : "Ten structured questions. One shareable NGSC card. A grade, a score, and a public record that holds up."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex items-center gap-3"
        >
          <Link
            href="/start"
            className="group flex items-center gap-1.5 text-[15px] font-semibold text-ink underline-offset-4 hover:underline"
          >
            {mode === "cruise" ? "Who you wan drag?" : "Get started"}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Mode cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
        className="relative mt-10 max-w-2xl"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[13px] font-semibold text-ink">How do you want to rate?</p>
          <button
            onClick={() => setInfoOpen((v) => !v)}
            aria-label="About the two modes"
            className="flex items-center gap-1 text-[12px] text-ink-muted hover:text-ink"
          >
            <Info size={13} /> What is this?
          </button>
        </div>

        {infoOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            className="mb-3 rounded-xl border border-line bg-paper-raised p-4 text-[13px] leading-relaxed text-ink-muted shadow-sm"
          >
            Same 10 questions. Same NGSC card at the end. The only difference is how the questions are phrased.
            Taxpayer is straight and clear. Cruise is sharp Pidgin with real Nigerian energy.
            Switch anytime from the toggle in the nav.
          </motion.div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {/* TAXPAYER — full card photo background */}
          <button
            onClick={() => setMode("taxpayer")}
            className={`group relative h-64 overflow-hidden rounded-2xl border-2 text-left transition-all ${
              mode === "taxpayer" ? "border-forest-500" : "border-line hover:border-forest-400"
            }`}
          >
            {/* Photo fills the card */}
            <img
              src={TAXPAYER_PHOTO}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            {/* Right-side and top dark vignette so the man stays visible left/centre */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 75%, transparent 100%)",
              }}
            />

            {/* Active badge */}
            {mode === "taxpayer" && (
              <span className="absolute right-3 top-3 z-10 rounded-full bg-forest-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-paper shadow">
                Active
              </span>
            )}

            {/* Text + example panel — frosted glass surface for dark-mode contrast */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-4">
              {/* Frosted glass pill behind all copy */}
              <div
                className="rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <h3 className="text-[15px] font-bold text-paper">Taxpayer Mode</h3>
                <p className="mt-0.5 text-[11px] leading-snug text-paper/70">
                  Clear English. For when you want facts and not vibes.
                </p>
                {/* Example question */}
                <div className="mt-2.5 rounded-lg border border-paper/20 bg-paper/10 p-2">
                  <p className="text-[10px] font-medium text-paper">
                    Has this official published verifiable budgets?
                  </p>
                  <div className="mt-1.5 flex gap-1">
                    {["A","B","C","D","F"].map((g) => (
                      <span
                        key={g}
                        className="flex h-5 w-5 items-center justify-center rounded border border-paper/30 font-mono text-[9px] font-bold text-paper/70"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* CRUISE — full card photo background */}
          <button
            onClick={() => setMode("cruise")}
            className={`group relative h-64 overflow-hidden rounded-2xl border-2 text-left transition-all ${
              mode === "cruise" ? "border-cruise-500" : "border-line hover:border-cruise-500/60"
            }`}
          >
            <img
              src={CRUISE_PHOTO}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.50) 45%, rgba(0,0,0,0.10) 75%, transparent 100%)",
              }}
            />

            {mode === "cruise" && (
              <span className="absolute right-3 top-3 z-10 rounded-full bg-cruise-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-paper shadow">
                Active
              </span>
            )}

            <div className="absolute inset-x-0 bottom-0 z-10 p-4">
              <div
                className="rounded-xl px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <h3 className="text-[15px] font-bold text-paper">Agbado Cruise Mode</h3>
                <p className="mt-0.5 text-[11px] leading-snug text-paper/70">
                  Sharp Pidgin, timeline energy. For when you have things to say.
                </p>
                {/* Cruise example — same question, different energy */}
                <div className="mt-2.5 rounded-lg border border-paper/20 bg-paper/10 p-2">
                  <p className="text-[10px] font-medium text-paper">
                    Where the money go? Why dem dey act like na crime to ask?
                  </p>
                  <p className="mt-1 text-[9px] italic text-paper/50">Same question. Different energy.</p>
                </div>
              </div>
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
