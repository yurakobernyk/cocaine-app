"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

export function HomeHeader() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
      <div
        className="absolute inset-x-0 top-0 blur-header"
        style={{ height: "calc(100% + 44px)", background: "rgba(238,248,239,0.72)" }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between px-6 pt-14">
          <span className="text-[15px] font-semibold text-[#151515]">9:41</span>
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <img src={asset("/figma-assets/a4198387082605f2a8f9d8ad6d1d21e9ed03679f.svg")} width={19} height={13} alt="" />
            <img src={asset("/figma-assets/5f2f33dd898f106cc9bf144bc1aa9d551e751172.svg")} width={17} height={13} alt="" />
            <img src={asset("/figma-assets/61b774f95a59e641835654a61344b08c890ba989.svg")} width={27} height={13} alt="" />
          </div>
        </div>
        <div className="flex items-center justify-between px-5 pt-3 pb-4 pointer-events-auto">
          <div className="relative h-[60px] w-[60px]">
            <div className="absolute inset-0 rounded-full bg-[#b2e8d4]/60 backdrop-blur-sm" />
            <img
              src={asset("/figma-assets/64254c9a362710784f4d26e0ee60f1fbd57a01a4.png")}
              alt="Emma"
              className="absolute inset-0 h-full w-full rounded-full object-cover"
              style={{ mixBlendMode: "color-burn" }}
            />
          </div>
          <div className="flex items-center gap-3">
            <GlassButton icon={asset("/figma-assets/ae6cd94bd838b706816a5f942d2e408d0d5db389.svg")} label="Chat" />
            <GlassButton icon={asset("/figma-assets/99b283f4cd502ae5fade085645331271c893f365.svg")} label="Meny" />
          </div>
        </div>
      </div>
    </div>
  );
}

function GlassButton({ icon, label }: { icon: string; label: string }) {
  return (
    <motion.button
      aria-label={label}
      whileTap={{ scale: 0.9 }}
      className="relative flex h-12 w-12 items-center justify-center rounded-full overflow-hidden shadow-lg"
    >
      <span className="absolute inset-0 rounded-full bg-white/70 backdrop-blur-md" />
      <span className="absolute inset-0 rounded-full bg-[#ddd] mix-blend-color-burn" />
      <img src={icon} width={32} height={32} alt="" className="relative z-10" />
    </motion.button>
  );
}
