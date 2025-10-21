import { create } from "zustand";

interface ErrorStore {
  errors: Record<string, string | null>;
  setServerError: (key: string, msg: string | null) => void;
  clearError: (key: string) => void;
  clearAllErrors: () => void;
}

export const useErrorStore = create<ErrorStore>((set) => ({
  errors: {},
  setServerError: (key, msg) =>
    set((state) => ({
      errors: { ...state.errors, [key]: msg },
    })),
  clearError: (key) =>
    set((state) => ({
      errors: { ...state.errors, [key]: null },
    })),
  clearAllErrors: () => set({ errors: {} }),
}));
