import { useNavigate } from "@tanstack/react-router";
import { toggleArrayParam } from "@shared/libs/search-params";
import type {
  ReportCasesSearchParams,
  ModerationSubjectType,
  ReportReason,
} from "@entities/report";

export const useReportCasesFilter = () => {
  const navigate = useNavigate({ from: "/reports/" });

  const nav = (
    updater: (prev: ReportCasesSearchParams) => ReportCasesSearchParams,
  ) =>
    navigate({
      search: (prev) => updater(prev as ReportCasesSearchParams),
      resetScroll: false,
    });

  return {
    onReasonToggle: (reason: ReportReason) =>
      nav((prev) => ({
        ...prev,
        Reasons: toggleArrayParam(prev.Reasons, reason),
        Page: 1,
      })),

    onSubjectTypeToggle: (type: keyof typeof ModerationSubjectType) =>
      nav((prev) => ({
        ...prev,
        SubjectTypes: toggleArrayParam(prev.SubjectTypes, type),
        Page: 1,
      })),

    onStatusChange: (status: string | undefined) =>
      nav((prev) => ({
        ...prev,
        Status: status as ReportCasesSearchParams["Status"],
        Page: 1,
      })),

    onStartDateChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, From: date, Page: 1 })),

    onEndBeforeChange: (date: string | undefined) =>
      nav((prev) => ({ ...prev, To: date, Page: 1 })),

    onSearchChange: (value: string | undefined) =>
      nav((prev) => ({ ...prev, Search: value, Page: 1 })),

    onClearFilters: () => navigate({ search: () => ({}) }),
  };
};
