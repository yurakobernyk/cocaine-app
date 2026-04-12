"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/app.store";
import type { Module } from "@/store/app.store";
import { asset } from "@/lib/asset";

const modules = [
  {
    id: "syklisk" as Module,
    badgeBg: "#fde0c8",
    title: "I want to reduce my use",
    sub: "I use occasionally / on weekends",
    href: "/m2/home",
  },
  {
    id: "jevnlig" as Module,
    badgeBg: "#c2eee8",
    title: "I want to quit completely",
    sub: "I use regularly or daily",
    href: "/m2",
  },
  {
    id: "laer" as Module,
    badgeBg: "#e0edfb",
    title: "I want to learn more",
    sub: null,
    href: "/m2/home",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
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
      style={{ background: "#f2f7fe" }}
    >
      {/* Status bar */}
      <div className="flex w-full items-center justify-between px-6 pt-[52px] pb-2">
        <span
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#062870",
            letterSpacing: -0.2,
          }}
        >
          9:41
        </span>
        <div className="flex items-center gap-1.5">
          <img
            src={asset("/figma-assets/a4198387082605f2a8f9d8ad6d1d21e9ed03679f.svg")}
            width={19}
            height={13}
            alt=""
          />
          <img
            src={asset("/figma-assets/5f2f33dd898f106cc9bf144bc1aa9d551e751172.svg")}
            width={17}
            height={13}
            alt=""
          />
          <img
            src={asset("/figma-assets/61b774f95a59e641835654a61344b08c890ba989.svg")}
            width={27}
            height={13}
            alt=""
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
        <span style={{ fontSize: 44, lineHeight: 1 }}>🤝</span>
        <h1
          style={{
            marginTop: 16,
            fontSize: 22,
            fontWeight: 700,
            color: "#062870",
            letterSpacing: -0.2,
          }}
        >
          Welcome
        </h1>
        <p
          style={{
            marginTop: 6,
            fontSize: 15,
            fontWeight: 400,
            color: "#062870",
          }}
        >
          Self-help for people who use cocaine
        </p>
      </motion.div>

      {/* Module selector */}
      <motion.div
        className="mt-auto w-full px-5 pb-10"
        style={{ marginTop: 120 }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <p
          style={{
            marginBottom: 16,
            textAlign: "center",
            fontSize: 15,
            fontWeight: 400,
            color: "#184880",
          }}
        >
          Choose your path
        </p>

        {/* Glass card */}
        <div
          style={{
            borderRadius: 40,
            overflow: "hidden",
            position: "relative",
            padding: 24,
          }}
        >
          {/* Glass overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.80)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              mixBlendMode: "screen",
              pointerEvents: "none",
              borderRadius: 40,
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            {modules.map((mod, i) => (
              <motion.div key={mod.id} variants={item}>
                <button
                  onClick={() => choose(mod.id, mod.href)}
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    gap: 16,
                    paddingTop: i === 0 ? 0 : 16,
                    paddingBottom: i === modules.length - 1 ? 0 : 16,
                    paddingLeft: 0,
                    paddingRight: 0,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    borderBottom:
                      i < modules.length - 1
                        ? "1px solid rgba(0,0,0,0.04)"
                        : "none",
                  }}
                >
                  {/* Icon badge */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 24,
                      background: mod.badgeBg,
                      flexShrink: 0,
                      padding: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background:
                          mod.id === "syklisk"
                            ? "#f4905a"
                            : mod.id === "jevnlig"
                            ? "#0e9082"
                            : "#3c7abd",
                      }}
                    />
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "#184880",
                        lineHeight: "20px",
                      }}
                    >
                      {mod.title}
                    </p>
                    {mod.sub && (
                      <p
                        style={{
                          marginTop: 2,
                          fontSize: 11,
                          fontWeight: 400,
                          color: "#184880",
                          lineHeight: "16px",
                        }}
                      >
                        {mod.sub}
                      </p>
                    )}
                  </div>

                  {/* Chevron */}
                  <img
                    src={asset(
                      "/figma-assets/181f97e23de90958389b7451641d422205fc8053.svg"
                    )}
                    width={8}
                    height={14}
                    alt=""
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          style={{
            marginTop: 16,
            textAlign: "center",
            fontSize: 13,
            color: "#184880",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Not sure? Start with the information module.
        </motion.p>
      </motion.div>
    </div>
  );
}
