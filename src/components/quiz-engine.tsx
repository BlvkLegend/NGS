"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Users } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { quizQuestions, scoreOptions, communityPulseCopy } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import type { Leader } from "@/lib/data";

// Nigerian Unsplash photos keyed to quiz category — no human faces
const CATEGORY_PHOTOS: Record<string, string> = {
  Infrastructure:   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=75",
  Transparency:     "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=75",
  Security:         "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=75",
  Healthcare:       "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=75",
  Education:        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=75",
  "Power Supply":   "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=75",
  "Job Creation":   "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=75",
  Economy:          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=75",
  Responsiveness:   "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=800&q=75",
  Accountability:   "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=75",
};

// Cruise mode answer labels
const CRUISE_LABELS: Record<string, string> = {
  A: "E choke! Correct oga",
  B: "E try, I give am that",
  C: "Half half, him dey manage",
  D: "Na only announcement remain",
  F: "Certified sapa minister",
};

type Stage = "question" | "generating";

export function QuizEngine({ leader }: { leader: Leader }) {
  const router = useRouter();
  const { mode } = useMode();
  const [stage, setStage] = useState<Stage>("question");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const total = quizQuestions.length;
  const question = quizQuestions[step];
  const answeredValue = answers[question.id];
  const photo = CATEGORY_PHOTOS[question.category];

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
    }, 2000);
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  if (stage === "generating") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <Loader2 className="animate-spin text-forest-500" size={28} strokeWidth={1.5} />
        <p className="mt-5 text-xl font-semibold text-ink">
          {mode === "cruise" ? "We dey cook your NGSC card..." : "Compiling your NGSC card..."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col">
      {/* Sticky progress header */}
      <div className="sticky top-0 z-10 border-b border-line bg-paper/95 px-6 py-3 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl">
          <div className="mb-2 flex items-center justify-between text-[12px] text-ink-muted">
            <span className="font-medium">{leader.name}</span>
            <span>{step + 1} of {total}</span>
          </div>
          <ProgressBar current={step + 1} total={total} />
        </div>
      </div>

      {/* Question body */}
      <div className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-2xl flex-1 px-6 pb-4 pt-8"
          >
            {/* Category photo: full-bleed banner behind the question text */}
            {photo && (
              <div className="relative mb-5 h-32 w-full overflow-hidden rounded-2xl sm:h-40">
                <img
                  src={photo}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover object-center"
                  loading="eager"
                />
                {/* Dark gradient so category label and any text stay readable */}
                <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/40 to-transparent" />
                {/* Category chip positioned over the photo */}
                <div className="absolute bottom-3 left-4">
                  <span className="inline-block rounded-full border border-paper/30 bg-ink/50 px-2.5 py-0.5 text-[11px] font-semibold text-paper backdrop-blur-sm">
                    {question.category}
                  </span>
                </div>
              </div>
            )}

            {!photo && (
              <span className="mb-3 inline-block rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-ink-muted">
                {question.category}
              </span>
            )}

            <h2 className="mt-1 max-w-lg text-[1.5rem] font-bold leading-tight text-ink sm:text-[1.75rem]">
              {mode === "cruise" ? question.cruise : question.taxpayer}
            </h2>

            <div className="mt-6 space-y-2">
              {[...scoreOptions].reverse().map((opt) => {
                const selected = answeredValue === opt.value;
                const pulseText = communityPulseCopy(leader.slug, question.id, opt.value, mode);

                // Cruise labels: white text, guaranteed contrast
                const cruiseLabel = CRUISE_LABELS[opt.label];
                const taxpayerLabel =
                  opt.label === "A" ? "Excellent" :
                  opt.label === "B" ? "Good" :
                  opt.label === "C" ? "Average" :
                  opt.label === "D" ? "Poor" : "Fail";

                const displayLabel = mode === "cruise" ? cruiseLabel : taxpayerLabel;

                // In cruise mode, selected buttons use a high-contrast treatment
                const selectedBg = mode === "cruise"
                  ? "border-cruise-500 bg-cruise-500 shadow-sm"
                  : "border-forest-500 bg-forest-tint shadow-sm";

                const gradeBoxSelected = mode === "cruise"
                  ? "bg-paper text-cruise-700"
                  : "bg-forest-500 text-paper";

                return (
                  <div key={opt.value}>
                    <button
                      onClick={() => selectAnswer(opt.value)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                        selected
                          ? selectedBg
                          : "border-line bg-paper-raised hover:border-line-strong"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[14px] font-bold ${
                          selected
                            ? gradeBoxSelected
                            : `border border-line-strong ${opt.color} bg-paper`
                        }`}
                      >
                        {selected ? <Check size={13} /> : opt.label}
                      </span>
                      <div className="flex-1 min-w-0">
                        {/* Label: always ink when unselected, always paper when cruise selected */}
                        <span className={`block text-[14px] font-medium ${
                          selected && mode === "cruise" ? "text-paper" : "text-ink"
                        }`}>
                          {displayLabel}
                        </span>
                        <span className={`block text-[11px] truncate ${
                          selected && mode === "cruise" ? "text-paper/70" : "text-ink-muted"
                        }`}>
                          {opt.helper}
                        </span>
                      </div>
                    </button>

                    <AnimatePresence>
                      {selected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className={`mt-1.5 flex items-center gap-2 rounded-lg px-4 py-2 text-[12px] ${
                            mode === "cruise"
                              ? "bg-cruise-tint text-cruise-700"
                              : "bg-forest-tint/50 text-ink-muted"
                          }`}>
                            <Users size={12} className={mode === "cruise" ? "text-cruise-500 shrink-0" : "text-forest-500 shrink-0"} />
                            {pulseText}
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

      {/* Sticky bottom navigation */}
      <div className="sticky bottom-0 border-t border-line bg-paper/95 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <button
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] font-medium text-ink-muted transition-colors hover:bg-line/40 disabled:opacity-0"
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
                : "cursor-not-allowed bg-line text-ink-muted"
            }`}
          >
            {step === total - 1 ? "Finish" : "Next"} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
