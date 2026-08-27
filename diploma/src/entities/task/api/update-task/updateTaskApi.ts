import type { Task } from "../../model";
import { apiClient, type ApiResponse } from "@shared/api";
import type { Policy } from "@shared/config/types";

export interface UpdateTaskLocation {
  latitude: number;
  longitude: number;
  regionKey?: string | null;
  regionLabel?: string | null;
}

export interface UpdateTaskPayload {
  id: string;
  title: string;
  description: string;
  location?: UpdateTaskLocation | null;
  startAt: string;
  endAt: string;
  reminderAtUtc?: string | null;
  reminderOffsetMinutes?: number | null;
  status: string;
  points: number;
  estimatedMinutes?: number | null;
  timeLoggingEnabled: boolean;
  categoryIds: string[];
  skillIds?: string[];
  joinPolicy?: Policy;
  leavePolicy?: Policy;
}

export const updateTask = async (
  payload: UpdateTaskPayload,
): Promise<ApiResponse<Task>> => {
  const response = await apiClient.put<ApiResponse<Task>>(
    "/Tasks/update",
    payload,
  );

  return response.data;
};
