import type { UpdateEventPayload } from "@entities/event";
import type { EventSettingsValues } from "../model/types";
import { toEventDateTimePayload } from "./dateTime";

export const buildEventSettingsPayload = (
  eventId: string,
  formValues: EventSettingsValues,
): UpdateEventPayload => {
  if (!formValues.location) {
    throw new Error("Event location is required.");
  }

  const radiusValue = formValues.attendanceRadiusMeters.trim();

  return {
    id: eventId,
    title: formValues.title.trim(),
    description: formValues.description.trim() || null,
    startAt: toEventDateTimePayload(formValues.startAt),
    endAt: toEventDateTimePayload(formValues.endAt),
    type: formValues.type.trim() || null,
    location: {
      latitude: formValues.location.latitude,
      longitude: formValues.location.longitude,
      regionKey: formValues.location.regionKey ?? null,
      regionLabel: formValues.locationLabel.trim() || null,
    },
    categoryIds: formValues.categoryIds,
    requiredSkills: formValues.requiredSkills
      .filter((skill) => skill.skillId.trim())
      .map((skill) => ({
        skillId: skill.skillId.trim(),
        expectedHours: Math.max(0, Math.round(skill.expectedHours)),
      })),
    joinPolicy: formValues.joinPolicy,
    leavePolicy: formValues.leavePolicy,
    attendanceEnabled: formValues.attendanceEnabled,
    attendanceRequiresApproval: formValues.attendanceRequiresApproval,
    attendanceRequiresVolunteerCheckout:
      formValues.attendanceRequiresVolunteerCheckout,
    qrEnabled: formValues.qrEnabled,
    geoEnabled: formValues.geoEnabled,
    attendanceRadiusMeters: radiusValue ? Number(radiusValue) : null,
    clearAttendanceRadiusMeters: formValues.clearAttendanceRadiusMeters,
  };
};
