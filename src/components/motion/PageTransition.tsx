"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * iOS-style spring page transition.
 * Forward:  slide in from right (x: 40px → 0, opacity 0 → 1)
 * Back:     slide in from left  (x: -40px → 0, opacity 0 → 1)
 * Direction is inferred from a simple depth heuristic on the path.
 */

const spring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
  mass: 0.9,
};

const variants = {
  initial: (dir: number) => ({
    x: dir > 0 ? "40%" : "-40%",
    opacity: 0,
    scale: 0.97,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: spring,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-40%" : "40%",
    opacity: 0,
    scale: 0.97,
    transition: { ...spring, stiffness: 300, damping: 28 },
  }),
};

/** Depth map — higher = deeper in nav stack */
const DEPTH: Record<string, number> = {
  "/":               0,
  "/m1":             1,
  "/m2":             1,
  "/m3":             1,
  "/m2/onboarding":  2,
  "/m2/home":        3,
};

function getDepth(path: string) {
  return DEPTH[path] ?? path.split("/").filter(Boolean).length;
}

interface Props {
  children: React.ReactNode;
}

export function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const depth = getDepth(pathname);

  return (
    <AnimatePresence mode="popLayout" custom={depth} initial={false}>
      <motion.div
        key={pathname}
        custom={depth}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute inset-0 will-change-transform"
        style={{ originX: 0.5, originY: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
