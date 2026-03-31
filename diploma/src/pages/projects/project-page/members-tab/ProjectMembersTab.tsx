import { MemberCard, MemberCardSkeleton } from "@entities/user/profile";
import { MembersListWidget } from "@widgets/users";
import styles from "./ProjectMembersTab.module.scss";
import { useMembersInfiniteQuery } from "@shared/api/participation";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { getHttpErrorInfo } from "@shared/libs/error";
import { ErrorBoundary } from "react-error-boundary";

interface ProjectMembersTab {
  projectId: string;
}

export const ProjectMembersTab = ({ projectId }: ProjectMembersTab) => {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div className={styles.errorState}>
            <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
          </div>
        );
      }}
    >
      <Suspense
        fallback={
          <ListWidgetSkeleton
            className={styles.membersProjectList}
            renderSkeleton={() => <MemberCardSkeleton />}
            items={9}
          />
        }
      >
        <MembersListWidget
          renderCard={(member) => (
            <MemberCard
              fullName={`${member.firstName} ${member.lastName}`}
              image={member.avatarUrl}
              role={member.role.name}
            />
          )}
          className={styles.membersProjectList}
          useMembersQuery={useMembersInfiniteQuery({
            entityId: projectId,
            pageSize: 9,
            entityType: "project",
          })}
          renderPagination={({
            fetchNextPage,
            isFetchingNextPage,
            hasNextPage,
          }) =>
            hasNextPage && (
              <BaseButtonWrapper
                onClick={fetchNextPage}
                disabled={isFetchingNextPage}
                loading={isFetchingNextPage}
                className={styles.showMoreButton}
              >
                Show more
              </BaseButtonWrapper>
            )
          }
          startSlot={
            <div className={styles.startMembersSlot}>
              <h1>Team members</h1>
              <h2>
                These are the volunteers helping us create positive change
              </h2>
            </div>
          }
          renderEmpty={(members) =>
            members.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>No members yet</h2>
                <p>Be the first to join and make a difference</p>
              </div>
            ) : null
          }
        />
      </Suspense>
    </ErrorBoundary>
  );
};
