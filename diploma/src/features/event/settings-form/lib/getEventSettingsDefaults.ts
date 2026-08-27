import type { Event } from "@entities/event";
import type {
  EventSettingsSkillRequirement,
  EventSettingsValues,
} from "../model/types";
import { toEventDateTimeInputValue } from "./dateTime";
import { normalizeEventPolicy } from "./eventSettingsPolicy";

export const getEventLocationLabel = (event: Event) => {
  const locationInfo = event.locationInfo;
  const locationText =
    locationInfo?.address ??
    [locationInfo?.region, locationInfo?.city, locationInfo?.country]
      .filter(Boolean)
      .join(", ");

  if (locationText) return locationText;

  if (event.location) {
    return `${event.location.latitude.toFixed(
      4,
    )}, ${event.location.longitude.toFixed(4)}`;
  }

  return "";
};

export const getEventCategoryIds = (event: Event) => {
  if (event.categoryIds?.length) return event.categoryIds;
  return event.categories?.map((category) => category.id) ?? [];
};

export const getEventRequiredSkills = (
  event: Event,
): EventSettingsSkillRequirement[] => {
  if (event.requiredSkills?.length) {
    return event.requiredSkills.map((skill) => ({
      skillId: skill.skillId,
      expectedHours: skill.expectedHours,
    }));
  }

  return (
    event.skills?.map((skill) => ({ skillId: skill.id, expectedHours: 0 })) ?? []
  );
};

export const getEventSettingsDefaults = (
  event: Event,
): EventSettingsValues => ({
  title: event.title ?? "",
  description: event.description ?? "",
  startAt: toEventDateTimeInputValue(event.startAt),
  endAt: toEventDateTimeInputValue(event.endAt),
  type: event.type ?? "",
  location: event.location
    ? {
        latitude: event.location.latitude,
        longitude: event.location.longitude,
        regionLabel: getEventLocationLabel(event),
      }
    : null,
  locationLabel: getEventLocationLabel(event),
  categoryIds: getEventCategoryIds(event),
  requiredSkills: getEventRequiredSkills(event),
  joinPolicy: normalizeEventPolicy(event.joinPolicy, "approval_required"),
  leavePolicy: normalizeEventPolicy(event.leavePolicy, "approval_required"),
  attendanceEnabled: event.attendanceEnabled ?? false,
  attendanceRequiresApproval: event.attendanceRequiresApproval ?? true,
  attendanceRequiresVolunteerCheckout:
    event.attendanceRequiresVolunteerCheckout ?? true,
  qrEnabled: event.qrEnabled ?? false,
  geoEnabled: event.geoEnabled ?? false,
  attendanceRadiusMeters:
    typeof event.attendanceRadiusMeters === "number"
      ? String(event.attendanceRadiusMeters)
      : "",
  clearAttendanceRadiusMeters: false,
});
