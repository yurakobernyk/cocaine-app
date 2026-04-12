"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { asset } from "@/lib/asset";

export default function M2WelcomePage() {
  const router = useRouter();

  return (
    <div
      className="relative h-full overflow-hidden"
      style={{ background: "#eef8ef" }}
    >
      {/* Status bar */}
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
        <span style={{ fontSize: 15, fontWeight: 600, color: "#042c22" }}>
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

      {/* Centered content — fills between status bar and footer */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          bottom: 106,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      <motion.div
        style={{
          width: "100%",
          paddingLeft: 24,
          paddingRight: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.1 }}
      >
        <span style={{ fontSize: 44, lineHeight: 1 }}>💪</span>

        <h1
          style={{
            marginTop: 16,
            fontSize: 22,
            fontWeight: 700,
            color: "#042c22",
            letterSpacing: -0.2,
          }}
        >
          Ready to quit?
        </h1>

        <p
          style={{
            marginTop: 8,
            fontSize: 15,
            fontWeight: 400,
            color: "#042c22",
            lineHeight: "22px",
          }}
        >
          12-week full abstinence programme.
          <br />
          Independently or with a therapist.
        </p>

        <p
          style={{
            marginTop: 24,
            fontSize: 15,
            fontWeight: 400,
            color: "#042c22",
            alignSelf: "flex-start",
          }}
        >
          Developed by:
        </p>

        {/* Glass card */}
        <div
          style={{
            marginTop: 12,
            width: "100%",
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
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              mixBlendMode: "screen",
              pointerEvents: "none",
              borderRadius: 24,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 0,
              textAlign: "left",
            }}
          >
            {[
              { label: "Westerdahl" },
              { label: "RUSinfo" },
              { label: "Uteseksjonen" },
            ].map((org, i, arr) => (
              <div key={org.label}>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 400,
                    color: "#042c22",
                    paddingTop: i === 0 ? 0 : 16,
                    paddingBottom: i === arr.length - 1 ? 0 : 16,
                  }}
                >
                  ✓&nbsp;&nbsp;{org.label}
                </p>
                {i < arr.length - 1 && (
                  <div
                    style={{
                      height: 0.5,
                      background: "#b2e8d4",
                      width: "100%",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: 16,
          paddingLeft: 24,
          paddingRight: 24,
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.2 }}
      >
        <button
          onClick={() => router.push("/m2/onboarding")}
          style={{
            width: "100%",
            height: 56,
            borderRadius: 1000,
            background: "#0e9082",
            border: "none",
            fontSize: 17,
            fontWeight: 600,
            color: "#fff",
            cursor: "pointer",
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          Get started
        </button>

        {/* Home indicator */}
        <div
          style={{
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 144,
              height: 5,
              borderRadius: 100,
              background: "#000",
              opacity: 0.2,
              marginBottom: 8,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
