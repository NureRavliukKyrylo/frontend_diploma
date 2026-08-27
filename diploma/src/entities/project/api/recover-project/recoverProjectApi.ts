import type { ProjectActionResponse } from "../archive-project/archiveProjectApi";
import { apiClient } from "@shared/api";

export const recoverProject = async (
  projectId: string,
): Promise<ProjectActionResponse> => {
  const response = await apiClient.put<ProjectActionResponse>(
    `/Projects/${projectId}/recover`,
  );

  return response.data;
};
