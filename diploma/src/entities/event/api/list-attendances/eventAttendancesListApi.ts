import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";
import type { EventAttendance } from "../../model";

type EventAttendanceResponse = {
  data: EventAttendance;
};

export type EventAttendanceSearchParams = {
  From: Date;
  To: Date;
};

export type EventAttendanceManagerStatus =
  | "Draft"
  | "CheckedIn"
  | "CheckedOutPendingApproval"
  | "Approved"
  | "Rejected"
  | "Disputed"
  | "Resolved"
  | "Cancelled";

export interface EventAttendanceManagerRecord {
  id: string;
  userId: string;
  userName?: string | null;
  checkInAt?: string | null;
  checkOutAt?: string | null;
  confirmedMinutes?: number | null;
  status?: EventAttendanceManagerStatus | string | null;
  comment?: string | null;
  resolutionComment?: string | null;
}

export type EventAttendanceManagerSearchParams = {
  Status?: string;
  UserId?: string;
  From?: string;
  To?: string;
  Page?: number;
  PageSize?: number;
};

export interface EventAttendanceManagerResponse {
  data: EventAttendanceManagerRecord[];
  pagination?: PaginationResponse;
}

export interface EventAttendanceDecisionPayload {
  comment?: string;
}

export interface EventAttendanceResolvePayload {
  approveAttendance: boolean;
  resolutionComment?: string;
}

export const getEventAttendancesList = async (
  eventId: string,
  params: EventAttendanceSearchParams,
): Promise<EventAttendanceResponse> => {
  const response = await apiClient.get(`events/${eventId}/attendance/me`, {
    params,
  });
  return response.data;
};

export const getEventAttendanceManagerList = async (
  eventId: string,
  params: EventAttendanceManagerSearchParams,
): Promise<EventAttendanceManagerResponse> => {
  const response = await apiClient.get<EventAttendanceManagerResponse>(
    `events/${eventId}/attendance`,
    { params },
  );

  return response.data;
};

export const approveEventAttendance = async (
  eventId: string,
  attendanceId: string,
  payload: EventAttendanceDecisionPayload,
) => {
  const response = await apiClient.post(
    `events/${eventId}/attendance/${attendanceId}/approve`,
    payload,
  );
  return response.data;
};

export const rejectEventAttendance = async (
  eventId: string,
  attendanceId: string,
  payload: EventAttendanceDecisionPayload,
) => {
  const response = await apiClient.post(
    `events/${eventId}/attendance/${attendanceId}/reject`,
    payload,
  );
  return response.data;
};

export const resolveEventAttendance = async (
  eventId: string,
  attendanceId: string,
  payload: EventAttendanceResolvePayload,
) => {
  const response = await apiClient.post(
    `events/${eventId}/attendance/${attendanceId}/resolve`,
    payload,
  );
  return response.data;
};

export const exportEventAttendance = async (eventId: string) => {
  const response = await apiClient.get<Blob>(
    `events/${eventId}/attendance/export`,
    {
      params: { format: "csv" },
      responseType: "blob",
    },
  );
  return response.data;
};
