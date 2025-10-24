import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import {
  createAuthModeSlice,
  type AuthModeSlice,
} from "./slices/auth/authModeSlice";
import { createStepperSlice, type StepperSlice } from "@shared/config";
import { createLoginSlice, type LoginSlice } from "./slices/auth/loginSlice";
import { createSignupSlice, type SignupSlice } from "./slices/auth/signUpSlice";
import { base64ToFile } from "@shared/libs";
import {
  createOtpTimerSlice,
  type OtpTimerSlice,
} from "@shared/config/stores/slices/otpTimerSlice";
import {
  createForgotPasswordSlice,
  type ForgotPasswordSlice,
} from "./slices/auth/forgotPasswordSlice";
import {
  type UserProfileSlice,
  createUserProfileSlice,
} from "./slices/profile/userProfileSlice";

type AuhtStore = AuthModeSlice &
  StepperSlice &
  LoginSlice &
  SignupSlice &
  UserProfileSlice &
  OtpTimerSlice &
  ForgotPasswordSlice;

export const useAuthStore = create<AuhtStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthModeSlice(...a),
        ...createStepperSlice(...a),
        ...createLoginSlice(...a),
        ...createSignupSlice(...a),
        ...createUserProfileSlice(...a),
        ...createOtpTimerSlice(...a),
        ...createForgotPasswordSlice(...a),
      }),
      {
        name: "auth-store",
        partialize: (state) => ({
          mode: state.mode,
          activeStep: state.activeStep,
          skipped: Array.from(state.skipped),
          completed: Array.from(state.completed),
          profile: state.profile,
          privacySettings: state.privacySettings,
          avatarUrl: state.avatarUrl,
          otpTimers: state.otpTimers,
          emailForgotPassword: state.emailForgotPassword,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.skipped = new Set(state.skipped ?? []);
            state.completed = new Set(state.completed ?? []);
          }
          if (state?.avatarUrl) {
            state.avatarFile = base64ToFile(state.avatarUrl, "avatar.png");
          }
        },
      }
    ),
    { name: "AuthStore" }
  )
);
