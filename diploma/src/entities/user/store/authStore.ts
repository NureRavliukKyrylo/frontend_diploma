import { create } from "zustand";
import { type Role } from "../../../shared/constants";

interface AuthFormState {
  firstName: string;
  lastName: string;
  loginEmail: string;
  registerEmail: string;
  password: string;
  rememberMe: boolean;
  agreement: boolean;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
  setLoginEmail: (val: string) => void;
  setRegisterEmail: (val: string) => void;
  setPassword: (val: string) => void;
  setRememberMe: (val: boolean) => void;
  setAgreement: (val: boolean) => void;
  clearForm: () => void;
}

export const useAuthFormStore = create<AuthFormState>((set) => ({
  firstName: "",
  lastName: "",
  loginEmail: "",
  registerEmail: "",
  password: "",
  rememberMe: false,
  agreement: false,
  setFirstName: (val) => set({ firstName: val }),
  setLastName: (val) => set({ lastName: val }),
  setLoginEmail: (val) => set({ loginEmail: val }),
  setRegisterEmail: (val) => set({ registerEmail: val }),
  setPassword: (val) => set({ password: val }),
  setRememberMe: (val) => set({ rememberMe: val }),
  setAgreement: (val) => set({ agreement: val }),
  clearForm: () =>
    set({
      firstName: "",
      lastName: "",
      loginEmail: "",
      password: "",
      rememberMe: false,
    }),
}));
