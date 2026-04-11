import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const isDev = process.env.NODE_ENV === "development";
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repo = "cocaine-app";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  images: { unoptimized: true },

  // Static export only for GitHub Pages — Vercel uses native Next.js server
  ...(isGitHubPages && {
    output: "export",
    trailingSlash: true,
    basePath: `/${repo}`,
    assetPrefix: `/${repo}/`,
  }),
};

export default isDev
  ? nextConfig
  : withPWA({
      dest: "public",
      cacheOnFrontEndNav: true,
      aggressiveFrontEndNavCaching: true,
      reloadOnOnline: true,
      disable: false,
    })(nextConfig);
