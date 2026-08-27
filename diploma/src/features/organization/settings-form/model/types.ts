import type { Coordinates } from "@shared/config/types";

export type OrganizationPolicyValue = "open" | "approval_required";

export interface OrganizationSettingsValues {
  name: string;
  phoneNumber: string;
  description: string;
  startAt: string;
  contactEmail: string;
  website: string;
  location: Coordinates | null;
  locationLabel: string;
  joinPolicy: OrganizationPolicyValue;
  leavePolicy: OrganizationPolicyValue;
}

export type OrganizationSettingsErrors = Partial<
  Record<keyof OrganizationSettingsValues, string>
>;

export type OrganizationSettingsChangeHandler = <
  Field extends keyof OrganizationSettingsValues,
>(
  field: Field,
  value: OrganizationSettingsValues[Field],
) => void;

export type OrganizationPolicyChangeHandler = (
  field: "joinPolicy" | "leavePolicy",
  value: OrganizationPolicyValue,
) => void;

export type OrganizationPolicyField = "joinPolicy" | "leavePolicy";

export interface PendingOrganizationPolicyChange {
  field: OrganizationPolicyField;
  value: OrganizationPolicyValue;
}
