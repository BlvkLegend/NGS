import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Maps a 0-100 governance score to a letter grade, matching the ledger's scoring rubric. */
export function scoreToGrade(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 40) return "D";
  return "F";
}

export function scoreToSignal(score: number): "good" | "mid" | "low" {
  if (score >= 65) return "good";
  if (score >= 45) return "mid";
  return "low";
}
