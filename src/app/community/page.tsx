"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useMode } from "@/lib/mode-context";
import { getFeed, timeAgo, type CommunityEntry } from "@/lib/community";
import { scoreToGrade } from "@/lib/utils";
import { asset } from "@/lib/asset";
import Link from "next/link";
import { MessageSquare, Users } from "lucide-react";

const GRADE_COLORS: Record<string, string> = {
  A: "text-signal-good border-signal-good bg-[#e7efe6] dark:bg-[#0d2218]",
  B: "text-forest-500 border-forest-500 bg-[#edf5f0] dark:bg-[#0d2018]",
  C: "text-signal-mid border-signal-mid bg-[#fdf8e4] dark:bg-[#2a2208]",
  D: "text-cruise-500 border-cruise-500 bg-[#fdeee0] dark:bg-[#2a1808]",
  F: "text-signal-low border-signal-low bg-[#fce8e6] dark:bg-[#2a0e0e]",
};

export default function CommunityPage() {
  const { mode } = useMode();
  const [feed, setFeed] = useState<CommunityEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFeed(getFeed());
  }, []);

  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-[1400px] px-6 pb-16 pt-10 lg:px-10">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-forest-500" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-500">
              {mode === "cruise" ? "Community" : "Community Pulse"}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">
            {mode === "cruise" ? "Wetin everybody dey think" : "What citizens are saying"}
          </h1>
          <p className="mt-2 max-w-xl text-[14px] text-ink-muted">
            {mode === "cruise"
              ? "Anonymous evaluations from Nigerians across the 36 states and diaspora. Every entry na real citizen voice."
              : "Anonymous evaluations submitted by citizens across Nigeria and the diaspora. Every entry is structured, graded, and permanent."}
          </p>
        </div>

        {!mounted ? (
          <div className="flex h-60 items-center justify-center text-ink-muted text-[14px]">Loading feed...</div>
        ) : feed.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-20 text-center">
            <MessageSquare size={32} className="text-ink-muted/40" />
            <p className="mt-4 text-[15px] font-semibold text-ink">No entries yet.</p>
            <p className="mt-1 text-[13px] text-ink-muted">
              {mode === "cruise" ? "Be the first to evaluate a leader." : "Complete an evaluation to see it here."}
            </p>
            <Link
              href="/start"
              className="mt-6 rounded-xl bg-forest-500 px-5 py-2.5 text-[13px] font-medium text-white hover:bg-forest-700"
            >
              {mode === "cruise" ? "Start evaluating" : "Start an evaluation"}
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 lg:grid-cols-2">
            {feed.map((entry) => {
              const grade = scoreToGrade(entry.score);
              return (
                <div key={entry.id} className="rounded-xl border border-line bg-paper-raised p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-tint">
                        <span className="font-mono text-[10px] font-bold text-forest-500">
                          {entry.handle.slice(-2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-ink">{entry.handle}</p>
                        <p className="text-[11px] text-ink-muted">Graded {timeAgo(entry.timestamp)}</p>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[11px] font-bold ${GRADE_COLORS[grade] ?? ""}`}>
                      {grade}
                    </span>
                  </div>

                  {/* Leader + score */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/leaders/${entry.leaderSlug}`}
                        className="text-[15px] font-bold text-ink hover:text-forest-500"
                      >
                        {entry.leaderName}
                      </Link>
                      <p className="text-[12px] text-ink-muted">{entry.leaderRole}</p>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-line">
                      <span className="font-mono text-[16px] font-black text-ink leading-none">{entry.score}</span>
                      <span className="text-[9px] text-ink-muted">/ 100</span>
                    </div>
                  </div>

                  {/* Verdict */}
                  <div className="mt-3 rounded-lg bg-paper px-3 py-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-ink-muted">Verdict</span>
                    <p className="text-[12px] font-semibold italic text-ink">{entry.verdict}</p>
                  </div>

                  {/* Caption if present */}
                  {entry.caption && (
                    <p className="mt-3 text-[13px] leading-relaxed text-ink-muted border-t border-line pt-3">
                      {entry.caption}
                    </p>
                  )}

                  {/* Mode badge */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                      entry.mode === "cruise"
                        ? "bg-cruise-tint text-cruise-700"
                        : "bg-forest-tint text-forest-700"
                    }`}>
                      {entry.mode === "cruise" ? "Agbado Cruise" : "Taxpayer Mode"}
                    </span>
                    <Link
                      href={`/card/${entry.leaderSlug}`}
                      className="text-[11px] text-forest-500 hover:underline"
                    >
                      View full card
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
