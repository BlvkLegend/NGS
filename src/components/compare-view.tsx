"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { UserRound } from "lucide-react";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";

function gradeFromScore(score: number) {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

const GRADE_RING: Record<string, string> = {
  A: "ring-signal-good text-signal-good",
  B: "ring-forest-500 text-forest-500",
  C: "ring-signal-mid text-signal-mid",
  D: "ring-cruise-500 text-cruise-500",
  F: "ring-signal-low text-signal-low",
};

function CompareViewInner() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("leader");
  const initialLeft = leaders.find((l) => l.slug === preselected)?.slug ?? leaders[0].slug;
  const initialRight = leaders.find((l) => l.slug !== initialLeft)?.slug ?? leaders[1].slug;
  const [leftSlug, setLeftSlug] = useState(initialLeft);
  const [rightSlug, setRightSlug] = useState(initialRight);
  const { mode } = useMode();

  const left = leaders.find((l) => l.slug === leftSlug)!;
  const right = leaders.find((l) => l.slug === rightSlug)!;
  const leftGrade = gradeFromScore(left.score);
  const rightGrade = gradeFromScore(right.score);

  const allCats = left.categories.map((cat) => {
    const r = right.categories.find((c) => c.label === cat.label);
    return { label: cat.label, left: cat.score, right: r?.score ?? 0 };
  });

  return (
    <div>
      {/* Leader selectors */}
      <div className="grid grid-cols-2 gap-3">
        <LeaderSelect value={leftSlug} onChange={setLeftSlug} exclude={rightSlug} />
        <LeaderSelect value={rightSlug} onChange={setRightSlug} exclude={leftSlug} />
      </div>

      {/* Compact header: photo -> name -> grade, tighter than before */}
      <div className="mt-4 overflow-hidden rounded-2xl border-2 border-forest-900 shadow-[0_6px_24px_-6px_rgba(0,0,0,0.22)]">
        <div className="grid grid-cols-[1fr_auto_1fr] bg-forest-900">
          <LeaderHeader leader={left} grade={leftGrade} />
          <div className="flex items-center justify-center px-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 font-mono text-[10px] font-bold text-paper/70">VS</span>
          </div>
          <LeaderHeader leader={right} grade={rightGrade} />
        </div>

        {/* Category bars: compact */}
        <div className="divide-y divide-line bg-paper-raised">
          {allCats.map((cat, i) => {
            const winner = cat.left > cat.right ? "left" : cat.right > cat.left ? "right" : "tie";
            return (
              <motion.div key={cat.label}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.03 }}
                className="grid grid-cols-[1fr_5rem_1fr] items-center gap-2 px-4 py-2.5">
                {/* Left bar */}
                <div className="flex items-center justify-end gap-1.5">
                  <span className={`w-6 text-right font-mono text-[12px] font-bold ${winner === "left" ? "text-signal-good" : "text-ink-muted"}`}>
                    {cat.left}
                  </span>
                  <div className="h-2 w-full max-w-[100px] overflow-hidden rounded-full bg-line">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.left}%` }}
                      transition={{ delay: 0.15 + i * 0.03, duration: 0.45, ease: "easeOut" }}
                      className={`ml-auto h-full rounded-full ${winner === "left" ? "bg-signal-good" : "bg-forest-300"}`}
                    />
                  </div>
                  {winner === "left" && <span className="text-[10px] text-signal-good">W</span>}
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-medium text-ink-muted">{cat.label}</span>
                </div>
                {/* Right bar */}
                <div className="flex items-center gap-1.5">
                  {winner === "right" && <span className="text-[10px] text-signal-good">W</span>}
                  <div className="h-2 w-full max-w-[100px] overflow-hidden rounded-full bg-line">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.right}%` }}
                      transition={{ delay: 0.15 + i * 0.03, duration: 0.45, ease: "easeOut" }}
                      className={`h-full rounded-full ${winner === "right" ? "bg-signal-good" : "bg-forest-300"}`}
                    />
                  </div>
                  <span className={`w-6 font-mono text-[12px] font-bold ${winner === "right" ? "text-signal-good" : "text-ink-muted"}`}>
                    {cat.right}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Verdict */}
        <div className="border-t border-line bg-paper px-6 py-3 text-center">
          <p className="text-[13px] text-ink-muted">
            {left.score !== right.score ? (
              <>
                <span className="font-semibold text-ink">{left.score > right.score ? left.name : right.name}</span>
                {" "}{mode === "cruise" ? "score better by" : "scores higher by"}{" "}
                <span className="font-mono font-bold text-signal-good">{Math.abs(left.score - right.score)} pts</span>
              </>
            ) : (
              mode === "cruise" ? "Both of them score equal. Interesting." : "Scores are equal across all categories."
            )}
          </p>
        </div>
      </div>

      {/* Strengths and Weaknesses */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <StrengthsWeaknesses leader={left} />
        <StrengthsWeaknesses leader={right} />
      </div>
    </div>
  );
}

function LeaderHeader({ leader, grade }: { leader: (typeof leaders)[number]; grade: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-3 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper">
        <UserRound size={20} strokeWidth={1.5} />
      </div>
      <div className="text-center">
        <p className="text-[13px] font-bold text-paper leading-tight">{leader.name}</p>
        <p className="text-[10px] text-paper/60">{leader.jurisdiction}</p>
      </div>
      <div className={`flex h-10 w-10 items-center justify-center rounded-full ring-2 font-mono text-[1.1rem] font-black bg-forest-900 ${GRADE_RING[grade]}`}>
        {grade}
      </div>
      <p className="font-mono text-[12px] font-bold text-paper">{leader.score}</p>
    </div>
  );
}

function LeaderSelect({ value, onChange, exclude }: { value: string; onChange: (v: string) => void; exclude: string }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-line bg-paper-raised px-3 py-2.5 text-[13px] font-medium text-ink outline-none focus-visible:border-forest-500">
      {leaders.filter((l) => l.slug !== exclude).map((l) => (
        <option key={l.slug} value={l.slug}>{l.name} · {l.jurisdiction}</option>
      ))}
    </select>
  );
}

function StrengthsWeaknesses({ leader }: { leader: (typeof leaders)[number] }) {
  const sorted = [...leader.categories].sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 2);
  const weaknesses = sorted.slice(-2).reverse();
  return (
    <div className="rounded-xl border border-line bg-paper-raised p-4">
      <p className="mb-2 text-[12px] font-bold text-ink">{leader.name}</p>
      <div className="mb-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-signal-good">Strengths</p>
        {strengths.map((s) => (
          <div key={s.label} className="mt-1 flex items-center justify-between text-[12px]">
            <span className="text-ink">{s.label}</span>
            <span className="font-mono font-bold text-signal-good">{s.score}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-line pt-3">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-signal-low">Needs work</p>
        {weaknesses.map((w) => (
          <div key={w.label} className="mt-1 flex items-center justify-between text-[12px]">
            <span className="text-ink">{w.label}</span>
            <span className="font-mono font-bold text-signal-low">{w.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CompareView() {
  return (
    <Suspense fallback={null}>
      <CompareViewInner />
    </Suspense>
  );
}
