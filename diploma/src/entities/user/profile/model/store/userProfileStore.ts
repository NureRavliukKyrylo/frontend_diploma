import { create } from "zustand";
import {
  createProfileSettingsModeSlice,
  type ProfileSettingsModeSlice,
} from "../slices/profileSettingsModeSlice";
import {
  createProfileModeSlice,
  type ProfileModeSlice,
} from "../slices/profileModeSlice";
import { persist } from "zustand/middleware";

type ProfileStore = ProfileSettingsModeSlice & ProfileModeSlice;

export const useUserProfileStore = create<ProfileStore>()(
  persist(
    (...a) => ({
      ...createProfileSettingsModeSlice(...a),
      ...createProfileModeSlice(...a),
    }),
    {
      name: "user-profile-storage",
    }
  )
);
