import type { QueryResult } from "@shared/config/types";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import styles from "./ReportsListWidget.module.scss";
import type { ReportCase } from "@entities/report";

interface ReportsListWidgetProps {
  useReportsQuery?: () => QueryResult<ReportCase>;
  reports?: ReportCase[];
  renderCard: (report: ReportCase, index: number) => React.ReactNode;
  renderEmpty?: (reports: ReportCase[]) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  skeletonItems?: number;
  startSlot?: React.ReactNode;
  className?: string;
}

export const ReportsListWidget = ({
  useReportsQuery,
  reports: readyReports,
  renderCard,
  renderSkeleton,
  renderEmpty,
  skeletonItems,
  startSlot,
  className,
}: ReportsListWidgetProps) => {
  const queryResult = useReportsQuery?.();

  const reports = readyReports ?? queryResult?.data ?? [];
  const isLoading = queryResult?.isLoading ?? false;

  if (isLoading && renderSkeleton) {
    return (
      <ListWidgetSkeleton
        renderSkeleton={renderSkeleton}
        items={skeletonItems}
        className={className}
      />
    );
  }

  return (
    <>
      {renderEmpty?.(reports) ?? (
        <div className={`${styles.reportsList} ${className ?? ""}`.trim()}>
          {startSlot}
          {reports.map((report, index) => renderCard(report, index))}
        </div>
      )}
    </>
  );
};
