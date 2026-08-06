"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMode } from "@/lib/mode-context";
import { CivicMotif } from "@/components/landing/civic-motif";
import { PersonaToggle } from "@/components/persona-toggle";

// Lagos Idumota street — Opeyemi Adisa, Nigerian photographer, free Unsplash license
const HERO_IMG_DAY = "https://images.unsplash.com/photo-1648023199223-25d3622bcb13?auto=format&fit=crop&w=1400&q=75";
// Victoria Island Lagos night — Seun Idowu, Nigerian photographer, free Unsplash license
const HERO_IMG_NIGHT = "https://images.unsplash.com/photo-1593717191400-84f38ee95485?auto=format&fit=crop&w=1400&q=75";

const COPY = {
  cruise: {
    headline: "Drag the people wey you vote for.",
    body: "Ten sharp questions turn your real experience into an NGSC card: a grade, a score, and receipts for the next argument.",
    cta: "Who you wan drag?",
  },
  taxpayer: {
    headline: "Score the people you elected.",
    body: "A structured, evidence-aware questionnaire turns your experience of governance into a shareable NGSC card: a grade, a score, and a record that holds up in an argument.",
    cta: "Find your representative",
  },
};

export function Hero() {
  const { mode } = useMode();
  const copy = COPY[mode];

  return (
    <section className="relative mx-auto max-w-[1400px] overflow-hidden px-6 pb-14 pt-10 lg:px-10 lg:pb-16 lg:pt-14">
      {/* Real Lagos cityscape background image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <img
          src={mode === "cruise" ? HERO_IMG_NIGHT : HERO_IMG_DAY}
          alt=""
          className="h-full w-full object-cover object-center opacity-[0.12] dark:opacity-[0.18]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/80 to-transparent" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-10 h-[520px] w-[640px] opacity-40 lg:-right-16 lg:h-[620px] lg:w-[760px]"
      >
        <CivicMotif className="h-full w-full" />
      </div>

      <div className="relative max-w-2xl">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="ledger-index text-[12px] text-forest-500"
        >
          01 / Entry
        </motion.span>

        <motion.h1
          key={copy.headline}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-4 max-w-xl font-display text-[2.75rem] font-medium leading-[1.05] tracking-tight text-ink sm:text-[3.5rem]"
        >
          {copy.headline}
        </motion.h1>

        <motion.p
          key={copy.body}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-muted"
        >
          {copy.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/start"
            className="group flex items-center gap-1.5 text-[15px] font-medium text-ink"
          >
            {copy.cta}
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="h-4 w-px bg-line" />
          <PersonaToggle />
        </motion.div>
      </div>
    </section>
  );
}

