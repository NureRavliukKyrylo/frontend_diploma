import type { Event } from "../../model";
import { apiClient } from "@shared/api";
import type { Policy } from "@shared/config/types";

export interface UpdateEventLocation {
  longitude: number;
  latitude: number;
  regionKey?: string | null;
  regionLabel?: string | null;
}

export interface UpdateEventSkillRequirement {
  skillId: string;
  expectedHours: number;
}

export interface UpdateEventPayload {
  id: string;
  title: string;
  description?: string | null;
  startAt: string;
  endAt: string;
  type?: string | null;
  location: UpdateEventLocation;
  categoryIds: string[];
  requiredSkills?: UpdateEventSkillRequirement[];
  joinPolicy?: Policy | null;
  leavePolicy?: Policy | null;
  attendanceEnabled?: boolean;
  attendanceRequiresApproval?: boolean;
  attendanceRequiresVolunteerCheckout?: boolean;
  qrEnabled?: boolean;
  geoEnabled?: boolean;
  attendanceRadiusMeters?: number | null;
  clearAttendanceRadiusMeters: boolean;
}

export interface UpdateEventResponse {
  data?: Event;
  message?: string;
}

export const updateEvent = async (
  payload: UpdateEventPayload,
): Promise<UpdateEventResponse> => {
  const response = await apiClient.put<UpdateEventResponse>(
    "/Events/update",
    payload,
  );

  return response.data;
};
