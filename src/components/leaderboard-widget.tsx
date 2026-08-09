"use client";

import { useEffect, useState } from "react";
import { Trophy, X, UserRound } from "lucide-react";
import { leaders } from "@/lib/data";
import { useMode } from "@/lib/mode-context";

const TREND_COLOR = {
  up: "text-signal-good",
  down: "text-signal-low",
  flat: "text-ink-muted",
};

const TREND_DELTA = {
  up: "+3",
  down: "-2",
  flat: "",
};

export function LeaderboardWidget() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { mode } = useMode();
  const ranked = [...leaders].sort((a, b) => b.score - a.score);
  const accent = mode === "cruise" ? "bg-cruise-500" : "bg-forest-500";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 120);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-20 right-4 z-40 sm:bottom-6 sm:right-6">
      {open ? (
        <div className="w-72 overflow-hidden rounded-xl border border-line-strong bg-paper-raised/95 shadow-card backdrop-blur-md">
          <div className="border-b border-line px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-ink">
                {mode === "cruise" ? "Who dey lead" : "Rankings"}
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close leaderboard" className="text-ink-muted hover:text-ink">
                <X size={15} />
              </button>
            </div>
            <p className="mt-0.5 text-[11px] text-ink-muted">
              Ranked by average governance score
            </p>
          </div>
          <ul className="divide-y divide-line">
            {ranked.slice(0, 5).map((l, i) => (
              <li key={l.slug} className="flex items-center gap-3 px-4 py-2.5">
                <span className="flex w-5 shrink-0 flex-col items-center gap-0.5">
                  <span className="font-mono text-[13px] font-semibold text-ink">{i + 1}</span>
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-line/40 text-ink-muted">
                  <UserRound size={13} strokeWidth={1.75} />
                </span>
                <span className="min-w-0 flex-1 truncate text-[12px] text-ink">{l.name}</span>
                <span className="flex flex-col items-end">
                  <span className="font-mono text-[12px] text-ink">
                    {l.evaluations.toLocaleString()}
                    <span className="ml-0.5 text-[10px] text-ink-muted">PTS</span>
                  </span>
                  {TREND_DELTA[l.trend] && (
                    <span className={`font-mono text-[10px] font-semibold ${TREND_COLOR[l.trend]}`}>
                      {TREND_DELTA[l.trend]}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open leaderboard"
          className={`flex items-center gap-1.5 rounded-full ${accent} text-paper shadow-card transition-all duration-300 ${
            scrolled ? "h-10 w-10 justify-center p-0" : "px-3.5 py-2 text-[12px] font-medium"
          }`}
        >
          <Trophy size={scrolled ? 16 : 13} />
          {!scrolled && "Leaderboard"}
        </button>
      )}
    </div>
  );
}
