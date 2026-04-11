/**
 * Prefix public assets with basePath for GitHub Pages compatibility.
 * In dev basePath is "", in production it's "/cocaine-app".
 */
const BASE =
  typeof window !== "undefined"
    ? "" // runtime: Next.js router already handles this
    : "";

// Used at build time via next.config basePath — Next.js Image handles it.
// For plain <img> tags we need this helper.
export const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}

export function figmaAsset(filename: string): string {
  return asset(`/figma-assets/${filename}`);
}
