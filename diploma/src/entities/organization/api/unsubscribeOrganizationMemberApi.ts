import axios from "axios";
import { apiClient } from "@shared/api";

interface UnsubscribeOrganizationMemberParams {
  organizationId: string;
  userId: string;
  comment?: string;
}

export const unsubscribeOrganizationMember = async ({
  organizationId,
  userId,
  comment,
}: UnsubscribeOrganizationMemberParams) => {
  const trimmedComment = comment?.trim();

  try {
    const response = await apiClient.delete(
      `/Participation/entity/organization/${organizationId}/users/${userId}`,
      {
        params: trimmedComment ? { comment: trimmedComment } : undefined,
      },
    );

    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 404 || error.response?.status === 405)
    ) {
      const fallbackResponse = await apiClient.put("/Participation/leave-for-user", {
        entityType: "organization",
        entityId: organizationId,
        userId,
        comment: trimmedComment || "Removed",
      });

      return fallbackResponse.data;
    }

    throw error;
  }
};
