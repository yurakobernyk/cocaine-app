"use client";

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
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring" as const, stiffness: 320, damping: 28 },
  },
};

function IconWrap({ src, variant = "green" }: { src: string; variant?: "green" | "peach" }) {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
      style={{ background: variant === "green" ? "#b2e8d4" : "#ffc8be" }}
    >
      <img src={src} width={20} height={20} alt="" />
    </div>
  );
}

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
      className={`glass-card relative overflow-hidden rounded-3xl p-3 ${className}`}
      style={style}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
}

export function HomeCards() {
  const { getElapsedMs, getSavingsKr, quitTimestamp } = useTimerStore();
  const [elapsed, setElapsed] = useState("7d 3h 45min");
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
      {/* Notification pill — full width */}
      <GlassCard className="w-full flex-row items-center gap-3 rounded-full px-4 py-3 flex">
        <IconWrap src="/figma-assets/6fbbe58b9e2abe6773e8a9a168fb615c45b3e4e2.svg" />
        <p className="text-body-sm-med text-m2-text-primary flex-1">
          7 dager til slutt — du er klar!
        </p>
      </GlassCard>

      {/* Countdown card */}
      <GlassCard className="flex flex-col justify-between" style={{ flex: "1 0 160px", height: 156 }}>
        <div className="flex items-center gap-2">
          <IconWrap src="/figma-assets/f239ebbe4745f8a38ad08845145e200552274e47.svg" />
          <span className="text-body-sm-med text-m2-text-secondary">Nedtelling</span>
        </div>
        <div>
          <p className="text-[22px] font-bold text-m2-text-primary leading-tight">{elapsed}</p>
          <p className="text-body-sm text-m2-text-secondary mt-0.5">Sluttdato: 8 april 2026</p>
        </div>
      </GlassCard>

      {/* Savings card */}
      <GlassCard className="flex flex-col justify-between" style={{ flex: "1 0 160px", height: 156 }}>
        <div className="flex items-center gap-2">
          <IconWrap src="/figma-assets/03ce0458e9c800a63cc5d1d22fa7f86edd09c97a.svg" />
          <span className="text-body-sm-med text-m2-text-secondary">Sparing</span>
        </div>
        <div>
          <p className="text-[22px] font-bold text-m2-text-primary leading-tight">{savings}</p>
          <p className="text-body-sm text-m2-text-secondary mt-0.5">Denne måneden</p>
        </div>
      </GlassCard>

      {/* Support chat pill */}
      <GlassCard className="w-full flex-row items-center gap-3 rounded-full px-4 py-3 flex">
        <IconWrap src="/figma-assets/ade11edda82cfa2c8283da0dfe43aa50397f908a.svg" />
        <div className="flex-1 min-w-0">
          <p className="text-body-sm-med text-m2-text-primary">Vi er her tirsdager, kl 15–18</p>
          <p className="text-body-sm text-m2-text-secondary truncate">Start en chat når som helst</p>
        </div>
        <img
          src="/figma-assets/310c220ae9bd18328d8929056e4f74ffb5bd4d68.svg"
          width={32} height={32} alt=""
        />
      </GlassCard>

      {/* Crisis calls card */}
      <GlassCard
        className="flex flex-col justify-between"
        style={{
          flex: "1 0 150px",
          height: 164,
          border: "4px solid #f4a090",
        }}
      >
        <div className="flex items-center gap-2">
          <IconWrap src="/figma-assets/735e92bd37d9ecd58bcffb1a206f01bd2bfaa515.svg" variant="peach" />
        </div>
        <div>
          <p className="text-body-lg-med text-m2-text-primary">Krisenummere</p>
          <p className="text-body-sm text-m2-text-secondary mt-0.5">Ring oss 24/7</p>
        </div>
      </GlassCard>

      {/* Program card */}
      <GlassCard
        className="flex flex-col justify-between"
        style={{ flex: "1 0 150px", height: 164 }}
      >
        <div className="flex items-center gap-2">
          <IconWrap src="/figma-assets/5d29fe9d43eea2e08e2122122f882c3c9a949634.svg" />
        </div>
        <div>
          <p className="text-body-lg-med text-m2-text-primary">12-ukersprogrammet</p>
          <p className="text-body-sm text-m2-text-secondary mt-0.5">Uke 2 av 12</p>
        </div>
      </GlassCard>

      {/* Topics pill */}
      <GlassCard className="w-full flex-row items-center gap-3 rounded-full px-4 py-3 flex">
        <IconWrap src="/figma-assets/60e140974634945ca66d55e755751f5883f9679e.svg" />
        <p className="text-body-sm-med text-m2-text-primary flex-1">
          Dagens tema: Trigger-situasjoner
        </p>
      </GlassCard>
    </motion.div>
  );
}
