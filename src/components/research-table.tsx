"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Download } from "lucide-react";
import { leaders } from "@/lib/data";
import { scoreToGrade } from "@/lib/utils";
import { PaywallModal } from "@/components/paywall-modal";

type Column =
  | "name"
  | "role"
  | "jurisdiction"
  | "score"
  | "grade"
  | "evaluations"
  | "trend";

const COLUMNS: { key: Column; label: string }[] = [
  { key: "name", label: "Official" },
  { key: "role", label: "Office" },
  { key: "jurisdiction", label: "Jurisdiction" },
  { key: "score", label: "Score" },
  { key: "grade", label: "Grade" },
  { key: "evaluations", label: "Evaluations" },
  { key: "trend", label: "Trend" },
];

export function ResearchTable() {
  const [showPaywall, setShowPaywall] = useState(false);
  const [sortKey, setSortKey] = useState<Column>("score");
  const [sortDesc, setSortDesc] = useState(true);

  const rows = useMemo(() => {
    const data = leaders.map((l) => ({
      ...l,
      grade: scoreToGrade(l.score),
    }));

    return data.sort((a, b) => {
      let cmp = 0;

      if (sortKey === "score" || sortKey === "evaluations") {
        cmp = a[sortKey] - b[sortKey];
      } else {
        cmp = String(a[sortKey]).localeCompare(String(b[sortKey]));
      }

      return sortDesc ? -cmp : cmp;
    });
  }, [sortKey, sortDesc]);

  function toggleSort(key: Column) {
    if (key === sortKey) {
      setSortDesc((d) => !d);
    } else {
      setSortKey(key);
      setSortDesc(true);
    }
  }

  function exportCsv() {
    const header = [
      "Official",
      "Office",
      "Jurisdiction",
      "Party",
      "Score",
      "Grade",
      "Evaluations",
      "Trend",
    ];

    const body = rows.map((r) => [
      r.name,
      r.role,
      r.jurisdiction,
      r.party,
      r.score,
      r.grade,
      r.evaluations,
      r.trend,
    ]);

    const csv = [header, ...body]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ngsc-register-export.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-line pb-4">
        <p className="text-[13px] text-ink-muted">
          {rows.length} officials in the current register
        </p>

        <button
          onClick={() => setShowPaywall(true)}
          className="flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-forest-tint"
        >
          <Download size={14} />
          Download Data
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line-strong">
              {COLUMNS.map((col) => (
                <th key={col.key} className="py-2.5 pr-6">
                  <button
                    onClick={() => toggleSort(col.key)}
                    className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-muted hover:text-ink"
                  >
                    {col.label}

                    <ArrowUpDown
                      size={11}
                      className={
                        sortKey === col.key
                          ? "text-forest-500"
                          : "text-line-strong"
                      }
                    />
                  </button>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr
                key={r.slug}
                className="border-b border-line hover:bg-forest-tint/40"
              >
                <td className="py-3 pr-6">
                  <Link
                    href={`/leaders/${r.slug}`}
                    className="text-[13px] font-medium text-ink hover:underline"
                  >
                    {r.name}
                  </Link>
                </td>

                <td className="py-3 pr-6 text-[13px] text-ink-muted">
                  {r.role}
                </td>

                <td className="py-3 pr-6 text-[13px] text-ink-muted">
                  {r.jurisdiction}
                </td>

                <td className="py-3 pr-6 font-mono text-[13px] text-ink">
                  {r.score}
                </td>

                <td className="py-3 pr-6 font-mono text-[13px] text-ink">
                  {r.grade}
                </td>

                <td className="py-3 pr-6 font-mono text-[13px] text-ink-muted">
                  {r.evaluations.toLocaleString()}
                </td>

                <td className="py-3 pr-6 text-[13px] text-ink-muted capitalize">
                  {r.trend}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPaywall && (
        <PaywallModal onClose={() => setShowPaywall(false)} />
      )}
    </div>
  );
}
