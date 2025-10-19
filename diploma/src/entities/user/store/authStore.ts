import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import {
  createAuthModeSlice,
  type AuthModeSlice,
} from "./slices/auth/authModeSlice";
import {
  createStepperSlice,
  type StepperSlice,
} from "./slices/auth/stepperSlice";
import { createLoginSlice, type LoginSlice } from "./slices/auth/loginSlice";
import { createSignupSlice, type SignupSlice } from "./slices/auth/signUpSlice";
import {
  createUserFillingSlice,
  type UserFillingSlice,
} from "./slices/auth/fillingFormSlice";
import { base64ToFile } from "../../../shared/libs";

type AuhtStore = AuthModeSlice &
  StepperSlice &
  LoginSlice &
  SignupSlice &
  UserFillingSlice;

export const useAuthStore = create<AuhtStore>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthModeSlice(...a),
        ...createStepperSlice(...a),
        ...createLoginSlice(...a),
        ...createSignupSlice(...a),
        ...createUserFillingSlice(...a),
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
