import type {
  CreateTaskFormErrors,
  CreateTaskFormState,
} from "../model/createTaskFormTypes";

const MAX_TASK_DURATION_MS = 24 * 60 * 60 * 1000;

export const validateCreateTaskBasics = (
  values: CreateTaskFormState,
): CreateTaskFormErrors =>
  values.title.trim() ? {} : { title: "Task title is required" };

export const validateCreateTaskDetails = (
  values: CreateTaskFormState,
): CreateTaskFormErrors => {
  const errors: CreateTaskFormErrors = {};

  if (!values.startAt) errors.startAt = "Start time is required";
  if (!values.endAt) errors.endAt = "End time is required";

  if (values.startAt && values.endAt) {
    const start = new Date(values.startAt);
    const end = new Date(values.endAt);

    if (end <= start) {
      errors.endAt = "End time must be after start time";
    } else if (start.toDateString() !== end.toDateString()) {
      errors.endAt = "Task must be within a single calendar day";
    } else if (end.getTime() - start.getTime() > MAX_TASK_DURATION_MS) {
      errors.endAt = "Maximum task duration is 24 hours";
    }
  }

  return errors;
};
