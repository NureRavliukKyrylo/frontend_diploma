import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocaleStore {
  locale: "en" | "ua" | null;
  setLocale: (locale: "en" | "ua") => void;
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
