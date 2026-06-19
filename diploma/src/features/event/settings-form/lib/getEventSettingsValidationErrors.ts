import type {
  EventSettingsErrors,
  EventSettingsValues,
} from "../model/types";

const maxEventDurationMs = 7 * 24 * 60 * 60 * 1000;

export const getEventSettingsValidationErrors = (
  values: EventSettingsValues,
): EventSettingsErrors => {
  const errors: EventSettingsErrors = {};
  const title = values.title.trim();
  const description = values.description.trim();

  if (!title) {
    errors.title = "Event title is required.";
  } else if (title.length > 200) {
    errors.title = "Event title must be 200 characters or less.";
  }

  if (description.length > 1000) {
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
      } else if (end.getTime() - start.getTime() > maxEventDurationMs) {
        errors.endAt = "Maximum event duration is 7 days.";
      }
    }
  }

  if (!values.location) {
    errors.location = "Event location is required.";
  }

  if (values.attendanceRadiusMeters.trim()) {
    const radius = Number(values.attendanceRadiusMeters);

    if (!Number.isFinite(radius) || radius < 10 || radius > 10000) {
      errors.attendanceRadiusMeters =
        "Check-in radius must be between 10 and 10000 meters.";
    }
  }

  return errors;
};
