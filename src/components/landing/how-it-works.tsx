"use client";

import { motion } from "framer-motion";
import { Search, ListChecks, Sparkles, UserRound } from "lucide-react";
import { useMode } from "@/lib/mode-context";

// Real social platform icons — inline SVG, no dependency
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.863L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

const COPY = {
  taxpayer: {
    eyebrow: "Process",
    title: "Four steps, one record.",
    find:   { title: "Find the official",        body: "Search by name, state, or office." },
    answer: { title: "Answer ten questions",      body: "Infrastructure, transparency, health, and more." },
    reveal: { title: "Get your NGSC card",        body: "A grade, a score, and category breakdowns." },
    share:  {
      title: "Post it. Let it hold.",
      body:  "Your grade becomes part of the public record. The more citizens who score, the harder it is to ignore.",
    },
    payoffEyebrow: "What you walk away with",
    payoffBody:    "One structured evaluation, compiled into a card built for the argument you're actually trying to win.",
  },
  cruise: {
    eyebrow: "How e dey work",
    title: "Four steps, one gist.",
    find:   { title: "Find who you wan drag",         body: "Search their name, state, or office." },
    answer: { title: "Answer ten gbege questions",    body: "Infrastructure, health, school, and more." },
    reveal: { title: "Collect your NGSC card",        body: "Grade, score, and full breakdown." },
    share:  {
      title: "Drop am, make dem see.",
      body:  "Your score enter the public record. The more people wey rate, the more the numbers go force accountability.",
    },
    payoffEyebrow: "Wetin you dey waka commot with",
    payoffBody:    "One correct evaluation, packaged into a card wey ready for group chat and better.",
  },
};

export function HowItWorks() {
  const { mode } = useMode();
  const c = COPY[mode];

  return (
    <section id="how-it-works" className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10 scroll-mt-16">
      <span className="ledger-index text-[12px] text-forest-500">{c.eyebrow}</span>
      <h2 className="mt-3 max-w-md text-3xl font-bold leading-tight text-ink sm:text-4xl">
        {c.title}
      </h2>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Step 1 — Find */}
        <BentoCell delay={0}>
          <StepNum>1</StepNum>
          <div className="mt-3 flex-1">
            <div className="rounded-lg border border-line bg-paper px-3 py-2 text-[12px] text-ink-muted">
              {mode === "cruise" ? "Who you dey find?" : "Search by name, state..."}
            </div>
            <div className="mt-1.5 space-y-1">
              {["Governor", "Senator", "Lagos"].map((s) => (
                <div key={s} className="flex items-center gap-2 rounded-md bg-paper px-2 py-1">
                  <UserRound size={11} className="text-ink-muted" />
                  <span className="text-[11px] text-ink-muted">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <BentoText title={c.find.title} body={c.find.body} />
        </BentoCell>

        {/* Step 2 — Answer */}
        <BentoCell delay={0.05}>
          <StepNum>2</StepNum>
          <div className="mt-3 flex-1">
            <div className="flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className={`h-1.5 flex-1 rounded-full ${i < 4 ? "bg-forest-500" : "bg-line"}`} />
              ))}
            </div>
            <p className="mt-2 text-[11px] text-ink-muted">Question 4 of 10</p>
          </div>
          <BentoText title={c.answer.title} body={c.answer.body} />
        </BentoCell>

        {/* Step 3 — Card */}
        <BentoCell delay={0.1}>
          <StepNum>3</StepNum>
          <div className="mt-5 flex flex-1 items-center justify-center">
            <div className="flex h-20 w-14 flex-col items-center justify-center gap-1 rounded-lg bg-gradient-to-br from-forest-500 to-forest-900 text-paper shadow-card">
              <span className="font-mono text-lg font-semibold">B+</span>
              <span className="text-[7px] uppercase tracking-wide text-paper/70">NGSC</span>
            </div>
          </div>
          <BentoText title={c.reveal.title} body={c.reveal.body} />
        </BentoCell>

        {/* Step 4 — Share: real icons, rewritten copy */}
        <BentoCell delay={0.15}>
          <StepNum>4</StepNum>
          <div className="mt-3 flex flex-1 items-center gap-2">
            {/* WhatsApp */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm">
              <WhatsAppIcon />
            </div>
            {/* X */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white shadow-sm">
              <XIcon />
            </div>
            {/* Instagram */}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm"
              style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}
            >
              <InstagramIcon />
            </div>
          </div>
          <BentoText title={c.share.title} body={c.share.body} />
        </BentoCell>
      </div>
    </section>
  );
}

function StepNum({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-forest-tint font-mono text-[12px] font-bold text-forest-500">
      {children}
    </div>
  );
}

function BentoCell({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay }}
      className="flex min-h-[220px] flex-col rounded-2xl border border-line bg-paper-raised p-5"
    >
      {children}
    </motion.div>
  );
}

function BentoText({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-4 border-t border-line pt-3">
      <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">{body}</p>
    </div>
  );
}
