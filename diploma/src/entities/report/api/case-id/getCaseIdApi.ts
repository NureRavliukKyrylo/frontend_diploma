import type { ReportCase } from "../../model";
import { apiClient } from "@shared/api";
import { type ApiResponse } from "@shared/api";

export const getCaseId = async (
  id: string,
): Promise<ApiResponse<ReportCase>> => {
  const result = await apiClient.get(`/reports/${id}`);
  return result.data;
};
