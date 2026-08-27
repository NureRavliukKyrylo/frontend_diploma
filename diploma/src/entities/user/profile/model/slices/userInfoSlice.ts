import type { SystemRole } from "@shared/config/types";
import { type StateCreator } from "zustand";

export interface UserInfoSlice {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: SystemRole;
  systemRole?: string;
  isPasswordSet?: boolean;
  isAuthenticated?: boolean;

  setUserId: (val: string) => void;
  setFirstName: (val: string) => void;
  setLastName: (val: string) => void;
  setEmail: (val: string) => void;
  setSystemRole: (val: string | undefined) => void;
  setIsPasswordSet: (val: boolean) => void;
  setIsAuthenticated: (val: boolean) => void;
  setRole: (val: SystemRole) => void;
  clearUserInfo: () => void;
}

export const createUserInfoSlice: StateCreator<UserInfoSlice> = (set) => ({
  userId: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  systemRole: undefined,
  isPasswordSet: undefined,
  isAuthenticated: undefined,
  role: undefined,

  setUserId: (val) => set({ userId: val }),
  setFirstName: (val) => set({ firstName: val }),
  setLastName: (val) => set({ lastName: val }),
  setEmail: (val) => set({ email: val }),
  setSystemRole: (val) => set({ systemRole: val }),
  setIsAuthenticated: (val) => set({ isAuthenticated: val }),
  setIsPasswordSet: (val) => set({ isPasswordSet: val }),
  setRole: (val) => set({ role: val }),
  clearUserInfo: () =>
    set({
      userId: undefined,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      systemRole: undefined,
      isAuthenticated: undefined,
      role: undefined,
    }),
});
