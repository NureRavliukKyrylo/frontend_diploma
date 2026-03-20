import styles from "./BadgesListWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import type { Badge } from "@entities/badge/model";
import type { QueryResult } from "@shared/config/types";

interface BadgesListWidgetProps {
  useBadgesQuery?: () => QueryResult<Badge>;
  badges?: Badge[];
  renderCard: (badge: Badge, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  skeletonItems?: number;
  className?: string;
}

export const BadgesListWidget = ({
  useBadgesQuery,
  renderCard,
  badges: readyBadges,
  className,
  renderSkeleton,
  skeletonItems,
}: BadgesListWidgetProps) => {
  const queryResult = useBadgesQuery?.();

  const badges = readyBadges ?? queryResult?.data;
  const isLoading = queryResult?.isLoading ?? false;

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
    <div className={wrapperClass}>
      {badges?.map((badge, index) => renderCard(badge, index))}
    </div>
  );
};
