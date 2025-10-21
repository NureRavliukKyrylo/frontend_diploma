import { type StateCreator } from "zustand";

export interface ForgotPasswordSlice {
  emailForgotPassword?: string;
  setEmailForgotPassword: (emailForgotPassword?: string) => void;
  clearEmailForgotPassword: () => void;
}

export const createForgotPasswordSlice: StateCreator<ForgotPasswordSlice> = (
  set
) => ({
  emailForgotPassword: undefined,
  setEmailForgotPassword: (emailForgotPassword) => set({ emailForgotPassword }),
  clearEmailForgotPassword: () => set({ emailForgotPassword: undefined }),
});
