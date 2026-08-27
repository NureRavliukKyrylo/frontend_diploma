import {
  adminDashboardQuery,
  formatAdminHoursFromMinutes,
} from "@entities/admin";
import { categoryQuery } from "@entities/category";
import { useQuery } from "@tanstack/react-query";
import {
  defaultRange,
  formatNumber,
  formatPercent,
  formatRatio,
  type DateRangeState,
  type FunnelStage,
  type TotalCardItem,
} from "@widgets/admin/statistics/statistics-config/libs/statisticsFormat";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const useAdminStatisticsPage = () => {
  const { t } = useTranslation("admin");
  const [range, setRange] = useState<DateRangeState>(defaultRange);
  const platformQuery = useQuery(adminDashboardQuery.platformStatistics());
  const advancedQuery = useQuery(
    adminDashboardQuery.advancedStatistics(range.from, range.to),
  );
  const timeBankQuery = useQuery(adminDashboardQuery.timeBankOverview());
  const categoriesQuery = useQuery(
    categoryQuery.list({ OrderBy: "NameAsc", Page: 1, PageSize: 200 }),
  );

  const categoryMap = useMemo(
    () =>
      new Map(
        (categoriesQuery.data?.data ?? []).map((category) => [
          category.id,
          category.name,
        ]),
      ),
    [categoriesQuery.data?.data],
  );

  const platform = platformQuery.data;
  const advanced = advancedQuery.data;
  const reliability = advanced?.reliability;
  const funnel = advanced?.conversionFunnel;
  const timeBank = timeBankQuery.data;
  const approvedReliability =
    (reliability?.approvedAttendances ?? 0) +
    (reliability?.approvedWorkLogs ?? 0) +
    (reliability?.completedTasks ?? 0);
  const rejectedReliability =
    (reliability?.rejectedAttendances ?? 0) +
    (reliability?.rejectedWorkLogs ?? 0) +
    (reliability?.lateTasks ?? 0);
  const completionBaseline = funnel?.invitationsSent ?? 0;

  const funnelStages: FunnelStage[] = [
    {
      label: t("statistics.funnel.sent"),
      value: formatNumber(funnel?.invitationsSent ?? 0),
      width: completionBaseline > 0 ? 100 : 0,
      color: "#1a1a1a",
    },
    {
      label: t("statistics.funnel.accepted"),
      value: `${formatNumber(funnel?.invitationsAccepted ?? 0)} - ${formatPercent(
        funnel?.inviteToAcceptPercent ?? 0,
      )}`,
      width: funnel?.inviteToAcceptPercent ?? 0,
      color: "#185fa5",
    },
    {
      label: t("statistics.funnel.completed"),
      value: `${formatNumber(
        funnel?.attendanceOrCompletions ?? 0,
      )} - ${formatPercent(funnel?.acceptToCompletionPercent ?? 0)}`,
      width:
        completionBaseline > 0
          ? ((funnel?.attendanceOrCompletions ?? 0) / completionBaseline) * 100
          : 0,
      color: "#1a7a45",
    },
  ];

  const totals: TotalCardItem[] = [
    {
      label: t("statistics.totals.users"),
      value: formatNumber(platform?.usersTotal),
      tone: "neutral",
      isLoading: platformQuery.isLoading,
      isError: platformQuery.isError,
    },
    {
      label: t("statistics.totals.active"),
      value: formatNumber(platform?.activeUsers),
      tone: "green",
      isLoading: platformQuery.isLoading,
      isError: platformQuery.isError,
    },
    {
      label: t("statistics.totals.organizations"),
      value: formatNumber(platform?.organizationsTotal),
      tone: "amber",
      isLoading: platformQuery.isLoading,
      isError: platformQuery.isError,
    },
    {
      label: t("statistics.totals.projects"),
      value: formatNumber(platform?.projectsTotal),
      tone: "neutral",
      isLoading: platformQuery.isLoading,
      isError: platformQuery.isError,
    },
    {
      label: t("statistics.totals.events"),
      value: formatNumber(platform?.eventsTotal),
      tone: "neutral",
      isLoading: platformQuery.isLoading,
      isError: platformQuery.isError,
    },
    {
      label: t("statistics.totals.tasks"),
      value: formatNumber(platform?.tasksTotal),
      tone: "neutral",
      isLoading: platformQuery.isLoading,
      isError: platformQuery.isError,
    },
    {
      label: t("statistics.totals.openReports"),
      value: formatNumber(platform?.openReports),
      tone: "red",
      isLoading: platformQuery.isLoading,
      isError: platformQuery.isError,
    },
  ];

  const timeBankTotals: TotalCardItem[] = [
    {
      label: t("statistics.totals.totalBalance"),
      value: formatAdminHoursFromMinutes(timeBank?.totalBalanceMinutes),
      tone: "neutral",
      isLoading: timeBankQuery.isLoading,
      isError: timeBankQuery.isError,
    },
    {
      label: t("statistics.totals.reservedShare"),
      value: formatPercent(timeBank?.reservedSharePercent ?? 0),
      tone: "amber",
      isLoading: timeBankQuery.isLoading,
      isError: timeBankQuery.isError,
    },
    {
      label: t("statistics.totals.spendEarn"),
      value: formatRatio(timeBank?.spendToEarnRatio),
      tone: "green",
      isLoading: timeBankQuery.isLoading,
      isError: timeBankQuery.isError,
    },
    {
      label: t("statistics.totals.wallets"),
      value: formatNumber(timeBank?.walletsCount),
      tone: "neutral",
      isLoading: timeBankQuery.isLoading,
      isError: timeBankQuery.isError,
    },
  ];

  return {
    range,
    setRange,
    platform,
    advanced,
    timeBank,
    platformQuery,
    advancedQuery,
    timeBankQuery,
    categoryMap,
    categoryRows: advanced?.categoryHeatmap ?? [],
    approvedReliability,
    rejectedReliability,
    funnelStages,
    totals,
    timeBankTotals,
  };
};
