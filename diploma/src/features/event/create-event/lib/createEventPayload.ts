import type { CreateEventPayload } from "../api/createEventApi";
import type { CreateEventFormState } from "../model/createEventFormTypes";

const toDateTimeIso = (value: string) => new Date(value).toISOString();

const toRecurrenceUntilIso = (value: string) =>
  new Date(`${value}T23:59:59`).toISOString();

export const buildCreateEventPayload = (
  organizationId: string,
  values: CreateEventFormState,
): CreateEventPayload => {
  if (!values.location || !values.startAt || !values.endAt) {
    throw new Error("Event location and dates are required.");
  }

  const requiredSkills = values.requiredSkills
    .filter((skill) => skill.skillId.trim())
    .map((skill) => ({
      SkillId: skill.skillId.trim(),
      ExpectedHours: Math.max(0, skill.expectedHours),
    }));

  return {
    OrganizationId: organizationId,
    ProjectId: null,
    Title: values.title.trim(),
    Description: values.description.trim() || null,
    StartAt: toDateTimeIso(values.startAt),
    EndAt: toDateTimeIso(values.endAt),
    Location: {
      Latitude: values.location.latitude,
      Longitude: values.location.longitude,
      ...(values.location.regionLabel
        ? { RegionLabel: values.location.regionLabel }
        : {}),
    },
    CategoryIds: values.categoryIds,
    ...(requiredSkills.length > 0 ? { RequiredSkills: requiredSkills } : {}),
    JoinPolicy: values.joinPolicy,
    LeavePolicy: values.leavePolicy,
    Recurrence: values.recurrence?.enabled
      ? {
          Enabled: true,
          Frequency: values.recurrence.frequency,
          Interval: values.recurrence.interval,
          Until: toRecurrenceUntilIso(values.recurrence.until),
        }
      : null,
  };
};
