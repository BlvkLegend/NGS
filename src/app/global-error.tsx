"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
        <span className="ledger-index text-[12px] text-signal-low">Something went wrong</span>
        <h1 className="mt-4 font-display text-3xl font-medium text-ink">
          The register couldn&apos;t load this page
        </h1>
        <p className="mt-3 max-w-md text-[14px] text-ink-muted">
          This has been logged. Try again, or head back to the homepage.
        </p>
        <button
          onClick={reset}
          className="mt-8 flex items-center gap-2 rounded-full bg-forest-500 px-6 py-3 text-[14px] font-medium text-paper transition-colors hover:bg-forest-700"
        >
          <RotateCcw size={15} /> Try again
        </button>
      </body>
    </html>
  );
}
