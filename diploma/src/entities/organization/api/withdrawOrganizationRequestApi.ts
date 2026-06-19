import { apiClient } from "@shared/api";

export const withdrawOrganizationRequest = async (requestId: string) => {
  await apiClient.post(`Requests/${requestId}/withdraw`);
};
