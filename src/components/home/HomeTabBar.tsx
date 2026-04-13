"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { asset } from "@/lib/asset";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { cn } from "@/lib/utils";

export type TabId = "home" | "diary" | "overview";

/* ─── Tab definitions ────────────────────────────────────────────────────── */
const TABS: { id: TabId; label: string; icon: string; w: number; h: number }[] = [
  {
    id: "home",
    label: "Home",
    icon: asset("/figma-assets/tab-home.svg"),
    // viewBox 23.0×23.86 — render at natural proportions inside 28×28 space
    w: 23,
    h: 24,
  },
  {
    id: "diary",
    label: "Diary",
    icon: asset("/figma-assets/tab-diary.svg"),
    // viewBox 23×25.33
    w: 22,
    h: 24,
  },
  {
    id: "overview",
    label: "Overview",
    icon: asset("/figma-assets/tab-overview.svg"),
    // viewBox 25.35×25.33 — nearly square
    w: 24,
    h: 24,
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
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  /* Recompute sliding pill position — useLayoutEffect prevents initial flash at 0,0 */
  useLayoutEffect(() => {
    const btn = tabRefs.current[active];
    const wrap = containerRef.current;
    if (!btn || !wrap) return;
    const wRect = wrap.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    setIndicator({ left: bRect.left - wRect.left, width: bRect.width });
  }, [active]);

  return (
    /*
     * Figma: absolute bottom-0, gap-[32px] px-[32px] pb-[24px] pt-[16px]
     * Tab bar container + SOS button row
     */
    <div className="absolute inset-x-0 bottom-0 z-40 flex items-center gap-8 px-8 pb-6 pt-4">

      {/* ── Pill tab row ── */}
      <div
        ref={containerRef}
        role="tablist"
        aria-label="Navigation"
        /* Figma: backdrop-blur-[15px], bg white/80, shadow */
        className="relative flex flex-1 items-center rounded-full p-1"
        style={{
          background: "rgba(255,255,255,0.80)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12)",
        }}
      >
        {/* Sliding white pill indicator */}
        <motion.div
          className="absolute top-1 bottom-1 rounded-full bg-white shadow-md"
          animate={indicator}
          transition={spring}
          style={indicator}
        />

        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[tab.id] = el; }}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative z-10 flex flex-1 flex-col items-center gap-0.5 py-1.5 transition-colors",
                isActive ? "text-[#0a7268]" : "text-[#151515]"
              )}
            >
              {/* Tab icon — 28×28 container, proportional icon inside */}
              <div className="flex h-7 w-7 items-center justify-center">
                <FigmaIcon src={tab.icon} width={tab.w} height={tab.h} />
              </div>
              {/* Label XS — 11px Medium, tracking 0.3px */}
              <span className="text-[11px] font-medium leading-4 tracking-[0.3px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── SOS button ── */}
      {/*
       * Figma: size-[60px], bg #ed3516, p-[4px], rounded-full
       * Icon: 28×28 inside, viewBox 18.33×18.33 (near square)
       */}
      <motion.button
        aria-label="SOS — Crisis button"
        whileTap={{ scale: 0.88 }}
        transition={spring}
        className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]"
        style={{ background: "#ed3516", padding: 4 }}
      >
        {/* SOS plus icon — viewBox 18.33×18.33 */}
        <FigmaIcon
          src={asset("/figma-assets/sos-plus.svg")}
          width={28}
          height={28}
        />
      </motion.button>
    </div>
  );
}
