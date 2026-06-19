import { type OrganizationCreatePolicyValue } from "@features/organization/create-form";

export const organizationCreateStepNumbers = [1, 2, 3, 4] as const;

export type OrganizationCreateStep =
  (typeof organizationCreateStepNumbers)[number];

export const organizationCreateStepMeta: Record<
  OrganizationCreateStep,
  {
    title: string;
    subtitle: string;
  }
> = {
  1: {
    title: "BASIC INFO",
    subtitle: "How would you describe your organization?",
  },
  2: {
    title: "BRANDING",
    subtitle: "Which logo would you like to upload?",
  },
  3: {
    title: "ACCESS",
    subtitle: "Who can join and leave your organization?",
  },
  4: {
    title: "GET STARTED",
    subtitle: "Your organization is ready — what's next?",
  },
};

interface OrganizationCreateAccessOption {
  value: OrganizationCreatePolicyValue;
  label: string;
  description: string;
}

export const organizationCreateAccessOptions: Record<
  "joinPolicy" | "leavePolicy",
  OrganizationCreateAccessOption[]
> = {
  joinPolicy: [
    {
      value: "open",
      label: "Open access",
      description: "Anyone can join instantly",
    },
    {
      value: "approval_required",
      label: "Approval required",
      description: "Owners review join requests",
    },
  ],
  leavePolicy: [
    {
      value: "open",
      label: "Instant leave",
      description: "Members can leave anytime",
    },
    {
      value: "approval_required",
      label: "Approval required",
      description: "Owners review leave requests",
    },
  ],
};
