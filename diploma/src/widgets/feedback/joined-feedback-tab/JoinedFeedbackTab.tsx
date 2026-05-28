import styles from "./JoinedFeedbackTab.module.scss";
import {
  FeedbackCardSkeleton,
  FeedbackControlCard,
  feedbackQuery,
  useFeedbackTab,
} from "@entities/feedback";
import {
  CreateFeedbackModal,
  DeleteFeedbackModal,
  EditFeedbackModal,
} from "@features/feedback";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import type { EntityType } from "@shared/config/types";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import { motion } from "framer-motion";
import { useSuspenseQuery } from "@tanstack/react-query";

interface JoinedFeedbackTabProps {
  entityId: string;
  entityType: EntityType;
  canSubmitFeedback: boolean;
}

const MyFeedback = ({
  entityId,
  entityType,
  getMenuItems,
}: Pick<JoinedFeedbackTabProps, "entityId" | "entityType"> & {
  getMenuItems: ReturnType<typeof useFeedbackTab>["getMenuItems"];
}) => {
  const { data: feedback } = useSuspenseQuery(
    feedbackQuery.my(entityType, entityId),
  );

  if (!feedback) {
    return (
      <div className={styles.emptyState}>
        <h2>No feedback yet</h2>
        <p>
          You've joined — now share what you think. Be the first to leave a
          review.
        </p>
      </div>
    );
  }

  return (
    <FeedbackControlCard
      feedback={feedback}
      displayName="You"
      menuItems={getMenuItems(feedback)}
    />
  );
};

export const JoinedFeedbackTab = ({
  entityId,
  entityType,
  canSubmitFeedback,
}: JoinedFeedbackTabProps) => {
  const {
    modalType,
    selectedFeedback,
    getMenuItems,
    handleCloseModal,
    setModalType,
  } = useFeedbackTab();

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div className={styles.errorState}>
          <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
          <p className="errorHint">
            Try reloading the page or come back later.
          </p>
        </div>
      )}
    >
      <div className={styles.feedbackTabWrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.actionsFeedback}>
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
                  Submit Feedback
                </BaseButtonWrapper>
              </motion.div>
            )}
          </div>
        </div>
        <div className={styles.mainContent}>
          <h1 className={styles.reviewTitle}>Your Review</h1>
          <Suspense fallback={<FeedbackCardSkeleton />}>
            <MyFeedback
              entityId={entityId}
              entityType={entityType}
              getMenuItems={getMenuItems}
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
