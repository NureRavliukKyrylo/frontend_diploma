import { TaskComments } from "../comments-list/TaskComments";
import styles from "./TaskCommentsTab.module.scss";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { TaskCommentItemSkeleton } from "@entities/task";
import { CreateCommentForm } from "@features/tasks";
import { useTranslation } from "react-i18next";

interface TaskCommentsTabProps {
  PageSize: number;
  taskId: string;
  userId?: string;
  userName?: string;
  avatarUrl?: string;
}

export const TaskCommentsTab = ({
  PageSize,
  taskId,
  userId,
  userName,
  avatarUrl,
}: TaskCommentsTabProps) => {
  const { t } = useTranslation("common");

  return (
    <div className={styles.wrapperTaskComments}>
      <div className={styles.wrapperSendMessage}>
        <CreateCommentForm
          taskId={taskId}
          avatarUrl={avatarUrl}
          authorName={userName}
        />
      </div>
      <div className={styles.commentsWrapper}>
        <ErrorBoundary
          fallbackRender={({ error }) => (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
              <p className="errorHint">{t("errors.errorHint")}</p>
            </div>
          )}
        >
          <Suspense
            fallback={
              <ListWidgetSkeleton
                renderSkeleton={() => <TaskCommentItemSkeleton />}
                className={styles.wrapperTaskComments}
              />
            }
          >
            <TaskComments PageSize={PageSize} taskId={taskId} userId={userId} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};
