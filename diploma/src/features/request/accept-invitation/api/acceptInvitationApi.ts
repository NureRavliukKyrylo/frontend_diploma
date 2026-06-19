import { apiClient } from "@shared/api";

export const acceptInvitation = async (requestId: string) => {
  const result = await apiClient.post(
    `requests/${requestId}/accept-invitation`,
  );
  return result.data;
};
