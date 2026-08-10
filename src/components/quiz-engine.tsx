"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Users } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { quizQuestions, scoreOptions, communityPulseCopy } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { getLandmark, landmarkVariant } from "@/lib/landmarks";
import type { Leader } from "@/lib/data";

// Cruise mode answer labels
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

  // Deterministic variant per (leader × step) so different users get different photos
  const variant = useMemo(
    () => landmarkVariant(`${leader.slug}-${step}`),
    [leader.slug, step]
  );
  const bgPhoto = getLandmark(leader.jurisdiction, variant);

  function selectAnswer(value: number) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function goNext() {
    if (!answeredValue) return;
    if (step < total - 1) {
      setStep((s) => s + 1);
      return;
    }
    setStage("generating");
    const values = Object.values(answers);
    const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 3;
    const computedScore = Math.round((avg / 5) * 100);
    setTimeout(() => {
      router.push(`/scorecard/${leader.slug}?s=${computedScore}`);
    }, 2200);
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  // --- Generating state ---
  if (stage === "generating") {
    return (
      <div className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Page-fill landmark behind generating screen */}
        <img
          src={bgPhoto}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative">
          <Loader2 className="mx-auto animate-spin text-paper" size={32} strokeWidth={1.5} />
          <p className="mt-6 text-xl font-bold text-paper">
            {mode === "cruise" ? "We dey cook your NGSC card..." : "Compiling your NGSC card..."}
          </p>
          <p className="mt-2 text-[13px] text-paper/60">
            {leader.name} · {leader.jurisdiction}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] flex-col overflow-hidden">
      {/* === FULL-PAGE BACKGROUND — changes per question === */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${step}`}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <img
            src={bgPhoto}
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-center"
            loading="eager"
          />
          {/*
            Vertical gradient treatment matching the leader card / hero language:
            - Top 15%: strong dark veil so header progress bar text reads
            - Mid band: lighter so the landmark is visible
            - Bottom 55%: deepens to near-black so question + answer buttons are always readable
          */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                "linear-gradient(to bottom,",
                "  rgba(0,0,0,0.80) 0%,",
                "  rgba(0,0,0,0.45) 18%,",
                "  rgba(0,0,0,0.20) 38%,",
                "  rgba(0,0,0,0.55) 55%,",
                "  rgba(0,0,0,0.88) 75%,",
                "  rgba(0,0,0,0.96) 100%",
                ")",
              ].join(""),
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* === STICKY PROGRESS HEADER (above background) === */}
      <div className="sticky top-0 z-20 px-6 py-3 backdrop-blur-sm" style={{ background: "rgba(0,0,0,0.55)" }}>
        <div className="mx-auto max-w-2xl">
          <div className="mb-2 flex items-center justify-between text-[12px]">
            <span className="font-medium text-paper">{leader.name}</span>
            <span className="text-paper/60">{step + 1} of {total}</span>
          </div>
          <ProgressBar current={step + 1} total={total} dark />
        </div>
      </div>

      {/* === QUESTION BODY === */}
      <div className="relative z-10 flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-2xl flex-1 px-6 pb-4 pt-6"
          >
            {/* Category chip — floats over the mid-photo area */}
            <span className="inline-block rounded-full border border-paper/25 bg-black/40 px-2.5 py-0.5 text-[11px] font-semibold text-paper backdrop-blur-sm">
              {question.category}
            </span>

            {/* Question text — large, white, always over the dark lower band */}
            <h2 className="mt-4 max-w-lg text-[1.6rem] font-bold leading-tight text-paper drop-shadow-sm sm:text-[1.9rem]">
              {mode === "cruise" ? question.cruise : question.taxpayer}
            </h2>

            {/* Answer options */}
            <div className="mt-6 space-y-2">
              {[...scoreOptions].reverse().map((opt) => {
                const selected = answeredValue === opt.value;
                const pulseText = communityPulseCopy(leader.slug, question.id, opt.value, mode);
                const displayLabel =
                  mode === "cruise" ? CRUISE_LABELS[opt.label] : TAXPAYER_LABELS[opt.label];

                return (
                  <div key={opt.value}>
                    <button
                      onClick={() => selectAnswer(opt.value)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                        selected
                          ? mode === "cruise"
                            ? "border-cruise-500 bg-cruise-500/90 shadow"
                            : "border-forest-400 bg-forest-500/90 shadow"
                          : "border-paper/20 bg-black/50 backdrop-blur-sm hover:border-paper/40 hover:bg-black/60"
                      }`}
                    >
                      {/* Grade box */}
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[14px] font-bold ${
                          selected
                            ? "bg-paper/20 text-paper"
                            : "border border-paper/30 text-paper/70"
                        }`}
                      >
                        {selected ? <Check size={13} className="text-paper" /> : opt.label}
                      </span>

                      <div className="min-w-0 flex-1">
                        <span className="block text-[14px] font-semibold text-paper">
                          {displayLabel}
                        </span>
                        <span className="block truncate text-[11px] text-paper/60">
                          {opt.helper}
                        </span>
                      </div>
                    </button>

                    {/* Community pulse reveal */}
                    <AnimatePresence>
                      {selected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-paper/10 bg-black/40 px-4 py-2 text-[12px] backdrop-blur-sm">
                            <Users size={12} className="shrink-0 text-paper/50" />
                            <span className="text-paper/70">{pulseText}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* === STICKY BOTTOM NAV === */}
      <div
        className="sticky bottom-0 z-20 px-6 py-4"
        style={{ background: "rgba(0,0,0,0.70)", backdropFilter: "blur(8px)" }}
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
                ? mode === "cruise"
                  ? "bg-cruise-500 hover:bg-cruise-700"
                  : "bg-forest-500 hover:bg-forest-700"
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
