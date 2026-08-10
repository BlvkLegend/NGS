import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchTable } from "@/components/research-table";
import Link from "next/link";

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />

      {/* Header band: dark surface with Abuja/civic building texture */}
      <div
        className="relative overflow-hidden bg-forest-900"
        style={{ minHeight: "10rem" }}
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
        <div className="relative mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
          <span className="ledger-index text-[12px] text-forest-300">For journalists and researchers</span>
          <h1 className="mt-3 text-3xl font-bold text-paper sm:text-4xl">Data view</h1>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-paper/60">
            The same underlying scores behind every NGSC card, in sortable table form.
            Export to CSV for citation and analysis.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <div className="hidden lg:block">
          <ResearchTable />
        </div>

        <div className="mt-10 rounded-xl border border-line-strong bg-paper-raised p-6 lg:hidden">
          <p className="text-[14px] font-medium text-ink">
            The sortable data table is built for wide desktop screens.
          </p>
          <p className="mt-2 text-[13px] text-ink-muted">
            On mobile, the{" "}
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
