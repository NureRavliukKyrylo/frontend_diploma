import {
  adminDashboardQuery,
  formatAdminCount,
  formatAdminHoursFromMinutes,
} from "@entities/admin";
import { useQuery } from "@tanstack/react-query";
import {
  buildActivityFeed,
  buildHealthRows,
} from "@widgets/admin/overview/lib/overviewData";
import type {
  FooterSource,
  FooterValue,
  MetricCard,
} from "@widgets/admin/overview/model/types";
import { ActivityCard } from "@widgets/admin/overview/ui/ActivityCard";
import { HealthCard } from "@widgets/admin/overview/ui/HealthCard";
import { MetricsGrid } from "@widgets/admin/overview/ui/MetricsGrid";
import { QuickAccessGrid } from "@widgets/admin/overview/ui/QuickAccessGrid";
import { RecentUsersCard } from "@widgets/admin/overview/ui/RecentUsersCard";
import { SectionHeader } from "@widgets/admin/overview/ui/SectionHeader";
import { useTranslation } from "react-i18next";
import styles from "./AdminOverviewPage.module.scss";

export const AdminOverviewPage = () => {
  const { t } = useTranslation(["admin", "common"]);
  const usersQuery = useQuery(adminDashboardQuery.users());
  const openReportsQuery = useQuery(adminDashboardQuery.openReports());
  const pendingRequestsQuery = useQuery(adminDashboardQuery.pendingRequests());
  const timeBankQuery = useQuery(adminDashboardQuery.timeBankOverview());
  const systemHealthQuery = useQuery(adminDashboardQuery.systemHealth());
  const bansQuery = useQuery(adminDashboardQuery.activeBans());
  const skillsQuery = useQuery(adminDashboardQuery.skills());

  const timeBankVolume = formatAdminHoursFromMinutes(
    timeBankQuery.data?.totalLifetimeEarnedMinutes,
  );
  const metrics: MetricCard[] = [
    {
      label: t("admin:overview.metrics.openReports"),
      value: formatAdminCount(openReportsQuery.data?.summary.totalOpen),
      tone: "reports",
      accent: true,
      isLoading: openReportsQuery.isLoading,
      isError: openReportsQuery.isError,
    },
    {
      label: t("admin:overview.metrics.pendingRequests"),
      value: formatAdminCount(pendingRequestsQuery.data?.summary.totalOpen),
      tone: "requests",
      isLoading: pendingRequestsQuery.isLoading,
      isError: pendingRequestsQuery.isError,
    },
    {
      label: t("admin:overview.metrics.totalUsers"),
      value: formatAdminCount(usersQuery.data?.totalCount),
      tone: "neutral",
      isLoading: usersQuery.isLoading,
      isError: usersQuery.isError,
    },
    {
      label: t("admin:overview.metrics.timeBankVolume"),
      value: timeBankVolume,
      tone: "neutral",
      isLoading: timeBankQuery.isLoading,
      isError: timeBankQuery.isError,
    },
  ];
  const footerValues: Record<FooterSource, FooterValue> = {
    users: {
      value: formatAdminCount(usersQuery.data?.totalCount),
      isLoading: usersQuery.isLoading,
      isError: usersQuery.isError,
    },
    bans: {
      value: formatAdminCount(bansQuery.data?.length),
      isLoading: bansQuery.isLoading,
      isError: bansQuery.isError,
    },
    timeBank: {
      value: timeBankVolume,
      isLoading: timeBankQuery.isLoading,
      isError: timeBankQuery.isError,
    },
    skills: {
      value: formatAdminCount(skillsQuery.data?.pagination.totalCount),
      isLoading: skillsQuery.isLoading,
      isError: skillsQuery.isError,
    },
    requests: {
      value: formatAdminCount(pendingRequestsQuery.data?.summary.totalOpen),
      isLoading: pendingRequestsQuery.isLoading,
      isError: pendingRequestsQuery.isError,
    },
  };
  const healthRows = buildHealthRows(systemHealthQuery.data, t);
  const healthScore = systemHealthQuery.data?.healthScore ?? 0;
  const activityFeed = buildActivityFeed(
    t,
    openReportsQuery.data?.page.items,
    pendingRequestsQuery.data?.page.items,
  );
  const activityIsLoading =
    openReportsQuery.isLoading || pendingRequestsQuery.isLoading;
  const activityIsError =
    openReportsQuery.isError || pendingRequestsQuery.isError;

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <div className={styles.headingEyebrow}>{t("admin:common.eyebrow")}</div>
        <h1 className={styles.headingTitle}>{t("admin:overview.title")}</h1>
      </div>

      <MetricsGrid styles={styles} metrics={metrics} />

      <div className={styles.insightGrid}>
        <RecentUsersCard
          styles={styles}
          users={usersQuery.data?.items}
          isLoading={usersQuery.isLoading}
          isError={usersQuery.isError}
        />
        <HealthCard
          styles={styles}
          healthRows={healthRows}
          healthScore={healthScore}
          isLoading={systemHealthQuery.isLoading}
          isError={systemHealthQuery.isError}
        />
      </div>

      <SectionHeader
        styles={styles}
        title={t("admin:overview.sections.quickAccess")}
      />
      <QuickAccessGrid styles={styles} footerValues={footerValues} />
      <SectionHeader
        styles={styles}
        title={t("admin:overview.sections.platformActivity")}
        note={t("admin:overview.sections.activityNote")}
      />
      <ActivityCard
        styles={styles}
        activityFeed={activityFeed}
        isLoading={activityIsLoading}
        isError={activityIsError}
        t={t}
      />
    </section>
  );
};
