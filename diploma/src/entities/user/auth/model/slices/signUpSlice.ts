import { type StateCreator } from "zustand";

export interface SignupSlice {
  signFirstName: string;
  signLastName: string;
  signUpEmail: string;
  signUpPassword: string;
  agreement: boolean;
  setSignFirstName: (val: string) => void;
  setSignLastName: (val: string) => void;
  setSignUpEmail: (val: string) => void;
  setSignUpPassword: (val: string) => void;
  setAgreement: (val: boolean) => void;
  clearSignupForm: () => void;
}

export const createSignupSlice: StateCreator<SignupSlice> = (set) => ({
  signFirstName: "",
  signLastName: "",
  signUpEmail: "",
  signUpPassword: "",
  agreement: false,
  setSignFirstName: (val) => set({ signFirstName: val }),
  setSignLastName: (val) => set({ signLastName: val }),
  setSignUpEmail: (val) => set({ signUpEmail: val }),
  setSignUpPassword: (val) => set({ signUpPassword: val }),
  setAgreement: (val) => set({ agreement: val }),
  clearSignupForm: () =>
    set({
      signFirstName: "",
      signLastName: "",
      signUpEmail: "",
      signUpPassword: "",
      agreement: false,
    }),
});
