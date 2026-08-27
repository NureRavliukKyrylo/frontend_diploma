import type { Coordinates, Policy } from "@shared/config/types";

export interface EventSettingsLocation extends Coordinates {
  regionKey?: string | null;
  regionLabel?: string | null;
}

export interface EventSettingsSkillRequirement {
  skillId: string;
  expectedHours: number;
}

export interface EventSettingsValues {
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  type: string;
  location: EventSettingsLocation | null;
  locationLabel: string;
  categoryIds: string[];
  requiredSkills: EventSettingsSkillRequirement[];
  joinPolicy: Policy;
  leavePolicy: Policy;
  attendanceEnabled: boolean;
  attendanceRequiresApproval: boolean;
  attendanceRequiresVolunteerCheckout: boolean;
  qrEnabled: boolean;
  geoEnabled: boolean;
  attendanceRadiusMeters: string;
  clearAttendanceRadiusMeters: boolean;
}

export type EventSettingsField = keyof EventSettingsValues;

export type EventSettingsErrors = Partial<
  Record<
    | "title"
    | "description"
    | "startAt"
    | "endAt"
    | "location"
    | "attendanceRadiusMeters",
    string
  >
>;

export type EventSettingsChangeHandler = <Field extends EventSettingsField>(
  field: Field,
  value: EventSettingsValues[Field],
) => void;

export type EventPolicyField = "joinPolicy" | "leavePolicy";

export type EventStatus = "active" | "endingSoon" | "completed" | "archived" | "cancelled";

export interface PendingEventPolicyChange {
  field: EventPolicyField;
  value: Policy;
}

export interface EventSettingsLockState {
  scheduleAndLocationLocked: boolean;
  typeAndSkillsLocked: boolean;
  message: string | null;
}
