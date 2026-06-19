import { apiClient } from "@shared/api";

export interface CancelEventResponse {
  message?: string;
}

export const cancelEvent = async (
  eventId: string,
  reason?: string,
): Promise<CancelEventResponse> => {
  const response = await apiClient.put<CancelEventResponse>(
    `/Events/${eventId}/cancel`,
    null,
    {
      params: reason?.trim() ? { reason: reason.trim() } : undefined,
    },
  );

  return response.data;
};
