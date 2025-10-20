import { type StateCreator } from "zustand";

export interface OtpTimerSlice {
  otpSeconds: number;
  currentOtpType: "email" | "forgotPassword" | null;
  setOtpSeconds: (value: number) => void;
  setCurrentOtpType: (type: "email" | "forgotPassword" | null) => void;
  resetOtpTimer: () => void;
}

export const createOtpTimerSlice: StateCreator<OtpTimerSlice> = (set) => ({
  otpSeconds: 3 * 60,
  currentOtpType: null,
  setOtpSeconds: (value) => set({ otpSeconds: value }),
  setCurrentOtpType: (type) => set({ currentOtpType: type }),
  resetOtpTimer: () => set({ otpSeconds: 3 * 60 }),
});
