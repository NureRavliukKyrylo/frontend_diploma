import { apiClient } from "@shared/api";

export interface LeaveProjectDto {
  entityId: string;
}

export const leaveProject = async (data: LeaveProjectDto) => {
  const result = await apiClient.post("/Participation/leave", {
    ...data,
    entityType: "project",
  });
  return result.data;
};
