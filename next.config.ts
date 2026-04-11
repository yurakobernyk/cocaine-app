import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const isDev = process.env.NODE_ENV === "development";
const repo = "stoette-next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  output: "export",
  trailingSlash: true,
  // GitHub Pages subdirectory — only apply in production builds
  basePath: process.env.GITHUB_ACTIONS ? `/${repo}` : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? `/${repo}/` : "",
  images: { unoptimized: true },
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
