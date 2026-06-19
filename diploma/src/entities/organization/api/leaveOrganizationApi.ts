import axios from "axios";
import { apiClient } from "@shared/api";
import { normalizeLeaveOrganizationResponse } from "../lib/normalizeOrganizationMutationResponse";
import type { LeaveOrganizationResponse } from "../model/types/OrganizationParticipation";

export const leaveOrganization = async (
  organizationId: string,
): Promise<LeaveOrganizationResponse> => {
  const payload = {
    entityType: "organization",
    entityId: organizationId,
  };

  try {
    const response = await apiClient.post<LeaveOrganizationResponse>(
      "/Participation/leave",
      payload,
    );

    return normalizeLeaveOrganizationResponse(response.data);
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 405
    ) {
      const fallbackResponse = await apiClient.put<{ message?: string }>(
        "/Participation/leave",
        payload,
      );

      return {
        mode: "direct",
        message: fallbackResponse.data.message ?? "Left successfully",
        participationId: null,
      };
    }

    throw error;
  }
};
