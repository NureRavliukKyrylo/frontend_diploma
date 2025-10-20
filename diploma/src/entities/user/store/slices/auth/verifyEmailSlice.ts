import { type StateCreator } from "zustand";

export interface VerifyEmailSlice {
  userId?: string;
  code: string;
  setUserId: (val: string) => void;
  setVerifyCode: (val: string) => void;
  clearVerifyForm: () => void;
}

export const createVerifyEmailSlice: StateCreator<VerifyEmailSlice> = (
  set
) => ({
  code: "",
  setUserId: (val) => set({ userId: val }),
  setVerifyCode: (val) => set({ code: val }),
  clearVerifyForm: () =>
    set({
      userId: undefined,
      code: "",
    }),
});
