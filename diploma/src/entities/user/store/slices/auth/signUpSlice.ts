import { type StateCreator } from "zustand";

export interface SignupSlice {
  firstName: string;
  lastName: string;
  signUpEmail: string;
  signUpPassword: string;
  agreement: boolean;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
  setSignUpEmail: (val: string) => void;
  setSignUpPassword: (val: string) => void;
  setAgreement: (val: boolean) => void;
  clearSignupForm: () => void;
}

export const createSignupSlice: StateCreator<SignupSlice> = (set) => ({
  firstName: "",
  lastName: "",
  signUpEmail: "",
  signUpPassword: "",
  agreement: false,
  setFirstName: (val) => set({ firstName: val }),
  setLastName: (val) => set({ lastName: val }),
  setSignUpEmail: (val) => set({ signUpEmail: val }),
  setSignUpPassword: (val) => set({ signUpPassword: val }),
  setAgreement: (val) => set({ agreement: val }),
  clearSignupForm: () =>
    set({
      firstName: "",
      lastName: "",
      signUpEmail: "",
      signUpPassword: "",
      agreement: false,
    }),
});
