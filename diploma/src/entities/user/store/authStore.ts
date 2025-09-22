import { create } from "zustand";

interface AuthFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  rememberMe: boolean;
  showPassword: boolean;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  setRole: (val: string) => void;
  setRememberMe: (val: boolean) => void;
  setShowPassword: (val: boolean) => void;
  clearForm: () => void;
}

export const useAuthFormStore = create<AuthFormState>((set) => ({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "volunteer",
  rememberMe: false,
  showPassword: false,
  setFirstName: (val) => set({ firstName: val }),
  setLastName: (val) => set({ lastName: val }),
  setEmail: (val) => set({ email: val }),
  setPassword: (val) => set({ password: val }),
  setRole: (val) => set({ role: val }),
  setRememberMe: (val) => set({ rememberMe: val }),
  setShowPassword: (val) => set({ showPassword: val }),
  clearForm: () =>
    set({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "volunteer",
      rememberMe: false,
    }),
}));
