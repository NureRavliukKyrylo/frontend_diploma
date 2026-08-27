import type {
  ProjectSettingsErrors,
  ProjectSettingsValues,
} from "../model/types";

export const getProjectSettingsValidationErrors = (
  values: ProjectSettingsValues,
): ProjectSettingsErrors => {
  const errors: ProjectSettingsErrors = {};
  const title = values.title.trim();
  const description = values.description.trim();

  if (!title) {
    errors.title = "Project title is required.";
  } else if (title.length > 200) {
    errors.title = "Project title must be 200 characters or less.";
  }

  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length > 1000) {
    errors.description = "Description must be 1000 characters or less.";
  }

  if (values.startAt && values.endAt) {
    const startDate = new Date(`${values.startAt}T00:00:00.000Z`);
    const endDate = new Date(`${values.endAt}T00:00:00.000Z`);

    if (
      !Number.isNaN(startDate.getTime()) &&
      !Number.isNaN(endDate.getTime()) &&
      endDate < startDate
    ) {
      errors.endAt = "End date cannot be before start date.";
    }
  }

  return errors;
};
