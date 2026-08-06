import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GradeBadge } from "@/components/grade-badge";
import { ShieldCheck } from "lucide-react";

const GRADE_SCALE = [
  { meaning: "Excellent", range: "90 to 100", sample: 95 },
  { meaning: "Very good", range: "80 to 89", sample: 85 },
  { meaning: "Good", range: "70 to 79", sample: 75 },
  { meaning: "Above average", range: "60 to 69", sample: 65 },
  { meaning: "Average", range: "50 to 59", sample: 55 },
  { meaning: "Poor", range: "40 to 49", sample: 44 },
  { meaning: "Fail", range: "0 to 39", sample: 25 },
];

const ANSWER_SCALE = [
  { value: 1, label: "Poor", helper: "No credible evidence of progress" },
  { value: 2, label: "Weak", helper: "Minimal, inconsistent progress" },
  { value: 3, label: "Fair", helper: "Some progress, significant gaps remain" },
  { value: 4, label: "Good", helper: "Clear, verifiable progress" },
  { value: 5, label: "Strong", helper: "Consistent, well-documented delivery" },
];

const BRACKETS = [
  { label: "Geographic anchor", detail: "36 states, FCT Abuja, or Diaspora" },
  { label: "Occupation status", detail: "Student, unemployed, employed, or entrepreneur" },
  { label: "Age bracket", detail: "Inferred from interface mode, never asked directly" },
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <span className="ledger-index text-[12px] text-forest-500">Methodology</span>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
          How a score becomes a grade.
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-muted">
          Every evaluation on NGSC follows the same structure, regardless of
          which official is being scored or which interface mode was used to
          score them. That consistency is what makes one official&apos;s grade
          comparable to another&apos;s.
        </p>

        <section className="mt-14">
          <h2 className="font-display text-xl font-medium text-ink">The ten questions</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-muted">
            Each evaluation covers ten fixed categories, infrastructure,
            transparency, healthcare, education, security, and more, one
            question per category. Every question is answered on the same
            five-point scale:
          </p>
          <div className="mt-5 space-y-2">
            {ANSWER_SCALE.map((opt) => (
              <div
                key={opt.value}
                className="flex items-center gap-4 rounded-lg border border-line px-4 py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-[12px] text-ink-muted">
                  {opt.value}
                </span>
                <div className="min-w-0">
                  <span className="text-[13px] font-medium text-ink">{opt.label}</span>
                  <span className="ml-2 text-[12px] text-ink-muted">{opt.helper}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-line pt-10">
          <h2 className="font-display text-xl font-medium text-ink">From score to grade</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-muted">
            The ten answers average into a single score out of 100, which
            maps to a letter grade the same way across every profile on
            NGSC:
          </p>
          <div className="mt-5 divide-y divide-line rounded-lg border border-line">
            {GRADE_SCALE.map((row) => (
              <div key={row.meaning} className="flex items-center gap-4 px-4 py-3">
                <GradeBadge score={row.sample} size="sm" />
                <div className="min-w-0 flex-1">
                  <span className="text-[13px] font-medium text-ink">{row.meaning}</span>
                  <span className="ml-2 font-mono text-[12px] text-ink-muted">{row.range}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-line pt-10">
          <h2 className="font-display text-xl font-medium text-ink">Demographic brackets</h2>
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-muted">
            Evaluations are grouped into anonymous brackets so results can be
            read by segment, without ever identifying an individual
            evaluator:
          </p>
          <div className="mt-5 space-y-2">
            {BRACKETS.map((b) => (
              <div key={b.label} className="flex items-center justify-between rounded-lg border border-line px-4 py-3">
                <span className="text-[13px] font-medium text-ink">{b.label}</span>
                <span className="text-[12px] text-ink-muted">{b.detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-line pt-10">
          <div className="flex items-start gap-3 rounded-lg border border-line-strong bg-paper-raised p-5">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-forest-500" />
            <div>
              <h2 className="text-[14px] font-medium text-ink">Guarding against noise</h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                No system built on public submissions is immune to bad-faith
                entries. NGSC&apos;s roadmap includes evidence-backed evaluations,
                where an evaluator can attach a photo or short clip to
                support a claim, and pattern-based review to flag coordinated
                or duplicate submissions before they affect a public score.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
