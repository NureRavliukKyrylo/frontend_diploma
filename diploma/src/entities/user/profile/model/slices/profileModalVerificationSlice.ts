import type { StateCreator } from "zustand";
import type { VerificationModalType } from "../types/verificationModalType";

export interface ProfileModalVerificationSlice {
  activeVerificationModal: VerificationModalType;
  verificationSteps: Record<Exclude<VerificationModalType, null>, number>;

  openVerificationModal: (modal: Exclude<VerificationModalType, null>) => void;
  closeVerificationModal: () => void;
  setVerificationStep: (
    modal: Exclude<VerificationModalType, null>,
    step: number,
  ) => void;
  nextVerificationStep: (modal: Exclude<VerificationModalType, null>) => void;
}

export const createProfileModalVerificationSlice: StateCreator<
  ProfileModalVerificationSlice
> = (set) => ({
  activeVerificationModal: null,

  verificationSteps: {
    emailVerification: 1,
    changePassword: 1,
    twoFactor: 1,
  },

  openVerificationModal: (modal) => set({ activeVerificationModal: modal }),

  closeVerificationModal: () => set({ activeVerificationModal: null }),

  setVerificationStep: (modal, step) =>
    set((state) => ({
      verificationSteps: { ...state.verificationSteps, [modal]: step },
    })),

  nextVerificationStep: (modal) =>
    set((state) => ({
      verificationSteps: {
        ...state.verificationSteps,
        [modal]: state.verificationSteps[modal] + 1,
      },
    })),
});
