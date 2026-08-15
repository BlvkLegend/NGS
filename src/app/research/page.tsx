"use client";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchTable } from "@/components/research-table";
import Link from "next/link";
import { useMode } from "@/lib/mode-context";

export default function ResearchPage() {
  const { mode } = useMode();
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      {/* Header band: -mt-16 pulls behind sticky nav */}
      <div
        className="-mt-16 relative overflow-hidden bg-forest-900"
        style={{ minHeight: "14rem" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=50")`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-10 pt-24 lg:px-10">
          <span className="ledger-index text-[12px] text-forest-300">{mode === "cruise" ? "For journalists and sharp people" : "For journalists and researchers"}</span>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{mode === "cruise" ? "Data table" : "Data view"}</h1>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/60">
{mode === "cruise"
              ? "Same scores wey dey behind every NGSC card, laid out in one sortable table. Export am, cite am, use am."
              : "The same underlying scores behind every NGSC card, in sortable table form. Export to CSV for citation and analysis."}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <div className="hidden lg:block">
          <ResearchTable />
        </div>

        <div className="mt-10 rounded-xl border border-line-strong bg-paper-raised p-6 lg:hidden">
          <p className="text-[14px] font-medium text-ink">
{mode === "cruise" ? "This data table need wide desktop screen to show well." : "The sortable data table is built for wide desktop screens."}
          </p>
          <p className="mt-2 text-[13px] text-ink-muted">
{mode === "cruise" ? "On mobile, the" : "On mobile, the"}{" "}
            <Link href="/leaders" className="font-medium text-forest-500 hover:underline">
              Leaders directory
            </Link>{" "}
            covers the same data in a phone-friendly layout.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
