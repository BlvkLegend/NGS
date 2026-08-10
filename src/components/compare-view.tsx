"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { scoreToSignal } from "@/lib/utils";
import { getLandmark } from "@/lib/landmarks";

function gradeFromScore(score: number): string {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

const SIGNAL_COLOR: Record<string, string> = {
  good: "var(--signal-good)",
  mid:  "var(--signal-mid)",
  low:  "var(--signal-low)",
};

function ScoreRing({ score, size = 40 }: { score: number; size?: number }) {
  const stroke = 3.5;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const color = SIGNAL_COLOR[scoreToSignal(score)];
  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      {/* Number inside — always paper on the dark header */}
      <span className="absolute font-mono text-[11px] font-bold leading-none text-paper" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

/** Half-height landmark strip for each side of the compare header */
function SideLandmark({
  leader,
  wins,
  mirror,
}: {
  leader: typeof leaders[number];
  wins: boolean;
  mirror?: boolean;
}) {
  const photo = getLandmark(leader.jurisdiction);
  const grade = gradeFromScore(leader.score);

  return (
    <div className={`relative flex-1 overflow-hidden ${wins ? "" : "opacity-70"}`}>
      {/* Landmark photo — half height */}
      <img
        src={photo}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
      />
      {/* Gradient: dark on the side where text lives */}
      <div
        className="absolute inset-0"
        style={{
          background: mirror
            ? "linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.60) 45%, rgba(0,0,0,0.10) 100%)"
            : "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.60) 45%, rgba(0,0,0,0.10) 100%)",
        }}
      />
      {/* Content over gradient */}
      <div className={`relative flex h-full items-center gap-3 px-4 py-3 ${mirror ? "flex-row-reverse" : ""}`}>
        {/* Score ring — grade inside (number, not letter), ring filled to score % */}
        <div className="flex shrink-0 flex-col items-center gap-1">
          <ScoreRing score={leader.score} size={38} />
          {/* Grade letter to the side of the ring for quick read */}
          <span className={`font-mono text-[10px] font-black ${wins ? "text-signal-good" : "text-paper/50"}`}>
            {grade}
          </span>
        </div>

        {/* Name + jurisdiction — NO grade repeated under name */}
        <div className={`min-w-0 flex-1 ${mirror ? "text-right" : ""}`}>
          <p className={`truncate text-[13px] font-bold leading-tight ${wins ? "text-paper" : "text-paper/60"}`}>
            {leader.name}
          </p>
          <p className="truncate text-[10px] text-paper/50">{leader.jurisdiction}</p>
        </div>
      </div>
    </div>
  );
}

function CompareViewInner() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("leader");
  const initialLeft  = leaders.find((l) => l.slug === preselected)?.slug ?? leaders[0].slug;
  const initialRight = leaders.find((l) => l.slug !== initialLeft)?.slug ?? leaders[1].slug;
  const [leftSlug,  setLeftSlug]  = useState(initialLeft);
  const [rightSlug, setRightSlug] = useState(initialRight);
  const { mode } = useMode();

  const left  = leaders.find((l) => l.slug === leftSlug)!;
  const right = leaders.find((l) => l.slug === rightSlug)!;
  const leftWins  = left.score > right.score;
  const rightWins = right.score > left.score;

  const allCats = left.categories.map((cat) => {
    const r = right.categories.find((c) => c.label === cat.label);
    return { label: cat.label, left: cat.score, right: r?.score ?? 0 };
  });

  return (
    <div>
      {/* Selectors */}
      <div className="grid grid-cols-2 gap-3">
        <LeaderSelect value={leftSlug}  onChange={setLeftSlug}  exclude={rightSlug} />
        <LeaderSelect value={rightSlug} onChange={setRightSlug} exclude={leftSlug}  />
      </div>

      {/* Profile header with landmark backgrounds */}
      <div className="mt-4 overflow-hidden rounded-2xl border-2 border-forest-900 shadow-[0_6px_24px_-6px_rgba(0,0,0,0.22)]">
        {/* Two landmark panels + VS divider — fixed height */}
        <div className="flex h-24 bg-forest-900">
          <SideLandmark leader={left}  wins={leftWins}  mirror={false} />
          {/* VS pill */}
          <div className="flex shrink-0 items-center justify-center px-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 font-mono text-[10px] font-bold text-paper/60">
              VS
            </span>
          </div>
          <SideLandmark leader={right} wins={rightWins} mirror={true} />
        </div>

        {/* Category bars */}
        <div className="divide-y divide-line bg-paper-raised">
          {allCats.map((cat, i) => {
            const winner = cat.left > cat.right ? "left" : cat.right > cat.left ? "right" : "tie";
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.06 + i * 0.025 }}
                className="grid grid-cols-[1fr_5rem_1fr] items-center gap-2 px-4 py-2"
              >
                {/* Left bar */}
                <div className="flex items-center justify-end gap-1.5">
                  <span className={`w-6 text-right font-mono text-[12px] font-bold ${winner === "left" ? "text-signal-good" : "text-ink-muted"}`}>
                    {cat.left}
                  </span>
                  <div className="h-2 w-full max-w-[100px] overflow-hidden rounded-full bg-line">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.left}%` }}
                      transition={{ delay: 0.10 + i * 0.025, duration: 0.4, ease: "easeOut" }}
                      className={`ml-auto h-full rounded-full ${winner === "left" ? "bg-signal-good" : "bg-line-strong"}`}
                    />
                  </div>
                </div>
                {/* Category label */}
                <div className="text-center">
                  <span className="text-[10px] font-medium text-ink-muted">{cat.label}</span>
                </div>
                {/* Right bar */}
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-full max-w-[100px] overflow-hidden rounded-full bg-line">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.right}%` }}
                      transition={{ delay: 0.10 + i * 0.025, duration: 0.4, ease: "easeOut" }}
                      className={`h-full rounded-full ${winner === "right" ? "bg-signal-good" : "bg-line-strong"}`}
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
                <span className="font-semibold text-ink">{leftWins ? left.name : right.name}</span>
                {" "}{mode === "cruise" ? "score better by" : "scores higher by"}{" "}
                <span className="font-mono font-bold text-signal-good">{Math.abs(left.score - right.score)} pts</span>
              </>
            ) : (
              mode === "cruise"
                ? "Both of them score equal. Interesting."
                : "Scores are equal across all categories."
            )}
          </p>
        </div>
      </div>

      {/* Strengths / weaknesses */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
      className="w-full rounded-xl border border-line bg-paper-raised px-3 py-2.5 text-[13px] font-medium text-ink outline-none focus-visible:border-forest-500"
    >
      {leaders.filter((l) => l.slug !== exclude).map((l) => (
        <option key={l.slug} value={l.slug}>{l.name} · {l.jurisdiction}</option>
      ))}
    </select>
  );
}

function StrengthsWeaknesses({ leader }: { leader: typeof leaders[number] }) {
  const sorted = [...leader.categories].sort((a, b) => b.score - a.score);
  const strengths  = sorted.slice(0, 2);
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
