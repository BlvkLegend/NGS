import { Suspense } from "react";
import { notFound } from "next/navigation";
import { leaders } from "@/lib/data";
import { NgscCardResult } from "@/components/ngsc-card-result";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function generateStaticParams() {
  return leaders.map((l) => ({ slug: l.slug }));
}

export default async function CardPage({
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
      <Suspense fallback={<div className="mx-auto max-w-5xl px-6 py-14" />}>
        <NgscCardResult leader={leader} />
      </Suspense>
      <SiteFooter />
    </div>
  );
}
