import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createProfileModalVerificationSlice,
  type ProfileModalVerificationSlice,
} from "../slices/profileModalVerificationSlice";
import {
  createOtpTimerSlice,
  type OtpTimerSlice,
} from "@shared/config/stores/slices/otpTimerSlice";

type ProfileStore = ProfileModalVerificationSlice & OtpTimerSlice;

export const useUserProfileStore = create<ProfileStore>()(
  persist(
    (...a) => ({
      ...createProfileModalVerificationSlice(...a),
      ...createOtpTimerSlice(...a),
    }),
    {
      name: "user-profile-storage",
    },
  ),
);
