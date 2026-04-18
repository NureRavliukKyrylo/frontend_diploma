import type { Feedback } from "@entities/feedback/model";
import type { PaginationRender, QueryResult } from "@shared/config/types";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import styles from "./FeedbacksListWidget.module.scss";

interface FeedbacksListWidgetProps {
  useFeedbacksQuery?: () => QueryResult<Feedback>;
  feedbacks?: Feedback[];
  renderCard: (feedback: Feedback, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  renderPagination?: (props: PaginationRender) => React.ReactNode;
  renderEmpty?: (feedbacks: Feedback[]) => React.ReactNode;
  skeletonItems?: number;
  startSlot?: React.ReactNode;
  className?: string;
}

export const FeedbacksListWidget = ({
  useFeedbacksQuery,
  feedbacks: readyFeedbacks,
  renderCard,
  renderSkeleton,
  renderPagination,
  renderEmpty,
  skeletonItems,
  startSlot,
  className,
}: FeedbacksListWidgetProps) => {
  const queryResult = useFeedbacksQuery?.();
  const feedbacks = readyFeedbacks ?? queryResult?.data ?? [];
  const isLoading = queryResult?.isLoading ?? false;
  const hasNextPage = queryResult?.hasNextPage ?? false;
  const isFetchingNextPage = queryResult?.isFetchingNextPage ?? false;
  const fetchNextPage = queryResult?.fetchNextPage ?? (() => {});

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
      {renderEmpty?.(feedbacks) ?? (
        <div
          className={`${styles.feedbackListWrapper} ${className ?? ""}`.trim()}
        >
          {startSlot}
          {feedbacks.map((feedback, index) => renderCard(feedback, index))}
          {renderPagination?.({
            fetchNextPage,
            isFetchingNextPage,
            hasNextPage,
          })}
        </div>
      )}
    </>
  );
};
