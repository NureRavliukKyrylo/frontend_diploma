import { apiClient } from "@shared/api";
import type { ReportReason } from "@entities/report/model";

export type BanUserDto = {
  targetUserId: string;
  reason: ReportReason;
  expiresAt: string;
};

export const banUser = async (caseId: string, data: BanUserDto) => {
  const response = await apiClient.post(
    `moderation/cases/${caseId}/actions/ban`,
    data,
  );
  return response.data;
};
