import { apiClient } from "@shared/api";
import type { ReportReasonType } from "@entities/report/model";
import type { EntityType } from "@shared/config/types";

export type HideContentDto = {
  targetEntityType: EntityType | "offer";
  targetEntityId: string;
  reason: ReportReasonType;
};

export const hideContent = async (caseId: string, data: HideContentDto) => {
  const response = await apiClient.post(
    `moderation/cases/${caseId}/actions/hide-content`,
    data,
  );
  return response.data;
};
