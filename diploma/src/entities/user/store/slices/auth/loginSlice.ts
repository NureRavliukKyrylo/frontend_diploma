import { type StateCreator } from "zustand";

export interface LoginSlice {
  loginEmail: string;
  loginPassword: string;
  rememberMe: boolean;
  setLoginEmail: (val: string) => void;
  setLoginPassword: (val: string) => void;
  setRememberMe: (val: boolean) => void;
  clearLoginForm: () => void;
}

export const createLoginSlice: StateCreator<LoginSlice> = (set) => ({
  loginEmail: "",
  loginPassword: "",
  rememberMe: false,
  setLoginEmail: (val) => set({ loginEmail: val }),
  setLoginPassword: (val) => set({ loginPassword: val }),
  setRememberMe: (val) => set({ rememberMe: val }),
  clearLoginForm: () =>
    set({ loginEmail: "", loginPassword: "", rememberMe: false }),
});
