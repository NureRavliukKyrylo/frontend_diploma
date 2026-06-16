import { ErrorBoundary } from "react-error-boundary";
import styles from "./TransactionsTab.module.scss";
import { getHttpErrorInfo } from "@shared/libs/error";
import { AnimatePresence, motion } from "framer-motion";
import { useTransactionsTab } from "../model/useTransactionsTab";
import {
  offerQuery,
  TransactionListItem,
  TransactionListItemSkeleton,
  type TransactionsSearchParams,
} from "@entities/offer";
import {
  fadeDuration,
  fadeVariants,
  layoutTransition,
  staggeredCardVariants,
} from "@shared/assets/animations";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { TransactionsFilter, TransactionsListWidget } from "@widgets/offers";
import { Pagination } from "@shared/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { formatDateRange, getCalendarRange } from "@shared/libs/date";

interface TransactionsTabProps {
  search: TransactionsSearchParams;
}

export const TransactionsTab = ({ search }: TransactionsTabProps) => {
  const { transactions, handlePageChange } = useTransactionsTab(search);
  const today = new Date();
  const { From, To } = getCalendarRange(today, "month");

  const from = search.From ?? From.toISOString();
  const to = search.To ?? To.toISOString();

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.baseStats}>
          <div className={styles.topContent}>
            <h1>MY BALANCE</h1>
            <h2>{transactions?.stats.balanceMinutes}</h2>
            <div className={styles.lineDivider} />
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.statBlock}>
              <h1>This month</h1>
              <h2 className={styles.positive}>
                {transactions?.stats.currentMonthEarnedMinutes}
              </h2>
            </div>
            <div className={styles.lineDivider} />
            <div className={styles.statBlock}>
              <h1>Reserved</h1>
              <h2 className={styles.reserved}>
                {transactions?.stats.reservedMinutes}
              </h2>
            </div>
            <div className={styles.lineDivider} />
            <div className={styles.statBlock}>
              <h1>Lifetime</h1>
              <h2 className={styles.lifetime}>
                {transactions?.stats.lifetimeEarnedMinutes}
              </h2>
            </div>
            <div className={styles.lineDivider} />
          </div>
        </div>

        <TransactionsFilter search={search} />
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
          <div className={styles.transactionsWrapper}>
            {(search.From ?? from) && (search.To ?? to) && (
              <span className={styles.dateRange}>
                {formatDateRange(from, to, undefined, false)}
              </span>
            )}
            <motion.div
              layout
              initial={false}
              transition={{ layout: layoutTransition }}
            >
              {transactions?.data?.length === 0 ? (
                <div className={styles.emptyState}>
                  <h2>No transactions found</h2>
                  <p>Try adjusting your filters</p>
                </div>
              ) : (
                <Suspense
                  fallback={
                    <ListWidgetSkeleton
                      items={12}
                      renderSkeleton={() => (
                        <div className={styles.transactionItem}>
                          <TransactionListItemSkeleton />
                        </div>
                      )}
                      className={styles.skeletonGrid}
                    />
                  }
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={JSON.stringify(search)}
                      {...fadeVariants}
                      transition={fadeDuration}
                      className={styles.listWrapper}
                    >
                      <TransactionsListWidget
                        className={styles.transactionsList}
                        renderCard={(transaction, index) => (
                          <motion.div
                            key={transaction.id}
                            custom={index + 1}
                            variants={staggeredCardVariants}
                            initial="hidden"
                            animate="visible"
                            className={styles.transactionItem}
                          >
                            <TransactionListItem transaction={transaction} />
                          </motion.div>
                        )}
                        useTransactionsQuery={() => {
                          const { data } = useSuspenseQuery(
                            offerQuery.listTransactions(search),
                          );
                          return { data: data.data };
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </Suspense>
              )}
            </motion.div>
          </div>

          {transactions && transactions.pagination?.totalPages > 1 && (
            <div className={styles.paginationWrapper}>
              <Pagination
                total={transactions.pagination.totalPages}
                page={search.Page}
                onChange={handlePageChange}
              />
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
};
