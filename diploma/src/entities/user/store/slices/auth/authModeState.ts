import { type StateCreator } from "zustand";

export interface AuthModeSlice {
  mode: "signup" | "signin";
  setMode: (mode: "signup" | "signin") => void;
}

export const createAuthModeSlice: StateCreator<AuthModeSlice> = (set) => ({
  mode: "signup",
  setMode: (mode) => set({ mode }),
});
