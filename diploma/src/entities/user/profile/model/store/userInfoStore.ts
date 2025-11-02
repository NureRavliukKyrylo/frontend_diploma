import { create } from "zustand";
import {
  createUserInfoSlice,
  type UserInfoSlice,
} from "../slices/userInfoSlice";
import { persist } from "zustand/middleware";

export const useUserStore = create<UserInfoSlice>()(
  persist(
    (...a) => ({
      ...createUserInfoSlice(...a),
    }),
    {
      name: "user-info-storage",
    }
  )
);
