import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthModeState {
  mode: "signup" | "signin";
  setMode: (mode: "signup" | "signin") => void;
}

export const useAuthModeStore = create<AuthModeState>()(
  persist(
    (set) => ({
      mode: "signup",
      setMode: (mode) => set({ mode }),
    }),
    {
      name: "auth-mode-storage",
    }
  )
);
