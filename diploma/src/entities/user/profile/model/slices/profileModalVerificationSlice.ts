import type { StateCreator } from "zustand";
import type { VerificationModalType } from "../types/verificationModalType";
import type { ConnectedLinkPlatform } from "../../config/connectedLinks";

export interface ProfileModalVerificationSlice {
  activeVerificationModal: VerificationModalType;
  verificationSteps: Record<Exclude<VerificationModalType, null>, number>;
  newEmail: string | null;
  unlinkTarget: {
    platform: ConnectedLinkPlatform | null;
  };
  openVerificationModal: (modal: Exclude<VerificationModalType, null>) => void;
  closeVerificationModal: (modal: Exclude<VerificationModalType, null>) => void;
  setVerificationStep: (
    modal: Exclude<VerificationModalType, null>,
    step: number,
  ) => void;
  nextVerificationStep: (modal: Exclude<VerificationModalType, null>) => void;
  setNewEmail: (email: string) => void;
  setUnlinkTarget: (platform: ConnectedLinkPlatform | null) => void;
}

export const createProfileModalVerificationSlice: StateCreator<
  ProfileModalVerificationSlice
> = (set) => ({
  newEmail: null,
  activeVerificationModal: null,
  unlinkTarget: { platform: null },
  verificationSteps: {
    emailVerification: 1,
    changePassword: 1,
    twoFactorEnable: 1,
    twoFactorDisable: 1,
    unlink: 1,
  },

  setNewEmail: (email) => set({ newEmail: email }),

  openVerificationModal: (modal) => set({ activeVerificationModal: modal }),

  setUnlinkTarget: (platform) => set({ unlinkTarget: { platform: platform } }),

  closeVerificationModal: (modal) =>
    set((state) => ({
      activeVerificationModal: null,
      verificationSteps: { ...state.verificationSteps, [modal]: 1 },
      unlinkTarget:
        modal === "unlink"
          ? { platform: null, otpType: null }
          : state.unlinkTarget,
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
