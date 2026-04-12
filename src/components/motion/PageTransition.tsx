"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * iOS-style spring page transition.
 *
 * Tracks previous path depth to decide direction:
 *   Forward (deeper) → new page slides in from right, old exits left
 *   Back    (shallower) → new page slides in from left, old exits right
 *
 * Uses mode="wait" so only one page is ever visible — no overlap.
 */

const spring = {
  type: "spring" as const,
  stiffness: 360,
  damping: 32,
  mass: 0.9,
};

const exitSpring = { ...spring, stiffness: 300, damping: 30 };

function makeVariants(dir: number) {
  return {
    initial: {
      x: dir >= 0 ? "100%" : "-100%",
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: spring,
    },
    exit: {
      x: dir >= 0 ? "-30%" : "30%",
      opacity: 0,
      transition: exitSpring,
    },
  };
}

/** Depth map — higher = deeper in nav stack */
const DEPTH: Record<string, number> = {
  "/":              0,
  "/m1":            1,
  "/m2":            1,
  "/m3":            1,
  "/m2/onboarding": 2,
  "/m2/home":       3,
};

function getDepth(path: string) {
  return DEPTH[path] ?? path.split("/").filter(Boolean).length;
}

interface Props {
  children: React.ReactNode;
}

export function PageTransition({ children }: Props) {
  const pathname = usePathname();
  const prevPathRef = useRef<string>(pathname);

  const prevDepth = getDepth(prevPathRef.current);
  const currDepth = getDepth(pathname);

  // direction: +1 = forward (right), -1 = back (left)
  const dir = currDepth >= prevDepth ? 1 : -1;

  // Update previous path after computing direction
  if (prevPathRef.current !== pathname) {
    prevPathRef.current = pathname;
  }

  const variants = makeVariants(dir);

  return (
    /* overflow-hidden clips the sliding pages cleanly */
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 will-change-transform"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
