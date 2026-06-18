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
import { useTranslation } from "react-i18next";

interface JoinedFeedbackTabProps {
  entityId: string;
  entityType: Exclude<EntityType, "organization">;
  canSubmitFeedback: boolean;
}

const MyFeedback = ({
  entityId,
  entityType,
  getMenuItems,
}: Pick<JoinedFeedbackTabProps, "entityId" | "entityType"> & {
  getMenuItems: ReturnType<typeof useFeedbackTab>["getMenuItems"];
}) => {
  const { t } = useTranslation(["feedback", "common"]);
  const { data: feedback } = useSuspenseQuery(
    feedbackQuery.my(entityType, entityId),
  );

  if (!feedback) {
    return (
      <div className={styles.emptyState}>
        <h2>{t("feedback:states.joinedEmptyTitle")}</h2>
        <p>{t("feedback:states.joinedEmptySubtitle")}</p>
      </div>
    );
  }

  return (
    <FeedbackControlCard
      feedback={feedback}
      displayName={t("common:members.you", { defaultValue: "You" })}
      menuItems={getMenuItems(feedback)}
    />
  );
};

export const JoinedFeedbackTab = ({
  entityId,
  entityType,
  canSubmitFeedback,
}: JoinedFeedbackTabProps) => {
  const { t } = useTranslation(["feedback", "common"]);
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
          <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
          <p className="errorHint">{t("common:errors.errorHint")}</p>
        </div>
      )}
    >
      <div className={styles.feedbackJoinedTabWrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.actionsJoinedFeedback}>
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
          </div>
        </div>
        <div className={styles.mainContent}>
          <h1 className={styles.reviewTitle}>
            {t("feedback:content.yourReview")}
          </h1>
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
