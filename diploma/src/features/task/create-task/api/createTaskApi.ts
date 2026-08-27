import { apiClient } from "@shared/api";

export type TaskPolicy = "open" | "approval_required";

export interface CreateTaskLocation {
  latitude: number;
  longitude: number;
  regionLabel?: string;
}

export interface CreateTaskPayload {
  OrganizationId: string;
  ProjectId?: string;
  EventId?: string;
  Title: string;
  Description: string;
  StartAt: string;
  EndAt: string;
  Location?: {
    Latitude: number;
    Longitude: number;
    RegionLabel?: string;
  };
  EstimatedMinutes?: number;
  Points?: number;
  CategoryIds?: string[];
  JoinPolicy: TaskPolicy;
  LeavePolicy: TaskPolicy;
}

interface CreateTaskResponse {
  id?: string;
  data?: {
    id?: string;
  };
}

export const createTaskApi = async (
  payload: CreateTaskPayload,
): Promise<CreateTaskResponse> => {
  const response = await apiClient.post<CreateTaskResponse>(
    "/Tasks/create",
    payload,
  );

  return response.data;
};
