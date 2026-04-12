"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/app.store";
import { useTimerStore } from "@/store/timer.store";
import { asset } from "@/lib/asset";

// ─── Delicate content transition ────────────────────────────────────────────
// Only the step content slides & fades — header/footer stay pinned and visible
const contentVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 24 : -24,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -24 : 24,
    opacity: 0,
    transition: { duration: 0.22, ease: [0.55, 0, 1, 0.45] },
  }),
};

// ─── Calendar ────────────────────────────────────────────────────────────────
function CalendarPicker({ selected, onChange }: { selected: Date; onChange: (d: Date) => void }) {
  const [viewDate, setViewDate] = useState(new Date(selected));
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const today = new Date();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayHeaders = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

  return (
    <div style={{ borderRadius: 24, overflow: "hidden", position: "relative" }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: 24,
        background: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)",
        mixBlendMode: "screen", pointerEvents: "none",
      }} />
      <div style={{ position: "relative", zIndex: 1, padding: "16px 8px" }}>
        {/* Month nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 8px 12px" }}>
          <span style={{ fontSize: 17, fontWeight: 590, letterSpacing: -0.43, color: "#000" }}>
            {monthNames[month]} {year}
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            <button onClick={() => setViewDate(new Date(year, month - 1, 1))}
              style={{ fontSize: 22, color: "#128468", background: "none", border: "none", cursor: "pointer", lineHeight: 1, padding: "0 4px" }}>
              ‹
            </button>
            <button onClick={() => setViewDate(new Date(year, month + 1, 1))}
              style={{ fontSize: 22, color: "#128468", background: "none", border: "none", cursor: "pointer", lineHeight: 1, padding: "0 4px" }}>
              ›
            </button>
          </div>
        </div>
        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
          {dayHeaders.map(d => (
            <div key={d} style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: "#7a7a7a", letterSpacing: 0.3, padding: "4px 0" }}>{d}</div>
          ))}
        </div>
        {/* Calendar grid */}
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {week.map((day, di) => {
              if (!day) return <div key={di} style={{ height: 40 }} />;
              const d = new Date(year, month, day);
              const isSelected = d.toDateString() === selected.toDateString();
              const isToday = d.toDateString() === today.toDateString();
              return (
                <button key={di} onClick={() => onChange(d)} style={{
                  height: 40, width: "100%",
                  borderRadius: "50%",
                  border: "none",
                  background: isSelected ? "rgba(18,132,104,0.18)" : "transparent",
                  fontSize: isSelected ? 20 : 18,
                  fontWeight: isSelected ? 600 : 400,
                  color: isToday ? "#128468" : "#000",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.15s",
                }}>
                  {day}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── iOS Toggle ───────────────────────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      aria-checked={value}
      role="switch"
      style={{
        width: 51, height: 31, borderRadius: 100,
        background: value ? "#34c759" : "rgba(120,120,128,0.32)",
        border: "none", cursor: "pointer",
        position: "relative", flexShrink: 0,
        transition: "background 0.22s ease",
        padding: 2,
      }}
    >
      <div style={{
        position: "absolute",
        top: 2, left: value ? 22 : 2,
        width: 27, height: 27,
        borderRadius: "50%", background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.22)",
        transition: "left 0.22s ease",
      }} />
    </button>
  );
}

// ─── Glass card helper ────────────────────────────────────────────────────────
function GlassCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ borderRadius: 24, overflow: "hidden", position: "relative", ...style }}>
      <div aria-hidden style={{
        position: "absolute", inset: 0, borderRadius: 24,
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        mixBlendMode: "screen", pointerEvents: "none",
      }} />
      <div style={{ position: "relative", zIndex: 1, padding: 24 }}>{children}</div>
    </div>
  );
}

// ─── Status Bar ───────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 21, paddingBottom: 0, paddingLeft: 24, paddingRight: 24 }}>
      <span style={{ fontSize: 17, fontWeight: 600, color: "#000", letterSpacing: -0.4 }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <img src={asset("/figma-assets/a4198387082605f2a8f9d8ad6d1d21e9ed03679f.svg")} width={19} height={13} alt="" />
        <img src={asset("/figma-assets/5f2f33dd898f106cc9bf144bc1aa9d551e751172.svg")} width={17} height={13} alt="" />
        <img src={asset("/figma-assets/61b774f95a59e641835654a61344b08c890ba989.svg")} width={27} height={13} alt="" />
      </div>
    </div>
  );
}

// ─── Home Indicator ───────────────────────────────────────────────────────────
function HomeIndicator() {
  return (
    <div style={{ height: 34, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 8 }}>
      <div style={{ width: 134, height: 5, borderRadius: 100, background: "rgba(0,0,0,0.18)" }} />
    </div>
  );
}

// ─── Progress Dots ────────────────────────────────────────────────────────────
const TOTAL_STEPS = 4;

function ProgressDots({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 24px 0" }}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
        const isActive = i === step;
        const isDone = i < step;
        return (
          <motion.div
            key={i}
            animate={{
              width: isActive ? 28 : 8,
              background: isActive || isDone ? "#0e9082" : "#88d8ce",
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 8, borderRadius: 100, flexShrink: 0 }}
          />
        );
      })}
    </div>
  );
}

// ─── Frequency options ────────────────────────────────────────────────────────
const FREQUENCY_OPTIONS = [
  { value: "Daily", label: "Daily", sub: "Every day use" },
  { value: "4-6pw", label: "4–6 times a week", sub: "Almost daily" },
  { value: "2-3pw", label: "2–3 times a week", sub: "Regularly" },
  { value: "1pw",   label: "Once a week", sub: "Stable, but less frequent" },
];

// ─── Programme phases ─────────────────────────────────────────────────────────
const PROGRAMME_PHASES = [
  { weeks: "Weeks 1–2",  title: "Phase 1: First symptoms", sub: "Cravings, insomnia, mood swings",  selected: true },
  { weeks: "Weeks 3–6",  title: "Phase 2: Normalisation",  sub: "Gradual stabilisation",             selected: false },
  { weeks: "Weeks 7–12", title: "Phase 3: Stabilisation",  sub: "Building new habits",               selected: false },
];

// ─── Step content ─────────────────────────────────────────────────────────────
function Step1Frequency({ frequency, setFrequency }: { frequency: string; setFrequency: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0e1e18", letterSpacing: -0.2, lineHeight: "28px", margin: 0, marginBottom: 4 }}>
        How often do you currently use?
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {FREQUENCY_OPTIONS.map((opt) => {
          const sel = frequency === opt.value;
          return (
            <button key={opt.value} onClick={() => setFrequency(opt.value)} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "#fff", borderRadius: 24, minHeight: 80,
              paddingLeft: 24, paddingRight: 24, paddingTop: 16, paddingBottom: 16,
              border: sel ? "2px solid #80d4b8" : "2px solid transparent",
              cursor: "pointer", textAlign: "left", transition: "border-color 0.18s",
            }}>
              <div>
                <p style={{ fontSize: 18, fontWeight: 500, color: "#1a2030", lineHeight: "24px", margin: 0 }}>{opt.label}</p>
                <p style={{ fontSize: 16, fontWeight: 400, color: "#1a2030", lineHeight: "22px", margin: 0, marginTop: 2 }}>{opt.sub}</p>
              </div>
              {sel && (
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#0e9082", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 12 }}>
                  <span style={{ color: "#fff", fontSize: 14, fontWeight: 700, lineHeight: 1 }}>✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div style={{ background: "#d4faeb", borderRadius: 24, padding: "16px 24px" }}>
        <p style={{ fontSize: 14, color: "#1a2030", margin: 0, lineHeight: "20px" }}>
          For daily use, we recommend calling RUSinfo: 915 08 588
        </p>
      </div>
    </div>
  );
}

function Step2Programme() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0e1e18", letterSpacing: -0.2, lineHeight: "28px", margin: 0, marginBottom: 4 }}>
        Your 12-week programme
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PROGRAMME_PHASES.map((phase) => (
          <div key={phase.weeks} style={{
            background: "#fff", borderRadius: 24, minHeight: 116,
            paddingLeft: 24, paddingRight: 24, paddingTop: 20, paddingBottom: 20,
            border: phase.selected ? "2px solid #80d4b8" : "2px solid transparent",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#0e9082", textTransform: "uppercase", letterSpacing: 0.5, margin: 0, marginBottom: 6 }}>
              {phase.weeks}
            </p>
            <p style={{ fontSize: 18, fontWeight: 500, color: "#1a2030", lineHeight: "24px", margin: 0 }}>{phase.title}</p>
            <p style={{ fontSize: 14, fontWeight: 400, color: "#2a5040", lineHeight: "20px", margin: 0, marginTop: 4 }}>{phase.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step3QuitDate({ quitDate, setQuitDate }: { quitDate: Date; setQuitDate: (d: Date) => void }) {
  const daysUntil = Math.ceil((quitDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const label = `${quitDate.getDate()} ${monthNames[quitDate.getMonth()]}`;
  const daysLabel = daysUntil > 0 ? `${label} · Days until quit: ${daysUntil}` : daysUntil === 0 ? `${label} · Quit today!` : `${label} · ${Math.abs(daysUntil)} days ago`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0e1e18", letterSpacing: -0.2, lineHeight: "28px", margin: 0 }}>
          Quit date
        </h2>
        <p style={{ fontSize: 15, color: "#0e1e18", margin: 0, marginTop: 4, lineHeight: "20px" }}>
          This is your &apos;day zero&apos;
        </p>
      </div>
      <CalendarPicker selected={quitDate} onChange={setQuitDate} />
      <div style={{ background: "#d4faeb", borderRadius: 999, padding: "14px 24px" }}>
        <p style={{ fontSize: 15, fontWeight: 500, color: "#0e1e18", margin: 0 }}>{daysLabel}</p>
      </div>
    </div>
  );
}

function Step4StatsPrivacy({
  shareStats, setShareStats,
  age, setAge,
  gender, setGender,
}: {
  shareStats: boolean; setShareStats: (v: boolean) => void;
  age: boolean; setAge: (v: boolean) => void;
  gender: boolean; setGender: (v: boolean) => void;
}) {
  const rows = [
    { label: "Share statistics", value: shareStats, onChange: setShareStats },
    { label: "Age (optional)",   value: age,        onChange: setAge },
    { label: "Gender (optional)", value: gender,     onChange: setGender },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0e1e18", letterSpacing: -0.2, lineHeight: "28px", margin: 0 }}>
        Anonymous statistics
      </h2>

      <GlassCard>
        {rows.map((row, i) => (
          <div key={row.label}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: i > 0 ? 16 : 0, paddingBottom: i < rows.length - 1 ? 16 : 0 }}>
              <p style={{ fontSize: 16, color: "#0e1e18", margin: 0 }}>{row.label}</p>
              <Toggle value={row.value} onChange={row.onChange} />
            </div>
            {i < rows.length - 1 && <div style={{ height: 0.5, background: "#c2eee8" }} />}
          </div>
        ))}
      </GlassCard>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#043634", letterSpacing: -0.2, lineHeight: "28px", margin: 0 }}>
        Privacy
      </h2>

      <GlassCard>
        {["Velferdsetaten Oslo · Org. 997506413", "All data is encrypted on your device.", "Reset is permanent and irreversible."].map((line, i) => (
          <p key={i} style={{ fontSize: 16, color: "#0e1e18", lineHeight: "24px", margin: 0, marginTop: i > 0 ? 12 : 0 }}>{line}</p>
        ))}
      </GlassCard>

      <GlassCard>
        <p style={{ fontSize: 16, color: "#0e1e18", lineHeight: "24px", margin: 0 }}>
          💡&nbsp;&nbsp;Changed your mind? You can switch to a programme later in Settings.
        </p>
      </GlassCard>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function M2OnboardingPage() {
  const [step, setStep] = useState(0);
  const [frequency, setFrequency] = useState("Daily");
  const [quitDate, setQuitDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  });
  const [shareStats, setShareStats] = useState(true);
  const [age, setAge] = useState(false);
  const [gender, setGender] = useState(false);
  const [direction, setDirection] = useState(1);

  const router = useRouter();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const updateProfile = useAppStore((s) => s.updateProfile);
  const setQuitTimestamp = useTimerStore((s) => s.setQuitTimestamp);

  function goNext() {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      const daysOffset = Math.ceil((quitDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      setQuitTimestamp(Date.now() - (90 - Math.max(0, daysOffset)) * 24 * 60 * 60 * 1000);
      updateProfile({ quitDate: quitDate.toISOString().slice(0, 10), anonymousStats: shareStats, privacyAccepted: true });
      completeOnboarding();
      router.push("/m2/home");
    }
  }

  function goBack() {
    if (step === 0) router.back();
    else { setDirection(-1); setStep((s) => s - 1); }
  }

  const nextLabel =
    step === TOTAL_STEPS - 1 ? "I agree → To the programme! 🚀"
    : step === 1 ? "Got it, let's start →"
    : step === 2 ? "Confirm →"
    : "Next →";

  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden", background: "#eef8ef" }}>

      {/* ── PERSISTENT HEADER — never animates ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 30,
        background: "rgba(238,248,239,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
        <StatusBar />
        <ProgressDots step={step} />
        <div style={{ height: 12 }} />
      </div>

      {/* ── SCROLLABLE CONTENT (only this animates) ── */}
      <div style={{
        position: "absolute",
        top: 100,   /* below header */
        left: 0, right: 0,
        bottom: 130, /* above footer */
        overflowY: "auto",
        overflowX: "hidden",
      }}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ padding: "8px 24px 24px" }}
          >
            {step === 0 && <Step1Frequency frequency={frequency} setFrequency={setFrequency} />}
            {step === 1 && <Step2Programme />}
            {step === 2 && <Step3QuitDate quitDate={quitDate} setQuitDate={setQuitDate} />}
            {step === 3 && (
              <Step4StatsPrivacy
                shareStats={shareStats} setShareStats={setShareStats}
                age={age} setAge={setAge}
                gender={gender} setGender={setGender}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── PERSISTENT FOOTER — never animates ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 30,
        background: "rgba(238,248,239,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        paddingTop: 12,
        paddingLeft: 24,
        paddingRight: 24,
      }}>
        {step === 0 ? (
          <div style={{ display: "flex", gap: 12 }}>
            <motion.button
              onClick={goBack}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: 1, height: 56, borderRadius: 999,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(15px)",
                border: "none", fontSize: 17, fontWeight: 600,
                color: "#0e1e18", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              Skip
            </motion.button>
            <motion.button
              onClick={goNext}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: 1, height: 56, borderRadius: 1000,
                background: "#0e9082",
                border: "none", fontSize: 17, fontWeight: 600,
                color: "#fff", cursor: "pointer",
              }}
            >
              {nextLabel}
            </motion.button>
          </div>
        ) : (
          <motion.button
            onClick={goNext}
            whileTap={{ scale: 0.97 }}
            style={{
              width: "100%", height: 56, borderRadius: 1000,
              background: "#0e9082",
              border: "none", fontSize: 17, fontWeight: 600,
              color: "#fff", cursor: "pointer",
            }}
          >
            {nextLabel}
          </motion.button>
        )}
        <HomeIndicator />
      </div>
    </div>
  );
}
