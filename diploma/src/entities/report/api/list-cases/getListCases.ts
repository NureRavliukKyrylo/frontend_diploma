import type { ReportCasesSearchParams } from "@entities/report/libs";
import type { ReportCase } from "@entities/report/model";
import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";

export interface ReportCaseResponse {
  stats: {
    openCount: number;
    resolvedCount: number;
    rejectedCount: number;
  };
  data: ReportCase[];
  pagination: PaginationResponse;
}

export const getListCases = async (
  params?: ReportCasesSearchParams,
): Promise<ReportCaseResponse> => {
  const response = await apiClient.get("/moderation/cases", { params });
  return response.data;
};
