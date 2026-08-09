"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Share2, Copy, ArrowRight, UserRound, Check, Building2, Eye, ShieldAlert, HeartPulse, GraduationCap, Zap, Briefcase, ShoppingBasket, Scale, Users } from "lucide-react";

const CAT_ICON: Record<string, React.ReactNode> = {
  Infrastructure:   <Building2 size={10} />,
  Transparency:     <Eye size={10} />,
  Security:         <ShieldAlert size={10} />,
  Healthcare:       <HeartPulse size={10} />,
  Education:        <GraduationCap size={10} />,
  "Power Supply":   <Zap size={10} />,
  "Job Creation":   <Briefcase size={10} />,
  "Cost of Living": <ShoppingBasket size={10} />,
  Accountability:   <Scale size={10} />,
  Responsiveness:   <Users size={10} />,
};
import { getRankTitle, leaders } from "@/lib/data";
import { scoreToSignal, cn } from "@/lib/utils";
import { useMode } from "@/lib/mode-context";
import { MicrophoneRoom } from "@/components/microphone-room";
import type { Leader } from "@/lib/data";

const SIGNAL_GRADIENT: Record<string, string> = {
  good: "bg-gradient-to-br from-forest-500 via-forest-700 to-forest-900",
  mid: "bg-gradient-to-br from-cruise-500 via-[#8a6d1f] to-forest-900",
  low: "bg-gradient-to-br from-signal-low via-[#5c1f18] to-forest-900",
};

/** Purely cosmetic palettes the person can pick before sharing, Wrapped-
 *  style. Auto is tied to the actual grade signal; the rest are styling choices. */
const VARIANTS = [
  {
    id: "auto",
    label: "Auto",
    gradient: "",
    swatch: "bg-gradient-to-br from-forest-500 to-forest-900",
    pattern: "radial",
  },
  {
    id: "forest",
    label: "Forest",
    gradient: "bg-[linear-gradient(145deg,#3fae74_0%,#0e5236_50%,#020e07_100%)]",
    swatch: "bg-gradient-to-br from-[#3fae74] to-[#020e07]",
    pattern: "diagonal",
  },
  {
    id: "sunrise",
    label: "Sunrise",
    gradient: "bg-[linear-gradient(145deg,#ffb765_0%,#d9720f_45%,#0e5236_100%)]",
    swatch: "bg-gradient-to-br from-[#ffb765] to-[#0e5236]",
    pattern: "dots",
  },
  {
    id: "midnight",
    label: "Night",
    gradient: "bg-[linear-gradient(145deg,#1a2a22_0%,#060d09_100%)]",
    swatch: "bg-gradient-to-br from-[#1a2a22] to-[#060d09]",
    pattern: "grid",
  },
  {
    id: "naija",
    label: "Naija",
    gradient: "bg-[linear-gradient(145deg,#008751_0%,#004d30_50%,#000000_100%)]",
    swatch: "bg-gradient-to-br from-[#008751] to-[#000000]",
    pattern: "radial",
  },
  {
    id: "fire",
    label: "Fire",
    gradient: "bg-[linear-gradient(145deg,#ff6b35_0%,#9c3b30_50%,#1a0a08_100%)]",
    swatch: "bg-gradient-to-br from-[#ff6b35] to-[#1a0a08]",
    pattern: "diagonal",
  },
] as const;

export function ScorecardCanvas({ leader }: { leader: Leader }) {
  const { mode } = useMode();
  const searchParams = useSearchParams();
  const raw = searchParams.get("s");
  const parsed = raw ? parseInt(raw, 10) : NaN;
  const score = Number.isNaN(parsed) ? leader.score : Math.max(0, Math.min(100, parsed));
  const signal = scoreToSignal(score);
  const rank = getRankTitle(score, mode);

  const [variant, setVariant] = useState<(typeof VARIANTS)[number]["id"]>("auto");
  const cardGradient =
    variant === "auto" ? SIGNAL_GRADIENT[signal] : VARIANTS.find((v) => v.id === variant)!.gradient;

  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const focusHandlerRef = useRef<(() => void) | null>(null);

  function armFocusUnlock() {
    if (focusHandlerRef.current) return;
    const handler = () => {
      setUnlocked(true);
      window.removeEventListener("focus", handler);
      focusHandlerRef.current = null;
    };
    focusHandlerRef.current = handler;
    window.addEventListener("focus", handler, { once: true });
  }

  function shareTo(platform: "whatsapp" | "x" | "native") {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const shareUrl = `${origin}/scorecard/${leader.slug}`;
    const shareText =
      mode === "cruise"
        ? `${leader.name} don score ${score}/100. Rank: ${rank}. Come drag am too.`
        : `${leader.name} scored ${score}/100 on NGSC. Rank: ${rank}.`;

    if (platform === "native" && typeof navigator.share === "function") {
      navigator.share({ title: "NGSC", text: shareText, url: shareUrl }).then(
        () => setUnlocked(true),
        () => armFocusUnlock()
      );
      return;
    }

    const intent =
      platform === "whatsapp"
        ? `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
        : `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

    armFocusUnlock();
    window.open(intent, "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      await navigator.clipboard.writeText(`${origin}/scorecard/${leader.slug}`);
      setCopied(true);
      setUnlocked(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  const nextLeader = leaders.find((l) => l.slug !== leader.slug);

  return (
    <div className="mx-auto max-w-lg px-6 py-14">
      <span className="ledger-index text-[12px] text-forest-500">
        {mode === "cruise" ? "Your NGSC card don ready" : "Your NGSC card is ready"}
      </span>

      <div className="relative mt-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`relative mx-auto flex aspect-[9/16] w-full max-w-[320px] flex-col justify-between overflow-hidden rounded-2xl shadow-card transition-colors duration-300 ${cardGradient}`}
        >
          {/* Subtle geometric/adire-inspired corner decoration */}
          <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-40 w-40 opacity-10">
            <svg viewBox="0 0 160 160" fill="none">
              {[0,1,2,3].map(i => (
                <circle key={i} cx="160" cy="0" r={40 + i * 28} fill="none" stroke="white" strokeWidth="1"/>
              ))}
              {[0,1,2,3,4,5].map(i => (
                <line key={i} x1="160" y1="0" x2={160 - 140 * Math.cos(i * 30 * Math.PI/180)} y2={140 * Math.sin(i * 30 * Math.PI/180)} stroke="white" strokeWidth="0.5"/>
              ))}
            </svg>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-paper/10 blur-2xl"
          />

          <div className="relative px-6 pt-7">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-paper/80">NGSC</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper/80">
                {leader.jurisdiction}
              </p>
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div>
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-paper/30 bg-paper/15 text-paper ring-2 ring-paper/10">
                  <UserRound size={24} strokeWidth={1.5} />
                </span>
                <h2 className="mt-3 font-display text-[1.3rem] font-bold leading-tight text-paper">
                  {leader.name}
                </h2>
                <p className="mt-0.5 text-[11px] text-paper/80">{leader.role}</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-mono text-[5rem] font-black leading-none text-paper drop-shadow-lg">
                  {score}
                </p>
                <p className="text-[9px] uppercase tracking-[0.2em] text-paper/80">/ 100</p>
              </div>
            </div>
          </div>

          <div className="relative px-6 pb-6">
            <div className="rounded-xl bg-paper/10 px-4 py-3 backdrop-blur-sm">
              <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper/80">NGSC verdict</p>
              <p className="font-display text-[1.1rem] font-bold italic text-paper leading-tight">{rank}</p>
            </div>

            {leader.categories.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {leader.categories.slice(0, 4).map((c) => (
                  <div key={c.label} className="flex items-center gap-2">
                    <span className="text-paper/70 w-3 flex-shrink-0">{CAT_ICON[c.label] ?? <Building2 size={10} />}</span>
                    <span className="truncate text-[10px] text-paper/80 w-24">{c.label}</span>
                    <div className="flex-1 h-1 rounded-full bg-paper/20 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-paper/70"
                        style={{ width: `${c.score}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-paper/80 w-6 text-right">{c.score}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between border-t border-paper/15 pt-3">
              <p className="text-[9px] uppercase tracking-[0.18em] text-paper/60">ngsc.africa</p>
              <p className="font-mono text-[9px] text-paper/60">#accountability</p>
            </div>
          </div>
        </motion.div>

        {!unlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-end gap-4 rounded-2xl bg-ink/40 pb-10 backdrop-blur-sm">
            <Lock size={18} className="text-paper" />
            <p className="max-w-56 text-center text-[13px] text-paper">
              {mode === "cruise"
                ? "Share this thing before the microphone open for you"
                : "Share your NGSC card to unlock the voice feature"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 px-4">
              <button
                onClick={() => shareTo("native")}
                className="flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-[13px] font-medium text-ink hover:bg-paper/90"
              >
                <Share2 size={13} /> Share
              </button>
              <button
                onClick={() => shareTo("whatsapp")}
                className="rounded-full border border-paper/50 px-4 py-2 text-[13px] font-medium text-paper hover:bg-paper/10"
              >
                WhatsApp
              </button>
              <button
                onClick={() => shareTo("x")}
                className="rounded-full border border-paper/50 px-4 py-2 text-[13px] font-medium text-paper hover:bg-paper/10"
              >
                X
              </button>
              <button
                onClick={copyLink}
                className="flex items-center gap-1.5 rounded-full border border-paper/50 px-4 py-2 text-[13px] font-medium text-paper hover:bg-paper/10"
              >
                <Copy size={13} /> {copied ? "Copied" : "Copy link"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Variant picker: purely cosmetic, always available, before or after
          unlock, so restyling before sharing never feels like a one-shot
          choice made under the lock screen. */}
      <div className="mt-6 flex items-center justify-center gap-2.5">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => setVariant(v.id)}
            aria-label={`${v.label} colour`}
            aria-pressed={variant === v.id}
            className={cn(
              "relative h-7 w-7 rounded-full ring-2 ring-offset-2 ring-offset-paper transition-shadow",
              v.swatch,
              variant === v.id ? "ring-ink" : "ring-transparent"
            )}
          >
            {variant === v.id && (
              <Check size={12} className="absolute inset-0 m-auto text-paper drop-shadow" />
            )}
          </button>
        ))}
      </div>

      {/* Persistent actions: available before AND after unlock, so sharing
          again or grabbing the link isn't a one-time-only affordance that
          vanishes with the lock overlay. */}
      {unlocked && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => shareTo("native")}
            className="flex items-center gap-1.5 rounded-full bg-forest-500 px-4 py-2 text-[13px] font-medium text-paper transition-colors hover:bg-forest-700"
          >
            <Share2 size={13} /> {mode === "cruise" ? "Share am again" : "Share again"}
          </button>
          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-forest-tint"
          >
            <Copy size={13} /> {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      )}

      <div className="mt-6 flex flex-col items-center gap-2">
        <Link
          href={`/card/${leader.slug}?s=${score}`}
          className="flex items-center gap-1.5 text-[13px] font-medium text-ink hover:text-forest-500"
        >
          View the full record <ArrowRight size={14} />
        </Link>
        {unlocked && nextLeader && (
          <Link
            href={`/evaluate/${nextLeader.slug}`}
            className="flex items-center gap-1.5 text-[13px] font-medium text-ink-muted hover:text-forest-500"
          >
            {mode === "cruise" ? `Go drag ${nextLeader.name} next` : `Evaluate ${nextLeader.name} next`}
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {unlocked && <MicrophoneRoom leaderName={leader.name} />}
    </div>
  );
}
