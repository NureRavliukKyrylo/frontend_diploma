import { type StateCreator } from "zustand";

export interface UserInfoSlice {
  userId?: string;
  setUserId: (val: string) => void;
}

export const createUserInfoSlice: StateCreator<UserInfoSlice> = (set) => ({
  userId: undefined,
  setUserId: (val) => set({ userId: val }),
});
