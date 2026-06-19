import type { Project } from "../../model";
import { apiClient } from "@shared/api";
import type { Policy } from "@shared/config/types";

export interface UpdateProjectLocation {
  longitude: number;
  latitude: number;
  regionKey?: string | null;
  regionLabel?: string | null;
}

export interface UpdateProjectPayload {
  id: string;
  title: string;
  description: string;
  startAt?: string | null;
  endAt?: string | null;
  location?: UpdateProjectLocation | null;
  categoryIds?: string[] | null;
  joinPolicy?: Policy | null;
  leavePolicy?: Policy | null;
}

export interface UpdateProjectResponse {
  data?: Project;
  message?: string;
}

export const updateProject = async (
  payload: UpdateProjectPayload,
): Promise<UpdateProjectResponse> => {
  const response = await apiClient.put<UpdateProjectResponse>(
    "/Projects/update",
    payload,
  );

  return response.data;
};
