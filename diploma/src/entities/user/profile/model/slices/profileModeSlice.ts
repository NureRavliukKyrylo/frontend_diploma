import { type StateCreator } from "zustand";
import type { ProfileMode } from "../types/profileMode";

export interface ProfileModeSlice {
  profileMode: ProfileMode;
  setProfileMode: (mode: ProfileMode) => void;
}

export const createProfileModeSlice: StateCreator<ProfileModeSlice> = (
  set
) => ({
  profileMode: "profile",
  setProfileMode: (profileMode) => set({ profileMode }),
});
