"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { UserRound, Download, Share2, Copy } from "lucide-react";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { scoreToSignal, scoreToGrade } from "@/lib/utils";
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
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <span className="absolute font-mono font-bold leading-none text-paper" style={{ fontSize: 11, color }}>
        {score}
      </span>
    </div>
  );
}

/** Both side panels use IDENTICAL color treatment — forest-900 dark, photo behind, same opacity */
function SidePanel({
  leader,
  mirror,
}: {
  leader: typeof leaders[number];
  mirror?: boolean;
}) {
  const photo = getLandmark(leader.jurisdiction);
  const grade = gradeFromScore(leader.score);

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Landmark photo — same treatment both sides, no dimming based on winner */}
      <img
        src={photo}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
      />
      {/* Consistent gradient both sides — dark left on left panel, dark right on right */}
      <div
        className="absolute inset-0"
        style={{
          background: mirror
            ? "linear-gradient(to left, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.15) 100%)"
            : "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* Content over gradient */}
      <div className={`relative flex h-full items-center gap-2.5 px-3 py-3 ${mirror ? "flex-row-reverse" : ""}`}>
        {/* Score ring */}
        <ScoreRing score={leader.score} size={38} />

        {/* Photo placeholder */}
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-paper/30 bg-paper/12">
          {leader.photoUrl ? (
            <img src={leader.photoUrl} alt="" aria-hidden className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <UserRound size={13} className="text-paper/70" strokeWidth={1.5} />
            </div>
          )}
        </div>

        {/* Name + grade — always text-paper, no dimming */}
        <div className={`min-w-0 flex-1 ${mirror ? "text-right" : ""}`}>
          <p className="truncate text-[12px] font-bold leading-tight text-paper">{leader.name}</p>
          <p className="truncate text-[9px] text-paper/60">{leader.jurisdiction}</p>
          {/* Grade — single display here, not duplicated */}
          <span className="font-mono text-[10px] font-black text-paper/80">{grade}</span>
        </div>
      </div>
    </div>
  );
}

function EmptySlot({ label }: { label: string }) {
  return (
    <div className="flex flex-1 items-center justify-center gap-2 opacity-35 px-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/30">
        <UserRound size={14} className="text-paper/60" />
      </div>
      <span className="text-[11px] text-paper/50 italic truncate">{label}</span>
    </div>
  );
}

function CompareViewInner() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("leader");
  const initialLeft = leaders.find((l) => l.slug === preselected)?.slug ?? leaders[0].slug;
  const [leftSlug,  setLeftSlug]  = useState(initialLeft);
  const [rightSlug, setRightSlug] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const compareRef = useRef<HTMLDivElement>(null);
  const { mode } = useMode();

  const left  = leaders.find((l) => l.slug === leftSlug)!;
  const right = rightSlug ? leaders.find((l) => l.slug === rightSlug) : null;

  const allCats = right
    ? left.categories.map((cat) => {
        const r = right.categories.find((c) => c.label === cat.label);
        return { label: cat.label, left: cat.score, right: r?.score ?? 0 };
      })
    : [];

  async function handleCopyLink() {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const url = `${origin}/compare?leader=${leftSlug}${rightSlug ? `&vs=${rightSlug}` : ""}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  async function handleShare() {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/compare?leader=${leftSlug}${rightSlug ? `&vs=${rightSlug}` : ""}`;
    const text = right
      ? `${left.name} (${left.score}/100) vs ${right.name} (${right.score}/100) — NGSC Compare`
      : `Check ${left.name}'s score on NGSC`;
    if (typeof navigator.share === "function") {
      try { await navigator.share({ title: "NGSC Compare", text, url }); } catch {}
    } else { handleCopyLink(); }
  }

  return (
    <div ref={compareRef}>
      {/* Selectors */}
      <div className="grid grid-cols-2 gap-3">
        <LeaderSelect value={leftSlug} onChange={setLeftSlug} exclude={rightSlug}
          label={mode === "cruise" ? "First oga" : "First official"} />
        <LeaderSelect value={rightSlug} onChange={setRightSlug} exclude={leftSlug}
          label={mode === "cruise" ? "Who you wan compare?" : "Choose second official"} allowEmpty />
      </div>

      {/* Comparison card */}
      <div className="mt-4 overflow-hidden rounded-2xl border-2 border-forest-900 shadow-[0_6px_24px_-6px_rgba(0,0,0,0.22)]">
        {/* Profile header */}
        <div className="flex h-24 bg-forest-900">
          <SidePanel leader={left} mirror={false} />
          <div className="flex shrink-0 items-center justify-center px-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 font-mono text-[10px] font-bold text-paper/60">
              VS
            </span>
          </div>
          {right ? (
            <SidePanel leader={right} mirror />
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
              {/* Category bars */}
              <div className="divide-y divide-line bg-paper-raised">
                {allCats.map((cat, i) => {
                  const winner = cat.left > cat.right ? "left" : cat.right > cat.left ? "right" : "tie";
                  return (
                    <motion.div
                      key={cat.label}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 + i * 0.02 }}
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
                            transition={{ delay: 0.08 + i * 0.02, duration: 0.4, ease: "easeOut" }}
                            className={`ml-auto h-full rounded-full ${winner === "left" ? "bg-signal-good" : "bg-line-strong"}`}
                          />
                        </div>
                      </div>
                      {/* Label */}
                      <div className="text-center">
                        <span className="text-[10px] font-medium text-ink-muted">{cat.label}</span>
                      </div>
                      {/* Right bar */}
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-full max-w-[100px] overflow-hidden rounded-full bg-line">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cat.right}%` }}
                            transition={{ delay: 0.08 + i * 0.02, duration: 0.4, ease: "easeOut" }}
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

              {/* Evaluation volume — numbers only, no explanatory text */}
              <div className="border-t border-line bg-paper-raised px-4 py-3">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                  <div className="text-right">
                    <p className="font-mono text-[1.1rem] font-black text-ink">
                      {left.evaluations.toLocaleString()}
                    </p>
                    <p className="text-[9px] uppercase tracking-wide text-ink-muted">evals</p>
                  </div>
                  <div className="text-center text-[9px] font-semibold uppercase tracking-wide text-ink-muted px-2">
                    Citizens
                  </div>
                  <div className="text-left">
                    <p className="font-mono text-[1.1rem] font-black text-ink">
                      {right.evaluations.toLocaleString()}
                    </p>
                    <p className="text-[9px] uppercase tracking-wide text-ink-muted">evals</p>
                  </div>
                </div>
              </div>

              {/* Verdict */}
              <div className="border-t border-line bg-paper px-6 py-3 text-center">
                <p className="text-[13px] text-ink">
                  {left.score !== right.score ? (
                    <>
                      <span className="font-bold">{left.score > right.score ? left.name : right.name}</span>
                      {" "}<span className="text-ink-muted">{mode === "cruise" ? "score pass by" : "scores higher by"}</span>{" "}
                      <span className="font-mono font-bold text-signal-good">{Math.abs(left.score - right.score)} pts</span>
                    </>
                  ) : (
                    <span className="text-ink-muted">
                      {mode === "cruise" ? "Both of them tie. Nobody dey shine." : "Scores are equal."}
                    </span>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!right && (
          <div className="bg-paper px-6 py-8 text-center text-[13px] text-ink-muted">
            {mode === "cruise"
              ? "Choose a second oga up top to start the comparison."
              : "Select a second official above to begin the comparison."}
          </div>
        )}
      </div>

      {/* Share comparison — only shown when both sides selected */}
      {right && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-full bg-forest-500 px-4 py-2 text-[13px] font-medium text-paper transition-colors hover:bg-forest-700"
          >
            <Share2 size={13} />
            {mode === "cruise" ? "Share this comparison" : "Share comparison"}
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-forest-tint"
          >
            <Copy size={13} />
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      )}
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
