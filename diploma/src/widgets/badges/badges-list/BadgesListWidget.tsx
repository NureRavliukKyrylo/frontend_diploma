import styles from "./BadgesListWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import type { Badge } from "@entities/badge/model";
import type { PaginationRender, QueryResult } from "@shared/config/types";

interface BadgesListWidgetProps {
  useBadgesQuery?: () => QueryResult<Badge>;
  badges?: Badge[];
  renderCard: (badge: Badge, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  renderPagination?: (props: PaginationRender) => React.ReactNode;
  renderEmpty?: (members: Badge[]) => React.ReactNode;
  skeletonItems?: number;
  className?: string;
}

export const BadgesListWidget = ({
  useBadgesQuery,
  renderCard,
  badges: readyBadges,
  className,
  renderSkeleton,
  renderEmpty,
  renderPagination,
  skeletonItems,
}: BadgesListWidgetProps) => {
  const queryResult = useBadgesQuery?.();

  const badges = readyBadges ?? queryResult?.data ?? [];
  const isLoading = queryResult?.isLoading ?? false;
  const hasNextPage = queryResult?.hasNextPage ?? false;
  const isFetchingNextPage = queryResult?.isFetchingNextPage ?? false;
  const fetchNextPage = queryResult?.fetchNextPage ?? (() => {});

  const wrapperClass = `${styles.badgesListWrapper} ${className ?? ""}`.trim();

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
      {renderEmpty?.(badges) ?? (
        <>
          <div className={wrapperClass}>
            {badges.map((badge, index) => renderCard(badge, index))}
          </div>
          {renderPagination?.({
            fetchNextPage,
            isFetchingNextPage,
            hasNextPage,
          })}
        </>
      )}
    </>
  );
};
