import type { TimeBankUserStats } from "@entities/offer/model";
import { apiClient, type ApiResponse } from "@shared/api";

export const getTimeBankStats = async (): Promise<
  ApiResponse<TimeBankUserStats>
> => {
  const response = await apiClient.get(`/time-bank/me/summary`);
  return response.data;
};
