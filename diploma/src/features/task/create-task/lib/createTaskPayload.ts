import type { CreateTaskPayload } from "../api/createTaskApi";
import type { CreateTaskFormState } from "../model/createTaskFormTypes";
import type { TFunction } from "i18next";

const toIsoDateTime = (value: string) => new Date(value).toISOString();

export const buildCreateTaskPayload = (
  organizationId: string,
  projectId: string | undefined,
  eventId: string | undefined,
  values: CreateTaskFormState,
  t: TFunction,
): CreateTaskPayload => {
  if (!values.startAt || !values.endAt) {
    throw new Error(t("task:create.datesRequired"));
  }

  return {
    OrganizationId: organizationId,
    ...(projectId ? { ProjectId: projectId } : {}),
    ...(eventId ? { EventId: eventId } : {}),
    Title: values.title.trim(),
    Description: values.description.trim(),
    StartAt: toIsoDateTime(values.startAt),
    EndAt: toIsoDateTime(values.endAt),
    ...(values.location
      ? {
          Location: {
            Latitude: values.location.latitude,
            Longitude: values.location.longitude,
            ...(values.location.regionLabel
              ? { RegionLabel: values.location.regionLabel }
              : {}),
          },
        }
      : {}),
    ...(values.estimatedMinutes !== null
      ? { EstimatedMinutes: values.estimatedMinutes }
      : {}),
    ...(values.points !== null ? { Points: values.points } : {}),
    ...(values.categoryIds.length > 0
      ? { CategoryIds: values.categoryIds }
      : {}),
    JoinPolicy: values.joinPolicy,
    LeavePolicy: values.leavePolicy,
  };
};
