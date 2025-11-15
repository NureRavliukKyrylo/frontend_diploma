import { create } from "zustand";
import {
  createProfileSettingsModeSlice,
  type ProfileSettingsModeSlice,
} from "../slices/ProfileSettingsModeSlice";
import { persist } from "zustand/middleware";

export const useUserProfileStore = create<ProfileSettingsModeSlice>()(
  persist(
    (...a) => ({
      ...createProfileSettingsModeSlice(...a),
    }),
    {
      name: "user-profile-storage",
    }
  )
);
