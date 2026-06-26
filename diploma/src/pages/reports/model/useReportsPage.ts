import { reportQuery, type ReportCasesSearchParams } from "@entities/report";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const useReportsPage = () => {
  const navigate = useNavigate({ from: "/reports/" });
  const { reportId, ...search } = useSearch({
    from: "/_masterLayout/reports/",
  });

  const { data: reports } = useQuery(reportQuery.listParams(search));

  const nav = (
    updater: (prev: ReportCasesSearchParams) => ReportCasesSearchParams,
  ) =>
    navigate({
      search: (prev) => updater(prev as ReportCasesSearchParams),
      resetScroll: false,
    });

  return {
    handleSearch: (value: string | undefined) =>
      nav((prev) => ({ ...prev, Search: value, Page: 1 })),

    handleSort: (value: string) =>
      nav((prev) => ({
        ...prev,
        OrderBy: value as ReportCasesSearchParams["OrderBy"],
        Page: 1,
      })),

    handlePageChange: (page: number) =>
      nav((prev) => ({ ...prev, Page: page })),
    handleReportClick: (id: string) =>
      nav((prev) => ({ ...prev, reportId: id })),
    handleReportClose: () => nav((prev) => ({ ...prev, reportId: undefined })),
    search,
    reports,
    reportId,
  };
};
