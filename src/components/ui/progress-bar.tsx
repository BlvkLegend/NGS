"use client";

import { motion } from "framer-motion";

/** Instagram-story style segmented progress bar */
export function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1" role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line">
          {i < current && (
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-forest-500"
              initial={{ width: i < current - 1 ? "100%" : "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: i === current - 1 ? 0.4 : 0, ease: "easeOut" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
