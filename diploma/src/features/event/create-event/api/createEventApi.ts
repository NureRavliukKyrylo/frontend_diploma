import { apiClient } from "@shared/api";

export type EventPolicy = "open" | "approval_required";
export type EventRecurrenceFrequency = "daily" | "weekly" | "monthly";

export interface CreateEventLocation {
  latitude: number;
  longitude: number;
  regionLabel?: string;
}

export interface CreateEventSkillRequirement {
  skillId: string;
  expectedHours: number;
}

export interface CreateEventRecurrence {
  enabled: boolean;
  frequency: EventRecurrenceFrequency;
  interval: number;
  until: string;
}

export interface CreateEventPayload {
  OrganizationId: string;
  ProjectId: string | null;
  Title: string;
  Description?: string | null;
  StartAt: string;
  EndAt: string;
  Location: {
    Latitude: number;
    Longitude: number;
    RegionLabel?: string;
  };
  CategoryIds: string[];
  RequiredSkills?: {
    SkillId: string;
    ExpectedHours: number;
  }[];
  JoinPolicy: EventPolicy;
  LeavePolicy: EventPolicy;
  Recurrence: {
    Enabled: boolean;
    Frequency?: EventRecurrenceFrequency;
    Interval: number;
    Until: string;
  } | null;
}

interface CreateEventResponse {
  id?: string;
  seriesId?: string;
  masterId?: string;
  firstOccurrenceId?: string;
}

export const createEventApi = async (
  payload: CreateEventPayload,
): Promise<CreateEventResponse> => {
  const response = await apiClient.post<CreateEventResponse>(
    "/Events/create",
    payload,
  );

  return response.data;
};
