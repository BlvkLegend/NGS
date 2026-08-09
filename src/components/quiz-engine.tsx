"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, Users } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { quizQuestions, scoreOptions, communityPulseCopy } from "@/lib/data";
import { CategoryIllo } from "@/components/category-illustrations";
import { useMode } from "@/lib/mode-context";
import type { Leader } from "@/lib/data";

// Cruise mode answer labels: sharp, funny, addictive
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
            {/* Category illustration: decorative corner */}
            <CategoryIllo
              category={question.category}
              className="pointer-events-none absolute -right-2 top-4 h-36 w-36 text-forest-500 opacity-[0.12] sm:h-44 sm:w-44"
            />

            <span className="inline-block rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-ink-muted">
              {question.category}
            </span>
            <h2 className="mt-3 max-w-lg text-[1.5rem] font-bold leading-tight text-ink sm:text-[1.75rem]">
              {mode === "cruise" ? question.cruise : question.taxpayer}
            </h2>

            <div className="mt-6 space-y-2">
              {/* A→F order (highest first, consistent direction) */}
              {[...scoreOptions].reverse().map((opt) => {
                const selected = answeredValue === opt.value;
                const pulseText = communityPulseCopy(leader.slug, question.id, opt.value, mode);
                const displayLabel = mode === "cruise" ? CRUISE_LABELS[opt.label] :
                  opt.label === "A" ? "Excellent" : opt.label === "B" ? "Good" :
                  opt.label === "C" ? "Average" : opt.label === "D" ? "Poor" : "Fail";

                return (
                  <div key={opt.value}>
                    <button
                      onClick={() => selectAnswer(opt.value)}
                      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                        selected
                          ? "border-forest-500 bg-forest-tint shadow-sm"
                          : "border-line bg-paper-raised hover:border-line-strong"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[14px] font-bold ${
                          selected ? "bg-forest-500 text-paper" : `border border-line-strong ${opt.color} bg-paper`
                        }`}
                      >
                        {selected ? <Check size={13} /> : opt.label}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[14px] font-medium text-ink">{displayLabel}</span>
                        <span className="block text-[11px] text-ink-muted truncate">{opt.helper}</span>
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
                          <div className="mt-1.5 flex items-center gap-2 rounded-lg bg-forest-tint/50 px-4 py-2 text-[12px] text-ink-muted">
                            <Users size={12} className="text-forest-500 shrink-0" />
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
                ? "bg-forest-500 hover:bg-forest-700"
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
