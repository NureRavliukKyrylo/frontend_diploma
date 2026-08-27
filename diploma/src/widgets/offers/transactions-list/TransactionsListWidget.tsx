import styles from "./TransactionsListWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import type { QueryResult } from "@shared/config/types";
import type { TimeTransaction } from "@entities/offer";

interface TransactionsListWidgetProps {
  useTransactionsQuery?: () => QueryResult<TimeTransaction>;
  transactions?: TimeTransaction[];
  renderCard: (transaction: TimeTransaction, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  startSlot?: React.ReactNode;
  skeletonItems?: number;
  className?: string;
}

export const TransactionsListWidget = ({
  useTransactionsQuery,
  renderCard,
  transactions: readyTransactions,
  className,
  renderSkeleton,
  skeletonItems,
  startSlot,
}: TransactionsListWidgetProps) => {
  const queryResult = useTransactionsQuery?.();

  const transactions = readyTransactions ?? queryResult?.data;
  const isLoading = queryResult?.isLoading ?? false;

  const wrapperClass =
    `${styles.transactionsListWrapper} ${className ?? ""}`.trim();

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
    <div className={wrapperClass}>
      {startSlot}
      {transactions?.map((transaction, index) =>
        renderCard(transaction, index),
      )}
    </div>
  );
};
