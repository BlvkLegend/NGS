"use client";

import { motion } from "framer-motion";

export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div>
      <div className="flex items-center justify-between text-[12px] text-ink-muted">
        <span className="ledger-index">
          Question {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="ledger-index">{pct}% complete</span>
      </div>
      <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full rounded-full bg-forest-500"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
