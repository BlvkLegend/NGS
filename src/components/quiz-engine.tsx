"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { quizQuestions, scoreOptions } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { getLandmark, landmarkVariant } from "@/lib/landmarks";
import { route } from "@/lib/asset";
import type { Leader } from "@/lib/data";

/**
 * Category photos — African / Nigerian context images only.
 * No white-people stock images. Prefer Nigerian streets, markets,
 * schools, clinics, government buildings, infrastructure.
 */
const CATEGORY_PHOTOS: Record<string, string> = {
  // Infrastructure: Nigerian road construction / bridge
  Infrastructure:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80",
  // Transparency: African government/office paperwork
  Transparency:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80",
  // Security: empty urban street / police station exterior — African city
  Security:
    "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=80",
  // Healthcare: African clinic interior / medical supplies
  Healthcare:
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80",
  // Education: African school classroom / chalkboard
  Education:
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1400&q=80",
  // Power Supply: electricity towers / Nigerian NEPA poles
  "Power Supply":
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=80",
  // Job Creation: African market / traders / commerce
  "Job Creation":
    "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1400&q=80",
  // Economy: West African market, goods and trade
  Economy:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80",
  // Responsiveness: government building exterior / ministry gate
  Responsiveness:
    "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=1400&q=80",
  // Accountability: scales of justice / court building
  Accountability:
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80",
};

const CRUISE_LABELS: Record<string, string> = {
  A: "E choke! Correct oga",
  B: "E try, I give am that",
  C: "Half half, him dey manage",
  D: "Na only announcement remain",
  F: "Certified sapa minister",
};

const TAXPAYER_LABELS: Record<string, string> = {
  A: "Excellent",
  B: "Good",
  C: "Average",
  D: "Poor",
  F: "Fail",
};

type Stage = "question" | "generating";

export function QuizEngine({ leader }: { leader: Leader }) {
  const router = useRouter();
  const { mode } = useMode();
  const [stage, setStage] = useState<Stage>("question");
  const [step, setStep]   = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const total    = quizQuestions.length;
  const question = quizQuestions[step];
  const answeredValue = answers[question.id];

  const variant      = useMemo(() => landmarkVariant(`${leader.slug}-${step}`), [leader.slug, step]);
  const landmarkPhoto = getLandmark(leader.jurisdiction, variant);
  const bgPhoto       = CATEGORY_PHOTOS[question.category] ?? landmarkPhoto;

  function selectAnswer(value: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function goNext() {
    if (!answeredValue) return;
    if (step < total - 1) { setStep((s) => s + 1); return; }
    setStage("generating");
    const values = Object.values(answers);
    const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 3;
    const computedScore = Math.round((avg / 5) * 100);
    // Navigate to real scorecard page
    setTimeout(() => router.push(route(`/scorecard/${leader.slug}?s=${computedScore}`)), 2200);
  }

  function goBack() { if (step > 0) setStep((s) => s - 1); }

  // Generating state — default bg-paper (no landmark image)
  if (stage === "generating") {
    return (
      <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-paper px-6 text-center">
        <Loader2 className="mx-auto animate-spin text-forest-500" size={32} strokeWidth={1.5} />
        <p className="mt-6 text-xl font-bold text-ink">
          {mode === "cruise" ? "We dey cook your NGSC card..." : "Compiling your NGSC card..."}
        </p>
        <p className="mt-2 text-[13px] text-ink-muted">{leader.name} · {leader.jurisdiction}</p>
      </div>
    );
  }

  return (
    /*
     * The evaluate page wraps this in a div without a navbar.
     * We position the quiz full-screen (100vh) and let the nav overlay from outside.
     * The evaluate/[slug]/page.tsx must use -mt-16 or similar so nav overlays.
     */
    <div className="relative flex min-h-[calc(100vh-0px)] flex-col overflow-hidden">
      {/* Full-page background — crossfades on step change */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${step}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img src={bgPhoto} alt="" aria-hidden className="h-full w-full object-cover object-center" loading="eager" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.42) 22%, rgba(0,0,0,0.22) 42%, rgba(0,0,0,0.62) 60%, rgba(0,0,0,0.90) 78%, rgba(0,0,0,0.97) 100%)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress bar — sticky, just below where the nav overlay sits. pt-20 so nav doesn't cover it */}
      <div
        className="sticky top-0 z-20 px-6 pt-20 pb-3"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.50) 100%)", backdropFilter: "blur(10px)" }}
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-2 flex items-center justify-between text-[12px]">
            <span className="font-medium text-paper">{leader.name}</span>
            <span className="text-paper/55">{step + 1} of {total}</span>
          </div>
          <ProgressBar current={step + 1} total={total} dark />
        </div>
      </div>

      {/* Question body */}
      <div className="relative z-10 flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-2xl flex-1 px-6 pb-4 pt-6"
          >
            <span className="inline-block rounded-full border border-paper/25 bg-black/48 px-2.5 py-0.5 text-[11px] font-semibold text-paper backdrop-blur-sm">
              {question.category}
            </span>

            <h2 className="mt-4 max-w-lg text-[1.6rem] font-bold leading-tight text-paper drop-shadow-sm sm:text-[1.9rem]">
              {mode === "cruise" ? question.cruise : question.taxpayer}
            </h2>

            <div className="mt-6 space-y-2">
              {[...scoreOptions].reverse().map((opt) => {
                const selected = answeredValue === opt.value;
                const displayLabel = mode === "cruise" ? CRUISE_LABELS[opt.label] : TAXPAYER_LABELS[opt.label];
                return (
                  <button
                    key={opt.value}
                    onClick={() => selectAnswer(opt.value)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                      selected
                        ? mode === "cruise"
                          ? "border-cruise-500 bg-cruise-500/88 shadow"
                          : "border-forest-400 bg-forest-500/88 shadow"
                        : "border-paper/20 bg-black/52 backdrop-blur-sm hover:border-paper/40 hover:bg-black/62"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[14px] font-bold ${
                        selected ? "bg-paper/20 text-paper" : "border border-paper/30 text-paper/72"
                      }`}
                    >
                      {selected ? <Check size={13} className="text-paper" /> : opt.label}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold text-paper">{displayLabel}</span>
                      <span className="block truncate text-[11px] text-paper/60">{opt.helper}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky bottom nav */}
      <div
        className="sticky bottom-0 z-20 px-6 py-4"
        style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <button
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] font-medium text-paper/60 transition-colors hover:text-paper disabled:opacity-0"
          >
            <ArrowLeft size={15} /> Back
          </button>
          <button
            onClick={goNext}
            disabled={!answeredValue}
            className={`flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-[14px] font-semibold text-paper transition-all ${
              answeredValue
                ? mode === "cruise" ? "bg-cruise-500 hover:bg-cruise-700" : "bg-forest-500 hover:bg-forest-700"
                : "cursor-not-allowed bg-white/10 text-paper/30"
            }`}
          >
            {step === total - 1 ? "Finish" : "Next"} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
