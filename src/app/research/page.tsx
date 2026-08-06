import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchTable } from "@/components/research-table";
import Link from "next/link";

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <span className="ledger-index text-[12px] text-forest-500">For journalists and researchers</span>
        <h1 className="mt-4 font-display text-4xl font-medium text-ink">Data view</h1>
        <p className="mt-3 max-w-lg text-[14px] text-ink-muted">
          A sortable, exportable register for citation and analysis, the same
          underlying scores behind every card, in table form.
        </p>

        <div className="mt-10 hidden lg:block">
          <ResearchTable />
        </div>

        <div className="mt-10 rounded-xl border border-line-strong bg-paper-raised p-6 lg:hidden">
          <p className="text-[14px] text-ink">
            The sortable data table is built for wide desktop screens.
          </p>
          <p className="mt-2 text-[13px] text-ink-muted">
            On mobile, the{" "}
            <Link href="/rankings" className="font-medium text-forest-500 hover:underline">
              Rankings page
            </Link>{" "}
            covers the same data in a phone-friendly layout.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
