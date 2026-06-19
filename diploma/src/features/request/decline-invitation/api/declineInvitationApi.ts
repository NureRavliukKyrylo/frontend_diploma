import { apiClient } from "@shared/api";

export const declineInvitation = async (requestId: string) => {
  const result = await apiClient.post(
    `requests/${requestId}/decline-invitation`,
  );
  return result.data;
};
