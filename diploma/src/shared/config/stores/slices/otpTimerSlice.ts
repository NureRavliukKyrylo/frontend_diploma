import { type StateCreator } from "zustand";
import { OtpType } from "@shared/config";

export interface OtpTimerSlice {
  otpTimers: Record<OtpType, number>;
  setOtpSeconds: (type: OtpType, value: number) => void;
  resetOtpTimer: (type: OtpType) => void;
  decrementOtpTimer: (type: OtpType) => void;
}

const OTP_INITIAL_SECONDS = 3 * 1;

export const createOtpTimerSlice: StateCreator<OtpTimerSlice> = (set) => ({
  otpTimers: {
    [OtpType.EmailVerification]: OTP_INITIAL_SECONDS,
    [OtpType.TwoFactor]: OTP_INITIAL_SECONDS,
    [OtpType.PasswordReset]: OTP_INITIAL_SECONDS,
  },

  setOtpSeconds: (type, value) =>
    set((state) => ({
      otpTimers: { ...state.otpTimers, [type]: value },
    })),

  resetOtpTimer: (type) =>
    set((state) => ({
      otpTimers: { ...state.otpTimers, [type]: OTP_INITIAL_SECONDS },
    })),

  decrementOtpTimer: (type) =>
    set((state) => ({
      otpTimers: {
        ...state.otpTimers,
        [type]: Math.max(0, state.otpTimers[type] - 1),
      },
    })),
});
