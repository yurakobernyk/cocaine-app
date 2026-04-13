"use client";

import { motion } from "framer-motion";
import { asset } from "@/lib/asset";
import { FigmaIcon } from "@/components/ui/figma-icon";
import { useAppStore } from "@/store/app.store";

/* ─── Status Bar ─────────────────────────────────────────────────────────── */
function StatusBar() {
  return (
    /* Figma: pt-[21px] pb-[19px] px-[24px], gap-[154px] */
    <div className="flex items-center justify-between px-6 pt-[21px] pb-[19px]">
      {/* Time — SF Pro Semibold 17px equivalent */}
      <span className="text-[17px] font-semibold leading-[22px] text-black">
        9:41
      </span>
      {/* Status icons — exact Figma dimensions */}
      <div className="flex items-center gap-[7px]">
        {/* Cellular: viewBox 19.2×12.23 */}
        <FigmaIcon
          src={asset("/figma-assets/cellular.svg")}
          width={19}
          height={12}
        />
        {/* Wifi: viewBox 17.14×12.33 */}
        <FigmaIcon
          src={asset("/figma-assets/wifi.svg")}
          width={17}
          height={12}
        />
        {/* Battery: viewBox 27.33×13 */}
        <FigmaIcon
          src={asset("/figma-assets/battery.svg")}
          width={27}
          height={13}
        />
      </div>
    </div>
  );
}

/* ─── Glass button (chat / menu) ─────────────────────────────────────────── */
function GlassButton({
  src,
  iconWidth,
  iconHeight,
  label,
}: {
  src: string;
  iconWidth: number;
  iconHeight: number;
  label: string;
}) {
  return (
    <motion.button
      aria-label={label}
      whileTap={{ scale: 0.9 }}
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full overflow-hidden shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]"
    >
      {/* Figma: bg white/70 + #ddd mix-blend-color-burn */}
      <span className="absolute inset-0 rounded-full bg-white/70" />
      <span className="absolute inset-0 rounded-full bg-[#ddd] mix-blend-color-burn" />
      <FigmaIcon
        src={src}
        width={iconWidth}
        height={iconHeight}
        className="relative z-10"
      />
    </motion.button>
  );
}

/* ─── HomeHeader ─────────────────────────────────────────────────────────── */
export function HomeHeader() {
  const { profile } = useAppStore();

  return (
    /* Figma header: absolute top-0, full width, no background (blur overlay below) */
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
      {/* Progressive blur backdrop — extends below header to fade into content */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0"
        style={{
          /* Height = header (status 62px + toolbar 92px = 154px) + blur fade tail */
          height: "calc(100% + 44px)",
          background: "rgba(238,248,239,0.72)",
          backdropFilter: "blur(28px) saturate(1.6) brightness(1.02)",
          WebkitBackdropFilter: "blur(28px) saturate(1.6) brightness(1.02)",
          maskImage: "linear-gradient(to bottom, black 62%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 62%, transparent 100%)",
        }}
      />

      {/* Header content — above blur */}
      <div className="relative z-10">
        <StatusBar />

        {/* Toolbar — Figma: h-[76px] px-[16px] py-[8px] */}
        <div className="flex h-[76px] items-center justify-between px-4 py-2 pointer-events-auto">
          {/* Avatar button */}
          <motion.button
            aria-label="Profile"
            whileTap={{ scale: 0.92 }}
            className="relative h-[60px] w-[60px] shrink-0 rounded-full overflow-hidden shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]"
          >
            <img
              src={asset("/figma-assets/avatar-emma.png")}
              alt={profile.name}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ mixBlendMode: "color-burn" }}
            />
          </motion.button>

          {/* Trailing icon buttons */}
          <div className="flex items-center gap-2">
            {/* Chat icon — viewBox 28.8×28.67 → 28×28 */}
            <GlassButton
              src={asset("/figma-assets/header-chat.svg")}
              iconWidth={28}
              iconHeight={28}
              label="Chat"
            />
            {/* Menu icon — viewBox 26×18 → must preserve ratio */}
            <GlassButton
              src={asset("/figma-assets/header-menu.svg")}
              iconWidth={26}
              iconHeight={18}
              label="Menu"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
