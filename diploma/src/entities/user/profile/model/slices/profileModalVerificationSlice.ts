import type { StateCreator } from "zustand";
import type { VerificationModalType } from "../types/verificationModalType";

export interface ProfileModalVerificationSlice {
  activeVerificationModal: VerificationModalType;
  verificationSteps: Record<Exclude<VerificationModalType, null>, number>;
  newEmail: string | null;
  openVerificationModal: (modal: Exclude<VerificationModalType, null>) => void;
  closeVerificationModal: (modal: Exclude<VerificationModalType, null>) => void;
  setVerificationStep: (
    modal: Exclude<VerificationModalType, null>,
    step: number,
  ) => void;
  nextVerificationStep: (modal: Exclude<VerificationModalType, null>) => void;
  setNewEmail: (email: string) => void;
}

export const createProfileModalVerificationSlice: StateCreator<
  ProfileModalVerificationSlice
> = (set) => ({
  newEmail: null,
  activeVerificationModal: null,

  verificationSteps: {
    emailVerification: 1,
    changePassword: 1,
    twoFactor: 1,
  },

  setNewEmail: (email) => set({ newEmail: email }),
  openVerificationModal: (modal) => set({ activeVerificationModal: modal }),

  closeVerificationModal: (modal) =>
    set((state) => ({
      activeVerificationModal: null,
      verificationSteps: { ...state.verificationSteps, [modal]: 1 },
    })),

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
