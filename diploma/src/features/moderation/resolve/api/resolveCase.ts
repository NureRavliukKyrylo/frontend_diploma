import { apiClient } from "@shared/api";

export type ResolveCaseDto = {
  comment: string;
  rejected: boolean;
};

export const resolveCase = async (caseId: string, data: ResolveCaseDto) => {
  const response = await apiClient.post(
    `moderation/cases/${caseId}/resolve`,
    data,
  );
  return response.data;
};
