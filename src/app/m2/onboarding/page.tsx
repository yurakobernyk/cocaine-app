"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/app.store";
import { useTimerStore } from "@/store/timer.store";
import { asset } from "@/lib/asset";

// ─── Calendar ────────────────────────────────────────────────────────────────

function CalendarPicker({
  selected,
  onChange,
}: {
  selected: Date;
  onChange: (d: Date) => void;
}) {
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
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  return (
    <div
      style={{
        borderRadius: 24,
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
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
          borderRadius: 24,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Month header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
          }}
        >
          <span
            style={{
              fontSize: 17,
              fontWeight: 590,
              letterSpacing: -0.43,
              color: "#000",
            }}
          >
            {monthNames[month]} {year}
          </span>
          <div style={{ display: "flex", gap: 28 }}>
            <button
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              style={{
                fontSize: 20,
                color: "#128468",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 4,
              }}
            >
              ‹
            </button>
            <button
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              style={{
                fontSize: 20,
                color: "#128468",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 4,
              }}
            >
              ›
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 16px",
          }}
        >
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
            <div
              key={d}
              style={{
                width: 44,
                textAlign: "center",
                fontSize: 13,
                fontWeight: 590,
                color: "#7a7a7a",
                letterSpacing: 0.3,
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, wi) => (
          <div
            key={wi}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "3px 16px",
            }}
          >
            {week.map((day, di) => {
              if (!day)
                return <div key={di} style={{ width: 44, height: 44 }} />;
              const d = new Date(year, month, day);
              const isSelected =
                d.toDateString() === selected.toDateString();
              const isToday = d.toDateString() === today.toDateString();
              return (
                <button
                  key={di}
                  onClick={() => onChange(d)}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "none",
                    background: isSelected
                      ? "rgba(18,132,104,0.15)"
                      : "transparent",
                    fontSize: isSelected ? 24 : 20,
                    fontWeight: isSelected ? 510 : 400,
                    color: isToday ? "#128468" : "#000",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
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

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 64,
        height: 28,
        borderRadius: 100,
        background: value ? "#34c759" : "#d1d1d6",
        border: "none",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: value ? 36 : 2,
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
          transition: "left 0.2s",
        }}
      />
    </button>
  );
}

// ─── Glass card helper ────────────────────────────────────────────────────────

function GlassCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
        padding: 24,
        ...style,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
          borderRadius: 24,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── Status bar ───────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 21,
        paddingBottom: 19,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <span style={{ fontSize: 15, fontWeight: 600, color: "#0e1e18" }}>
        9:41
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <img
          src={asset(
            "/figma-assets/a4198387082605f2a8f9d8ad6d1d21e9ed03679f.svg"
          )}
          width={19}
          height={13}
          alt=""
        />
        <img
          src={asset(
            "/figma-assets/5f2f33dd898f106cc9bf144bc1aa9d551e751172.svg"
          )}
          width={17}
          height={13}
          alt=""
        />
        <img
          src={asset(
            "/figma-assets/61b774f95a59e641835654a61344b08c890ba989.svg"
          )}
          width={27}
          height={13}
          alt=""
        />
      </div>
    </div>
  );
}

// ─── Home indicator ───────────────────────────────────────────────────────────

function HomeIndicator() {
  return (
    <div
      style={{
        height: 34,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: 8,
      }}
    >
      <div
        style={{
          width: 144,
          height: 5,
          borderRadius: 100,
          background: "#000",
          opacity: 0.2,
        }}
      />
    </div>
  );
}

// ─── Progress dots ────────────────────────────────────────────────────────────

const TOTAL_STEPS = 4;

function ProgressDots({ step }: { step: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "0 24px 16px 24px",
      }}
    >
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
        const isActive = i === step;
        const isDone = i < step;
        return (
          <motion.div
            key={i}
            animate={{
              width: isActive ? 32 : 8,
              height: 8,
              borderRadius: isActive ? 4 : "50%",
              background:
                isActive || isDone ? "#0e9082" : "#88d8ce",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            style={{ flexShrink: 0 }}
          />
        );
      })}
    </div>
  );
}

// ─── Step content components ──────────────────────────────────────────────────

const FREQUENCY_OPTIONS = [
  { value: "Daily", label: "Daily", sub: "Every day use" },
  { value: "4-6pw", label: "4–6 times a week", sub: "Almost daily" },
  { value: "2-3pw", label: "2–3 times a week", sub: "Regularly" },
  { value: "1pw", label: "Once a week", sub: "Stable, but less frequent" },
];

function Step1Frequency({
  frequency,
  setFrequency,
}: {
  frequency: string;
  setFrequency: (v: string) => void;
}) {
  return (
    <div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#2b2b29",
          letterSpacing: -0.2,
          marginBottom: 20,
        }}
      >
        How often do you currently use?
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {FREQUENCY_OPTIONS.map((opt) => {
          const selected = frequency === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setFrequency(opt.value)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#fff",
                borderRadius: 24,
                height: 80,
                paddingLeft: 24,
                paddingRight: 24,
                border: selected
                  ? "2px solid #80d4b8"
                  : "2px solid transparent",
                cursor: "pointer",
                textAlign: "left",
                overflow: "hidden",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#1a2030",
                    lineHeight: "24px",
                  }}
                >
                  {opt.label}
                </p>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: "#1a2030",
                    lineHeight: "22px",
                  }}
                >
                  {opt.sub}
                </p>
              </div>
              {selected && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "#0e9082",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
                    ✓
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Info banner */}
      <div
        style={{
          marginTop: 16,
          background: "#d4faeb",
          borderRadius: 24,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <p style={{ fontSize: 14, fontWeight: 400, color: "#1a2030" }}>
          For daily use, we recommend calling RUSinfo: 915 08 588
        </p>
      </div>
    </div>
  );
}

const PROGRAMME_PHASES = [
  {
    weeks: "Weeks 1–2",
    title: "Phase 1: First symptoms",
    sub: "Cravings, insomnia, mood swings",
    selected: true,
  },
  {
    weeks: "Weeks 3–6",
    title: "Phase 2: Normalisation",
    sub: "Gradual stabilisation",
    selected: false,
  },
  {
    weeks: "Weeks 7–12",
    title: "Phase 3: Stabilisation",
    sub: "Building new habits",
    selected: false,
  },
];

function Step2Programme() {
  return (
    <div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#0e1e18",
          letterSpacing: -0.2,
          marginBottom: 20,
        }}
      >
        Your 12-week programme
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PROGRAMME_PHASES.map((phase) => (
          <div
            key={phase.weeks}
            style={{
              background: "#fff",
              borderRadius: 24,
              height: 116,
              paddingLeft: 24,
              paddingRight: 24,
              border: phase.selected
                ? "2px solid #80d4b8"
                : "2px solid transparent",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#0e9082",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 4,
              }}
            >
              {phase.weeks}
            </p>
            <p
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: "#1a2030",
                lineHeight: "24px",
              }}
            >
              {phase.title}
            </p>
            <p
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#2a5040",
                lineHeight: "20px",
              }}
            >
              {phase.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step3QuitDate({
  quitDate,
  setQuitDate,
}: {
  quitDate: Date;
  setQuitDate: (d: Date) => void;
}) {
  const daysUntil = Math.ceil(
    (quitDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const label = `${dayNames[quitDate.getDay()]} ${quitDate.getDate()} ${monthNames[quitDate.getMonth()]}`;
  const daysLabel =
    daysUntil > 0
      ? `${label} · Days until quit: ${daysUntil}`
      : daysUntil === 0
      ? `${label} · Quit today!`
      : `${label} · ${Math.abs(daysUntil)} days ago`;

  return (
    <div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#0e1e18",
          letterSpacing: -0.2,
          marginBottom: 4,
        }}
      >
        Quit date
      </h2>
      <p
        style={{
          fontSize: 15,
          fontWeight: 400,
          color: "#0e1e18",
          marginBottom: 20,
        }}
      >
        This is your &apos;day zero&apos;
      </p>

      <CalendarPicker selected={quitDate} onChange={setQuitDate} />

      {/* Info pill */}
      <div
        style={{
          marginTop: 12,
          background: "#d4faeb",
          borderRadius: 999,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 16,
        }}
      >
        <p style={{ fontSize: 14, fontWeight: 400, color: "#1a2030" }}>
          {daysLabel}
        </p>
      </div>
    </div>
  );
}

function Step4StatsPrivacy({
  shareStats,
  setShareStats,
  age,
  setAge,
  gender,
  setGender,
}: {
  shareStats: boolean;
  setShareStats: (v: boolean) => void;
  age: boolean;
  setAge: (v: boolean) => void;
  gender: boolean;
  setGender: (v: boolean) => void;
}) {
  return (
    <div>
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#043634",
          letterSpacing: -0.2,
          marginBottom: 20,
        }}
      >
        Anonymous statistics &amp; Privacy
      </h2>

      {/* Stats card */}
      <GlassCard>
        {[
          {
            label: "Share statistics",
            value: shareStats,
            onChange: setShareStats,
            optional: false,
          },
          {
            label: "Age (optional)",
            value: age,
            onChange: setAge,
            optional: true,
          },
          {
            label: "Gender (optional)",
            value: gender,
            onChange: setGender,
            optional: true,
          },
        ].map((row, i, arr) => (
          <div key={row.label}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: i === 0 ? 0 : 16,
                paddingBottom: i === arr.length - 1 ? 0 : 16,
              }}
            >
              <p style={{ fontSize: 16, fontWeight: 400, color: "#0e1e18" }}>
                {row.label}
              </p>
              <Toggle value={row.value} onChange={row.onChange} />
            </div>
            {i < arr.length - 1 && (
              <div
                style={{
                  height: 0.5,
                  background: "#c2eee8",
                  width: "100%",
                }}
              />
            )}
          </div>
        ))}
      </GlassCard>

      {/* Privacy title */}
      <h3
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#043634",
          letterSpacing: -0.2,
          marginTop: 24,
          marginBottom: 12,
        }}
      >
        Privacy
      </h3>

      {/* Privacy card 1 */}
      <GlassCard>
        {[
          "Velferdsetaten Oslo · Org. 997506413",
          "All data is encrypted on your device.",
          "Reset is permanent and irreversible.",
        ].map((line, i) => (
          <p
            key={i}
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: "#0e1e18",
              lineHeight: "24px",
              marginTop: i > 0 ? 0 : 0,
            }}
          >
            {line}
          </p>
        ))}
      </GlassCard>

      {/* Privacy card 2 */}
      <GlassCard style={{ marginTop: 12 }}>
        <p style={{ fontSize: 16, fontWeight: 400, color: "#0e1e18", lineHeight: "24px" }}>
          💡&nbsp;&nbsp;Changed your mind? You can switch to a programme later in Settings.
        </p>
      </GlassCard>
    </div>
  );
}

// ─── Slide variants ───────────────────────────────────────────────────────────

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

// ─── Main page ────────────────────────────────────────────────────────────────

export default function M2OnboardingPage() {
  const [step, setStep] = useState(0);
  const [frequency, setFrequency] = useState<string>("Daily");
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
      finishOnboarding();
    }
  }

  function goBack() {
    if (step === 0) {
      router.back();
    } else {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }

  function finishOnboarding() {
    const daysOffset = Math.ceil(
      (quitDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    setQuitTimestamp(
      Date.now() - (90 - daysOffset) * 24 * 60 * 60 * 1000
    );
    updateProfile({
      quitDate: quitDate.toISOString().slice(0, 10),
      anonymousStats: shareStats,
      privacyAccepted: true,
    });
    completeOnboarding();
    router.push("/m2/home");
  }

  const nextLabel =
    step === TOTAL_STEPS - 1
      ? "I agree → To the programme! 🚀"
      : step === 0
      ? "Next →"
      : step === 1
      ? "Got it, let's start →"
      : "Confirm →";

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        overflow: "hidden",
        background: "#eef8ef",
      }}
    >
      {/* ── Fixed header ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          background: "rgba(255,255,255,0.01)",
          paddingBottom: 16,
        }}
      >
        <StatusBar />
        <ProgressDots step={step} />
      </div>

      {/* ── Scrollable content area ── */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 0,
          right: 0,
          bottom: 160,
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              padding: 24,
              overflowY: "auto",
            }}
          >
            {step === 0 && (
              <Step1Frequency
                frequency={frequency}
                setFrequency={setFrequency}
              />
            )}
            {step === 1 && <Step2Programme />}
            {step === 2 && (
              <Step3QuitDate quitDate={quitDate} setQuitDate={setQuitDate} />
            )}
            {step === 3 && (
              <Step4StatsPrivacy
                shareStats={shareStats}
                setShareStats={setShareStats}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Fixed footer ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: 16,
          paddingLeft: 24,
          paddingRight: 24,
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {step === 0 && (
            <motion.button
              onClick={goBack}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: 1,
                height: 56,
                borderRadius: 999,
                background: "#fff",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                border: "none",
                fontSize: 17,
                fontWeight: 600,
                color: "#0e1e18",
                cursor: "pointer",
              }}
            >
              Skip
            </motion.button>
          )}

          <motion.button
            onClick={goNext}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: step === 0 ? 1 : undefined,
              width: step !== 0 ? "100%" : undefined,
              height: 56,
              borderRadius: 1000,
              background: "#0e9082",
              border: "none",
              fontSize: 17,
              fontWeight: 600,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {nextLabel}
          </motion.button>
        </div>

        <HomeIndicator />
      </div>
    </div>
  );
}
