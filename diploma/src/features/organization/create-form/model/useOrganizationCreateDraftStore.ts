import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  organizationCreateAccessDefaults,
  organizationCreateBasicInfoDefaults,
  type OrganizationCreateAccessValues,
  type OrganizationCreateBasicInfoValues,
  type OrganizationCreateResult,
} from "./types";

interface OrganizationCreateDraftStore {
  activeStep: number;
  basicInfo: OrganizationCreateBasicInfoValues;
  brandingLogo: File | null;
  access: OrganizationCreateAccessValues;
  createdOrganization: OrganizationCreateResult | null;
  setActiveStep: (step: number) => void;
  saveBasicInfo: (values: OrganizationCreateBasicInfoValues) => void;
  saveBrandingLogo: (file: File | null) => void;
  saveAccess: (values: OrganizationCreateAccessValues) => void;
  saveCreatedOrganization: (result: OrganizationCreateResult) => void;
  resetDraft: () => void;
}

export const useOrganizationCreateDraftStore =
  create<OrganizationCreateDraftStore>()(
    devtools(
      persist(
        (set) => ({
          activeStep: 1,
          basicInfo: organizationCreateBasicInfoDefaults,
          brandingLogo: null,
          access: organizationCreateAccessDefaults,
          createdOrganization: null,
          setActiveStep: (step) => set({ activeStep: step }),
          saveBasicInfo: (values) => set({ basicInfo: values }),
          saveBrandingLogo: (file) => set({ brandingLogo: file }),
          saveAccess: (values) => set({ access: values }),
          saveCreatedOrganization: (result) =>
            set({ createdOrganization: result, activeStep: 4 }),
          resetDraft: () =>
            set({
              activeStep: 1,
              basicInfo: organizationCreateBasicInfoDefaults,
              brandingLogo: null,
              access: organizationCreateAccessDefaults,
              createdOrganization: null,
            }),
        }),
        {
          name: "organization-create-draft",
          partialize: (state) => ({
            activeStep: state.activeStep,
            basicInfo: state.basicInfo,
            access: state.access,
            createdOrganization: state.createdOrganization,
          }),
        },
      ),
      { name: "OrganizationCreateDraftStore" },
    ),
  );
