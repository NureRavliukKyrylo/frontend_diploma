import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StepperStore {
  activeStep: number;
  setActiveStep: (step: number) => void;
  nextStep: () => void;
  resetStep: () => void;
  prevStep: () => void;
}

export const useStepperStore = create<StepperStore>()(
  persist(
    (set, get) => ({
      activeStep: 0,
      setActiveStep: (step) => set({ activeStep: step }),
      nextStep: () => set({ activeStep: get().activeStep + 1 }),
      prevStep: () => set({ activeStep: Math.max(get().activeStep - 1, 0) }),
      resetStep: () => set({ activeStep: 0 }),
    }),
    {
      name: "stepper-store",
    }
  )
);
