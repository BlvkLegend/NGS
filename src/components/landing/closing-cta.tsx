"use client";

import { DepthButton } from "@/components/ui/depth-button";
import { ArrowRight } from "lucide-react";
import { useMode } from "@/lib/mode-context";

const COPY = {
  taxpayer: {
    title: "Your evaluation is one entry in a public record that grows every day.",
    cta: "Start your first evaluation",
  },
  cruise: {
    title: "Your own sense na one entry for the record wey dey grow every day.",
    cta: "Start your first drag",
  },
};

export function ClosingCta() {
  const { mode } = useMode();
  const copy = COPY[mode];

  return (
    <section className="relative overflow-hidden border-t border-line bg-forest-900">
      {/* Lagos aerial — civic energy as backdrop */}
      <img
        src="https://images.unsplash.com/photo-1649502913092-fb7f0e8fc632?auto=format&fit=crop&w=1400&q=60"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
        loading="lazy"
      />
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 px-6 py-20 lg:flex-row lg:items-center lg:px-10">
        <h2 className="max-w-lg font-display text-3xl font-medium leading-tight text-paper sm:text-4xl">
          {copy.title}
        </h2>
        <DepthButton href="/start" className="shrink-0">
          {copy.cta}
          <ArrowRight size={15} />
        </DepthButton>
      </div>
    </section>
  );
}
