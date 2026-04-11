"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/app.store";
import { useTimerStore } from "@/store/timer.store";

const TOTAL = 5;

const panels = [
  {
    title: "Hvor ofte bruker du kokain?",
    content: (
      <div className="space-y-3">
        {["Daglig", "Noen ganger i uken", "Helger", "Sjeldnere"].map((opt) => (
          <button
            key={opt}
            className="w-full rounded-2xl bg-white/70 px-5 py-4 text-left text-[16px] font-medium text-m2-text-primary shadow-sm backdrop-blur-sm active:bg-white/90 transition-colors"
          >
            {opt}
          </button>
        ))}
      </div>
    ),
  },
  {
    title: "12-ukersprogrammet",
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-m2-text-secondary leading-relaxed">
          Programmet er delt inn i tre faser: stabilisering, mestring og vedlikehold.
          Du får daglige temaer, ukentlige mål og tilgang til rådgivere.
        </p>
        <div className="rounded-2xl bg-white/60 p-4 backdrop-blur-sm space-y-2">
          {["Uke 1–4: Stabilisering", "Uke 5–8: Mestring", "Uke 9–12: Vedlikehold"].map(
            (phase) => (
              <div key={phase} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-m2-accent" />
                <span className="text-[15px] text-m2-text-primary">{phase}</span>
              </div>
            )
          )}
        </div>
      </div>
    ),
  },
  {
    title: "Velg sluttdato",
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-m2-text-secondary">
          Velg en dato du er klar til å slutte. Du kan endre den senere.
        </p>
        <input
          type="date"
          className="w-full rounded-2xl border border-m2-surface bg-white/70 px-5 py-4 text-[16px] text-m2-text-primary shadow-sm backdrop-blur-sm"
          defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10)}
        />
      </div>
    ),
  },
  {
    title: "Anonym statistikk",
    content: (
      <div className="space-y-4">
        <p className="text-[15px] text-m2-text-secondary leading-relaxed">
          Vil du bidra til forskning ved å dele anonymisert bruksdata?
          Ingen personlige opplysninger lagres eller deles.
        </p>
        <div className="rounded-2xl bg-white/60 p-4 backdrop-blur-sm">
          <p className="text-[13px] text-m2-text-secondary">
            Data lagres kun på EØS-servere og slettes automatisk etter 2 år.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 rounded-full bg-m2-accent py-3 text-[15px] font-semibold text-white">
            Ja, jeg bidrar
          </button>
          <button className="flex-1 rounded-full bg-white/70 py-3 text-[15px] font-medium text-m2-text-secondary">
            Nei takk
          </button>
        </div>
      </div>
    ),
  },
  {
    title: "Personvern",
    content: (
      <div className="space-y-4">
        <div className="rounded-2xl bg-white/60 p-4 backdrop-blur-sm text-[14px] text-m2-text-secondary leading-relaxed space-y-2">
          <p>✅ All data lagres kryptert lokalt på din enhet.</p>
          <p>✅ Ingen data sendes uten ditt samtykke.</p>
          <p>✅ Du kan slette alt når som helst via innstillinger.</p>
          <p>✅ Appen fungerer helt uten internett.</p>
        </div>
        <p className="text-[13px] text-m2-text-secondary text-center">
          Ved å fortsette godtar du personvernerklæringen.
        </p>
      </div>
    ),
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 360, damping: 32 },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { type: "spring" as const, stiffness: 360, damping: 32 },
  }),
};

export default function M2OnboardingPage() {
  const [panelIndex, setPanelIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const router = useRouter();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const setQuitTimestamp = useTimerStore((s) => s.setQuitTimestamp);

  function next() {
    if (panelIndex < TOTAL - 1) {
      setDirection(1);
      setPanelIndex((i) => i + 1);
    } else {
      // Done — set quit date to 7 days from now (demo)
      setQuitTimestamp(Date.now() - 7 * 24 * 60 * 60 * 1000);
      completeOnboarding();
      router.push("/m2/home");
    }
  }

  function back() {
    if (panelIndex === 0) {
      router.back();
    } else {
      setDirection(-1);
      setPanelIndex((i) => i - 1);
    }
  }

  const panel = panels[panelIndex];

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden"
      style={{ background: "#eef8ef" }}
    >
      {/* Fixed chrome */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4 shrink-0">
        <button
          onClick={back}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-m2-text-secondary backdrop-blur-sm text-xl"
        >
          ‹
        </button>

        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === panelIndex ? 20 : 6, opacity: i === panelIndex ? 1 : 0.35 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="h-1.5 rounded-full bg-m2-accent"
            />
          ))}
        </div>

        <div className="w-10" /> {/* spacer */}
      </div>

      {/* Sliding panel */}
      <div className="relative flex-1 overflow-hidden px-5">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={panelIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 px-5 pt-2"
          >
            <h2 className="text-[24px] font-bold text-m2-text-primary mb-6 leading-tight">
              {panel.title}
            </h2>
            {panel.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed footer */}
      <div className="px-5 pb-10 pt-4 shrink-0">
        <motion.button
          onClick={next}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-full bg-m2-accent py-4 text-[17px] font-semibold text-white shadow-lg"
        >
          {panelIndex === TOTAL - 1 ? "Kom i gang 🌿" : "Neste"}
        </motion.button>
      </div>
    </div>
  );
}
