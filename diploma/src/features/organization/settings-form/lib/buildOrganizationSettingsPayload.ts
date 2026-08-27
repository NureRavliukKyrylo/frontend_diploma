import type {
  Organization,
  UpdateOrganizationDto,
} from "@entities/organization";
import type { OrganizationSettingsValues } from "../model/types";
import { toOrganizationStartAtPayload } from "./date";

export const buildOrganizationSettingsPayload = (
  organization: Organization,
  formValues: OrganizationSettingsValues,
): UpdateOrganizationDto => ({
  id: organization.id,
  name: formValues.name.trim(),
  description: formValues.description.trim(),
  startAt: toOrganizationStartAtPayload(formValues.startAt),
  contactEmail: formValues.contactEmail.trim() || null,
  phoneNumber: formValues.phoneNumber.trim() || null,
  website: formValues.website.trim() || null,
  socialLinks: organization.socialLinks ?? [],
  location: formValues.location
    ? {
        ...formValues.location,
        regionLabel: formValues.locationLabel.trim() || null,
      }
    : null,
  joinPolicy: formValues.joinPolicy,
  leavePolicy: formValues.leavePolicy,
});
