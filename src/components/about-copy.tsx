"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useMode } from "@/lib/mode-context";
import { route } from "@/lib/asset";

const COPY = {
  taxpayer: {
    eyebrow: "About NGSC",
    h1: "Governance data, without the 200-page PDF.",
    body: "Public governance data in Nigeria is fragmented, politicized, and buried inside reports nobody reads. NGSC closes that gap — one place to see how an official is actually performing, built from structured citizen evaluations.",
    cta: "Rate a leader",
    whatTitle: "What NGSC is not",
    whatSub: "Important distinctions before you evaluate.",
    links: { methodology: "Read the full methodology", leaders: "Browse leaders" },
  },
  cruise: {
    eyebrow: "Wetin be NGSC?",
    h1: "Governance data wey ordinary people fit read.",
    body: "Government data dey scattered, politicised, and hidden inside PDF wey nobody go read. NGSC close that gap — one place you go see how any oga dey perform, based on wetin real citizens submit.",
    cta: "Rate an oga",
    whatTitle: "Wetin NGSC no be",
    whatSub: "Make we clear some things before you start.",
    links: { methodology: "Read the full methodology", leaders: "See the leaders" },
  },
};

export function AboutHeroCopy() {
  const { mode } = useMode();
  const c = COPY[mode];
  return (
    <>
      <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-300">
        {c.eyebrow}
      </span>
      <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-paper sm:text-5xl lg:text-6xl">
        {c.h1}
      </h1>
      <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-paper/75">{c.body}</p>
      <div className="mt-8">
        <Link
          href={route("/start")}
          className="inline-flex items-center gap-2 rounded-xl bg-forest-500 px-6 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:bg-forest-700"
        >
          {c.cta} <ArrowRight size={15} />
        </Link>
      </div>
    </>
  );
}

export function AboutNotTitle() {
  const { mode } = useMode();
  const c = COPY[mode];
  return (
    <>
      <h2 className="text-2xl font-bold text-paper">{c.whatTitle}</h2>
      <p className="mt-1 text-[13px] text-paper/55">{c.whatSub}</p>
    </>
  );
}

export function AboutFooterLinks() {
  const { mode } = useMode();
  const c = COPY[mode];
  return (
    <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-line pt-10">
      <Link href={route("/methodology")} className="text-[14px] font-medium text-forest-500 hover:underline">
        {c.links.methodology}
      </Link>
      <span className="text-ink-muted">|</span>
      <Link href={route("/leaders")} className="text-[14px] font-medium text-forest-500 hover:underline">
        {c.links.leaders}
      </Link>
    </div>
  );
}
