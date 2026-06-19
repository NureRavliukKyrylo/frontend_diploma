import type { Task } from "@entities/task";
import type { TaskSettingsValues } from "../model/types";
import { toTaskDateTimeInputValue } from "./dateTime";
import { normalizeTaskPolicy } from "./taskEditPolicy";

export const getTaskLocationLabel = (task: Task) => {
  const locationInfo = task.locationInfo;
  const locationText =
    locationInfo?.address ??
    [locationInfo?.region, locationInfo?.city, locationInfo?.country]
      .filter(Boolean)
      .join(", ");

  if (locationText) return locationText;
  if (task.location?.regionLabel) return task.location.regionLabel;

  if (task.location) {
    return `${task.location.latitude.toFixed(
      4,
    )}, ${task.location.longitude.toFixed(4)}`;
  }

  return "";
};

export const getTaskCategoryIds = (task: Task) => {
  if (task.categoryIds?.length) return task.categoryIds;
  return task.categories?.map((category) => category.id) ?? [];
};

export const getTaskSkillIds = (task: Task) => {
  if (task.skillIds?.length) return task.skillIds;
  return task.skills?.map((skill) => skill.id) ?? [];
};

export const getTaskStatus = (task: Task) => {
  const status = task.taskStatus ?? (task as unknown as { status?: string }).status;
  return status || "Pending";
};

export const getTaskEditDefaults = (task: Task): TaskSettingsValues => ({
  title: task.title ?? "",
  description: task.description ?? "",
  startAt: toTaskDateTimeInputValue(task.startAt),
  endAt: toTaskDateTimeInputValue(task.endAt),
  reminderMode: task.reminderAtUtc
    ? "absolute"
    : typeof task.reminderOffsetMinutes === "number"
      ? "offset"
      : "none",
  reminderOffsetMinutes:
    typeof task.reminderOffsetMinutes === "number"
      ? String(task.reminderOffsetMinutes)
      : "",
  reminderAtUtc: toTaskDateTimeInputValue(task.reminderAtUtc),
  categoryIds: getTaskCategoryIds(task),
  skillIds: getTaskSkillIds(task),
  location: task.location
    ? {
        latitude: task.location.latitude,
        longitude: task.location.longitude,
        regionKey: task.location.regionKey ?? null,
        regionLabel: getTaskLocationLabel(task),
      }
    : null,
  locationLabel: getTaskLocationLabel(task),
  points: typeof task.points === "number" ? String(task.points) : "0",
  estimatedMinutes:
    typeof task.estimatedMinutes === "number"
      ? String(task.estimatedMinutes)
      : "",
  timeLoggingEnabled: task.timeLoggingEnabled ?? false,
  joinPolicy: normalizeTaskPolicy(task.joinPolicy, "open"),
  leavePolicy: normalizeTaskPolicy(task.leavePolicy, "approval_required"),
});
