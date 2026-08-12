"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { useMode } from "@/lib/mode-context";
import { asset } from "@/lib/asset";

const HERO_BG = "https://images.unsplash.com/photo-1648023199223-25d3622bcb13?auto=format&fit=crop&w=1400&q=75";

// User-supplied illustration assets in /public
const TAXPAYER_PHOTO = asset("/taxpayer-mode.png");
const CRUISE_PHOTO   = asset("/cruise-mode.png");

export function Hero() {
  const { mode, setMode } = useMode();
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    /*
     * -mt-16 pulls the section up behind the sticky nav (nav = pt-3 12px + h-52px = ~64px).
     * The absolute hero image then starts from y=0 (top of viewport).
     * pt-24 on the inner content pushes text clear of the nav pill.
     */
    <section className="relative mx-auto max-w-[1400px] -mt-16 overflow-hidden px-6 pb-10 lg:px-10 lg:pb-14">
      {/* Danfo street background — bleeds from page top, nav floats over it */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <img src={HERO_BG} alt="" className="h-full w-full object-cover object-top" loading="eager" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--paper) 0%, var(--paper) 28%, color-mix(in srgb, var(--paper) 65%, transparent) 52%, transparent 72%), " +
              "linear-gradient(to top, var(--paper) 0%, transparent 30%), " +
              "linear-gradient(to bottom, color-mix(in srgb, var(--paper) 40%, transparent) 0%, transparent 18%)",
          }}
        />
      </div>

      {/* pt-24 = ~96px clears the nav pill (64px) + breathing room */}
      <div className="relative max-w-2xl pt-24 lg:pt-28">
        <motion.span
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-500 dark:text-forest-300"
        >
          Nigeria Governance Scorecard
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 max-w-xl text-[2.75rem] font-bold leading-[1.05] tracking-tight text-ink dark:text-paper sm:text-[3.5rem]"
        >
          {mode === "cruise" ? "Oya drag your oga. Ten questions, one verdict." : "Score your elected officials. Across ten categories."}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-muted dark:text-paper/70"
        >
          {mode === "cruise"
            ? "Ten questions. One card. Rate who dey deliver and who dey form. Sharp sharp for group chat."
            : "NGSC gives every Nigerian a structured way to grade their governor, senator, or local official. A real score. A shareable card. A public record."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex items-center gap-3"
        >
          <Link
            href="/start"
            className="group flex items-center gap-1.5 text-[15px] font-semibold text-ink dark:text-paper underline-offset-4 hover:underline"
          >
            {mode === "cruise" ? "Who you wan grade today?" : "Start evaluating"}
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
          <p className="text-[13px] font-semibold text-ink">Choose your experience</p>
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
            {mode === "cruise"
              ? "Na the same ten questions for the two modes. The difference na how e dey sound. Taxpayer dey straight. Cruise dey sharp — real Naija energy. You fit switch anytime from the toggle for nav."
              : "Same 10 questions. Same NGSC card at the end. Only the phrasing changes. Taxpayer is clear English. Cruise is sharp Pidgin. Switch anytime from the nav toggle."}
          </motion.div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          {/* TAXPAYER — full card uses one consistent light tile so both columns match */}
          <button
            onClick={() => setMode("taxpayer")}
            className={`group relative flex h-36 overflow-hidden rounded-2xl border-2 text-left transition-all sm:h-40 ${
              mode === "taxpayer" ? "border-forest-500" : "border-line hover:border-forest-400"
            }`}
            style={{ background: "#ede8e0" }}
          >
            {/* Image column — same background as text column */}
            <div className="relative h-full w-28 shrink-0 overflow-hidden sm:w-36">
              <img
                src={TAXPAYER_PHOTO}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>

            {/* Text column — same tile, explicit dark text since background is always light */}
            <div className="relative flex flex-1 flex-col justify-center gap-1 px-4 py-3">
              {mode === "taxpayer" && (
                <span className="absolute right-3 top-3 rounded-full bg-forest-500 px-2 py-0.5 text-[9px] font-bold uppercase text-white shadow">
                  Active
                </span>
              )}
              <h3 className="text-[16px] font-bold leading-tight text-paper sm:text-[17px]">Taxpayer Mode</h3>
              <p className="text-[12.5px] leading-snug text-paper/75">
                Clear English. Facts, not vibes.
              </p>
              <div className="mt-1.5 flex gap-1">
                {["A", "B", "C", "D", "F"].map((g) => (
                  <span
                    key={g}
                    className="flex h-5 w-5 items-center justify-center rounded border border-gray-400/60 font-mono text-[9px] font-bold text-paper/60"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </button>

          {/* CRUISE — full card uses one consistent warm tile so both columns match */}
          <button
            onClick={() => setMode("cruise")}
            className={`group relative flex h-36 overflow-hidden rounded-2xl border-2 text-left transition-all sm:h-40 ${
              mode === "cruise" ? "border-cruise-500" : "border-line hover:border-cruise-500/60"
            }`}
            style={{ background: "#fdeee0" }}
          >
            {/* Image column — same background */}
            <div className="relative h-full w-28 shrink-0 overflow-hidden sm:w-36">
              <img
                src={CRUISE_PHOTO}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>

            <div className="relative flex flex-1 flex-col justify-center gap-1 px-4 py-3">
              {mode === "cruise" && (
                <span className="absolute right-3 top-3 rounded-full bg-cruise-500 px-2 py-0.5 text-[9px] font-bold uppercase text-white shadow">
                  Active
                </span>
              )}
              <h3 className="text-[16px] font-bold leading-tight text-paper sm:text-[17px]">Agbado Cruise Mode</h3>
              <p className="text-[12.5px] leading-snug text-paper/80">
                Sharp Pidgin. Timeline energy.
              </p>
              <p className="mt-1.5 text-[11px] italic text-paper/60">
                &ldquo;Where the money go? Why dem dey act like na crime to ask?&rdquo;
              </p>
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
