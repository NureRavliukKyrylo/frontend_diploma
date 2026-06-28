import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";

export interface TaskTimeLogRecord {
  id: string;
  userId: string;
  userName?: string | null;
  loggedMinutes?: number | null;
  managerAdjustedMinutes?: number | null;
  finalApprovedMinutes?: number | null;
  approvedMinutes?: number | null;
  status?: string | null;
  comment?: string | null;
  managerComment?: string | null;
  resolutionComment?: string | null;
  createdAt?: string | null;
}

export interface TaskTimeLogsResponse {
  data: TaskTimeLogRecord[];
  pagination?: PaginationResponse;
}

export interface TaskTimeLogsSearchParams {
  Status?: string;
  UserId?: string;
  From?: string;
  To?: string;
  Page?: number;
  PageSize?: number;
}

export interface TaskTimeLogManagerEditPayload {
  managerAdjustedMinutes: number;
  managerComment?: string;
}

export interface TaskTimeLogDecisionPayload {
  comment?: string;
}

export interface TaskTimeLogResolvePayload {
  approveLog: boolean;
  finalApprovedMinutes?: number | null;
  resolutionComment?: string;
}

export const getTaskTimeLogs = async (
  taskId: string,
  params: TaskTimeLogsSearchParams,
): Promise<TaskTimeLogsResponse> => {
  const response = await apiClient.get<TaskTimeLogsResponse>(
    `tasks/${taskId}/time-logs`,
    { params },
  );

  return response.data;
};

export const managerEditTaskTimeLog = async (
  taskId: string,
  logId: string,
  payload: TaskTimeLogManagerEditPayload,
) => {
  const response = await apiClient.put(
    `tasks/${taskId}/time-logs/${logId}/manager-edit`,
    payload,
  );
  return response.data;
};

export const approveTaskTimeLog = async (
  taskId: string,
  logId: string,
  payload: TaskTimeLogDecisionPayload,
) => {
  const response = await apiClient.put(
    `tasks/${taskId}/time-logs/${logId}/approve`,
    payload,
  );
  return response.data;
};

export const rejectTaskTimeLog = async (
  taskId: string,
  logId: string,
  payload: Required<TaskTimeLogDecisionPayload>,
) => {
  const response = await apiClient.put(
    `tasks/${taskId}/time-logs/${logId}/reject`,
    payload,
  );
  return response.data;
};

export const resolveTaskTimeLog = async (
  taskId: string,
  logId: string,
  payload: TaskTimeLogResolvePayload,
) => {
  const response = await apiClient.put(
    `tasks/${taskId}/time-logs/${logId}/resolve`,
    payload,
  );
  return response.data;
};

export const exportTaskTimeLogs = async (taskId: string) => {
  const response = await apiClient.get<Blob>(`tasks/${taskId}/time-logs/export`, {
    params: { format: "csv" },
    responseType: "blob",
  });
  return response.data;
};
