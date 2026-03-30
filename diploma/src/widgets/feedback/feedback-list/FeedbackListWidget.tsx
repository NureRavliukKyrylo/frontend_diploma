import type { FeedBack } from "@entities/feedback/model";
import type { PaginationRender, QueryResult } from "@shared/config/types";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import styles from "./FeedbackListWidget.module.scss";

interface FeedbackListWidgetProps {
  query?: QueryResult<FeedBack>;
  feedbacks?: FeedBack[];
  renderCard: (feedback: FeedBack, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  renderPagination?: (props: PaginationRender) => React.ReactNode;
  skeletonItems?: number;
  startSlot?: React.ReactNode;
  className?: string;
}

export const FeedbackListWidget = ({
  query,
  feedbacks: readyFeedbacks,
  renderCard,
  renderSkeleton,
  renderPagination,
  skeletonItems,
  startSlot,
  className,
}: FeedbackListWidgetProps) => {
  const feedbacks = readyFeedbacks ?? query?.data ?? [];
  const isLoading = query?.isLoading ?? false;
  const hasNextPage = query?.hasNextPage ?? false;
  const isFetchingNextPage = query?.isFetchingNextPage ?? false;
  const fetchNextPage = query?.fetchNextPage ?? (() => {});

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
    <div className={`${styles.feedbackListWrapper} ${className ?? ""}`.trim()}>
      {startSlot}
      {feedbacks.map((feedback, index) => renderCard(feedback, index))}
      {renderPagination?.({ fetchNextPage, isFetchingNextPage, hasNextPage })}
    </div>
  );
};
