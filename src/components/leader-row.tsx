import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { ScoreRing } from "@/components/score-ring";
import type { Leader } from "@/lib/data";

export function LeaderRow({
  leader,
  index,
  href,
}: {
  leader: Leader;
  index: number;
  href?: string;
}) {
  const statusColor =
    leader.trend === "up"
      ? "text-signal-good"
      : leader.trend === "down"
        ? "text-signal-low"
        : "text-forest-500";

  return (
    <Link
      href={href ?? `/leaders/${leader.slug}`}
      className="group grid grid-cols-[1.5rem_auto_1fr_auto] items-center gap-4 border-b border-line py-4 transition-colors hover:bg-forest-tint/40 sm:gap-6 sm:py-5"
    >
      <span className="ledger-index text-sm text-ink-muted">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-forest-tint sm:h-12 sm:w-12">
        {leader.photoUrl ? (
          <Image src={leader.photoUrl} alt={leader.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-forest-500">
            <UserRound size={20} strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="truncate font-display text-[1.05rem] font-medium text-ink group-hover:underline">
          {leader.name}
        </h3>
        <p className="mt-0.5 truncate text-[13px] text-ink-muted">
          {leader.role} · {leader.jurisdiction}
        </p>
        <span className={`mt-1 inline-block font-mono text-[11px] font-medium ${statusColor}`}>
          {leader.trendDelta ?? "·"}
        </span>
      </div>

      <ScoreRing score={leader.score} size={52} stroke={4} />
    </Link>
  );
}
