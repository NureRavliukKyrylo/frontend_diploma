import { DateRangeControl } from "@widgets/admin/statistics/statistics-date-range/ui/DateRangeControl";
import { ExportMenu } from "@widgets/admin/statistics/statistics-date-range/ui/ExportMenu";
import { FunnelCard } from "@widgets/admin/statistics/statistics-funnel/ui/FunnelCard";
import { GrowthHeatTable } from "@widgets/admin/statistics/statistics-growth/ui/GrowthHeatTable";
import { useAdminStatisticsPage } from "@widgets/admin/statistics/statistics-page/model/useAdminStatisticsPage";
import styles from "@widgets/admin/statistics/statistics-page-styles/AdminStatisticsPage.module.scss";
import { ReliabilityCard } from "@widgets/admin/statistics/statistics-reliability/ui/ReliabilityCard";
import { SlaInsightsRow } from "@widgets/admin/statistics/statistics-sla/ui/SlaInsightsRow";
import { TimeBankOverviewSection } from "@widgets/admin/statistics/statistics-time-bank/ui/TimeBankOverviewSection";
import { SectionHeader } from "@widgets/admin/statistics/statistics-totals/ui/SectionHeader";
import { TotalCard } from "@widgets/admin/statistics/statistics-totals/ui/TotalCard";
import { CategoryBreakdownCard } from "@widgets/admin/statistics/statistics-category-breakdown/ui/CategoryBreakdownCard";
import { useTranslation } from "react-i18next";

export const AdminStatisticsPage = () => {
  const { t } = useTranslation("admin");
  const page = useAdminStatisticsPage();

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <div>
          <div className={styles.pageEyebrow}>{t("common.eyebrow")}</div>
          <h1 className={styles.pageTitle}>{t("statistics.title")}</h1>
        </div>
        <div className={styles.headerActions}>
          <DateRangeControl range={page.range} onChange={page.setRange} />
          <ExportMenu from={page.range.from} to={page.range.to} />
        </div>
      </div>

      <div className={styles.totalsGrid}>
        {page.totals.map((item) => (
          <TotalCard key={item.label} item={item} />
        ))}
      </div>

      <SectionHeader
        label={t("statistics.operationalAnalytics")}
        value={`${page.range.from} to ${page.range.to}`}
      />

      <div className={styles.insightRow}>
        <GrowthHeatTable
          points={page.platform?.monthlyGrowth ?? []}
          isLoading={page.platformQuery.isLoading}
          isError={page.platformQuery.isError}
        />
        <ReliabilityCard
          score={page.advanced?.reliability?.score ?? 0}
          approved={page.approvedReliability}
          rejected={page.rejectedReliability}
          isLoading={page.advancedQuery.isLoading}
          isError={page.advancedQuery.isError}
        />
        <FunnelCard
          stages={page.funnelStages}
          isLoading={page.advancedQuery.isLoading}
          isError={page.advancedQuery.isError}
        />
      </div>

      <SlaInsightsRow
        advanced={page.advanced}
        isLoading={page.advancedQuery.isLoading}
        isError={page.advancedQuery.isError}
      />

      <CategoryBreakdownCard
        rows={page.categoryRows}
        categoryMap={page.categoryMap}
        isLoading={page.advancedQuery.isLoading}
        isError={page.advancedQuery.isError}
      />

      <TimeBankOverviewSection
        totals={page.timeBankTotals}
        timeBank={page.timeBank}
        isLoading={page.timeBankQuery.isLoading}
        isError={page.timeBankQuery.isError}
      />

    </section>
  );
};
