import { type StateCreator } from "zustand";

export interface UserInfoSlice {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  isPasswordSet?: boolean;

  setUserId: (val: string) => void;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
  setEmail: (val: string) => void;
  setIsPasswordSet: (val: boolean) => void;
  clearUserInfo: () => void;
}

export const createUserInfoSlice: StateCreator<UserInfoSlice> = (set) => ({
  userId: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  isPasswordSet: undefined,

  setUserId: (val) => set({ userId: val }),
  setFirstName: (val) => set({ firstName: val }),
  setLastName: (val) => set({ lastName: val }),
  setEmail: (val) => set({ email: val }),
  setIsPasswordSet: (val) => set({ isPasswordSet: val }),

  clearUserInfo: () =>
    set({
      userId: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
    }),
});
