/**
 * GlassSurface — reusable glass morphism wrapper.
 *
 * Tap feedback uses opacity instead of scale.
 * scale + backdrop-filter causes browser to re-composite the backdrop
 * on every animation frame, producing visible flickering.
 */
"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

interface GlassSurfaceProps extends HTMLMotionProps<"div"> {
  variant?: "card" | "pill";
  /** Extra border style (e.g. crisis card) */
  border?: string;
  /** Disable tap animation */
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
      whileTap={noTap ? undefined : { opacity: 0.7 }}
      transition={{ duration: 0.1 }}
      className={`relative overflow-hidden shadow-[0px_8px_40px_0px_rgba(0,0,0,0.08)] ${className}`}
      style={{
        borderRadius: r,
        border: border ?? undefined,
        ...style,
      }}
      {...rest}
    >
      {/* Glass overlay layer */}
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
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
