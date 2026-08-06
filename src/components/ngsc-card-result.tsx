"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Download, Link2, Share2, ArrowRight } from "lucide-react";
import { scoreToGrade } from "@/lib/utils";
import type { Leader } from "@/lib/data";

const PUBLIC_AVERAGE = 58;

const GRADE_COLOR: Record<string, string> = {
  A: "text-signal-good border-signal-good",
  B: "text-forest-500 border-forest-500",
  C: "text-signal-mid border-signal-mid",
  D: "text-cruise-500 border-cruise-500",
  F: "text-signal-low border-signal-low",
};

const GRADE_BG: Record<string, string> = {
  A: "bg-[#e7efe6]",
  B: "bg-[#edf5f0]",
  C: "bg-[#fdf8e4]",
  D: "bg-[#fdeee0]",
  F: "bg-[#fce8e6]",
};

export function NgscCardResult({ leader }: { leader: Leader }) {
  const searchParams = useSearchParams();
  const rawScore = searchParams.get("s");
  const parsed = rawScore ? parseInt(rawScore, 10) : NaN;
  const score = Number.isNaN(parsed) ? leader.score : Math.max(0, Math.min(100, parsed));
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const grade = scoreToGrade(score);
  const diff = score - PUBLIC_AVERAGE;
  const sorted = [...leader.categories].sort((a, b) => b.score - a.score);

  async function handleDownload() {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas-pro");
      const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 3 });
      const link = document.createElement("a");
      link.download = `${leader.slug}-ngsc-record.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {}
    finally { setDownloading(false); }
  }

  async function handleCopyLink() {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      await navigator.clipboard.writeText(`${origin}/card/${leader.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  async function handleShare() {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/card/${leader.slug}`;
    const text = `${leader.name} scored ${score}/100 on NGSC.`;
    if (typeof navigator.share === "function") {
      try { await navigator.share({ title: "NGSC", text, url }); } catch {}
    } else { handleCopyLink(); }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="ledger-index text-[12px] text-forest-500"
      >
        Evaluation filed. NGSC card ready.
      </motion.span>

      {/* Report card artifact */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 overflow-hidden rounded-2xl border border-line-strong bg-paper-raised shadow-card"
      >
        {/* Header strip */}
        <div className="flex items-center justify-between border-b border-line bg-forest-900 px-6 py-4">
          <div>
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-paper/50">
              Nigeria Governance Scorecard
            </p>
            <p className="mt-1 font-display text-[1.15rem] font-bold text-paper">
              {leader.name}
            </p>
            <p className="text-[12px] text-paper/60">
              {leader.role} — {leader.jurisdiction}
            </p>
          </div>
          {/* Overall grade stamp */}
          <div className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl border-2 ${GRADE_COLOR[grade]} ${GRADE_BG[grade]}`}>
            <span className={`font-mono text-[2.6rem] font-black leading-none ${GRADE_COLOR[grade].split(" ")[0]}`}>
              {grade}
            </span>
            <span className="font-mono text-[9px] text-ink-muted">{score}/100</span>
          </div>
        </div>

        {/* Subject table */}
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-line bg-paper">
              <th className="px-6 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                Category
              </th>
              <th className="px-4 py-2.5 text-right font-mono text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                Score
              </th>
              <th className="w-32 px-4 py-2.5 text-right font-mono text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                Grade
              </th>
              <th className="w-28 px-6 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wide text-ink-muted">
                Bar
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {sorted.map((cat, i) => {
              const catGrade = scoreToGrade(cat.score);
              return (
                <motion.tr
                  key={cat.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="bg-paper"
                >
                  <td className="px-6 py-3 text-[13px] font-medium text-ink">{cat.label}</td>
                  <td className="px-4 py-3 text-right font-mono text-[13px] text-ink">{cat.score}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`inline-block rounded border px-2 py-0.5 font-mono text-[11px] font-bold ${GRADE_COLOR[catGrade]}`}>
                      {catGrade}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.score}%` }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          cat.score >= 70 ? "bg-signal-good" :
                          cat.score >= 50 ? "bg-signal-mid" : "bg-signal-low"
                        }`}
                      />
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>

        {/* Result footer */}
        <div className="border-t border-line bg-paper px-6 py-5">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">Overall result</p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-3xl font-black text-ink">{score}</span>
                <span className="text-[13px] text-ink-muted">/ 100</span>
                <span className={`ml-1 text-[13px] font-medium ${diff >= 0 ? "text-signal-good" : "text-signal-low"}`}>
                  {diff >= 0 ? "+" : ""}{diff} vs public avg
                </span>
              </div>
            </div>
            {/* Remark stamp */}
            <div className={`shrink-0 rounded-lg border px-4 py-2 text-center ${GRADE_COLOR[grade]}`}>
              <p className="font-mono text-[10px] uppercase tracking-wide opacity-70">Remark</p>
              <p className="mt-0.5 font-display text-[13px] font-bold">
                {score >= 80 ? "Distinction" : score >= 65 ? "Credit" : score >= 50 ? "Pass" : score >= 35 ? "Fail" : "Fail (Poor)"}
              </p>
            </div>
          </div>

          <div className="mt-4 border-t border-line pt-4 font-mono text-[10px] text-ink-muted">
            <span className="mr-4">Key: A=80-100 / B=65-79 / C=50-64 / D=35-49 / F=0-34</span>
            <span>NGSC citizen evaluation. Not an official government record.</span>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center gap-2 rounded-full bg-forest-500 px-5 py-2.5 text-[14px] font-medium text-paper transition-colors hover:bg-forest-700 disabled:opacity-60"
        >
          <Download size={15} /> {downloading ? "Preparing..." : "Download"}
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-line-strong"
        >
          <Link2 size={15} /> {copied ? "Copied" : "Copy link"}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-[14px] font-medium text-ink transition-colors hover:border-line-strong"
        >
          <Share2 size={15} /> Share
        </button>
        <a
          href={`/compare?leader=${leader.slug}`}
          className="ml-auto flex items-center gap-1.5 text-[14px] font-medium text-ink hover:text-forest-500"
        >
          Compare <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
