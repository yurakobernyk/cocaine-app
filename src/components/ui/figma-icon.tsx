/**
 * FigmaIcon — renders a Figma-exported SVG/PNG at exact pixel size.
 *
 * Figma exports SVGs with `width="100%" height="100%"` and no
 * preserveAspectRatio, which causes distortion when placed in arbitrary
 * containers. This component always renders the asset at the explicit
 * `size` in pixels with `object-contain` so proportions are always correct.
 */
interface FigmaIconProps {
  /** Asset URL or path (use asset() helper for GitHub Pages compat) */
  src: string;
  /** Render size in pixels (both width and height). Default: 20 */
  size?: number;
  /** Override width independently */
  width?: number;
  /** Override height independently */
  height?: number;
  alt?: string;
  className?: string;
}

export function FigmaIcon({
  src,
  size = 20,
  width,
  height,
  alt = "",
  className = "",
}: FigmaIconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <img
      src={src}
      alt={alt}
      className={`block flex-shrink-0 object-contain ${className}`}
      style={{ width: w, height: h, minWidth: w, minHeight: h }}
    />
  );
}
