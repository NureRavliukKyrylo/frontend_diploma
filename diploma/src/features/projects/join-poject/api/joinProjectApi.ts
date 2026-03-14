import { apiClient } from "@shared/api";

export interface JoinProjectDTO {
  entityType: string;
  entityId: string;
  roleId?: string;
}

export const joinProject = async (data: JoinProjectDTO) => {
  const response = await apiClient.post("Requests/join", data);
  return response.data;
};
