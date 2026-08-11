"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { nigerianStates, employmentProfiles } from "@/lib/data";
import { useMode } from "@/lib/mode-context";
import { DepthButton } from "@/components/ui/depth-button";
import { PersonaToggle } from "@/components/persona-toggle";

// Two-tone split: left = Danfo street texture, right = form surface
// Civic participation / voter context image — distinct from the hero
const LEFT_PHOTO = "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=75";

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
    <div className="flex min-h-[calc(100vh-80px)]">
      {/* Left: photo panel, desktop only */}
      <div className="relative hidden flex-1 overflow-hidden lg:block">
        <img
          src={LEFT_PHOTO}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        {/* Right-edge fade into the form panel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, transparent 40%, color-mix(in srgb, var(--paper) 60%, transparent) 75%, var(--paper) 100%)",
          }}
        />
        {/* Stat overlay anchored bottom-left — dark pill for contrast in all modes */}
        <div className="absolute bottom-10 left-10 space-y-3 rounded-2xl bg-black/40 px-5 py-4 backdrop-blur-sm">
          {[
            { n: "36", label: "states covered" },
            { n: "10", label: "scored categories" },
            { n: "100%", label: "anonymous" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="font-mono text-[2rem] font-black leading-none text-paper drop-shadow-lg">
                {s.n}
              </span>
              <span className="text-[13px] font-semibold text-paper drop-shadow">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: form panel */}
      <section className="flex w-full flex-col justify-center px-6 py-16 sm:px-10 lg:max-w-lg lg:px-12">
        <span className="ledger-index text-[12px] text-forest-500">
          {mode === "cruise" ? "Quick one before we start" : "Before you begin"}
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
          {mode === "cruise" ? "Wetin be your gist?" : "Two quick questions"}
        </h1>
        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-ink-muted">
          {mode === "cruise"
            ? "No wahala, na just so we fit group your voice correctly. No name, no wahala, just vibes."
            : "This groups your evaluation into anonymous demographic brackets. No name or contact detail is collected."}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-[12px] text-ink-muted">Mode:</span>
          <PersonaToggle />
        </div>

        <form
          className="mt-10 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (canContinue) handleContinue();
          }}
        >
          <label className="block">
            <span className="text-[13px] font-semibold text-ink">
              {mode === "cruise" ? "Where you dey rep?" : "Jurisdiction or location"}
            </span>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-paper-raised px-3.5 py-3 text-[14px] text-ink outline-none focus-visible:border-forest-500 focus-visible:ring-2 focus-visible:ring-forest-500/20"
            >
              <option value="" disabled>Select a state</option>
              {nigerianStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-[13px] font-semibold text-ink">
              {mode === "cruise" ? "Wetin you dey hustle with?" : "Current occupation status"}
            </span>
            <select
              value={employmentProfile}
              onChange={(e) => setEmploymentProfile(e.target.value)}
              className="mt-2 w-full rounded-xl border border-line bg-paper-raised px-3.5 py-3 text-[14px] text-ink outline-none focus-visible:border-forest-500 focus-visible:ring-2 focus-visible:ring-forest-500/20"
            >
              <option value="" disabled>Select one</option>
              {employmentProfiles.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          <DepthButton type="submit" disabled={!canContinue}>
            {mode === "cruise" ? "Make we start" : "Continue"} <ArrowRight size={15} />
          </DepthButton>
        </form>

        <p className="mt-8 text-[11px] text-ink-muted">
          {mode === "cruise"
            ? "Nothing wey you select here go tie back to you personally."
            : "Neither selection is stored under a profile or linked to your evaluation."}
        </p>
      </section>
    </div>
  );
}
