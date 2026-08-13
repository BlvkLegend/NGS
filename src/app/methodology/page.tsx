"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  ShieldCheck, Building2, Eye, ShieldAlert, HeartPulse,
  GraduationCap, Zap, Briefcase, TrendingDown, Users, Scale,
} from "lucide-react";
import { useMode } from "@/lib/mode-context";
import { route } from "@/lib/asset";

const GRADE_SCALE = [
  { grade: "A", meaning: "Excellent",      range: "80 to 100", color: "text-signal-good border-signal-good", bg: "bg-[#e7efe6] dark:bg-[#0d2218]", textClass: "text-[#1a2e1a] dark:text-[#b8dcc8]" },
  { grade: "B", meaning: "Good",           range: "65 to 79",  color: "text-forest-500 border-forest-500",   bg: "bg-[#edf5f0] dark:bg-[#0d2018]", textClass: "text-[#1a2e20] dark:text-[#a8d4b8]" },
  { grade: "C", meaning: "Average",        range: "50 to 64",  color: "text-signal-mid border-signal-mid",   bg: "bg-[#fdf8e4] dark:bg-[#2a2208]", textClass: "text-[#2a2208] dark:text-[#d4c070]" },
  { grade: "D", meaning: "Poor",           range: "35 to 49",  color: "text-cruise-500 border-cruise-500",   bg: "bg-[#fdeee0] dark:bg-[#2a1808]", textClass: "text-[#2a1808] dark:text-[#d4a070]" },
  { grade: "F", meaning: "Fail",           range: "0 to 34",   color: "text-signal-low border-signal-low",   bg: "bg-[#fce8e6] dark:bg-[#2a0e0e]", textClass: "text-[#2a0e0e] dark:text-[#d48080]" },
];

const ANSWER_SCALE = [
  { label: "A", display: "Excellent",  helper: "Consistent, well-documented delivery",    color: "text-signal-good" },
  { label: "B", display: "Good",       helper: "Clear, verifiable progress",              color: "text-forest-500" },
  { label: "C", display: "Average",    helper: "Some progress, significant gaps remain",  color: "text-signal-mid" },
  { label: "D", display: "Poor",       helper: "Minimal, inconsistent progress",          color: "text-cruise-500" },
  { label: "F", display: "Fail",       helper: "No credible evidence of progress",        color: "text-signal-low" },
];

const CATEGORIES = [
  { icon: <Building2 size={16} />,    label: "Infrastructure",  q: "Visible infrastructure delivered this term?" },
  { icon: <Eye size={16} />,          label: "Transparency",    q: "Budgets and records citizens can verify?" },
  { icon: <ShieldAlert size={16} />,  label: "Security",        q: "Has safety meaningfully improved?" },
  { icon: <HeartPulse size={16} />,   label: "Healthcare",      q: "Access to functioning public healthcare?" },
  { icon: <GraduationCap size={16} />,label: "Education",       q: "Condition of public schools this term?" },
  { icon: <Zap size={16} />,          label: "Power Supply",    q: "Consistency of electricity supply?" },
  { icon: <Briefcase size={16} />,    label: "Job Creation",    q: "Verifiable employment beyond announcements?" },
  { icon: <TrendingDown size={16} />, label: "Economy",         q: "Affordability of basic goods changed?" },
  { icon: <Users size={16} />,        label: "Responsiveness",  q: "Accessible and responsive to constituents?" },
  { icon: <Scale size={16} />,        label: "Accountability",  q: "Scrutiny or consequences for failures?" },
];

const BRACKETS = [
  { label: "Geographic anchor",  detail: "36 states, FCT Abuja, or Diaspora" },
  { label: "Occupation status",  detail: "Student, unemployed, employed, or entrepreneur" },
  { label: "Age bracket",        detail: "Inferred from interface mode, never asked directly" },
];

export default function MethodologyPage() {
  const { mode } = useMode();

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      {/* Methodology photo band */}
      <div className="relative mx-auto max-w-[1400px] overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden sm:h-60">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=75"
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-center"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, var(--paper) 0%, color-mix(in srgb, var(--paper) 65%, transparent) 45%, transparent 80%), linear-gradient(to top, var(--paper) 0%, transparent 40%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-10">
            <span className="ledger-index text-[12px] text-forest-500">How it works</span>
            <h1 className="mt-3 max-w-xl text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
              How a score becomes a grade.
            </h1>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-6 py-10 lg:px-10">
        <p className="max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          Every evaluation on NGSC follows the same structure regardless of which official
          is scored or which mode was used. That consistency is what makes one governor&apos;s
          grade comparable to another&apos;s.
        </p>

        {/* Step 1: 10 questions */}
        <section className="mt-16">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-500 font-mono text-[12px] font-bold text-paper">1</span>
            <h2 className="text-xl font-bold text-ink">Ten questions, ten categories</h2>
          </div>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-muted">
            One question per category, asked in both formal English (Taxpayer mode) and
            Nigerian Pidgin (Cruise mode). Same underlying question, different register.
          </p>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 rounded-xl border border-line bg-paper-raised p-4"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-forest-tint text-forest-500">
                  {cat.icon}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-ink">{cat.label}</p>
                  <p className="mt-0.5 text-[12px] text-ink-muted">{cat.q}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Step 2: answer scale */}
        <section className="mt-16 border-t border-line pt-12">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-500 font-mono text-[12px] font-bold text-paper">2</span>
            <h2 className="text-xl font-bold text-ink">Each question answered A to F</h2>
          </div>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-muted">
            Not star ratings or numbers: letter grades with clear definitions so
            every evaluator uses the same standard.
          </p>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {ANSWER_SCALE.map((opt) => (
              <div
                key={opt.label}
                className="flex items-center gap-3 rounded-xl border border-line bg-paper-raised p-4"
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 font-mono text-[1.2rem] font-black ${opt.color}`}>
                  {opt.label}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-ink">{opt.display}</p>
                  <p className="mt-0.5 text-[11px] text-ink-muted">{opt.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Step 3: score to grade */}
        <section className="mt-16 border-t border-line pt-12">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-500 font-mono text-[12px] font-bold text-paper">3</span>
            <h2 className="text-xl font-bold text-ink">Answers average into a score, score maps to a grade</h2>
          </div>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-muted">
            The ten letter grades convert to a numeric average (A=5, B=4, C=3, D=2, F=1),
            scaled to 100. That number maps to a final letter grade:
          </p>

          {/* 3D-style grade card strip */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-line-strong shadow-card">
            {GRADE_SCALE.map((row, i) => (
              <motion.div
                key={row.grade}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`flex items-center gap-5 px-6 py-4 ${i > 0 ? "border-t border-line" : ""} ${row.bg}`}
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 font-mono text-[1.6rem] font-black ${row.color}`}>
                  {row.grade}
                </span>
                <div className="flex-1">
                  <p className={`text-[15px] font-semibold ${row.textClass}`}>{row.meaning}</p>
                </div>
                <span className={`font-mono text-[13px] ${row.textClass} opacity-70`}>{row.range}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Step 4: demographic brackets */}
        <section className="mt-16 border-t border-line pt-12">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-500 font-mono text-[12px] font-bold text-paper">4</span>
            <h2 className="text-xl font-bold text-ink">Evaluations are anonymously bracketed</h2>
          </div>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-muted">
            Results can be read by segment without ever identifying an individual evaluator.
            Three brackets are captured at onboarding:
          </p>
          <div className="mt-5 space-y-2">
            {BRACKETS.map((b) => (
              <div key={b.label} className="flex items-center justify-between rounded-xl border border-line bg-paper-raised px-5 py-3.5">
                <span className="text-[14px] font-medium text-ink">{b.label}</span>
                <span className="text-[13px] text-ink-muted">{b.detail}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Guard note */}
        <section className="mt-12">
          <div className="flex items-start gap-4 rounded-2xl border border-forest-500/30 bg-forest-tint/40 p-6">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-forest-500" />
            <div>
              <h3 className="text-[15px] font-semibold text-ink">Guarding against noise</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                No system built on public submissions is immune to bad-faith entries.
                NGSC&apos;s roadmap includes evidence-backed evaluations where an evaluator
                can attach a photo or clip to support a claim, and pattern-based review
                to flag coordinated or duplicate submissions before they affect a public score.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 flex items-center justify-between gap-4 rounded-2xl bg-[#0a2e22] dark:bg-[#0a2e22] px-6 py-5">
          <div>
            <p className="font-semibold text-paper">Now you know how it works.</p>
            <p className="mt-0.5 text-[13px] text-paper/60">Put the categories to use. Rate an official now.</p>
          </div>
          <Link
            href={route("/start")}
            className="shrink-0 rounded-xl bg-paper px-5 py-2.5 text-[14px] font-semibold text-ink transition-colors hover:bg-forest-tint"
          >
            Rate a leader
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
