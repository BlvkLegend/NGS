"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BarChart3, Shield, Mic2, Share2, Search, Trophy,
  Zap, Users, TrendingUp,
} from "lucide-react";
import { useMode } from "@/lib/mode-context";

// --- 3D tilt card wrapper ---
function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.015 }}
      transition={{ scale: { duration: 0.2 } }}
      className={`relative cursor-default overflow-hidden rounded-2xl border border-line-strong bg-paper-raised
        shadow-[0_2px_0_rgba(255,255,255,0.06)_inset,0_8px_24px_-6px_rgba(0,0,0,0.18)]
        hover:shadow-[0_2px_0_rgba(255,255,255,0.1)_inset,0_12px_32px_-6px_rgba(0,0,0,0.24)]
        ${className}`}
    >
      {/* Top-edge inset highlight: liquid-crystal effect */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
}

// Floating chip element that sits "above" the card surface
function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-[12px] font-medium text-ink shadow-sm ${className}`}
      style={{ transform: "translateZ(20px)" }}
    >
      {children}
    </div>
  );
}

const COPY = {
  taxpayer: {
    eyebrow: "03 / What NGSC gives you",
    title: "A serious civic instrument.",
    f1: { title: "Structured scoring", body: "Ten questions across seven categories. Not vibes." },
    f2: { title: "Community pulse", body: "See how your view compares to the crowd." },
    f3: { title: "Two modes, one record", body: "Taxpayer for the data heads. Cruise for the streets." },
    f4: { title: "Viral NGSC card", body: "A shareable card built to start arguments." },
    f5: { title: "Billboard leaderboard", body: "Who is rising. Who is falling. Updated live." },
    f6: { title: "Voice your take", body: "Say more after you score. Text only, never stored raw." },
  },
  cruise: {
    eyebrow: "03 / Wetin NGSC go give you",
    title: "Sharp tool for the streets.",
    f1: { title: "Real scoring", body: "Ten questions, seven areas. No be guess work." },
    f2: { title: "Community pulse", body: "See if your take match the street or you dey lone wolf." },
    f3: { title: "Two modes, one record", body: "Taxpayer for serious people. Cruise for the real ones." },
    f4: { title: "Shareable NGSC card", body: "Card wey your group chat go argue about for days." },
    f5: { title: "Who dey lead leaderboard", body: "Who dey rise. Who dey fall. Real time." },
    f6: { title: "Speak your mind", body: "Talk am after you score. Voice to text, nothing stored." },
  },
};

export function FeaturesBento() {
  const { mode } = useMode();
  const c = COPY[mode];

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
      <span className="ledger-index text-[12px] text-forest-500">{c.eyebrow}</span>
      <h2 className="mt-3 max-w-lg text-3xl font-bold leading-tight text-ink sm:text-4xl">
        {c.title}
      </h2>

      <div
        className="mt-8 grid gap-3"
        style={{ perspective: "1200px" }}
      >
        {/* Row 1: wide + narrow */}
        <div className="grid gap-3 sm:grid-cols-[1.6fr_1fr]">
          {/* F1: wide, taller, score preview */}
          <TiltCard className="p-6" intensity={6}>
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
                <BarChart3 size={20} />
              </div>
              <Chip>
                <Zap size={11} className="text-cruise-500" /> Live
              </Chip>
            </div>
            {/* Mini score bars preview */}
            <div className="mt-5 space-y-2">
              {[
                { label: "Infrastructure", w: 81 },
                { label: "Transparency", w: 71 },
                { label: "Security", w: 73 },
                { label: "Economy", w: 69 },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-[11px] text-ink-muted">{r.label}</span>
                  <div className="flex-1 overflow-hidden rounded-full bg-line h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.w}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                      className="h-2 rounded-full bg-forest-500"
                    />
                  </div>
                  <span className="font-mono text-[11px] text-ink w-6 text-right">{r.w}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-line pt-4">
              <h3 className="font-semibold text-ink">{c.f1.title}</h3>
              <p className="mt-1 text-[13px] text-ink-muted">{c.f1.body}</p>
            </div>
          </TiltCard>

          {/* F2: community pulse */}
          <TiltCard className="p-6" intensity={10}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
              <Users size={20} />
            </div>
            {/* Pulse numbers floating */}
            <div className="mt-5 flex flex-col gap-2">
              {[
                { pct: 67, label: "Agreed with this" },
                { pct: 31, label: "Disagreed" },
                { pct: 2, label: "No opinion" },
              ].map((r) => (
                <div key={r.label} className="flex items-center gap-2">
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-mono text-[1.4rem] font-black text-ink leading-none"
                  >
                    {r.pct}%
                  </motion.span>
                  <span className="text-[12px] text-ink-muted">{r.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-line pt-4">
              <h3 className="font-semibold text-ink">{c.f2.title}</h3>
              <p className="mt-1 text-[13px] text-ink-muted">{c.f2.body}</p>
            </div>
          </TiltCard>
        </div>

        {/* Row 2: three equal */}
        <div className="grid gap-3 sm:grid-cols-3">
          {/* F3: mode toggle */}
          <TiltCard className="p-5" intensity={12}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cruise-tint text-cruise-500">
              <Shield size={18} />
            </div>
            <div className="mt-4 flex gap-2">
              <Chip className="bg-forest-tint border-forest-500 text-forest-700">Taxpayer</Chip>
              <Chip className="bg-cruise-tint border-cruise-500 text-cruise-700">Cruise</Chip>
            </div>
            <div className="mt-4 border-t border-line pt-4">
              <h3 className="font-semibold text-ink text-[14px]">{c.f3.title}</h3>
              <p className="mt-1 text-[12px] text-ink-muted">{c.f3.body}</p>
            </div>
          </TiltCard>

          {/* F4: shareable card */}
          <TiltCard className="p-5" intensity={12}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
              <Share2 size={18} />
            </div>
            {/* Mini card preview */}
            <div className="mt-4 flex justify-center">
              <div
                className="flex h-16 w-12 flex-col items-center justify-center gap-0.5 rounded-lg bg-gradient-to-br from-forest-500 to-forest-900 text-paper shadow-card"
                style={{ transform: "translateZ(16px) rotate(-4deg)" }}
              >
                <span className="font-mono text-[1.1rem] font-black leading-none">B+</span>
                <span className="text-[6px] uppercase tracking-wide text-paper/60">NGSC</span>
              </div>
            </div>
            <div className="mt-4 border-t border-line pt-4">
              <h3 className="font-semibold text-ink text-[14px]">{c.f4.title}</h3>
              <p className="mt-1 text-[12px] text-ink-muted">{c.f4.body}</p>
            </div>
          </TiltCard>

          {/* F5: leaderboard */}
          <TiltCard className="p-5" intensity={12}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
              <Trophy size={18} />
            </div>
            <div className="mt-4 space-y-2">
              {[
                { rank: 1, name: "A. Nwosu", delta: "+3", up: true },
                { rank: 2, name: "T. Bakare", delta: "-2", up: false },
                { rank: 3, name: "H. Idris", delta: "New", up: true },
              ].map((r) => (
                <div key={r.rank} className="flex items-center gap-2">
                  <span className="font-mono text-[1rem] font-black text-ink w-5">{r.rank}</span>
                  <span className="flex-1 text-[12px] text-ink truncate">{r.name}</span>
                  <span className={`font-mono text-[11px] font-bold ${r.up ? "text-signal-good" : "text-signal-low"}`}>
                    {r.delta}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-line pt-4">
              <h3 className="font-semibold text-ink text-[14px]">{c.f5.title}</h3>
              <p className="mt-1 text-[12px] text-ink-muted">{c.f5.body}</p>
            </div>
          </TiltCard>
        </div>

        {/* Row 3: narrow + wide */}
        <div className="grid gap-3 sm:grid-cols-[1fr_1.6fr]">
          {/* F6: voice */}
          <TiltCard className="p-5" intensity={10}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
              <Mic2 size={18} />
            </div>
            {/* Waveform SVG */}
            <div className="mt-4">
              <svg viewBox="0 0 120 40" className="w-full text-forest-500" fill="none">
                {[8, 18, 28, 38, 48, 58, 68, 78, 88, 98, 108].map((x, i) => {
                  const h = [6, 18, 26, 14, 30, 22, 10, 28, 16, 24, 8][i];
                  return (
                    <rect
                      key={x}
                      x={x}
                      y={(40 - h) / 2}
                      width="5"
                      height={h}
                      rx="2.5"
                      fill="currentColor"
                      fillOpacity={0.35 + i * 0.03}
                    />
                  );
                })}
              </svg>
            </div>
            <div className="mt-4 border-t border-line pt-4">
              <h3 className="font-semibold text-ink text-[14px]">{c.f6.title}</h3>
              <p className="mt-1 text-[12px] text-ink-muted">{c.f6.body}</p>
            </div>
          </TiltCard>

          {/* Search / directory preview */}
          <TiltCard className="p-6" intensity={6}>
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
                <Search size={20} />
              </div>
              <Chip>
                <TrendingUp size={11} className="text-signal-good" /> 36 states
              </Chip>
            </div>
            {/* Search bar mockup */}
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2.5">
              <Search size={13} className="text-ink-muted" />
              <span className="text-[13px] text-ink-muted">
                {mode === "cruise" ? "Who you wan drag today?" : "Search any official..."}
              </span>
              <span className="ml-auto h-4 w-[1px] animate-pulse bg-forest-500" />
            </div>
            {/* Suggestion chips */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Governor", "Senator", "LG Chairman", "Abuja", "Kano", "Rivers"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-muted"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-5 border-t border-line pt-4">
              <h3 className="font-semibold text-ink">Find any official</h3>
              <p className="mt-1 text-[13px] text-ink-muted">
                36 states, every tier of government. Search and evaluate in seconds.
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
