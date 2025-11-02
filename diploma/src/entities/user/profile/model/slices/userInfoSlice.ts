import { type StateCreator } from "zustand";

export interface UserInfoSlice {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;

  setUserId: (val: string) => void;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
  setEmail: (val: string) => void;
  clearUserInfo: () => void;
}

export const createUserInfoSlice: StateCreator<UserInfoSlice> = (set) => ({
  userId: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,

  setUserId: (val) => set({ userId: val }),
  setFirstName: (val) => set({ firstName: val }),
  setLastName: (val) => set({ lastName: val }),
  setEmail: (val) => set({ email: val }),

  clearUserInfo: () =>
    set({
      userId: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
    }),
});
