import type {
  CreateEventFormErrors,
  CreateEventFormState,
} from "../model/createEventFormTypes";

const MAX_EVENT_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export const validateCreateEventBasics = (
  values: CreateEventFormState,
): CreateEventFormErrors => {
  if (values.title.trim()) return {};
  return { title: "Event title is required" };
};

export const validateCreateEventLocationDates = (
  values: CreateEventFormState,
): CreateEventFormErrors => {
  const errors: CreateEventFormErrors = {};

  if (!values.startAt) errors.startAt = "Start time is required";
  if (!values.endAt) errors.endAt = "End time is required";

  if (values.startAt && values.endAt) {
    const start = new Date(values.startAt);
    const end = new Date(values.endAt);

    if (end <= start) {
      errors.endAt = "End time must be after start time";
    } else if (end.getTime() - start.getTime() > MAX_EVENT_DURATION_MS) {
      errors.endAt = "Maximum event duration is 7 days";
    }
  }

  return errors;
};

export const validateCreateEventRecurrence = (
  values: CreateEventFormState,
): CreateEventFormErrors => {
  if (!values.recurrence?.enabled) return {};

  const errors: CreateEventFormErrors = {};

  if (!values.recurrence.frequency) {
    errors.recurrenceFrequency = "Frequency is required";
  }
  if (values.recurrence.interval < 1) {
    errors.recurrenceInterval = "Interval must be at least 1";
  }
  if (!values.recurrence.until) {
    errors.recurrenceUntil = "Until date is required";
  } else if (values.startAt) {
    const start = new Date(values.startAt);
    const until = new Date(`${values.recurrence.until}T23:59:59`);
    const maxUntil = new Date(start);
    maxUntil.setFullYear(maxUntil.getFullYear() + 1);

    if (until > maxUntil) {
      errors.recurrenceUntil =
        "Maximum recurrence period is 1 year from start date";
    }
  }

  return errors;
};
