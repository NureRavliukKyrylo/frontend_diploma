import styles from "./ActivityFeedbackTab.module.scss";
import { Stars } from "@shared/ui/stars";
import { ProgressBar } from "@shared/ui";
import { FeedbacksListWidget } from "@widgets/feedback";
import {
  FeedbackCard,
  FeedbackCardSkeleton,
  FeedbackControlCard,
  getSortingFeedbackItems,
  useFeedbacksInfiniteQuery,
  useFeedbackTab,
  type FeedbackSortValues,
} from "@entities/feedback";
import {
  CreateFeedbackModal,
  DeleteFeedbackModal,
  EditFeedbackModal,
} from "@features/feedback";
import { BaseButtonWrapper, LoadMoreButton } from "@shared/ui/buttons";
import type { EntityType, Rating } from "@shared/config/types";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import { SortDropDown } from "@shared/ui/drop-down";
import { motion } from "framer-motion";
import { ReportButton } from "@features/moderation";
import { ModerationSubjectType } from "@entities/report";
import { useTranslation } from "react-i18next";

interface ActivityFeedbackTabProps {
  entityId: string;
  userId?: string;
  entityType: Exclude<EntityType, "organization">;
  PageSize?: number;
  OrderBy: FeedbackSortValues;
  canSubmitFeedback: boolean;
  handleSort: (value: FeedbackSortValues) => void;
  rating: Rating;
}

export const ActivityFeedbackTab = ({
  entityId,
  userId,
  entityType,
  PageSize,
  OrderBy,
  canSubmitFeedback,
  handleSort,
  rating,
}: ActivityFeedbackTabProps) => {
  const { t } = useTranslation(["feedback", "common"]);
  const {
    modalType,
    selectedFeedback,
    getMenuItems,
    handleCloseModal,
    setModalType,
  } = useFeedbackTab();

  const ratingValues = [5, 4, 3, 2, 1];

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
      <div className={styles.feedbackTabWrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.overAllRatingInfo}>
            <div className={styles.baseInfo}>
              <h1 className={styles.baseRating}>{rating.value}</h1>
              <Stars
                value={rating.value}
                gradient="linear-gradient(180deg, #8C0000 0%, #260000 100%)"
                classNameStar={styles.starRating}
              />
              <h1 className={styles.totalVotes}>
                {t("feedback:rating.votes", { count: rating.totalVotes })}
              </h1>
            </div>
            <div className={styles.detailedInfo}>
              {ratingValues.map((value) => {
                const detail = rating.detailInfo.find((d) => d.value === value);
                return (
                  <div key={value} className={styles.ratingLine}>
                    <h1 className={styles.ratingValue}>
                      {t("feedback:rating.stars", { count: value })}
                    </h1>
                    <ProgressBar
                      current={detail?.percentOfAll ?? 0}
                      className={styles.progressRating}
                    />
                    <h1 className={styles.votesOfValue}>
                      {t("feedback:rating.votes", {
                        count: detail?.totalVotes ?? 0,
                      })}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.actionsFeedback}>
            <div className={styles.actions}>
              {canSubmitFeedback && (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <BaseButtonWrapper
                    className={styles.submitFeedback}
                    onClick={() => setModalType("create")}
                  >
                    {t("feedback:actions.submit")}
                  </BaseButtonWrapper>
                </motion.div>
              )}

              <div className={styles.sortWrapper}>
                <SortDropDown
                  options={getSortingFeedbackItems(t)}
                  onSelect={handleSort}
                  value={OrderBy ?? "Default"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainContent}>
          <h1 className={styles.reviewTitle}>{t("feedback:content.title")}</h1>
          <Suspense
            fallback={
              <ListWidgetSkeleton
                className={styles.feedbackList}
                renderSkeleton={() => <FeedbackCardSkeleton />}
                items={3}
              />
            }
          >
            <FeedbacksListWidget
              className={styles.feedbackList}
              useFeedbacksQuery={useFeedbacksInfiniteQuery(
                entityType,
                entityId,
                { PageSize, OrderBy },
              )}
              renderCard={(feedback) => {
                const isOwner =
                  userId != null && feedback.author.userId === String(userId);

                if (isOwner) {
                  return (
                    <FeedbackControlCard
                      feedback={feedback}
                      displayName={t("common:members.you", {
                        defaultValue: "You",
                      })}
                      menuItems={getMenuItems(feedback)}
                      key={feedback.id}
                    />
                  );
                }

                return (
                  <FeedbackCard
                    feedback={feedback}
                    key={feedback.id}
                    rightContent={
                      <ReportButton
                        subjectId={feedback.id}
                        subjectType={ModerationSubjectType.Feedback}
                        buttonClassName={styles.feedbackReportButton}
                        iconClassName={styles.feedbackReportIcon}
                      />
                    }
                  />
                );
              }}
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
              renderEmpty={(feedbacks) =>
                feedbacks && feedbacks.length === 0 ? (
                  <div className={styles.emptyState}>
                    <h2>{t("feedback:states.emptyTitle")}</h2>
                    <p>{t("feedback:states.emptySubtitle")}</p>
                  </div>
                ) : null
              }
            />
          </Suspense>
        </div>
        <CreateFeedbackModal
          entityType={entityType}
          entityId={entityId}
          isOpen={modalType === "create"}
          onClose={handleCloseModal}
        />
        {selectedFeedback && (
          <>
            <EditFeedbackModal
              entityType={entityType}
              entityId={entityId}
              feedback={selectedFeedback}
              isOpen={modalType === "edit"}
              onClose={handleCloseModal}
            />
            <DeleteFeedbackModal
              entityType={entityType}
              entityId={entityId}
              feedbackId={selectedFeedback.id}
              isOpen={modalType === "delete"}
              onClose={handleCloseModal}
            />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};
