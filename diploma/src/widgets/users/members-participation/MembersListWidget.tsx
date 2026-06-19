import type { ParticipationMember } from "@entities/participation";
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
  renderEmpty?: (members: ParticipationMember[]) => React.ReactNode;
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
  renderEmpty,
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
    <>
      {renderEmpty?.(members) ?? (
        <>
          <div className={wrapperClass}>
            {startSlot}
            {members.map((member, index) => renderCard(member, index))}
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
