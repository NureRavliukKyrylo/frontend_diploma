import { apiClient, type ApiResponse } from "@shared/api";
import type { TimeBankSummary } from "../../model/types/time-bank-summary/TimeBankSummary";

export const getTimeBankSummary = async (): Promise<TimeBankSummary> => {
  const response =
    await apiClient.get<ApiResponse<TimeBankSummary>>("time-bank/me/summary");

  return response.data.data;
};
