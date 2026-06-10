import { getListCases } from "@entities/report/api";
import type { ReportCasesSearchParams } from "@entities/report/libs";
import { queryOptions } from "@tanstack/react-query";

export const reportKeys = {
  all: () => ["reports"] as const,
  list: (params: ReportCasesSearchParams) =>
    [...reportKeys.all(), "list", params] as const,
};

export const reportQuery = {
  list: (params: ReportCasesSearchParams) =>
    queryOptions({
      queryKey: reportKeys.list({ ...params }),
      queryFn: () => getListCases({ ...params }),
      placeholderData: (prev) => prev,
    }),
};
