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
    <div className="min-h-screen bg-paper">
      <SiteHeader />
      <div className="-mt-16">
        <QuizEngine leader={leader} />
      </div>
    </div>
  );
}
