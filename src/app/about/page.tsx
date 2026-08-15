"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookOpen, Users2, ScanSearch, Landmark, ArrowRight, Shield, Ban, BarChart3, Mic2 } from "lucide-react";
import { asset } from "@/lib/asset";
import { useMode } from "@/lib/mode-context";

const HERO_PHOTO    = asset("/about-hero.png");
const NOT_PHOTO     = asset("/assembly-interior.webp");

export default function AboutPage() {
  const { mode } = useMode();
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      {/* FULL-BLEED HERO — -mt-16 pulls behind sticky nav */}
      <div className="relative -mt-16 min-h-[72vh] w-full overflow-hidden">
        <img
          src={HERO_PHOTO}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.70) 75%, rgba(0,0,0,0.92) 100%)",
          }}
        />
        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-14 pt-32 lg:px-10">
          <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-forest-300">
            {mode === "cruise" ? "Wetin be NGSC" : "About NGSC"}
          </span>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {mode === "cruise" ? "Government data, without the boring 200-page PDF." : "Governance data, without the 200-page PDF."}
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">
            {mode === "cruise"
              ? "Government data for Nigeria dey scattered, politicized, buried inside reports nobody dey read. NGSC close that gap: one place, real scores, built from citizens like you — not from Twitter noise."
              : "Public governance data in Nigeria is fragmented, politicized, and buried inside reports nobody reads. NGSC closes that gap: one place to see how an official is actually performing, built from structured citizen evaluations rather than sentiment and social media noise."}
          </p>
          <div className="mt-8">
            <Link
              href="/start"
              className="inline-flex items-center gap-2 rounded-xl bg-forest-500 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-forest-700"
            >
              {mode === "cruise" ? "Go drag a leader" : "Rate a leader"} <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-6 pb-16 pt-14 lg:px-10">
        {/* What / Why grid — 4-col on wide screens */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AboutCard icon={<ScanSearch size={18} />} title={mode === "cruise" ? "The wahala" : "The problem"}
            body={mode === "cruise" ? "Most Nigerians no get fast, honest way to track whether their official dey deliver on roads, hospital, school, or money. We dey evaluate by sentiment because real data no dey available." : "Most citizens and journalists have no fast, objective way to track whether an official is delivering on infrastructure, healthcare, education, or fiscal management. Evaluation defaults to rhetoric because structured data is out of reach."} />
          <AboutCard icon={<Landmark size={18} />} title={mode === "cruise" ? "The mission" : "The goal"}
            body={mode === "cruise" ? "Turn scattered governance data into one clean NGSC card: grade, score, breakdown — built from real citizen drags, not one institution's press release." : "Turn fragmented, intimidating governance data into a scannable NGSC card: a grade, a score, and category breakdowns, built from real citizen evaluations rather than a single institution's press release."} />
          <AboutCard icon={<Users2 size={18} />} title={mode === "cruise" ? "Who e dey for" : "Who it is for"}
            body={mode === "cruise" ? "The voter wey wan check their state before election. The diaspora wey dey follow from abroad. The journalist wey need a citable score, not just vibes." : "The everyday voter checking their state before an election. The diaspora Nigerian keeping up from abroad. The journalist or researcher who needs a citable, structured score rather than a vibe."} />
          <AboutCard icon={<BookOpen size={18} />} title={mode === "cruise" ? "Why e dey like this" : "Why it is structured this way"}
            body={mode === "cruise" ? "Ten fixed questions for every evaluation, same categories for every oga — so one governor score mean the same thing as another. Anonymous. No account. Just your rating." : "Ten fixed questions per evaluation, the same categories for every official, so one governor's score means the same thing as another's. Every evaluation is anonymous. No account needed."} />
        </div>

        {/* What NGSC is NOT — National Assembly interior photo background */}
        <div className="relative mt-14 overflow-hidden rounded-2xl">
          <img
            src={NOT_PHOTO}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/78" />

          <div className="relative px-6 py-12 lg:px-10">
            <h2 className="text-2xl font-bold text-white">{mode === "cruise" ? "Wetin NGSC no be" : "What NGSC is not"}</h2>
            <p className="mt-1 text-[13px] text-white/60">
              {mode === "cruise" ? "Make we clear some things before you drag anybody." : "Important distinctions before you evaluate."}
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <NotCard icon={<Ban size={16} />} title={mode === "cruise" ? "No be government body" : "Not a government body"}
                body={mode === "cruise" ? "NGSC no get any link with INEC, any ministry, or any party. We be independent citizen project. Nothing here na official government record." : "NGSC has no affiliation with INEC, any ministry, or any political party. We are an independent citizen project. Nothing on this platform is an official government record or certified audit."} />
              <NotCard icon={<Shield size={16} />} title={mode === "cruise" ? "No be party tool" : "Not a partisan tool"}
                body={mode === "cruise" ? "Same ten questions for every oga, no matter which party. The scoring formula dey public and consistent. We no dey take sides — only satirical rank titles, wey we label clearly." : "The same ten questions apply to every official regardless of party. The scoring formula is public and consistent. We do not editorialize outside of satirical rank titles, which are clearly labelled."} />
              <NotCard icon={<BarChart3 size={16} />} title={mode === "cruise" ? "No be polling service" : "Not a polling service"}
                body={mode === "cruise" ? "Scores na structured citizen evaluations across ten fixed areas — not open polls or star ratings. The formula dey reproducible across officials and time." : "Scores reflect structured citizen evaluations across ten fixed categories, not open-ended polls or star ratings. The methodology is designed to be reproducible and comparable across officials and time."} />
              <NotCard icon={<Mic2 size={16} />} title={mode === "cruise" ? "No be social media" : "Not a social media platform"}
                body={mode === "cruise" ? "NGSC no dey store profile, follower, or social graph. Evaluation fully anonymous. Voice feature dey convert speech to text inside your browser only — no raw audio dey transmitted." : "NGSC does not store profiles, followers, or social graphs. Evaluations are fully anonymous. The voice feature converts speech to text locally in your browser; no raw audio is ever transmitted or stored."} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-line pt-10">
          <Link href="/methodology" className="text-[14px] font-medium text-forest-500 hover:underline">
            {mode === "cruise" ? "Read how e work" : "Read the full methodology"}
          </Link>
          <span className="text-ink-muted">|</span>
          <Link href="/research" className="text-[14px] font-medium text-forest-500 hover:underline">
            {mode === "cruise" ? "Open the data table" : "Open the research table"}
          </Link>
          <span className="text-ink-muted">|</span>
          <Link href="/leaders" className="text-[14px] font-medium text-forest-500 hover:underline">
            {mode === "cruise" ? "See all the ogas" : "Browse leaders"}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function AboutCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-tint text-forest-500">
        {icon}
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}

function NotCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-paper/15 bg-paper/8 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2.5">
        <span className="text-white/70">{icon}</span>
        <h3 className="text-[14px] font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-white/65">{body}</p>
    </div>
  );
}
