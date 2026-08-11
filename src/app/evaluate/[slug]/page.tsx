import { notFound } from "next/navigation";
import { leaders } from "@/lib/data";
import { QuizEngine } from "@/components/quiz-engine";
import { SiteHeader } from "@/components/site-header";

export function generateStaticParams() {
  return leaders.map((l) => ({ slug: l.slug }));
}

export default async function EvaluatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const leader = leaders.find((l) => l.slug === slug);
  if (!leader) notFound();

  return (
    /*
     * Navbar overlays the quiz image background.
     * -mt-16 pulls quiz content up so the photo fills from page top.
     * The QuizEngine adds pt-20 on its progress bar to clear the nav.
     */
    <div className="relative min-h-screen">
      {/* Nav fixed/sticky over the quiz background */}
      <div className="absolute inset-x-0 top-0 z-30">
        <SiteHeader />
      </div>
      <QuizEngine leader={leader} />
    </div>
  );
}
