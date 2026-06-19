import type { UpdateProjectPayload } from "@entities/project";
import type { ProjectSettingsValues } from "../model/types";
import { toProjectDatePayload } from "./date";

export const buildProjectSettingsPayload = (
  projectId: string,
  formValues: ProjectSettingsValues,
): UpdateProjectPayload => ({
  id: projectId,
  title: formValues.title.trim(),
  description: formValues.description.trim(),
  startAt: toProjectDatePayload(formValues.startAt),
  endAt: toProjectDatePayload(formValues.endAt),
  location: formValues.location
    ? {
        latitude: formValues.location.latitude,
        longitude: formValues.location.longitude,
        regionKey: formValues.location.regionKey ?? null,
        regionLabel: formValues.locationLabel.trim() || null,
      }
    : null,
  categoryIds: formValues.categoryIds,
  joinPolicy: formValues.joinPolicy,
  leavePolicy: formValues.leavePolicy,
});
