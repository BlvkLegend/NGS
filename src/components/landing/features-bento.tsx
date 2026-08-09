"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BarChart3, Shield, Mic2, Search,
  Trophy, Zap, Users, TrendingUp,
} from "lucide-react";
import { useMode } from "@/lib/mode-context";

// --- 3D tilt card wrapper (liquid-crystal) ---
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
      {/* Top-edge inset highlight: liquid-crystal */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
}

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

// Realistic NGSC card mock
function NgscCardMock() {
  return (
    <div
      className="relative mx-auto flex h-28 w-44 flex-col justify-between overflow-hidden rounded-xl p-3 shadow-lg"
      style={{
        background: "linear-gradient(135deg, #0a2e22 0%, #167a4a 60%, #1a4a2e 100%)",
        transform: "translateZ(20px) rotate(-3deg)",
      }}
    >
      {/* top row */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[7px] font-semibold uppercase tracking-[0.14em] text-white/50">NGSC</p>
          <p className="mt-0.5 text-[9px] font-medium text-white/70">Adaeze Nwosu</p>
          <p className="text-[7px] text-white/40">Governor · Enugu State</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10">
          <span className="font-mono text-[1.1rem] font-black text-white">B+</span>
        </div>
      </div>
      {/* category bars */}
      <div className="space-y-0.5">
        {[
          { l: "Infrastructure", w: 81 },
          { l: "Transparency", w: 71 },
          { l: "Security", w: 73 },
        ].map((r) => (
          <div key={r.l} className="flex items-center gap-1.5">
            <span className="w-14 text-[6px] text-white/50 truncate">{r.l}</span>
            <div className="flex-1 overflow-hidden rounded-full bg-white/10 h-1">
              <div className="h-1 rounded-full bg-white/60" style={{ width: `${r.w}%` }} />
            </div>
          </div>
        ))}
      </div>
      {/* bottom */}
      <div className="flex items-center justify-between">
        <span className="text-[6px] font-mono text-white/30">ngsc.ng</span>
        <span className="text-[6px] text-white/30">74 / 100</span>
      </div>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

const COPY = {
  taxpayer: {
    eyebrow: "What NGSC gives you",
    title: "A serious civic instrument.",
    f1: { title: "Structured scoring", body: "Ten questions across seven categories. Not vibes." },
    f2: { title: "Community pulse", body: "See how your view compares to the crowd." },
    f3: { title: "Two modes, one record", body: "Taxpayer for the data heads. Cruise for the streets." },
    f4: { title: "Compare any two officials", body: "Same scale, same categories. No spin. Put them side by side and let the numbers talk." },
    f5: { title: "Billboard leaderboard", body: "Who is rising. Who is falling. Updated live." },
    f6: { title: "Voice your take", body: "Say more after you score. Text only, never stored raw." },
  },
  cruise: {
    eyebrow: "Wetin NGSC go give you",
    title: "Sharp tool for the streets.",
    f1: { title: "Real scoring", body: "Ten questions, seven areas. No be guess work." },
    f2: { title: "Community pulse", body: "See if your take match the street or you dey lone wolf." },
    f3: { title: "Two modes, one record", body: "Taxpayer for serious people. Cruise for the real ones." },
    f4: { title: "Compare across states", body: "Line them up side by side. Same scale, same questions. Numbers go talk for themselves." },
    f5: { title: "Who dey lead leaderboard", body: "Who dey rise. Who dey fall. Real time." },
    f6: { title: "Speak your mind", body: "Talk am after you score. Voice to text, nothing stored." },
  },
};

export function FeaturesBento() {
  const { mode } = useMode();
  const c = COPY[mode];

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10 lg:py-12">
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
          {/* F1: score preview */}
          <TiltCard className="p-6" intensity={6}>
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
                <BarChart3 size={20} />
              </div>
              <Chip>
                <Zap size={11} className="text-cruise-500" /> Live
              </Chip>
            </div>
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

          {/* F4: Get Your NGSC Card — real card mockup */}
          <TiltCard className="p-5" intensity={12}>
            <div className="mt-1">
              <NgscCardMock />
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

          {/* Cross-state comparison bento — replaces redundant share card */}
          <TiltCard className="p-6" intensity={6}>
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
                <TrendingUp size={20} />
              </div>
              <Chip>
                <TrendingUp size={11} className="text-signal-good" /> 36 states
              </Chip>
            </div>

            {/* Mini compare viz: two officials side by side */}
            <div className="mt-5 space-y-2">
              {[
                { name: "A. Nwosu", state: "Enugu", score: 81, good: true },
                { name: "T. Bakare", state: "Lagos", score: 62, good: false },
                { name: "H. Idris", state: "Kano", score: 74, good: true },
              ].map((r) => (
                <div key={r.name} className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-[11px] text-ink truncate">{r.name}</span>
                  <div className="flex-1 overflow-hidden rounded-full bg-line h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${r.good ? "bg-signal-good" : "bg-signal-mid"}`}
                      style={{ width: `${r.score}%` }}
                    />
                  </div>
                  <span className={`font-mono text-[11px] font-bold w-6 text-right ${r.good ? "text-signal-good" : "text-signal-mid"}`}>
                    {r.score}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Lagos", "Abuja", "Kano", "Rivers", "Enugu", "Anambra"].map((s) => (
                <span key={s} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-muted">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-5 border-t border-line pt-4">
              <h3 className="font-semibold text-ink">Compare across states</h3>
              <p className="mt-1 text-[13px] text-ink-muted">
                Put any two officials side by side. Same categories, same scale, no spin.
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
