import { apiClient } from "@shared/api";
import type {
  ModerationSubjectType,
  ReportReasonType,
} from "@entities/report/model";

export type HideContentDto = {
  targetEntityType: keyof typeof ModerationSubjectType;
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
