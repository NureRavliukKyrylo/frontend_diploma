import { apiClient } from "@shared/api";

export type ProjectPolicy = "open" | "approval_required";

export interface CreateProjectLocation {
  latitude: number;
  longitude: number;
  regionLabel?: string;
}

export interface CreateProjectPayload {
  Title: string;
  Description: string;
  OrganizationId: string;
  Location: {
    Latitude: number;
    Longitude: number;
    RegionLabel?: string;
  };
  StartAt?: string;
  EndAt?: string;
  CategoryIds?: string[];
  JoinPolicy: ProjectPolicy;
  LeavePolicy: ProjectPolicy;
}

interface CreateProjectResponse {
  id?: string;
  data?: {
    id?: string;
  };
}

export const createProjectApi = async (
  payload: CreateProjectPayload,
): Promise<CreateProjectResponse> => {
  const response = await apiClient.post<CreateProjectResponse>(
    "/Projects/create",
    payload,
  );

  return response.data;
};
