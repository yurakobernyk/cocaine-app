"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Apple-style page transition.
 *
 * Standard navigation (push/pop): subtle horizontal offset + opacity + blur.
 * Feels like one cohesive surface shifting — not a mechanical slide.
 *
 * Completion transition (onboarding → home): gentle upward reveal with fade.
 * Marks the "arrival" moment — the home screen materialises from below.
 */

const ease = [0.16, 1, 0.3, 1] as const;
const easeOut = [0.4, 0, 0.2, 1] as const;
const easeIn = [0.4, 0, 1, 0.6] as const;

function makeVariants(dir: number) {
  return {
    initial: {
      x: dir >= 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(6px)",
    },
    animate: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.42, ease },
    },
    exit: {
      x: dir >= 0 ? -28 : 28,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.2, ease: easeIn },
    },
  };
}

/** Completion variant — onboarding → home: screen gently rises and settles */
const completionVariants = {
  initial: {
    opacity: 0,
    y: 28,
    scale: 0.97,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.52,
      ease,
      opacity: { duration: 0.38 },
      filter: { duration: 0.38 },
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.98,
    filter: "blur(4px)",
    transition: { duration: 0.22, ease: easeOut },
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

  // Detect the special completion moment: onboarding → home
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
          className="absolute inset-0 will-change-transform"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
