import type { Coordinates, Policy } from "@shared/config/types";

export type TaskReminderMode = "none" | "offset" | "absolute";

export interface TaskSettingsLocation extends Coordinates {
  regionKey?: string | null;
  regionLabel?: string | null;
}

export interface TaskSettingsValues {
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  reminderMode: TaskReminderMode;
  reminderOffsetMinutes: string;
  reminderAtUtc: string;
  categoryIds: string[];
  skillIds: string[];
  location: TaskSettingsLocation | null;
  locationLabel: string;
  points: string;
  estimatedMinutes: string;
  timeLoggingEnabled: boolean;
  joinPolicy: Policy;
  leavePolicy: Policy;
}

export type TaskSettingsField = keyof TaskSettingsValues;

export type TaskSettingsErrors = Partial<
  Record<
    | "title"
    | "description"
    | "startAt"
    | "endAt"
    | "reminderOffsetMinutes"
    | "reminderAtUtc"
    | "points"
    | "estimatedMinutes",
    string
  >
>;

export type TaskSettingsChangeHandler = <Field extends TaskSettingsField>(
  field: Field,
  value: TaskSettingsValues[Field],
) => void;

export type TaskPolicyField = "joinPolicy" | "leavePolicy";

export interface PendingTaskPolicyChange {
  field: TaskPolicyField;
  value: Policy;
}
