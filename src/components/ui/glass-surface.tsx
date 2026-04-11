/**
 * GlassSurface — reusable glass morphism wrapper.
 *
 * Figma spec (node 191-879):
 *   backdrop-blur-[15px], bg-[rgba(255,255,255,0.5)], mix-blend-screen
 *   shadow-[0px_8px_40px_0px_rgba(0,0,0,0.08)]
 *
 * Two variants:
 *   - "card"  → rounded-[24px]
 *   - "pill"  → rounded-full (999px)
 *
 * Used by HomeCards to avoid copy-pasting the glass overlay every time.
 */
"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface GlassSurfaceProps extends HTMLMotionProps<"div"> {
  variant?: "card" | "pill";
  /** Extra border style (e.g. crisis card) */
  border?: string;
  /** Disable tap-scale animation */
  noTap?: boolean;
  children: React.ReactNode;
}

const RADIUS: Record<string, string> = {
  card: "24px",
  pill: "9999px",
};

export function GlassSurface({
  variant = "card",
  border,
  noTap = false,
  className = "",
  style,
  children,
  ...rest
}: GlassSurfaceProps) {
  const r = RADIUS[variant];
  return (
    <motion.div
      whileTap={noTap ? undefined : { scale: 0.97 }}
      className={`relative overflow-hidden shadow-[0px_8px_40px_0px_rgba(0,0,0,0.08)] ${className}`}
      style={{
        borderRadius: r,
        border: border ?? undefined,
        ...style,
      }}
      {...rest}
    >
      {/* Glass overlay layer — mix-blend-screen as in Figma */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: r,
          background: "rgba(255,255,255,0.50)",
          backdropFilter: "blur(15px) saturate(1.4)",
          WebkitBackdropFilter: "blur(15px) saturate(1.4)",
          mixBlendMode: "screen",
        }}
      />
      {/* Content — sits above the glass overlay */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
