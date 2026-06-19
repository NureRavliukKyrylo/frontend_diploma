import { MemberCard, MemberCardSkeleton } from "@entities/user/profile";
import { MembersListWidget } from "@widgets/users";
import styles from "./ActivityMembersTab.module.scss";
import { useMembersInfiniteQuery } from "@entities/participation";
import { LoadMoreButton } from "@shared/ui/buttons";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { getHttpErrorInfo } from "@shared/libs/error";
import { ErrorBoundary } from "react-error-boundary";
import { TeamMembers } from "@shared/assets/images/entity-information";
import type { EntityType } from "@shared/config/types";
import { useTranslation } from "react-i18next";

interface ActivityMembersTabProps {
  entityId: string;
  userId?: string;
  entityType: EntityType;
  PageSize?: number;
}

export const ActivityMembersTab = ({
  entityType,
  entityId,
  userId,
  PageSize,
}: ActivityMembersTabProps) => {
  const { t } = useTranslation(["common"]);

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div className={styles.errorState}>
            <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
            <p className="errorHint">{t("common:errors.errorHint")}</p>
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
                return (
                  <MemberCard
                    member={member}
                    displayName={t("common:members.you", {
                      defaultValue: "You",
                    })}
                  />
                );
              }
              return <MemberCard member={member} />;
            }}
            className={styles.membersProjectList}
            useMembersQuery={useMembersInfiniteQuery({
              entityId,
              pageSize: PageSize,
              entityType,
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
                  <h1>{t("common:members.team")}</h1>
                  <h2>{t("common:members.members")}</h2>
                </div>
                <img src={TeamMembers} alt="team-members" />
              </div>
            }
            renderEmpty={(members) =>
              members.length === 0 ? (
                <div className={styles.emptyState}>
                  <h2>{t("common:members.emptyTitle")}</h2>
                  <p>{t("common:members.emptySubtitle")}</p>
                </div>
              ) : null
            }
          />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};
