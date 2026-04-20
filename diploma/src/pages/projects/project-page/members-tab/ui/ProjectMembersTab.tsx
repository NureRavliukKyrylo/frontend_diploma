import { MemberCard, MemberCardSkeleton } from "@entities/user/profile";
import { MembersListWidget } from "@widgets/users";
import styles from "./ProjectMembersTab.module.scss";
import { useMembersInfiniteQuery } from "@shared/api/participation";
import { LoadMoreButton } from "@shared/ui/buttons";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { getHttpErrorInfo } from "@shared/libs/error";
import { ErrorBoundary } from "react-error-boundary";
import { TeamMembers } from "@shared/assets/images/entity-information";

interface ProjectMembersTab {
  projectId: string;
  userId?: string;
}

export const ProjectMembersTab = ({ projectId, userId }: ProjectMembersTab) => {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div className={styles.errorState}>
            <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
            <p className="errorHint">
              Try reloading the page or come back later.
            </p>
          </div>
        );
      }}
    >
      <Suspense
        fallback={
          <ListWidgetSkeleton
            className={styles.membersProjectList}
            renderSkeleton={() => <MemberCardSkeleton />}
          />
        }
      >
        <div className={styles.wrapperMembersProjectList}>
          <MembersListWidget
            renderCard={(member) => {
              const isMember =
                userId != null && member.userId === String(userId);

              if (isMember) {
                return <MemberCard member={member} displayName="You" />;
              }
              return <MemberCard member={member} />;
            }}
            className={styles.membersProjectList}
            useMembersQuery={useMembersInfiniteQuery({
              entityId: projectId,
              pageSize: 8,
              entityType: "project",
            })}
            renderPagination={({
              fetchNextPage,
              isFetchingNextPage,
              hasNextPage,
            }) =>
              hasNextPage && (
                <LoadMoreButton
                  onClick={fetchNextPage}
                  isLoading={isFetchingNextPage}
                />
              )
            }
            startSlot={
              <div className={styles.startMembersSlot}>
                <div className={styles.textBlock}>
                  <h1>Team</h1>
                  <h2>members</h2>
                </div>
                <img src={TeamMembers} alt="team-members" />
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
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
