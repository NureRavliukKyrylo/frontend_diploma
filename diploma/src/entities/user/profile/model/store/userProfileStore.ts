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
import {
  createProfileModalVerificationSlice,
  type ProfileModalVerificationSlice,
} from "../slices/profileModalVerificationSlice";
import {
  createOtpTimerSlice,
  type OtpTimerSlice,
} from "@shared/config/stores/slices/otpTimerSlice";

type ProfileStore = ProfileSettingsModeSlice &
  ProfileModeSlice &
  ProfileModalVerificationSlice &
  OtpTimerSlice;

export const useUserProfileStore = create<ProfileStore>()(
  persist(
    (...a) => ({
      ...createProfileSettingsModeSlice(...a),
      ...createProfileModeSlice(...a),
      ...createProfileModalVerificationSlice(...a),
      ...createOtpTimerSlice(...a),
    }),
    {
      name: "user-profile-storage",
    },
  ),
);
