/**
 * Støtte — Global App Store (Zustand)
 * Tracks: active module, user profile, onboarding state
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Module = "syklisk" | "jevnlig" | "laer" | null;

export interface UserProfile {
  name: string;
  avatarUrl?: string;
  quitDate?: string;       // ISO date string
  moduleStartDate?: string;
  anonymousStats: boolean;
  privacyAccepted: boolean;
}

interface AppState {
  module: Module;
  onboardingComplete: boolean;
  profile: UserProfile;

  // Actions
  setModule: (module: Module) => void;
  completeOnboarding: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
  resetAll: () => void;
}

const defaultProfile: UserProfile = {
  name: "Emma",
  anonymousStats: false,
  privacyAccepted: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      module: null,
      onboardingComplete: false,
      profile: defaultProfile,

      setModule: (module) => set({ module }),
      completeOnboarding: () => set({ onboardingComplete: true }),
      updateProfile: (patch) =>
        set((s) => ({ profile: { ...s.profile, ...patch } })),
      resetAll: () =>
        set({ module: null, onboardingComplete: false, profile: defaultProfile }),
    }),
    {
      name: "stoette-app",
      // Encrypt in production — placeholder for now
      partialize: (s) => ({
        module: s.module,
        onboardingComplete: s.onboardingComplete,
        profile: s.profile,
      }),
    }
  )
);
