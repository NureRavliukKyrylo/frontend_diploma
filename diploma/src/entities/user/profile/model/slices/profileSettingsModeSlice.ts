import { type StateCreator } from "zustand";
import type { ProfileSettingsMode } from "../types/profileSettingsMode";

export interface ProfileSettingsModeSlice {
  settingsMode: ProfileSettingsMode;
  setSettingsMode: (mode: ProfileSettingsMode) => void;
}

export const createProfileSettingsModeSlice: StateCreator<
  ProfileSettingsModeSlice
> = (set) => ({
  settingsMode: "main",
  setSettingsMode: (settingsMode) => set({ settingsMode }),
});
