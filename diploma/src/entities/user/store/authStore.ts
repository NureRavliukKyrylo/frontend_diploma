import { create } from "zustand";
import { type Role } from "../../../shared/constants";

interface AuthFormState {
  firstName: string;
  lastName: string;
  loginEmail: string;
  registerEmail: string;
  password: string;
  role: Role | null;
  rememberMe: boolean;
  showPassword: boolean;
  agreement: boolean;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
  setLoginEmail: (val: string) => void;
  setRegisterEmail: (val: string) => void;
  setPassword: (val: string) => void;
  setRole: (val: Role) => void;
  setRememberMe: (val: boolean) => void;
  setAgreement: (val: boolean) => void;
  setShowPassword: (val: boolean) => void;
  clearForm: () => void;
}

export const useAuthFormStore = create<AuthFormState>((set) => ({
  firstName: "",
  lastName: "",
  loginEmail: "",
  registerEmail: "",
  password: "",
  role: null,
  rememberMe: false,
  showPassword: false,
  agreement: false,
  setFirstName: (val) => set({ firstName: val }),
  setLastName: (val) => set({ lastName: val }),
  setLoginEmail: (val) => set({ loginEmail: val }),
  setRegisterEmail: (val) => set({ registerEmail: val }),
  setPassword: (val) => set({ password: val }),
  setRole: (val) => set({ role: val }),
  setRememberMe: (val) => set({ rememberMe: val }),
  setShowPassword: (val) => set({ showPassword: val }),
  setAgreement: (val) => set({ agreement: val }),
  clearForm: () =>
    set({
      firstName: "",
      lastName: "",
      loginEmail: "",
      password: "",
      role: "volunteer",
      rememberMe: false,
    }),
}));
