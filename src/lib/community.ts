// Community Pulse - client-side storage utilities
// All entries are anonymous. No personal data stored.

export interface CommunityEntry {
  id: string;
  leaderName: string;
  leaderSlug: string;
  leaderRole: string;
  score: number;
  grade: string;
  verdict: string;
  mode: "cruise" | "taxpayer";
  handle: string;
  caption?: string;
  timestamp: number;
}

const STORAGE_KEY = "ngsc-community-feed";
const HANDLE_KEY  = "ngsc-anon-handle";

function randomHandle(): string {
  return `User_${Math.floor(1000 + Math.random() * 9000)}`;
}

export function getOrCreateHandle(): string {
  if (typeof window === "undefined") return "User_0000";
  const stored = localStorage.getItem(HANDLE_KEY);
  if (stored) return stored;
  const h = randomHandle();
  localStorage.setItem(HANDLE_KEY, h);
  return h;
}

export function getFeed(): CommunityEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function postToFeed(entry: Omit<CommunityEntry, "id" | "handle" | "timestamp">): CommunityEntry {
  const feed = getFeed();
  const handle = getOrCreateHandle();
  const newEntry: CommunityEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    handle,
    timestamp: Date.now(),
  };
  // Prepend; cap at 200 entries
  const updated = [newEntry, ...feed].slice(0, 200);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newEntry;
}

export function updateCaption(id: string, caption: string): void {
  const feed = getFeed();
  const updated = feed.map((e) => (e.id === id ? { ...e, caption } : e));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
