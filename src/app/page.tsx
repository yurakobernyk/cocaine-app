"use client";

import { asset } from '@/lib/asset';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/app.store";
import type { Module } from "@/store/app.store";

const modules = [
  {
    id: "syklisk" as Module,
    bg: "bg-orange-100",
    emoji: "🟠",
    title: "Jeg vil redusere bruken",
    sub: "Jeg bruker av og til / i helger",
    href: "/m2/home",
  },
  {
    id: "jevnlig" as Module,
    bg: "bg-teal-100",
    emoji: "🟢",
    title: "Jeg vil slutte helt",
    sub: "Jeg bruker jevnlig eller daglig",
    href: "/m2/onboarding",
  },
  {
    id: "laer" as Module,
    bg: "bg-indigo-100",
    emoji: "🔵",
    title: "Jeg vil lære mer",
    sub: null,
    href: "/m2/home",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 340, damping: 28 },
  },
};

export default function WelcomePage() {
  const router = useRouter();
  const setModule = useAppStore((s) => s.setModule);

  function choose(mod: Module, href: string) {
    setModule(mod);
    router.push(href);
  }

  return (
    <div
      className="relative flex h-full flex-col items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, #c8dff0 0%, #b8d4c8 40%, #d4c8e8 100%)",
      }}
    >
      {/* Status bar */}
      <div className="flex w-full items-center justify-between px-6 pt-14">
        <span className="text-[15px] font-semibold text-[#1a1a2e]">9:41</span>
        <div className="flex items-center gap-1.5">
          <img
            src={asset("/figma-assets/a4198387082605f2a8f9d8ad6d1d21e9ed03679f.svg")}
            width={19} height={13} alt=""
          />
          <img
            src={asset("/figma-assets/5f2f33dd898f106cc9bf144bc1aa9d551e751172.svg")}
            width={17} height={13} alt=""
          />
          <img
            src={asset("/figma-assets/61b774f95a59e641835654a61344b08c890ba989.svg")}
            width={27} height={13} alt=""
          />
        </div>
      </div>

      {/* Hero */}
      <motion.div
        className="mt-10 flex flex-col items-center text-center px-8"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.1 }}
      >
        <span className="text-5xl mb-4">🤝</span>
        <h1 className="text-[28px] font-bold text-[#1a1a2e] tracking-tight">
          Velkommen
        </h1>
        <p className="mt-1 text-[16px] text-[#3a4a5e]">
          Selvhjelp for deg som bruker kokain
        </p>
      </motion.div>

      {/* Module cards */}
      <motion.div
        className="mt-10 w-full px-5"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <p className="mb-4 text-center text-[14px] font-medium text-[#3a4a5e]">
          Velg din vei
        </p>

        <div className="overflow-hidden rounded-[28px] bg-white/60 shadow-lg backdrop-blur-xl divide-y divide-black/[0.06]">
          {modules.map((mod) => (
            <motion.button
              key={mod.id}
              variants={item}
              onClick={() => choose(mod.id, mod.href)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors active:bg-black/[0.04]"
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${mod.bg} text-xl`}
              >
                {mod.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[16px] font-semibold text-[#1a1a2e] leading-snug">
                  {mod.title}
                </p>
                {mod.sub && (
                  <p className="mt-0.5 text-[13px] text-[#5a6a7e]">{mod.sub}</p>
                )}
              </div>
              <span className="text-[#9aa5b4] text-xl leading-none">›</span>
            </motion.button>
          ))}
        </div>

        <motion.p
          className="mt-5 text-center text-[13px] text-[#5a6a7e]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          Ikke sikker? Start med informasjonsmodulen.
        </motion.p>
      </motion.div>
    </div>
  );
}
