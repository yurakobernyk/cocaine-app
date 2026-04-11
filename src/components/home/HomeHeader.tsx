"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";
import { useAppStore } from "@/store/app.store";

export function HomeHeader() {
  const { profile } = useAppStore();

  return (
    /* Figma: absolute top-0, backdrop-blur-[0px] bg-[rgba(255,255,255,0.01)]
       We add a progressive blur overlay so content scrolls behind the header */
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
      {/* Progressive blur backdrop — mask fades out downward */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0"
        style={{
          height: "calc(100% + 44px)",
          background: "rgba(238,248,239,0.72)",
          backdropFilter: "blur(28px) saturate(1.6) brightness(1.02)",
          WebkitBackdropFilter: "blur(28px) saturate(1.6) brightness(1.02)",
          maskImage: "linear-gradient(to bottom, black 62%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 62%, transparent 100%)",
        }}
      />

      {/* Actual header content */}
      <div className="relative z-10">
        {/* Status bar — Figma: pt-[21px] pb-[19px] px-[24px] */}
        <div className="flex items-center justify-between px-6 pt-[21px] pb-[19px]">
          <span
            className="text-[17px] leading-[22px] text-black"
            style={{ fontWeight: 590 }}
          >
            9:41
          </span>
          <div className="flex items-center gap-[7px]">
            {/* Cellular */}
            <img
              src={asset("/figma-assets/a4198387082605f2a8f9d8ad6d1d21e9ed03679f.svg")}
              width={19}
              height={12}
              alt=""
            />
            {/* Wifi */}
            <img
              src={asset("/figma-assets/5f2f33dd898f106cc9bf144bc1aa9d551e751172.svg")}
              width={17}
              height={12}
              alt=""
            />
            {/* Battery */}
            <img
              src={asset("/figma-assets/61b774f95a59e641835654a61344b08c890ba989.svg")}
              width={27}
              height={13}
              alt=""
            />
          </div>
        </div>

        {/* Toolbar — Figma: h-[76px] px-[16px] py-[8px] */}
        <div className="flex h-[76px] items-center justify-between px-4 py-2 pointer-events-auto">
          {/* Avatar */}
          <motion.button
            aria-label="Profil"
            whileTap={{ scale: 0.9 }}
            className="relative h-[60px] w-[60px] shrink-0 rounded-full shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] overflow-hidden"
          >
            <img
              src={asset("/figma-assets/64254c9a362710784f4d26e0ee60f1fbd57a01a4.png")}
              alt={profile.name}
              className="absolute inset-0 h-full w-full object-cover rounded-full"
              style={{ mixBlendMode: "color-burn" }}
            />
          </motion.button>

          {/* Trailing buttons */}
          <div className="flex items-center gap-2">
            {/* Chat button */}
            <GlassButton
              icon={asset("/figma-assets/ae6cd94bd838b706816a5f942d2e408d0d5db389.svg")}
              label="Chat"
            />
            {/* Menu button */}
            <GlassButton
              icon={asset("/figma-assets/99b283f4cd502ae5fade085645331271c893f365.svg")}
              label="Meny"
            />
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
      className="relative flex h-12 w-12 items-center justify-center rounded-full overflow-hidden shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]"
    >
      {/* glass layers — Figma: bg white/70 + #ddd color-burn */}
      <span className="absolute inset-0 rounded-full bg-white/70" />
      <span className="absolute inset-0 rounded-full bg-[#ddd] mix-blend-color-burn" />
      <img src={icon} width={32} height={32} alt="" className="relative z-10" />
    </motion.button>
  );
}
