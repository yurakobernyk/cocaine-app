/**
 * Støtte — Timer Store (Zustand)
 * Tracks: time since quit / last use, savings calculation
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimerState {
  quitTimestamp: number | null;   // Unix ms
  pricePerGram: number;           // NOK
  gramsPerSession: number;

  // Computed helpers (not persisted)
  getElapsedMs: () => number;
  getSavingsKr: () => number;

  // Actions
  setQuitTimestamp: (ts: number) => void;
  setPricePerGram: (price: number) => void;
  setGramsPerSession: (grams: number) => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      quitTimestamp: null,
      pricePerGram: 800,      // NOK default
      gramsPerSession: 1,

      getElapsedMs: () => {
        const { quitTimestamp } = get();
        return quitTimestamp ? Date.now() - quitTimestamp : 0;
      },

      getSavingsKr: () => {
        const { quitTimestamp, pricePerGram, gramsPerSession } = get();
        if (!quitTimestamp) return 0;
        const days = (Date.now() - quitTimestamp) / (1000 * 60 * 60 * 24);
        // Rough estimate: sessions per day avoided × grams × price
        return Math.floor(days * gramsPerSession * pricePerGram);
      },

      setQuitTimestamp: (ts) => set({ quitTimestamp: ts }),
      setPricePerGram: (price) => set({ pricePerGram: price }),
      setGramsPerSession: (grams) => set({ gramsPerSession: grams }),
    }),
    {
      name: "stoette-timer",
      partialize: (s) => ({
        quitTimestamp: s.quitTimestamp,
        pricePerGram: s.pricePerGram,
        gramsPerSession: s.gramsPerSession,
      }),
    }
  )
);
