import { SiteHeader } from "@/components/site-header";
import { LeaderListSkeleton } from "@/components/ui/skeleton";

export default function LoadingLeaders() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10">
        <div className="h-3 w-20 animate-pulse rounded bg-line" />
        <div className="mt-4 h-10 w-64 animate-pulse rounded bg-line" />
        <div className="mt-10">
          <LeaderListSkeleton />
        </div>
      </main>
    </div>
  );
}
