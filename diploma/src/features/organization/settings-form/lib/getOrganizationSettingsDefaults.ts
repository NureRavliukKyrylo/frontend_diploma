import type { Organization } from "@entities/organization";
import type { OrganizationSettingsValues } from "../model/types";
import { toOrganizationDateInputValue } from "./date";
import { normalizeOrganizationPolicy } from "./organizationSettingsPolicy";

export const getOrganizationLocationLabel = (organization: Organization) => {
  const locationInfo = organization.locationInfo;
  const address = locationInfo?.address;
  const region = locationInfo?.region;
  const city = locationInfo?.city;
  const country = locationInfo?.country;
  const locationText = address ?? [region, city, country].filter(Boolean).join(", ");

  if (locationText) return locationText;

  if (organization.location) {
    const { latitude, longitude } = organization.location;
    return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
  }

  return "";
};

export const getOrganizationSettingsDefaults = (
  organization: Organization,
): OrganizationSettingsValues => ({
  name: organization.name ?? "",
  phoneNumber: organization.phoneNumber ?? "",
  description: organization.description ?? "",
  startAt: toOrganizationDateInputValue(
    organization.launchDate ?? organization.createdAt,
  ),
  contactEmail: organization.contactEmail ?? "",
  website: organization.website ?? "",
  location: organization.location ?? null,
  locationLabel: getOrganizationLocationLabel(organization),
  joinPolicy: normalizeOrganizationPolicy(organization.joinPolicy, "open"),
  leavePolicy: normalizeOrganizationPolicy(
    organization.leavePolicy,
    "approval_required",
  ),
});

export const getOrganizationInitials = (name: string) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "IF";
};
