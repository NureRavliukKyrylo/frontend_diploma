import { apiClient } from "@shared/api";
import type {
  ModerationSubjectType,
  ReportReasonType,
} from "@entities/report/model";

export type BanEntityDto = {
  targetEntityType: keyof typeof ModerationSubjectType;
  targetEntityId: string;
  reason: ReportReasonType;
};

export const banEntity = async (caseId: string, data: BanEntityDto) => {
  const response = await apiClient.post(
    `moderation/cases/${caseId}/actions/ban-entity`,
    data,
  );
  return response.data;
};
