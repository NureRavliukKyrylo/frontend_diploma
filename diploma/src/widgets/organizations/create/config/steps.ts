import { type OrganizationCreatePolicyValue } from "@features/organization/create-form";

export const organizationCreateStepNumbers = [1, 2, 3, 4] as const;

export type OrganizationCreateStep =
  (typeof organizationCreateStepNumbers)[number];

export const organizationCreateStepMeta: Record<
  OrganizationCreateStep,
  {
    titleKey: string;
    subtitleKey: string;
  }
> = {
  1: {
    titleKey: "create.steps.basics",
    subtitleKey: "create.steps.basicsText",
  },
  2: {
    titleKey: "create.steps.branding",
    subtitleKey: "create.steps.brandingText",
  },
  3: {
    titleKey: "create.steps.access",
    subtitleKey: "create.steps.accessText",
  },
  4: {
    titleKey: "create.steps.finish",
    subtitleKey: "create.steps.finishText",
  },
};

interface OrganizationCreateAccessOption {
  value: OrganizationCreatePolicyValue;
  labelKey: string;
  descriptionKey: string;
}

export const organizationCreateAccessOptions: Record<
  "joinPolicy" | "leavePolicy",
  OrganizationCreateAccessOption[]
> = {
  joinPolicy: [
    {
      value: "open",
      labelKey: "create.access.openAccess",
      descriptionKey: "create.access.openAccessText",
    },
    {
      value: "approval_required",
      labelKey: "create.access.joinApproval",
      descriptionKey: "create.access.joinApprovalText",
    },
  ],
  leavePolicy: [
    {
      value: "open",
      labelKey: "create.access.instantLeave",
      descriptionKey: "create.access.instantLeaveText",
    },
    {
      value: "approval_required",
      labelKey: "create.access.leaveApproval",
      descriptionKey: "create.access.leaveApprovalText",
    },
  ],
};
