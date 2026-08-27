import type { Task, UpdateTaskPayload } from "@entities/task";
import type { TaskSettingsValues } from "../model/types";
import { toTaskDateTimePayload } from "./dateTime";
import { getTaskStatus } from "./getTaskEditDefaults";

export const roundNonNegative = (value: string, fallback = 0) => {
  const parsed = Number(value.trim() || fallback);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(0, Math.round(parsed));
};

export const buildTaskEditPayload = (
  task: Task,
  formValues: TaskSettingsValues,
): UpdateTaskPayload => ({
  id: task.id,
  title: formValues.title.trim(),
  description: formValues.description.trim(),
  location: formValues.location
    ? {
        latitude: formValues.location.latitude,
        longitude: formValues.location.longitude,
        regionKey: formValues.location.regionKey ?? null,
        regionLabel: formValues.locationLabel.trim() || null,
      }
    : null,
  startAt: toTaskDateTimePayload(formValues.startAt),
  endAt: toTaskDateTimePayload(formValues.endAt),
  reminderAtUtc:
    formValues.reminderMode === "absolute" && formValues.reminderAtUtc
      ? toTaskDateTimePayload(formValues.reminderAtUtc)
      : null,
  reminderOffsetMinutes:
    formValues.reminderMode === "offset"
      ? roundNonNegative(formValues.reminderOffsetMinutes)
      : null,
  status: getTaskStatus(task),
  points: roundNonNegative(formValues.points),
  estimatedMinutes: formValues.estimatedMinutes.trim()
    ? roundNonNegative(formValues.estimatedMinutes)
    : null,
  timeLoggingEnabled: formValues.timeLoggingEnabled,
  categoryIds: formValues.categoryIds,
  skillIds: formValues.skillIds,
  joinPolicy: formValues.joinPolicy,
  leavePolicy: formValues.leavePolicy,
});
