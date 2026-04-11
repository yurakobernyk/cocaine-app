"use client";

import { asset } from "@/lib/asset";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTimerStore } from "@/store/timer.store";
import { formatDuration, formatNOK } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const card = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 28 },
  },
};

/** Circular icon badge */
function IconBadge({
  src,
  variant = "green",
}: {
  src: string;
  variant?: "green" | "peach";
}) {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full overflow-hidden"
      style={{ background: variant === "green" ? "#b2e8d4" : "#ffc8be" }}
    >
      <img src={src} width={20} height={20} alt="" />
    </div>
  );
}

/** Progress bar: two-layer track + fill */
function ProgressBar({
  fillPct,
  trackColor,
  fillColor,
}: {
  fillPct: number;
  trackColor: string;
  fillColor: string;
}) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full" style={{ background: trackColor }}>
      <div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ width: `${fillPct}%`, background: fillColor }}
      />
    </div>
  );
}

/** Wrapper card with glass morphism — matches Figma glass overlay */
function GlassCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      variants={card}
      className={`relative overflow-hidden rounded-3xl shadow-[0px_8px_40px_0px_rgba(0,0,0,0.08)] ${className}`}
      style={style}
      whileTap={{ scale: 0.97 }}
    >
      {/* glass overlay — mix-blend-screen as in Figma */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(15px)",
          mixBlendMode: "screen",
        }}
      />
      {/* content sits above overlay */}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
}

/** Pill-shaped full-width card */
function GlassPill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={card}
      className={`relative w-full overflow-hidden rounded-full shadow-[0px_8px_40px_0px_rgba(0,0,0,0.08)] ${className}`}
      whileTap={{ scale: 0.97 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(15px)",
          mixBlendMode: "screen",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function HomeCards() {
  const { getElapsedMs, getSavingsKr, quitTimestamp } = useTimerStore();
  const [elapsed, setElapsed] = useState("7d  3h  45min");
  const [savings, setSavings] = useState("12 640 kr");

  // Live tick every minute
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
      {/* ── 1. Notification pill ───────────────────────────────────── */}
      <GlassPill>
        <div className="flex items-center gap-2 p-3">
          <IconBadge src={asset("/figma-assets/6fbbe58b9e2abe6773e8a9a168fb615c45b3e4e2.svg")} />
          <p className="flex-1 text-[16px] font-normal leading-6 text-[#151515]">
            7 dager til slutt — du er klar!
          </p>
        </div>
      </GlassPill>

      {/* ── 2. Countdown card ─────────────────────────────────────── */}
      <GlassCard
        className="flex-[1_0_0] min-w-[176px]"
        style={{ height: 156 }}
      >
        <div className="flex h-full flex-col justify-between p-3">
          {/* title row */}
          <div className="flex items-center gap-2">
            <IconBadge src={asset("/figma-assets/f239ebbe4745f8a38ad08845145e200552274e47.svg")} />
            <span className="text-[14px] font-medium leading-5 text-[#0e1e18]">Nedtelling</span>
          </div>
          {/* value + date */}
          <div className="flex flex-col gap-2">
            <p className="text-[24px] font-bold leading-8 tracking-[-0.2px] text-[#2a5040]">
              {elapsed}
            </p>
            <p className="text-[14px] font-normal leading-5 text-[#0e1e18]">
              Sluttdato: 8 april 2026
            </p>
          </div>
        </div>
      </GlassCard>

      {/* ── 3. Savings card ───────────────────────────────────────── */}
      <GlassCard
        className="flex-[1_0_0] min-w-[176px]"
        style={{ height: 156 }}
      >
        <div className="flex h-full flex-col justify-between p-3">
          {/* title row */}
          <div className="flex items-center gap-2">
            <IconBadge src={asset("/figma-assets/03ce0458e9c800a63cc5d1d22fa7f86edd09c97a.svg")} />
            <span className="text-[14px] font-medium leading-5 text-[#0e1e18]">Sparing</span>
          </div>
          {/* value + period */}
          <div className="flex flex-col gap-2">
            <p className="text-[24px] font-bold leading-8 tracking-[-0.2px] text-[#2a5040]">
              {savings}
            </p>
            <p className="text-[14px] font-normal leading-5 text-[#0e1e18]">
              Denne måneden
            </p>
          </div>
        </div>
      </GlassCard>

      {/* ── 4. Support chat pill ──────────────────────────────────── */}
      <GlassPill>
        <div className="flex items-center gap-2 px-4 py-3">
          <IconBadge src={asset("/figma-assets/ade11edda82cfa2c8283da0dfe43aa50397f908a.svg")} />
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-medium leading-6 text-[#151515]">
              Vi er her tirsdager, kl 15–18
            </p>
            <p className="text-[14px] font-normal leading-5 text-[#151515]">
              Start en chat når som helst
            </p>
          </div>
          {/* chevron */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center">
            <img
              src={asset("/figma-assets/310c220ae9bd18328d8929056e4f74ffb5bd4d68.svg")}
              width={32}
              height={32}
              alt=""
            />
          </div>
        </div>
      </GlassPill>

      {/* ── 5. Crisis Calls card ──────────────────────────────────── */}
      <GlassCard
        className="flex-[1_0_0] min-w-[160px]"
        style={{
          height: 164,
          border: "4px solid #f4a090",
          borderRadius: "24px",
        }}
      >
        <div className="flex h-full flex-col justify-between p-3">
          {/* title row */}
          <div className="flex items-center gap-2">
            <IconBadge
              src={asset("/figma-assets/735e92bd37d9ecd58bcffb1a206f01bd2bfaa515.svg")}
              variant="peach"
            />
            <span className="flex-1 text-[14px] font-medium leading-5 text-[#0e1e18]">
              Krisenummere
            </span>
          </div>
          {/* big number + progress + date */}
          <div className="flex flex-col gap-2">
            <p className="text-[28px] font-bold leading-9 tracking-[-0.3px] text-[#0e1e18]">
              4
            </p>
            <ProgressBar fillPct={8.56} trackColor="#ffc8be" fillColor="#d84830" />
            <p className="text-[14px] font-normal leading-5 text-[#0e1e18]">
              Sist: 3 april, 13:45
            </p>
          </div>
        </div>
      </GlassCard>

      {/* ── 6. Program card ───────────────────────────────────────── */}
      <GlassCard
        className="flex-[1_0_0] min-w-[160px]"
        style={{ height: 164 }}
      >
        <div className="flex h-full flex-col justify-between p-3">
          {/* title row */}
          <div className="flex items-center gap-2">
            <IconBadge src={asset("/figma-assets/5d29fe9d43eea2e08e2122122f882c3c9a949634.svg")} />
            <span className="flex-1 text-[14px] font-medium leading-5 text-[#0e1e18]">
              Program
            </span>
          </div>
          {/* percentage + progress + date */}
          <div className="flex flex-col gap-2">
            <p className="text-[28px] font-bold leading-9 tracking-[-0.3px] text-[#075450]">
              1%
            </p>
            <ProgressBar fillPct={8.56} trackColor="#88d8ce" fillColor="#0a7268" />
            <p className="text-[14px] font-normal leading-5 text-[#0e1e18]">
              Startdato: 3 april 2026, Uke 1 av 12
            </p>
          </div>
        </div>
      </GlassCard>

      {/* ── 7. Topics pill ────────────────────────────────────────── */}
      <GlassPill>
        <div className="flex items-center gap-2 px-4 py-3">
          <IconBadge src={asset("/figma-assets/60e140974634945ca66d55e755751f5883f9679e.svg")} />
          <div className="flex-1 min-w-0">
            <p className="text-[16px] font-medium leading-6 text-[#151515]">
              Dagens tema
            </p>
            <p className="text-[14px] font-normal leading-5 text-[#151515]">
              Hva brakte deg hit i dag?
            </p>
          </div>
        </div>
      </GlassPill>
    </motion.div>
  );
}
