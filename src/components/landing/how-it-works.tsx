"use client";

import { motion } from "framer-motion";
import { Search, ListChecks, Sparkles, Share2, UserRound } from "lucide-react";
import { useMode } from "@/lib/mode-context";


const COPY = {
  taxpayer: {
    eyebrow: "02 / Process",
    title: "Four steps, one record.",
    find: { title: "Find the official", body: "Search by name, state, or office." },
    answer: { title: "Answer ten questions", body: "Infrastructure, transparency, health, and more." },
    reveal: { title: "Get your NGSC card", body: "A grade, a score, and category breakdowns." },
    share: { title: "Share or contest it", body: "Add evidence that strengthens the record." },
    payoffEyebrow: "What you walk away with",
    payoffBody: "One structured evaluation, compiled into a card built for the argument you're actually trying to win.",
  },
  cruise: {
    eyebrow: "02 / How e dey work",
    title: "Four steps, one gist.",
    find: { title: "Find who you wan drag", body: "Search their name, state, or office." },
    answer: { title: "Answer ten gbege questions", body: "Infrastructure, health, school, and more." },
    reveal: { title: "Collect your NGSC card", body: "Grade, score, and full breakdown." },
    share: { title: "Drop am for the world", body: "Bring evidence make the record hold water." },
    payoffEyebrow: "Wetin you dey waka commot with",
    payoffBody: "One correct evaluation, packaged into a card wey ready for group chat and better.",
  },
};

export function HowItWorks() {
  const { mode } = useMode();
  const c = COPY[mode];

  return (
    <section id="how-it-works" className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 scroll-mt-16">
      <span className="ledger-index text-[12px] text-forest-500">{c.eyebrow}</span>
      <h2 className="mt-3 max-w-md font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
        {c.title}
      </h2>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <BentoCell delay={0}>
          <BentoIcon><Search size={16} /></BentoIcon>
          <div className="mt-3 flex-1">
            <div className="rounded-lg border border-line bg-paper px-3 py-2 text-[12px] text-ink-muted">
              {mode === "cruise" ? "Who you dey find?" : "Search by name, state..."}
            </div>
            <div className="mt-1.5 space-y-1">
              {["Governor", "Senator", "Lagos"].map((s) => (
                <div key={s} className="flex items-center gap-2 rounded-md bg-paper px-2 py-1">
                  <UserRound size={11} className="text-ink-muted" />
                  <span className="text-[11px] text-ink-muted">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <BentoText title={c.find.title} body={c.find.body} />
        </BentoCell>

        <BentoCell delay={0.05}>
          <BentoIcon><ListChecks size={16} /></BentoIcon>
          <div className="mt-3 flex-1">
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className={`h-1.5 flex-1 rounded-full ${i < 4 ? "bg-forest-500" : "bg-line"}`} />
              ))}
            </div>
            <p className="mt-2 text-[11px] text-ink-muted">Question 4 of 10</p>
          </div>
          <BentoText title={c.answer.title} body={c.answer.body} />
        </BentoCell>

        <BentoCell delay={0.1}>
          <BentoIcon><Sparkles size={16} /></BentoIcon>
          <div className="mt-5 flex flex-1 items-center justify-center">
            <div className="flex h-20 w-14 flex-col items-center justify-center gap-1 rounded-lg bg-gradient-to-br from-forest-500 to-forest-900 text-paper shadow-card">
              <span className="font-mono text-lg font-semibold">B+</span>
              <span className="text-[7px] uppercase tracking-wide text-paper/70">NGSC</span>
            </div>
          </div>
          <BentoText title={c.reveal.title} body={c.reveal.body} />
        </BentoCell>

        <BentoCell delay={0.15}>
          <BentoIcon><Share2 size={16} /></BentoIcon>
          <div className="mt-3 flex flex-1 items-center gap-2">
            {["WA", "X", "IG"].map((p) => (
              <span key={p} className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-[10px] font-medium text-ink-muted">{p}</span>
            ))}
          </div>
          <BentoText title={c.share.title} body={c.share.body} />
        </BentoCell>
      </div>
    </section>
  );
}

function BentoCell({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay }}
      className={`flex min-h-[220px] flex-col rounded-2xl border border-line bg-paper-raised p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function BentoIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-tint text-forest-500">
      {children}
    </div>
  );
}

function BentoText({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-4 border-t border-line pt-3">
      <h3 className="font-display text-[15px] font-medium text-ink">{title}</h3>
      <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
