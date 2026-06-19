import type { Coordinates, Policy } from "@shared/config/types";

export interface ProjectSettingsLocation extends Coordinates {
  regionKey?: string | null;
  regionLabel?: string | null;
}

export interface ProjectSettingsValues {
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  location: ProjectSettingsLocation | null;
  locationLabel: string;
  categoryIds: string[];
  joinPolicy: Policy;
  leavePolicy: Policy;
}

export type ProjectSettingsField = keyof ProjectSettingsValues;

export type ProjectSettingsErrors = Partial<
  Record<"title" | "description" | "startAt" | "endAt" | "location", string>
>;

export type ProjectSettingsChangeHandler = <
  Field extends ProjectSettingsField,
>(
  field: Field,
  value: ProjectSettingsValues[Field],
) => void;

export type ProjectPolicyField = "joinPolicy" | "leavePolicy";

export interface PendingProjectPolicyChange {
  field: ProjectPolicyField;
  value: Policy;
}
