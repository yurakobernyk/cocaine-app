"use client";

import { asset } from '@/lib/asset';

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeTabBar, type TabId } from "@/components/home/HomeTabBar";
import { HomeCards } from "@/components/home/HomeCards";
import { useAppStore } from "@/store/app.store";

const panelVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 340, damping: 28 },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18 } },
};

function PlaceholderPanel({ title }: { title: string }) {
  return (
    <div className="flex h-[400px] items-center justify-center">
      <p className="text-body-lg text-m2-text-secondary">{title} — kommer snart</p>
    </div>
  );
}

export default function M2HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const { profile } = useAppStore();
  const contentRef = useRef<HTMLDivElement>(null);

  function handleTabChange(tab: TabId) {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    setActiveTab(tab);
  }

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden"
      style={{ background: "#eef8ef" }}
    >
      {/* Texture bg */}
      <img
        src={asset("/figma-assets/texture-bg.png")}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 0.5, mixBlendMode: "multiply" }}
      />

      {/* Scrollable content */}
      <div
        ref={contentRef}
        className="absolute inset-0 overflow-y-auto"
        style={{ paddingTop: 200, paddingBottom: 108 }}
      >
        {/* Greeting — Figma: gap-[4px], px-[24px] py-[16px] */}
        <div className="flex flex-col gap-1 px-6 py-4">
          <p className="text-[17px] font-semibold leading-6 text-[#525252]">
            Hei, {profile.name}!
          </p>
          <h1 className="text-[34px] font-bold leading-10 tracking-[-0.5px] text-[#151515]">
            Positiv i dag
          </h1>
        </div>

        {/* Tab panels */}
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "home" && (
            <motion.div
              key="home"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <HomeCards />
            </motion.div>
          )}
          {activeTab === "diary" && (
            <motion.div
              key="diary"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PlaceholderPanel title="Dagbok" />
            </motion.div>
          )}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <PlaceholderPanel title="Oversikt" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Header — pointer-events-none wrapper, buttons inside re-enable */}
      <HomeHeader />

      {/* Tab bar — interactive overlay on bottom */}
      <div className="pointer-events-auto">
        <HomeTabBar active={activeTab} onChange={handleTabChange} />
      </div>
    </div>
  );
}
