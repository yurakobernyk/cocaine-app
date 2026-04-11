"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TabId = "home" | "diary" | "overview";

const tabs: { id: TabId; label: string; icon: string }[] = [
  {
    id: "home",
    label: "Hjem",
    icon: "/figma-assets/0b207b2de6c724dcb234ad2e5086cebcf653980c.svg",
  },
  {
    id: "diary",
    label: "Dagbok",
    icon: "/figma-assets/48b5d3b5fac4485b433c713d6019fdb3c77e52c2.svg",
  },
  {
    id: "overview",
    label: "Oversikt",
    icon: "/figma-assets/d537fca5e6ecf14a6bfe0fd2435cb9d37ecefe27.svg",
  },
];

const spring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.8,
};

interface Props {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export function HomeTabBar({ active, onChange }: Props) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const btn = tabRefs.current[active];
    const container = containerRef.current;
    if (!btn || !container) return;

    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    setIndicatorStyle({
      left: bRect.left - cRect.left,
      width: bRect.width,
    });
  }, [active]);

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 flex items-center gap-4 px-5 pb-7 pt-3">
      {/* Pill tab row */}
      <div
        ref={containerRef}
        role="tablist"
        className="relative flex flex-1 items-center rounded-full bg-white/60 p-1 shadow-xl backdrop-blur-2xl"
      >
        {/* Sliding indicator */}
        <motion.div
          className="absolute top-1 bottom-1 rounded-full bg-white shadow-md"
          animate={indicatorStyle}
          transition={spring}
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />

        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[tab.id] = el; }}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative z-10 flex flex-1 flex-col items-center gap-0.5 py-2 transition-colors",
              active === tab.id ? "text-[#0a7268]" : "text-[#7a9e94]"
            )}
          >
            <motion.div
              whileTap={{ scale: 0.82 }}
              transition={spring}
            >
              <img src={tab.icon} width={28} height={28} alt="" />
            </motion.div>
            <span className="text-label-xs">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* SOS button */}
      <motion.button
        aria-label="SOS — Kriseknapp"
        whileTap={{ scale: 0.88 }}
        transition={spring}
        className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full shadow-lg"
        style={{ background: "#ed3516" }}
      >
        <img
          src="/figma-assets/5628fd724b87c53d1a2f4f1a7e21929c5ebf91d9.svg"
          width={28}
          height={28}
          alt=""
        />
      </motion.button>
    </div>
  );
}
