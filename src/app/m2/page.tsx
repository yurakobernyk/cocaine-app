"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function M2WelcomePage() {
  const router = useRouter();

  return (
    <div
      className="relative flex h-full flex-col justify-between overflow-hidden px-6 py-16"
      style={{ background: "linear-gradient(160deg, #d4f0e4 0%, #eef8ef 60%, #c8e8f4 100%)" }}
    >
      <motion.div
        className="mt-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <span className="text-6xl mb-6">🌿</span>
        <h1 className="text-[28px] font-bold text-m2-text-primary tracking-tight">
          Jevnlig modul
        </h1>
        <p className="mt-3 text-[16px] text-m2-text-secondary max-w-[280px]">
          Et 12-ukersprogram for deg som ønsker å slutte helt med kokain.
        </p>
      </motion.div>

      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.2 }}
      >
        <button
          onClick={() => router.push("/m2/onboarding")}
          className="w-full rounded-full bg-m2-accent py-4 text-[17px] font-semibold text-white shadow-lg active:scale-95 transition-transform"
        >
          Kom i gang
        </button>
        <button
          onClick={() => router.back()}
          className="w-full rounded-full py-3 text-[15px] font-medium text-m2-text-secondary"
        >
          Tilbake
        </button>
      </motion.div>
    </div>
  );
}
