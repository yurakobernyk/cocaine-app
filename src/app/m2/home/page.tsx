"use client";

import { asset } from '@/lib/asset';

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeTabBar, type TabId } from "@/components/home/HomeTabBar";
import { HomeCards } from "@/components/home/HomeCards";
import { useAppStore } from "@/store/app.store";

const panelVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

function PlaceholderPanel({ title }: { title: string }) {
  return (
    <div className="flex h-[400px] items-center justify-center">
      <p className="text-body-lg text-m2-text-secondary">{title} — coming soon</p>
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
        <motion.div
          className="flex flex-col gap-1 px-6 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="text-[17px] font-semibold leading-6 text-[#525252]">
            Hey, {profile.name}!
          </p>
          <h1 className="text-[34px] font-bold leading-10 tracking-[-0.5px] text-[#151515]">
            Feeling good today
          </h1>
        </motion.div>

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

      {/* Tab bar */}
      <HomeTabBar active={activeTab} onChange={handleTabChange} />
    </div>
  );
}
