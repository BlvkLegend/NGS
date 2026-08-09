"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { nigerianStates, employmentProfiles } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { DepthButton } from "@/components/ui/depth-button";
import { PersonaToggle } from "@/components/persona-toggle";

export function OnboardingGate() {
  const router = useRouter();
  const { mode } = useMode();
  const [jurisdiction, setJurisdiction] = useState("");
  const [employmentProfile, setEmploymentProfile] = useState("");

  const canContinue = jurisdiction !== "" && employmentProfile !== "";

  function handleContinue() {
    try {
      sessionStorage.setItem(
        "gcc-demo-profile",
        JSON.stringify({ jurisdiction, employmentProfile })
      );
    } catch {}
    router.push("/select");
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-20">
      <span className="ledger-index text-[12px] text-forest-500">
        {mode === "cruise" ? "Quick one before we start" : "Before you begin"}
      </span>
      <h1 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
        {mode === "cruise" ? "Wetin be your gist?" : "Two quick questions"}
      </h1>
      <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-muted">
        {mode === "cruise"
          ? "No wahala, na just so we fit group your voice correctly. No name, no wahala, just vibes."
          : "This groups your evaluation into anonymous demographic brackets. No name or contact detail is collected."}
      </p>

      <div className="mt-6 flex items-center justify-center gap-3 sm:justify-start">
        <span className="text-[12px] text-ink-muted">Mode:</span>
        <PersonaToggle />
      </div>

      <form
        className="mt-10 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (canContinue) handleContinue();
        }}
      >
        <label className="block">
          <span className="text-[13px] font-medium text-ink">
            {mode === "cruise" ? "Where you dey rep?" : "Jurisdiction or location"}
          </span>
          <select
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-line bg-paper-raised px-3.5 py-2.5 text-[14px] text-ink outline-none focus-visible:border-forest-500"
          >
            <option value="" disabled>
              Select a state
            </option>
            {nigerianStates.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-[13px] font-medium text-ink">
            {mode === "cruise" ? "Wetin you dey hustle with?" : "Current occupation status"}
          </span>
          <select
            value={employmentProfile}
            onChange={(e) => setEmploymentProfile(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-line bg-paper-raised px-3.5 py-2.5 text-[14px] text-ink outline-none focus-visible:border-forest-500"
          >
            <option value="" disabled>
              Select one
            </option>
            {employmentProfiles.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <DepthButton type="submit" disabled={!canContinue}>
          Continue <ArrowRight size={15} />
        </DepthButton>
      </form>
    </section>
  );
}
