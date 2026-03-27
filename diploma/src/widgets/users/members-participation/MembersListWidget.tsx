import type { ParticipationMember } from "@shared/config/types";
import type { QueryResult } from "@shared/config/types";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import styles from "./MembersListWidget.module.scss";
import { type PaginationRender } from "@shared/config/types";

interface MembersListWidgetProps {
  useMembersQuery?: () => QueryResult<ParticipationMember>;
  members?: ParticipationMember[];
  renderCard: (member: ParticipationMember, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  renderPagination?: (props: PaginationRender) => React.ReactNode;
  skeletonItems?: number;
  startSlot?: React.ReactNode;
  className?: string;
}

export const MembersListWidget = ({
  useMembersQuery,
  members: readyMembers,
  renderCard,
  renderSkeleton,
  renderPagination,
  skeletonItems,
  startSlot,
  className,
}: MembersListWidgetProps) => {
  const queryResult = useMembersQuery?.();
  const members = readyMembers ?? queryResult?.data ?? [];
  const isLoading = queryResult?.isLoading ?? false;
  const hasNextPage = queryResult?.hasNextPage ?? false;
  const isFetchingNextPage = queryResult?.isFetchingNextPage ?? false;
  const fetchNextPage = queryResult?.fetchNextPage ?? (() => {});

  const wrapperClass = `${styles.membersListWrapper} ${className ?? ""}`.trim();

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
      {members.map((member, index) => renderCard(member, index))}
      {renderPagination?.({ fetchNextPage, isFetchingNextPage, hasNextPage })}
    </div>
  );
};
