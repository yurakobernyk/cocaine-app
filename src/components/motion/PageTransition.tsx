"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Apple-style page transition.
 *
 * Uses only transform (x/y) + opacity — NO filter/blur.
 * Blur animations are not GPU-composited and cause full-screen repaints,
 * especially destructive when the page contains backdrop-filter elements.
 *
 * Completion transition (onboarding → home): gentle upward reveal.
 */

const ease = [0.16, 1, 0.3, 1] as const;
const easeIn = [0.4, 0, 1, 0.6] as const;

function makeVariants(dir: number) {
  return {
    initial: {
      x: dir >= 0 ? 36 : -36,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.38, ease },
    },
    exit: {
      x: dir >= 0 ? -24 : 24,
      opacity: 0,
      transition: { duration: 0.18, ease: easeIn },
    },
  };
}

/** Completion variant — onboarding → home: screen rises and settles */
const completionVariants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.16 },
  },
};

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

  const prevPath = prevPathRef.current;
  const prevDepth = getDepth(prevPath);
  const currDepth = getDepth(pathname);

  const dir = currDepth >= prevDepth ? 1 : -1;

  const isCompletion = prevPath === "/m2/onboarding" && pathname === "/m2/home";

  if (prevPathRef.current !== pathname) {
    prevPathRef.current = pathname;
  }

  const variants = isCompletion ? completionVariants : makeVariants(dir);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ position: "absolute", inset: 0, willChange: "transform, opacity" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
