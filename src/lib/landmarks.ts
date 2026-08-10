/**
 * State landmark photos — multiple variants per jurisdiction so different users
 * can see slightly different images. Keyed to fictional leader jurisdictions.
 * All Unsplash images: no human faces, public spaces only.
 */
export const STATE_LANDMARK_VARIANTS: Record<string, string[]> = {
  "Enugu State": [
    "https://images.unsplash.com/photo-1580777361964-27e9cdd2f838?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1580893246395-52aead8960dc?auto=format&fit=crop&w=1400&q=80",
  ],
  "Lagos West": [
    "https://images.unsplash.com/photo-1618396583029-58e03a25d1c5?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=80",
  ],
  "Yola North, Adamawa": [
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1531256456869-ce942a665e80?auto=format&fit=crop&w=1400&q=80",
  ],
  "FCT Abuja": [
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1400&q=80",
  ],
};

// Fallback pool — urban/civic Nigerian-context scenes
const FALLBACK: string[] = [
  "https://images.unsplash.com/photo-1618396583029-58e03a25d1c5?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80",
];

/**
 * Return a single landmark URL for a jurisdiction.
 * `variant` (0–2) lets different users get different photos.
 */
export function getLandmark(jurisdiction: string, variant = 0): string {
  const pool = STATE_LANDMARK_VARIANTS[jurisdiction] ?? FALLBACK;
  return pool[variant % pool.length];
}

/**
 * Deterministic variant index from a user-session seed string
 * (e.g. leader slug + question id). Spreads users across available photos.
 */
export function landmarkVariant(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % 3;
}
