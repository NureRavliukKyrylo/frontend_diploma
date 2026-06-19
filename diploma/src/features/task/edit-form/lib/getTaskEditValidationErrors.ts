import type { TaskSettingsErrors, TaskSettingsValues } from "../model/types";

const maxTaskDurationMs = 24 * 60 * 60 * 1000;

const isSameCalendarDay = (start: Date, end: Date) =>
  start.getFullYear() === end.getFullYear() &&
  start.getMonth() === end.getMonth() &&
  start.getDate() === end.getDate();

const validateNumberField = (
  value: string,
  label: string,
  optional = false,
) => {
  const trimmed = value.trim();
  if (!trimmed && optional) return null;

  const parsed = Number(trimmed || 0);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return `${label} must be 0 or greater.`;
  }

  return null;
};

export const getTaskEditValidationErrors = (
  values: TaskSettingsValues,
): TaskSettingsErrors => {
  const errors: TaskSettingsErrors = {};
  const title = values.title.trim();
  const description = values.description.trim();

  if (!title) {
    errors.title = "Task title is required.";
  } else if (title.length > 200) {
    errors.title = "Task title must be 200 characters or less.";
  }

  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length > 1000) {
    errors.description = "Description must be 1000 characters or less.";
  }

  if (!values.startAt) {
    errors.startAt = "Start date and time are required.";
  }

  if (!values.endAt) {
    errors.endAt = "End date and time are required.";
  }

  if (values.startAt && values.endAt) {
    const start = new Date(values.startAt);
    const end = new Date(values.endAt);

    if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime())) {
      if (end <= start) {
        errors.endAt = "End time must be after start time.";
      } else if (end.getTime() - start.getTime() > maxTaskDurationMs) {
        errors.endAt = "Task duration must be 24 hours or less.";
      } else if (!isSameCalendarDay(start, end)) {
        errors.endAt = "Task must stay within a single calendar day.";
      }
    }
  }

  if (values.reminderMode === "offset") {
    const error = validateNumberField(
      values.reminderOffsetMinutes,
      "Reminder minutes",
    );
    if (error) errors.reminderOffsetMinutes = error;
  }

  if (values.reminderMode === "absolute" && !values.reminderAtUtc) {
    errors.reminderAtUtc = "Choose a reminder time.";
  }

  const pointsError = validateNumberField(values.points, "Points");
  if (pointsError) errors.points = pointsError;

  const estimatedError = validateNumberField(
    values.estimatedMinutes,
    "Estimated minutes",
    true,
  );
  if (estimatedError) errors.estimatedMinutes = estimatedError;

  return errors;
};
