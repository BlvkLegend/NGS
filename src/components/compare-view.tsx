"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { UserRound } from "lucide-react";
import { leaders } from "@/lib/data";
import { scoreToGrade } from "@/lib/utils";
import { useMode } from "@/lib/mode-context";

const GRADE_COLOR: Record<string, string> = {
  A: "text-signal-good border-signal-good bg-[#e7efe6]",
  B: "text-forest-500 border-forest-500 bg-[#edf5f0]",
  C: "text-signal-mid border-signal-mid bg-[#fdf8e4]",
  D: "text-cruise-500 border-cruise-500 bg-[#fdeee0]",
  F: "text-signal-low border-signal-low bg-[#fce8e6]",
};

export function CompareView() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("leader");
  const initialLeft = leaders.find((l) => l.slug === preselected)?.slug ?? leaders[0].slug;
  const initialRight = leaders.find((l) => l.slug !== initialLeft)?.slug ?? leaders[1].slug;
  const [leftSlug, setLeftSlug] = useState(initialLeft);
  const [rightSlug, setRightSlug] = useState(initialRight);
  const { mode } = useMode();

  const left = leaders.find((l) => l.slug === leftSlug)!;
  const right = leaders.find((l) => l.slug === rightSlug)!;

  const leftGrade = scoreToGrade(left.score);
  const rightGrade = scoreToGrade(right.score);

  // Build unified category list
  const allCats = left.categories.map((cat, i) => {
    const rightCat = right.categories.find((c) => c.label === cat.label) ?? right.categories[i];
    return { label: cat.label, left: cat.score, right: rightCat?.score ?? 0 };
  });

  return (
    <div>
      {/* Selector row */}
      <div className="grid grid-cols-2 gap-4">
        <LeaderSelect value={leftSlug} onChange={setLeftSlug} exclude={rightSlug} />
        <LeaderSelect value={rightSlug} onChange={setRightSlug} exclude={leftSlug} />
      </div>

      {/* Hero comparison block — football field style, enlarged */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mt-8 overflow-hidden rounded-2xl border border-line-strong shadow-card"
      >
        {/* Header band */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-stretch bg-forest-900">
          {/* Left leader */}
          <div className="flex flex-col items-center gap-3 px-6 py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/10 text-paper">
              <UserRound size={30} strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="font-bold text-paper">{left.name}</p>
              <p className="mt-0.5 text-[12px] text-paper/60">{left.role}</p>
              <p className="text-[11px] text-paper/50">{left.jurisdiction}</p>
            </div>
            <div className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 font-mono text-[2rem] font-black ${GRADE_COLOR[leftGrade]}`}>
              {leftGrade}
            </div>
            <p className="font-mono text-[1.5rem] font-black text-paper">{left.score}</p>
            <p className="text-[11px] text-paper/50">out of 100</p>
          </div>

          {/* VS divider */}
          <div className="flex items-center justify-center px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/20 bg-paper/10">
              <span className="font-mono text-[11px] font-bold text-paper/70">VS</span>
            </div>
          </div>

          {/* Right leader */}
          <div className="flex flex-col items-center gap-3 px-6 py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/10 text-paper">
              <UserRound size={30} strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <p className="font-bold text-paper">{right.name}</p>
              <p className="mt-0.5 text-[12px] text-paper/60">{right.role}</p>
              <p className="text-[11px] text-paper/50">{right.jurisdiction}</p>
            </div>
            <div className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 font-mono text-[2rem] font-black ${GRADE_COLOR[rightGrade]}`}>
              {rightGrade}
            </div>
            <p className="font-mono text-[1.5rem] font-black text-paper">{right.score}</p>
            <p className="text-[11px] text-paper/50">out of 100</p>
          </div>
        </div>

        {/* Category bars — football field */}
        <div className="divide-y divide-line bg-paper-raised">
          {allCats.map((cat, i) => {
            const winner = cat.left > cat.right ? "left" : cat.right > cat.left ? "right" : "tie";
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                className="grid grid-cols-[1fr_6rem_1fr] items-center gap-3 px-5 py-3.5 sm:px-8"
              >
                {/* Left bar */}
                <div className="flex items-center justify-end gap-2">
                  <span className={`font-mono text-[14px] font-bold ${winner === "left" ? "text-signal-good" : "text-ink-muted"}`}>
                    {cat.left}
                  </span>
                  <div className="h-2.5 w-full max-w-[120px] overflow-hidden rounded-full bg-line">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.left}%` }}
                      transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: "easeOut" }}
                      className={`ml-auto h-full rounded-full ${winner === "left" ? "bg-signal-good" : "bg-forest-500"}`}
                    />
                  </div>
                </div>
                {/* Category label */}
                <div className="text-center">
                  <span className="text-[11px] font-medium text-ink-muted">{cat.label}</span>
                </div>
                {/* Right bar */}
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-full max-w-[120px] overflow-hidden rounded-full bg-line">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.right}%` }}
                      transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: "easeOut" }}
                      className={`h-full rounded-full ${winner === "right" ? "bg-signal-good" : "bg-forest-500"}`}
                    />
                  </div>
                  <span className={`font-mono text-[14px] font-bold ${winner === "right" ? "text-signal-good" : "text-ink-muted"}`}>
                    {cat.right}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Verdict footer */}
        <div className="border-t border-line bg-paper px-6 py-4 text-center">
          {left.score !== right.score ? (
            <p className="text-[14px] text-ink-muted">
              <span className="font-semibold text-ink">
                {left.score > right.score ? left.name : right.name}
              </span>{" "}
              {mode === "cruise" ? "score better by" : "scores higher by"}{" "}
              <span className="font-mono font-bold text-signal-good">
                {Math.abs(left.score - right.score)} points
              </span>
            </p>
          ) : (
            <p className="text-[14px] text-ink-muted">
              {mode === "cruise" ? "Both of them score equal — interesting." : "Scores are equal across all categories."}
            </p>
          )}
        </div>
      </motion.div>

      {/* Strengths and Weaknesses */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <StrengthsWeaknesses leader={left} />
        <StrengthsWeaknesses leader={right} />
      </div>
    </div>
  );
}

function LeaderSelect({ value, onChange, exclude }: { value: string; onChange: (v: string) => void; exclude: string }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-line bg-paper-raised px-3.5 py-3 text-[14px] font-medium text-ink outline-none focus-visible:border-forest-500"
    >
      {leaders
        .filter((l) => l.slug !== exclude)
        .map((l) => (
          <option key={l.slug} value={l.slug}>
            {l.name} — {l.jurisdiction}
          </option>
        ))}
    </select>
  );
}

function StrengthsWeaknesses({ leader }: { leader: (typeof leaders)[number] }) {
  const sorted = [...leader.categories].sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 2);
  const weaknesses = [...sorted].reverse().slice(0, 2);
  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5">
      <p className="text-[12px] font-semibold uppercase tracking-wide text-ink-muted">{leader.name}</p>
      <div className="mt-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-signal-good">Strengths</p>
        {strengths.map((s) => (
          <div key={s.label} className="mt-1.5 flex items-center justify-between text-[13px]">
            <span className="text-ink">{s.label}</span>
            <span className="font-mono text-ink-muted">{s.score}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t border-line pt-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-signal-low">Needs attention</p>
        {weaknesses.map((w) => (
          <div key={w.label} className="mt-1.5 flex items-center justify-between text-[13px]">
            <span className="text-ink">{w.label}</span>
            <span className="font-mono text-ink-muted">{w.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
