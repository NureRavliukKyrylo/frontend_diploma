import { TaskComments } from "../comments-list/TaskComments";
import styles from "./TaskCommentsTab.module.scss";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import {
  TaskBoardControlItemSkeleton,
  TaskCommentItemSkeleton,
} from "@entities/task";

interface TaskCommentsTabProps {
  PageSize: number;
  taskId: string;
  userId?: string;
  avatarUrl?: string;
}

export const TaskCommentsTab = ({
  PageSize,
  taskId,
  userId,
  avatarUrl,
}: TaskCommentsTabProps) => {
  return (
    <div className={styles.wrapperTaskComments}>
      <div className={styles.wrapperSendMessage}></div>
      <div className={styles.commentsWrapper}>
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
          <Suspense
            fallback={
              <ListWidgetSkeleton
                renderSkeleton={() => <TaskCommentItemSkeleton />}
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
