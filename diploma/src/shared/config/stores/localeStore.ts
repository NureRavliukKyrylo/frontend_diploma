import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocaleStore {
  locale: "en" | "uk" | null;
  setLocale: (locale: "en" | "uk") => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: null,
      setLocale: (locale) => set({ locale }),
    }),
    { name: "locale" },
  ),
);
