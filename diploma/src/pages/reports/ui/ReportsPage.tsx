import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AnimatePresence, motion } from "framer-motion";
import { ReportCasesFilter, ReportCaseWidget } from "@widgets/reports";
import { ReportsListWidget } from "@widgets/reports";
import { ReportCaseItem } from "@entities/report";
import { reportQuery } from "@entities/report";
import { SearchBar } from "@shared/ui/inputs";
import { SortDropDown } from "@shared/ui/drop-down";
import { Pagination } from "@shared/ui";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { getHttpErrorInfo } from "@shared/libs/error";
import {
  fadeDuration,
  fadeVariants,
  staggeredCardVariants,
} from "@shared/assets/animations";
import styles from "./ReportsPage.module.scss";
import { useReportsPage } from "../model/useReportsPage";
import { BaseModal } from "@shared/ui/modals";

const sortingReportItems = [
  { label: "Newest", value: "Newest" },
  { label: "Latest", value: "Latest" },
];

export const ReportsPage = () => {
  const {
    handleSearch,
    handleSort,
    handlePageChange,
    handleReportClick,
    reports,
    search,
    reportId,
    handleReportClose,
  } = useReportsPage();

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.baseStats}>
          <div className={styles.topContent}>
            <h1>REPORTS</h1>
            <h2>{reports?.pagination.totalCount}</h2>
            <div className={styles.lineDivider} />
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.statBlock}>
              <h1>Open</h1>
              <h2 className={styles.openStat}>{reports?.stats.openCount}</h2>
            </div>
            <div className={styles.lineDivider} />
            <div className={styles.statBlock}>
              <h1>Resolved</h1>
              <h2 className={styles.resolvedStat}>
                {reports?.stats.resolvedCount}
              </h2>
            </div>
            <div className={styles.lineDivider} />
            <div className={styles.statBlock}>
              <h1>Rejected</h1>
              <h2 className={styles.rejectedStat}>
                {reports?.stats.rejectedCount}
              </h2>
            </div>
            <div className={styles.lineDivider} />
          </div>
        </div>
        <ReportCasesFilter search={search} />
      </aside>

      <div className={styles.mainContent}>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
              <p className="errorHint">
                Try reloading the page or come back later.
              </p>
            </div>
          )}
        >
          <div className={styles.searchRow}>
            <SearchBar value={search.Search} onChange={handleSearch} />
            <SortDropDown
              options={sortingReportItems}
              onSelect={handleSort}
              value={search.OrderBy ?? "Newest"}
            />
          </div>

          <Suspense
            fallback={
              <ListWidgetSkeleton
                items={12}
                renderSkeleton={() => <div />}
                className={styles.reportsList}
              />
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={JSON.stringify(search)}
                {...fadeVariants}
                transition={fadeDuration}
              >
                <ReportsListWidget
                  className={styles.reportsList}
                  useReportsQuery={() => {
                    const { data } = useSuspenseQuery(
                      reportQuery.listParams(search),
                    );
                    return { data: data.data };
                  }}
                  renderCard={(report, index) => (
                    <motion.div
                      key={report.id}
                      custom={index + 1}
                      variants={staggeredCardVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => handleReportClick(report.id)}
                    >
                      <ReportCaseItem reportCase={report} />
                    </motion.div>
                  )}
                  renderEmpty={(reports) =>
                    reports && reports.length === 0 ? (
                      <div className={styles.emptyState}>
                        <h2>No reports found</h2>
                        <p>Try adjusting your filters</p>
                      </div>
                    ) : null
                  }
                />
              </motion.div>
            </AnimatePresence>
          </Suspense>

          {reports && reports.pagination.totalPages > 1 && (
            <div className={styles.paginationWrapper}>
              <Pagination
                total={reports?.pagination.totalPages}
                page={search.Page ?? 1}
                onChange={handlePageChange}
              />
            </div>
          )}
        </ErrorBoundary>
      </div>
      {reportId && (
        <BaseModal
          isOpen={!!reportId}
          showClosed={false}
          maxWidth="900px"
          onClose={handleReportClose}
        >
          <ReportCaseWidget caseId={reportId} />
        </BaseModal>
      )}
    </div>
  );
};
