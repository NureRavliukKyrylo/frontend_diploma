import { create } from "zustand";

interface ErrorStore {
  serverError: string | null;
  setServerError: (msg: string | null) => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  serverError: null,
  setServerError: (msg) => set({ serverError: msg }),
}));
