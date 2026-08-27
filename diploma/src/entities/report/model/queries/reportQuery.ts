import { getListCases } from "@entities/report/api";
import { getCaseId } from "@entities/report/api/case-id/getCaseIdApi";
import type { ReportCasesSearchParams } from "@entities/report/libs";
import { queryOptions } from "@tanstack/react-query";

export const reportKeys = {
  all: () => ["reports"] as const,
  list: () => [...reportKeys.all(), "list"] as const,
  listParams: ({ reportId, ...params }: ReportCasesSearchParams) =>
    [...reportKeys.list(), params] as const,
  id: (caseId: string) => [...reportKeys.all(), "id", caseId],
};

export const reportQuery = {
  listParams: ({ reportId, ...params }: ReportCasesSearchParams) =>
    queryOptions({
      queryKey: reportKeys.listParams({ ...params }),
      queryFn: () => getListCases({ ...params }),
      placeholderData: (prev) => prev,
    }),
  id: (caseId: string) =>
    queryOptions({
      queryKey: reportKeys.id(caseId),
      queryFn: () => getCaseId(caseId),
      select: (res) => res.data,
    }),
};
