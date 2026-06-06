import { apiClient } from "@shared/api";

export const deactivateOffer = async (offerId: string) => {
  const response = await apiClient.post(
    `time-bank/offers/${offerId}/deactivate`,
  );
  return response.data;
};
