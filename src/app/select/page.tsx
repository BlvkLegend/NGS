import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeaderSelectCanvas } from "@/components/leader-select-canvas";

export default function SelectPage() {
  return (
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <main>
        <LeaderSelectCanvas />
      </main>
      <SiteFooter />
    </div>
  );
}
