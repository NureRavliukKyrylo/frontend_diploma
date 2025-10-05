import { type StateCreator } from "zustand";

export interface StepperSlice {
  activeStep: number;
  setActiveStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

export const createStepperSlice: StateCreator<StepperSlice> = (set, get) => ({
  activeStep: 0,
  setActiveStep: (step) => set({ activeStep: step }),
  nextStep: () => set({ activeStep: get().activeStep + 1 }),
  prevStep: () => set({ activeStep: Math.max(get().activeStep - 1, 0) }),
  resetStep: () => set({ activeStep: 0 }),
});
