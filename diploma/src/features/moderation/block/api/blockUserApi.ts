import { apiClient } from "@shared/api";
import type { ReportReason } from "@entities/report/model";

export type BlockUserDto = {
  targetUserId: string;
  entityType: string;
  entityId: string;
  reason: ReportReason;
};

export const blockUser = async (caseId: string, data: BlockUserDto) => {
  const response = await apiClient.post(
    `moderation/cases/${caseId}/actions/block`,
    data,
  );
  return response.data;
};
