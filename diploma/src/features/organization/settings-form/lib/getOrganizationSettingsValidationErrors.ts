import type {
  OrganizationSettingsErrors,
  OrganizationSettingsValues,
} from "../model/types";

export const getOrganizationSettingsValidationErrors = (
  values: OrganizationSettingsValues,
): OrganizationSettingsErrors => {
  const errors: OrganizationSettingsErrors = {};
  const name = values.name.trim();
  const description = values.description.trim();

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length > 200) {
    errors.name = "Name must be 200 characters or less.";
  }

  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length > 1000) {
    errors.description = "Description must be 1000 characters or less.";
  }

  return errors;
};
