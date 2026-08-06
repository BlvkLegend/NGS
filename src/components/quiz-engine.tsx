"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Users } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { DepthButton } from "@/components/ui/depth-button";
import { quizQuestions, scoreOptions, communityPulseCopy } from "@/lib/data";
import { CategoryIllo } from "@/components/category-illustrations";
import { useMode } from "@/lib/mode-context";
import type { Leader } from "@/lib/data";

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

  if (stage === "generating") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <Loader2 className="animate-spin text-forest-500" size={28} strokeWidth={1.5} />
        <p className="mt-5 font-display text-xl text-ink">
          {mode === "cruise" ? "We dey cook your NGSC card..." : "Compiling your NGSC card..."}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <span className="ledger-index text-[12px] text-forest-500">Evaluating {leader.name}</span>
      <div className="mt-4">
        <ProgressBar current={step + 1} total={total} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="relative pt-10"
        >
          {/* Category illustration — bottom-right corner, decorative */}
          <CategoryIllo
            category={question.category}
            className="pointer-events-none absolute -right-4 bottom-0 h-48 w-48 text-forest-500 opacity-[0.15] dark:text-forest-500 dark:opacity-[0.12]"
          />

          <span className="ledger-index text-[11px] text-ink-muted">{question.category}</span>
          <h2 className="mt-3 font-display text-[1.75rem] font-medium leading-tight text-ink">
            {mode === "cruise" ? question.cruise : question.taxpayer}
          </h2>

          <div className="mt-8 space-y-2">
            {scoreOptions.map((opt) => {
              const selected = answeredValue === opt.value;
              const pulseText = communityPulseCopy(leader.slug, question.id, opt.value, mode);
              return (
                <div key={opt.value}>
                  <button
                    onClick={() => selectAnswer(opt.value)}
                    className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all ${
                      selected ? "border-forest-500 bg-forest-tint shadow-sm" : "border-line hover:border-line-strong"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-[15px] font-bold ${
                        selected
                          ? `bg-forest-500 text-paper`
                          : `border border-line-strong ${opt.color} bg-paper-raised`
                      }`}
                    >
                      {selected ? <Check size={14} /> : opt.label}
                    </span>
                    <div className="flex-1">
                      <span className="block text-[14px] font-medium text-ink">
                        {opt.label === "A" ? "Excellent" : opt.label === "B" ? "Good" : opt.label === "C" ? "Average" : opt.label === "D" ? "Poor" : "Fail"}
                      </span>
                      <span className="block text-[12px] text-ink-muted">{opt.helper}</span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {selected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 flex items-center gap-2 px-4 py-2 text-[12px] text-ink-muted">
                          <Users size={13} className="text-forest-500" />
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

      <div className="mt-10 flex items-center justify-end border-t border-line pt-6">
        <DepthButton onClick={goNext} disabled={!answeredValue}>
          {step === total - 1 ? "Finish" : "Next"} <ArrowRight size={15} />
        </DepthButton>
      </div>
    </div>
  );
}
