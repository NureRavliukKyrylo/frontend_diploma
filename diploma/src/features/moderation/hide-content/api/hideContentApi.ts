import { apiClient } from "@shared/api";
import type { ReportReason } from "@entities/report/model";
import type { EntityType } from "@shared/config/types";

export type HideContentDto = {
  targetEntityType: EntityType | "offer";
  targetEntityId: string;
  reason: ReportReason;
};

export const hideContent = async (caseId: string, data: HideContentDto) => {
  const response = await apiClient.post(
    `moderation/cases/${caseId}/actions/hide-content`,
    data,
  );
  return response.data;
};
