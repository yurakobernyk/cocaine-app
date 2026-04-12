"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { asset } from "@/lib/asset";
import { useTimerStore } from "@/store/timer.store";
import { formatDuration, formatNOK } from "@/lib/utils";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { IconBadge } from "@/components/ui/icon-badge";
import { GlassSurface } from "@/components/ui/glass-surface";
import { ProgressBar } from "@/components/ui/progress-bar";

/* ─── Stagger container animation ───────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.14 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 240, damping: 26, mass: 0.9 },
  },
};

/* ─── Icon asset paths ───────────────────────────────────────────────────── */
const I = {
  bell:    asset("/figma-assets/icon-bell.svg"),
  clock:   asset("/figma-assets/icon-clock.svg"),
  coins:   asset("/figma-assets/icon-coins.svg"),
  chat:    asset("/figma-assets/icon-chat.svg"),
  chevron: asset("/figma-assets/icon-chevron-right.svg"),
  phone:   asset("/figma-assets/icon-phone.svg"),
  program: asset("/figma-assets/icon-program.svg"),
  pencil:  asset("/figma-assets/icon-pencil.svg"),
};

/* ─── Card wrappers with animation ──────────────────────────────────────── */
function AnimCard({ children, style, className = "" }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <motion.div variants={cardAnim} className={`contents ${className}`} style={style}>
      {children}
    </motion.div>
  );
}

export function HomeCards() {
  const { getElapsedMs, getSavingsKr, quitTimestamp } = useTimerStore();
  const [elapsed, setElapsed] = useState("7d  3h  45min");
  const [savings, setSavings] = useState("12 640 kr");

  /* Live tick every minute */
  useEffect(() => {
    if (!quitTimestamp) return;
    const tick = () => {
      setElapsed(formatDuration(getElapsedMs()));
      setSavings(formatNOK(getSavingsKr()));
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [quitTimestamp, getElapsedMs, getSavingsKr]);

  return (
    <motion.div
      className="flex flex-wrap gap-4 p-4"
      variants={container}
      initial="hidden"
      animate="show"
    >

      {/* ── 1. Notification pill (full width) ────────────────────────── */}
      <motion.div variants={cardAnim} className="w-full">
        <GlassSurface variant="pill" noTap className="w-full">
          <div className="flex items-center gap-2 p-3">
            <IconBadge src={I.bell} />
            {/* Body LG — 16px Regular */}
            <p className="flex-1 text-[16px] font-normal leading-6 text-[#151515]">
              7 dager til slutt — du er klar!
            </p>
          </div>
        </GlassSurface>
      </motion.div>

      {/* ── 2. Countdown card ────────────────────────────────────────── */}
      <motion.div variants={cardAnim} style={{ flex: "1 0 0", minWidth: 176 }}>
        <GlassSurface variant="card" noTap className="w-full" style={{ height: 156 }}>
          <div className="flex h-full flex-col justify-between p-3">
            {/* title row */}
            <div className="flex items-center gap-2">
              <IconBadge src={I.clock} />
              {/* Body SM Medium — 14px */}
              <span className="text-[14px] font-medium leading-5 text-[#0e1e18]">
                Nedtelling
              </span>
            </div>
            {/* value block */}
            <div className="flex flex-col gap-2">
              {/* Display SM — 24px Bold, tracking -0.2 */}
              <p className="text-[24px] font-bold leading-8 tracking-[-0.2px] text-[#2a5040] whitespace-pre-wrap">
                {elapsed}
              </p>
              <p className="text-[14px] font-normal leading-5 text-[#0e1e18]">
                Sluttdato: 8 april 2026
              </p>
            </div>
          </div>
        </GlassSurface>
      </motion.div>

      {/* ── 3. Savings card ──────────────────────────────────────────── */}
      <motion.div variants={cardAnim} style={{ flex: "1 0 0", minWidth: 176 }}>
        <GlassSurface variant="card" noTap className="w-full" style={{ height: 156 }}>
          <div className="flex h-full flex-col justify-between p-3">
            <div className="flex items-center gap-2">
              <IconBadge src={I.coins} />
              <span className="text-[14px] font-medium leading-5 text-[#0e1e18]">
                Sparing
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[24px] font-bold leading-8 tracking-[-0.2px] text-[#2a5040]">
                {savings}
              </p>
              <p className="text-[14px] font-normal leading-5 text-[#0e1e18]">
                Denne måneden
              </p>
            </div>
          </div>
        </GlassSurface>
      </motion.div>

      {/* ── 4. Support chat pill ─────────────────────────────────────── */}
      <motion.div variants={cardAnim} className="w-full">
        <GlassSurface variant="pill" noTap className="w-full">
          {/* Figma: px-[16px] py-[12px] */}
          <div className="flex items-center gap-2 px-4 py-3">
            <IconBadge src={I.chat} />
            <div className="flex-1 min-w-0">
              {/* Body LG Medium — 16px */}
              <p className="text-[16px] font-medium leading-6 text-[#151515]">
                Vi er her tirsdager, kl 15–18
              </p>
              {/* Body SM — 14px */}
              <p className="text-[14px] font-normal leading-5 text-[#151515]">
                Start en chat når som helst
              </p>
            </div>
            {/* Chevron — 10×18 viewBox, render proportionally */}
            <div className="flex h-8 w-8 items-center justify-center shrink-0">
              <FigmaIcon src={I.chevron} width={10} height={18} />
            </div>
          </div>
        </GlassSurface>
      </motion.div>

      {/* ── 5. Crisis Calls card — peach border ──────────────────────── */}
      <motion.div variants={cardAnim} style={{ flex: "1 0 0", minWidth: 160 }}>
        <GlassSurface
          variant="card"
          noTap
          border="4px solid #f4a090"
          className="w-full"
          style={{ height: 164 }}
        >
          <div className="flex h-full flex-col justify-between p-3">
            <div className="flex items-center gap-2">
              <IconBadge src={I.phone} variant="peach" />
              <span className="flex-1 text-[14px] font-medium leading-5 text-[#0e1e18]">
                Krisenummere
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {/* Display MD — 28px Bold, tracking -0.3 */}
              <p className="text-[28px] font-bold leading-9 tracking-[-0.3px] text-[#0e1e18]">
                4
              </p>
              <ProgressBar fillPct={8.56} trackColor="#ffc8be" fillColor="#d84830" />
              <p className="text-[14px] font-normal leading-5 text-[#0e1e18]">
                Sist: 3 april, 13:45
              </p>
            </div>
          </div>
        </GlassSurface>
      </motion.div>

      {/* ── 6. Program card ──────────────────────────────────────────── */}
      <motion.div variants={cardAnim} style={{ flex: "1 0 0", minWidth: 160 }}>
        <GlassSurface variant="card" noTap className="w-full" style={{ height: 164 }}>
          <div className="flex h-full flex-col justify-between p-3">
            <div className="flex items-center gap-2">
              <IconBadge src={I.program} />
              <span className="flex-1 text-[14px] font-medium leading-5 text-[#0e1e18]">
                Program
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {/* Display MD — 28px Bold */}
              <p className="text-[28px] font-bold leading-9 tracking-[-0.3px] text-[#075450]">
                1%
              </p>
              <ProgressBar fillPct={8.56} trackColor="#88d8ce" fillColor="#0a7268" />
              <p className="text-[14px] font-normal leading-5 text-[#0e1e18]">
                Startdato: 3 april 2026, Uke 1 av 12
              </p>
            </div>
          </div>
        </GlassSurface>
      </motion.div>

      {/* ── 7. Topics of the day pill ────────────────────────────────── */}
      <motion.div variants={cardAnim} className="w-full">
        <GlassSurface variant="pill" noTap className="w-full">
          <div className="flex items-center gap-2 px-4 py-3">
            <IconBadge src={I.pencil} />
            <div className="flex-1 min-w-0">
              <p className="text-[16px] font-medium leading-6 text-[#151515]">
                Dagens tema
              </p>
              <p className="text-[14px] font-normal leading-5 text-[#151515]">
                Hva brakte deg hit i dag?
              </p>
            </div>
          </div>
        </GlassSurface>
      </motion.div>

    </motion.div>
  );
}
