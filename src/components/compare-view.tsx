"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { UserRound } from "lucide-react";
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

function ScoreRing({ score, size = 38 }: { score: number; size?: number }) {
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
      <span className="absolute font-mono text-[11px] font-bold leading-none text-paper" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

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
      <img src={photo} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-center" loading="eager" />
      <div
        className="absolute inset-0"
        style={{
          background: mirror
            ? "linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.60) 45%, rgba(0,0,0,0.10) 100%)"
            : "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.60) 45%, rgba(0,0,0,0.10) 100%)",
        }}
      />
      <div className={`relative flex h-full items-center gap-3 px-4 py-3 ${mirror ? "flex-row-reverse" : ""}`}>
        <div className="flex shrink-0 flex-col items-center gap-0.5">
          <ScoreRing score={leader.score} />
          <span className={`font-mono text-[10px] font-black ${wins ? "text-signal-good" : "text-paper/50"}`}>{grade}</span>
        </div>
        <div className={`min-w-0 flex-1 ${mirror ? "text-right" : ""}`}>
          <p className={`truncate text-[13px] font-bold leading-tight ${wins ? "text-paper" : "text-paper/60"}`}>{leader.name}</p>
          <p className="truncate text-[10px] text-paper/50">{leader.jurisdiction}</p>
        </div>
      </div>
    </div>
  );
}

// Empty right-side placeholder
function EmptySlot({ label }: { label: string }) {
  return (
    <div className="flex flex-1 items-center justify-center gap-2 opacity-40">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/30">
        <UserRound size={16} className="text-paper/60" />
      </div>
      <span className="text-[12px] text-paper/50 italic">{label}</span>
    </div>
  );
}

function CompareViewInner() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("leader");
  const initialLeft = leaders.find((l) => l.slug === preselected)?.slug ?? leaders[0].slug;
  // Right side starts EMPTY — user must choose
  const [leftSlug,  setLeftSlug]  = useState(initialLeft);
  const [rightSlug, setRightSlug] = useState<string>("");
  const { mode } = useMode();

  const left  = leaders.find((l) => l.slug === leftSlug)!;
  const right = rightSlug ? leaders.find((l) => l.slug === rightSlug) : null;

  const leftWins  = right ? left.score > right.score : false;
  const rightWins = right ? right.score > left.score : false;

  // Only compute cats when both sides selected
  const allCats = right
    ? left.categories.map((cat) => {
        const r = right.categories.find((c) => c.label === cat.label);
        return { label: cat.label, left: cat.score, right: r?.score ?? 0 };
      })
    : [];

  const evalWinner = right
    ? left.evaluations > right.evaluations ? "left" : right.evaluations > left.evaluations ? "right" : "tie"
    : null;

  return (
    <div>
      {/* Selectors — right default is empty */}
      <div className="grid grid-cols-2 gap-3">
        <LeaderSelect value={leftSlug} onChange={setLeftSlug} exclude={rightSlug} label={mode === "cruise" ? "First oga" : "First official"} />
        <LeaderSelect value={rightSlug} onChange={setRightSlug} exclude={leftSlug} label={mode === "cruise" ? "Who you wan compare?" : "Choose second official"} allowEmpty />
      </div>

      {/* Profile header */}
      <div className="mt-4 overflow-hidden rounded-2xl border-2 border-forest-900 shadow-[0_6px_24px_-6px_rgba(0,0,0,0.22)]">
        <div className="flex h-24 bg-forest-900">
          <SideLandmark leader={left} wins={leftWins} mirror={false} />
          <div className="flex shrink-0 items-center justify-center px-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 font-mono text-[10px] font-bold text-paper/60">VS</span>
          </div>
          {right ? (
            <SideLandmark leader={right} wins={rightWins} mirror />
          ) : (
            <EmptySlot label={mode === "cruise" ? "Pick the second oga" : "Select second official"} />
          )}
        </div>

        <AnimatePresence>
          {right && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32 }}
            >
              {/* Category score comparison */}
              <div className="divide-y divide-line bg-paper-raised">
                {allCats.map((cat, i) => {
                  const winner = cat.left > cat.right ? "left" : cat.right > cat.left ? "right" : "tie";
                  return (
                    <motion.div
                      key={cat.label}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: 0.06 + i * 0.022 }}
                      className="grid grid-cols-[1fr_5rem_1fr] items-center gap-2 px-4 py-2"
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span className={`w-6 text-right font-mono text-[12px] font-bold ${winner === "left" ? "text-signal-good" : "text-ink-muted"}`}>{cat.left}</span>
                        <div className="h-2 w-full max-w-[100px] overflow-hidden rounded-full bg-line">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cat.left}%` }}
                            transition={{ delay: 0.10 + i * 0.022, duration: 0.4, ease: "easeOut" }}
                            className={`ml-auto h-full rounded-full ${winner === "left" ? "bg-signal-good" : "bg-line-strong"}`}
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] font-medium text-ink-muted">{cat.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-full max-w-[100px] overflow-hidden rounded-full bg-line">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cat.right}%` }}
                            transition={{ delay: 0.10 + i * 0.022, duration: 0.4, ease: "easeOut" }}
                            className={`h-full rounded-full ${winner === "right" ? "bg-signal-good" : "bg-line-strong"}`}
                          />
                        </div>
                        <span className={`w-6 font-mono text-[12px] font-bold ${winner === "right" ? "text-signal-good" : "text-ink-muted"}`}>{cat.right}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Evaluation volume comparison row */}
              <div className="border-t border-line bg-paper-raised px-4 py-3">
                <div className="grid grid-cols-[1fr_5rem_1fr] items-center gap-2">
                  <div className="text-right">
                    <span className={`font-mono text-[13px] font-black ${evalWinner === "left" ? "text-signal-good" : "text-ink-muted"}`}>
                      {left.evaluations.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] font-semibold uppercase tracking-wide text-ink-muted">Evaluations</span>
                  </div>
                  <div className="text-left">
                    <span className={`font-mono text-[13px] font-black ${evalWinner === "right" ? "text-signal-good" : "text-ink-muted"}`}>
                      {right.evaluations.toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-center text-[10px] text-ink-muted">
                  {evalWinner === "tie"
                    ? "Equal public attention"
                    : evalWinner === "left"
                    ? `${left.name.split(" ")[0]} has more citizen evaluations`
                    : `${right.name.split(" ")[0]} has more citizen evaluations`}
                </p>
              </div>

              {/* Verdict */}
              <div className="border-t border-line bg-paper px-6 py-3 text-center">
                <p className="text-[13px] text-ink-muted">
                  {left.score !== right.score ? (
                    <>
                      <span className="font-semibold text-ink">{leftWins ? left.name : right.name}</span>
                      {" "}{mode === "cruise" ? "score pass by" : "scores higher by"}{" "}
                      <span className="font-mono font-bold text-signal-good">{Math.abs(left.score - right.score)} pts</span>
                    </>
                  ) : (
                    mode === "cruise"
                      ? "Both of them tie. Nobody dey shine."
                      : "Scores are equal across all categories."
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No right selected state */}
        {!right && (
          <div className="bg-paper px-6 py-8 text-center text-[13px] text-ink-muted">
            {mode === "cruise"
              ? "Choose a second oga up top to start the comparison."
              : "Select a second official above to begin the comparison."}
          </div>
        )}
      </div>
    </div>
  );
}

function LeaderSelect({
  value,
  onChange,
  exclude,
  label,
  allowEmpty,
}: {
  value: string;
  onChange: (v: string) => void;
  exclude: string;
  label: string;
  allowEmpty?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-line bg-paper-raised px-3 py-2.5 text-[13px] font-medium text-ink outline-none focus-visible:border-forest-500"
    >
      {allowEmpty && <option value="">{label}</option>}
      {leaders
        .filter((l) => l.slug !== exclude)
        .map((l) => (
          <option key={l.slug} value={l.slug}>{l.name} · {l.jurisdiction}</option>
        ))}
    </select>
  );
}

export function CompareView() {
  return (
    <Suspense fallback={null}>
      <CompareViewInner />
    </Suspense>
  );
}
