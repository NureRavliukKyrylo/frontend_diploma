export interface OrganizationCreateBasicInfoValues {
  name: string;
  website: string;
  contactEmail: string;
  description: string;
}

export type OrganizationCreatePolicyValue = "open" | "approval_required";

export interface OrganizationCreateAccessValues {
  joinPolicy: OrganizationCreatePolicyValue;
  leavePolicy: OrganizationCreatePolicyValue;
}

export interface OrganizationCreateResult {
  id: string;
  name: string;
}

export const organizationCreateBasicInfoDefaults: OrganizationCreateBasicInfoValues =
  {
    name: "",
    website: "",
    contactEmail: "",
    description: "",
  };

export const organizationCreateAccessDefaults: OrganizationCreateAccessValues =
  {
    joinPolicy: "open",
    leavePolicy: "open",
  };
