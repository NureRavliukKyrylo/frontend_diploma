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
          avatarUrl: state.profile.avatarUrl,
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.skipped = new Set(state.skipped ?? []);
            state.completed = new Set(state.completed ?? []);
          }
        },
      }
    ),
    { name: "AuthStore" }
  )
);
