import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeadersUnified } from "@/components/leaders-unified";

export default function LeadersPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-[1400px] -mt-16 px-6 pb-16 lg:px-10">
        <Suspense fallback={null}>
          <LeadersUnified />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
