import { type StateCreator } from "zustand";
import { OtpType } from "@shared/config/types";

export interface OtpTimerSlice {
  otpTimers: Record<OtpType, number>;
  setOtpSeconds: (type: OtpType, value: number) => void;
  resetOtpTimer: (type: OtpType) => void;
  decrementOtpTimer: (type: OtpType) => void;
}

const OTP_INITIAL_SECONDS = 3 * 3;

const createInitialTimers = (value: number): Record<OtpType, number> =>
  Object.values(OtpType).reduce(
    (acc, type) => ({ ...acc, [type]: value }),
    {} as Record<OtpType, number>,
  );

export const createOtpTimerSlice: StateCreator<OtpTimerSlice> = (set) => ({
  otpTimers: createInitialTimers(OTP_INITIAL_SECONDS),

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
