import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeadersUnified } from "@/components/leaders-unified";

export default function LeadersPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-[1400px] px-6 py-0 lg:px-10">
        <Suspense fallback={null}>
          <LeadersUnified />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
