"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/app.store";
import type { Module } from "@/store/app.store";
import { asset } from "@/lib/asset";

// Figma assets — exact hashes from Figma MCP
const CHEVRON = asset("/figma-assets/181f97e23de90958389b7451641d422205fc8053.svg");

// Module list icons (icon containers)
const ICONS = {
  // Row 1 — peach — 3-dots scatter icon
  ellipseDots: asset("/figma-assets/icon-ellipse-dots.svg"),
  ellipseTop:  asset("/figma-assets/icon-ellipse-top.svg"),
  // Row 2 — teal — connected dots icon
  groupDots:   asset("/figma-assets/icon-group-dots.svg"),
  // Row 3 — blue — single dot icon
  ellipseSingle: asset("/figma-assets/icon-ellipse-single.svg"),
};

const modules = [
  {
    id: "syklisk" as Module,
    badgeBg: "#fde0c8",
    title: "I want to reduce my use",
    sub: "I use occasionally / on weekends",
    href: "/m2/home",
    icon: "reduce",
  },
  {
    id: "jevnlig" as Module,
    badgeBg: "#c2eee8",
    title: "I want to quit completely",
    sub: "I use regularly or daily",
    href: "/m2",
    icon: "quit",
  },
  {
    id: "laer" as Module,
    badgeBg: "#e0edfb",
    title: "I want to learn more",
    sub: null,
    href: "/m2/home",
    icon: "learn",
  },
];

// Helper: absolutely-positioned dot image inside a 28×28 container
// Uses Figma's pattern: container div positions with 4-side %, img fills it 100%
function AbsDot({ src, top, right, bottom, left }: { src: string; top: string; right: string; bottom: string; left: string }) {
  return (
    <div style={{ position: "absolute", top, right, bottom, left }}>
      <img src={src} alt="" style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}

// Exact icon rendering per Figma node structure
function ModuleIcon({ type, bg }: { type: string; bg: string }) {
  return (
    <div style={{ background: bg, borderRadius: 24, padding: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44 }}>
      <div style={{ width: 28, height: 28, position: "relative", overflow: "hidden" }}>
        {type === "reduce" && (
          <>
            <AbsDot src={ICONS.ellipseDots} top="54.17%" left="58.33%" right="20.83%" bottom="25%" />
            <AbsDot src={ICONS.ellipseDots} top="54.17%" left="20.83%" right="58.33%" bottom="25%" />
            <AbsDot src={ICONS.ellipseTop}  top="20.83%" left="41.67%" right="37.5%"  bottom="58.33%" />
          </>
        )}
        {type === "quit" && (
          <AbsDot src={ICONS.groupDots} top="22.92%" left="39.58%" right="39.58%" bottom="22.92%" />
        )}
        {type === "learn" && (
          <AbsDot src={ICONS.ellipseSingle} top="39.58%" left="39.58%" right="39.58%" bottom="39.58%" />
        )}
      </div>
    </div>
  );
}

export default function WelcomePage() {
  const router = useRouter();
  const setModule = useAppStore((s) => s.setModule);

  function choose(mod: Module, href: string) {
    setModule(mod);
    router.push(href);
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#c8dde8" /* fallback while bg image loads */ }}
    >
      {/* Full-screen background image (Figma node bg) */}
      <img
        src={asset("/figma-assets/welcome-bg.png")}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Centered content — exactly as Figma: top:50% -translate-y-1/2 */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2"
        style={{ padding: 24 }}
      >
        {/* Hero block */}
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ gap: 11, color: "#062870" }}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ fontSize: 44, lineHeight: 1, fontWeight: 400 }}>🤝</p>
          <p style={{ fontSize: 22, fontWeight: 700, lineHeight: "28px", letterSpacing: -0.2 }}>
            Welcome
          </p>
          <p style={{ fontSize: 15, fontWeight: 400, lineHeight: "20px" }}>
            Self-help for people who use cocaine
          </p>
        </motion.div>

        {/* 120px gap (Figma: gap-[120px]) */}
        <div style={{ height: 120 }} />

        {/* Selector block */}
        <motion.div
          className="flex flex-col items-center"
          style={{ gap: 16 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          {/* "Choose your path" label */}
          <p
            style={{
              fontSize: 15,
              fontWeight: 400,
              lineHeight: "20px",
              color: "#062870",
              textAlign: "center",
              width: 327,
            }}
          >
            Choose your path
          </p>

          {/* Glass card — w-[327px], rounded-[40px], p-[24px] */}
          <div
            style={{
              width: 327,
              borderRadius: 40,
              padding: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Glass overlay — exact Figma: backdrop-blur-[30px] bg-[rgba(255,255,255,0.8)] mix-blend-screen */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 40,
                background: "rgba(255,255,255,0.80)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />

            {/* Module rows */}
            <div style={{ position: "relative", zIndex: 1 }}>
              {modules.map((mod, i) => (
                <button
                  key={mod.id}
                  onClick={() => choose(mod.id, mod.href)}
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    gap: 16,
                    paddingTop: 16,
                    paddingBottom: 16,
                    background: "transparent",
                    border: "none",
                    borderBottom:
                      i < modules.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <ModuleIcon type={mod.icon} bg={mod.badgeBg} />

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                    <p style={{ fontSize: 15, fontWeight: 500, lineHeight: "20px", color: "#184880" }}>
                      {mod.title}
                    </p>
                    {mod.sub && (
                      <p style={{ fontSize: 11, fontWeight: 400, lineHeight: "16px", color: "#184880" }}>
                        {mod.sub}
                      </p>
                    )}
                  </div>

                  {/* Chevron — size-[24px] container, icon inside at 41.67%/33.33% inset */}
                  <div style={{ width: 24, height: 24, position: "relative", overflow: "hidden", flexShrink: 0 }}>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "25%",
                        left: "41.67%",
                        right: "33.33%",
                        top: "25%",
                      }}
                    >
                      <div style={{ position: "absolute", inset: "-8.33% -16.67%" }}>
                        <img src={CHEVRON} alt="" style={{ display: "block", width: "100%", height: "100%" }} />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Caption */}
          <p
            style={{
              fontSize: 13,
              fontWeight: 400,
              lineHeight: "20px",
              color: "#184880",
              textAlign: "center",
              width: "100%",
            }}
          >
            Not sure? Start with the information module.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
