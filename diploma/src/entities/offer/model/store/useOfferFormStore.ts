import type { Coordinates } from "@shared/config/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OfferFormData {
  id: string | null;
  title: string;
  description: string;
  priceMinutes: number | "";
  startAt: string | null;
  endAt: string | null;
  isOnline: boolean;
  location: Coordinates | null;
  categoryIds: string[];
  skillIds: string[];
}

interface OfferFormStore {
  step: number;
  isOpen: boolean;
  data: OfferFormData;
  setStep: (step: number) => void;
  setData: (data: Partial<OfferFormData>) => void;
  open: (initialValues?: Partial<OfferFormData>) => void;
  close: () => void;
  clear: () => void;
}

const defaultData: OfferFormData = {
  id: null,
  title: "",
  description: "",
  priceMinutes: "",
  startAt: null,
  endAt: null,
  isOnline: false,
  location: null,
  categoryIds: [],
  skillIds: [],
};

export const useOfferFormStore = create<OfferFormStore>()(
  persist(
    (set) => ({
      step: 0,
      isOpen: false,
      data: defaultData,
      setStep: (step) => set({ step }),
      setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
      open: (initialValues) =>
        set(() => ({
          isOpen: true,
          data: { ...defaultData, ...initialValues },
          step: 0,
        })),
      close: () => set({ isOpen: false, data: defaultData, step: 0 }),
      clear: () => set({ step: 0, data: defaultData }),
    }),
    {
      name: "offer-form-store",
    },
  ),
);
