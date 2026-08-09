import type { NextConfig } from "next";

// When building inside GitHub Actions for a GitHub Pages *project* site
// (username.github.io/REPO-NAME), assets must be served from a base path
// matching the repository name. This is set automatically by the included
// workflow at .github/workflows/deploy.yml — no manual edit needed.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
let basePath = "";
if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  basePath = repo ? `/${repo}` : "";
}

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
