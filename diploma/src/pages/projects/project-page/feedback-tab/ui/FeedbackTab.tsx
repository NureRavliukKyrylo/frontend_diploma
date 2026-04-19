import type { Project } from "@entities/project";
import styles from "./FeedbackTab.module.scss";
import { Stars } from "@shared/ui/stars";
import { ProgressBar } from "@shared/ui";
import { FeedbacksListWidget } from "@widgets/feedback";
import {
  FeedbackCard,
  FeedbackCardSkeleton,
  FeedbackControlCard,
  useFeedbacksInfiniteQuery,
} from "@entities/feedback";
import { useFeedbackTab } from "../model/useFeedbackTab";
import {
  CreateFeedbackModal,
  DeleteFeedbackModal,
  EditFeedbackModal,
} from "@features/feedback";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import type { Rating } from "@shared/config/types";
import { Suspense } from "react";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";

interface FeedbackTabProps {
  project: Project;
  userId?: string;
}

export const mockRating: Rating = {
  value: 4.2,
  totalVotes: 1240,
  detailInfo: [
    { value: 5, totalVotes: 720, percentOfAll: 58 },
    { value: 4, totalVotes: 300, percentOfAll: 24 },
    { value: 3, totalVotes: 120, percentOfAll: 10 },
    { value: 2, totalVotes: 60, percentOfAll: 5 },
    { value: 1, totalVotes: 40, percentOfAll: 3 },
  ],
};

export const FeedbackTab = ({ project, userId }: FeedbackTabProps) => {
  const {
    modalType,
    selectedFeedback,
    getMenuItems,
    handleCloseModal,
    setModalType,
  } = useFeedbackTab();

  return (
    <div className={styles.feedbackTabWrapper}>
      <div className={styles.headerWrapper}>
        <div className={styles.overAllRatingInfo}>
          <div className={styles.baseInfo}>
            <h1 className={styles.baseRating}>4</h1>
            <Stars
              value={4}
              gradient="linear-gradient(180deg, #8C0000 0%, #260000 100%)"
            />
            <h1 className={styles.totalVotes}>120 VOTES</h1>
          </div>
          <div className={styles.detailedInfo}>
            {mockRating.detailInfo.map((rating) => (
              <div className={styles.ratingLine}>
                <h1 className={styles.ratingValue}>{rating.value} STARS</h1>
                <ProgressBar
                  current={rating.percentOfAll}
                  className={styles.progressRating}
                />
                <h1 className={styles.votesOfValue}>
                  {rating.totalVotes} VOTES
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.actionsFeedback}>
          <div className={styles.actions}>
            <BaseButtonWrapper
              className={styles.submitFeedback}
              onClick={() => setModalType("create")}
            >
              Submit Feedback
            </BaseButtonWrapper>
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        <h1 className={styles.reviewTitle}>Review</h1>
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
                className={styles.feedbackList}
                renderSkeleton={() => <FeedbackCardSkeleton />}
                items={9}
              />
            }
          >
            <FeedbacksListWidget
              className={styles.feedbackList}
              useFeedbacksQuery={useFeedbacksInfiniteQuery(
                "project",
                project.id,
                {
                  PageSize: 3,
                },
              )}
              renderCard={(feedback) => {
                const isOwner =
                  userId != null && feedback.member.userId === String(userId);

                if (isOwner) {
                  return (
                    <FeedbackControlCard
                      feedback={feedback}
                      displayName="You"
                      menuItems={getMenuItems(feedback)}
                      key={feedback.id}
                    />
                  );
                }

                return (
                  <FeedbackControlCard
                    feedback={feedback}
                    displayName="You"
                    menuItems={getMenuItems(feedback)}
                    key={feedback.id}
                  />
                );
              }}
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
              renderEmpty={(feedbacks) =>
                feedbacks.length === 0 && feedbacks ? (
                  <div className={styles.emptyState}>
                    <h2>No Feedbacks yet</h2>
                    <p>Be the first one to leave a feedback</p>
                  </div>
                ) : null
              }
            />
          </Suspense>
        </ErrorBoundary>
      </div>
      <CreateFeedbackModal
        entityType="project"
        entityId={project.id}
        isOpen={modalType === "create"}
        onClose={handleCloseModal}
      />
      {selectedFeedback && (
        <>
          <EditFeedbackModal
            entityType="project"
            entityId={project.id}
            feedback={selectedFeedback}
            isOpen={modalType === "edit"}
            onClose={handleCloseModal}
          />
          <DeleteFeedbackModal
            entityType="project"
            entityId={project.id}
            feedbackId={selectedFeedback.id}
            isOpen={modalType === "delete"}
            onClose={handleCloseModal}
          />
        </>
      )}
    </div>
  );
};
