import { type StateCreator } from "zustand";
import type { AuthMode } from "@entities/user/auth/model/types/AuthMode";

export interface AuthModeSlice {
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
}

export const createAuthModeSlice: StateCreator<AuthModeSlice> = (set) => ({
  mode: "signup",
  setMode: (mode) => set({ mode }),
});
