import { apiClient } from "@shared/api";

export interface ProjectActionResponse {
  message?: string;
}

export const archiveProject = async (
  projectId: string,
): Promise<ProjectActionResponse> => {
  const response = await apiClient.put<ProjectActionResponse>(
    `/Projects/${projectId}/archive`,
  );

  return response.data;
};
