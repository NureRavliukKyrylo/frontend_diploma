import { type StateCreator } from "zustand";

export interface StepperSlice {
  activeStep: number;
  skipped: Set<number>;
  completed: Set<number>;

  setActiveStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
  skipStep: () => void;
  isStepSkipped: (step: number) => boolean;
  isStepCompleted: (step: number) => boolean;
}

export const createStepperSlice: StateCreator<StepperSlice> = (set, get) => ({
  activeStep: 0,
  skipped: new Set<number>(),
  completed: new Set<number>(),

  setActiveStep: (step) => set({ activeStep: step }),

  nextStep: () => {
    const { activeStep, skipped, completed } = get();
    const newCompleted = new Set(completed);
    newCompleted.add(activeStep);

    if (skipped.has(activeStep)) {
      skipped.delete(activeStep);
    }

    set({
      activeStep: activeStep + 1,
      completed: newCompleted,
      skipped,
    });
  },

  prevStep: () => set({ activeStep: Math.max(get().activeStep - 1, 0) }),

  resetStep: () =>
    set({
      activeStep: 0,
      skipped: new Set<number>(),
      completed: new Set<number>(),
    }),

  skipStep: () => {
    const { activeStep, skipped } = get();
    const newSkipped = new Set(skipped);
    newSkipped.add(activeStep);
    set({ activeStep: activeStep + 1, skipped: newSkipped });
  },

  isStepSkipped: (step) => get().skipped.has(step),
  isStepCompleted: (step) => get().completed.has(step),
});
