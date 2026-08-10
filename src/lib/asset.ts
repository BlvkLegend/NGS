/**
 * Prefix an internal route with the runtime basePath so navigation works on
 * both localhost (basePath="") and GitHub Pages project sites (/repo-name).
 */
export function route(path: string): string {
  const base =
    typeof process !== "undefined"
      ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "")
      : "";
  return `${base}${path}`;
}

/**
 * Prefix a public-folder path with the runtime basePath so images work on
 * both localhost (basePath="") and GitHub Pages (basePath="/repo-name").
 *
 * next/image with unoptimized:true in a static export does NOT auto-apply
 * basePath, so we do it here. Pass every /public asset path through this.
 */
export function asset(path: string): string {
  const base =
    typeof process !== "undefined"
      ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "")
      : "";
  return `${base}${path}`;
}
