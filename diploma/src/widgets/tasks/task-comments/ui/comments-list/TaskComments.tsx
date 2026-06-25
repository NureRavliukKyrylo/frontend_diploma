import { taskQuery } from "@entities/task";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import styles from "./TaskComments.module.scss";
import { LoadMoreButton } from "@shared/ui/buttons";
import type { TaskComment } from "@entities/task/model";
import type { MenuItem } from "@shared/config/types";
import { useTaskComments } from "../../model/useTaskComments";
import { DeleteCommentModal } from "@features/tasks";
import { useTranslation } from "react-i18next";
import { CommentThreadNode } from "./CommentThreadNode";

interface TaskCommentsProps {
  PageSize: number;
  taskId: string;
  userId?: string;
}

interface CommentListProps {
  comments: TaskComment[];
  depth?: number;
  userId?: string;
  getMenuItems: (comment: TaskComment) => MenuItem<"edit" | "delete">[];
  editingId: string | null;
  taskId: string;
  onCancel: () => void;
}

export const TaskComments = ({
  taskId,
  PageSize,
  userId,
}: TaskCommentsProps) => {
  const { t } = useTranslation(["task"]);
  const {
    getMenuItems,
    modalType,
    selectedTaskComment,
    handleCloseModal,
    editingId,
    handleCancel,
  } = useTaskComments();

  const {
    data: comments,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(taskQuery.comments(taskId, { PageSize }));

  if (!comments.length) {
    return (
      <div className={styles.emptyState}>
        <h2>{t("task:comments.emptyStateTitle")}</h2>
        <p>{t("task:comments.emptyStateSubtitle")}</p>
      </div>
    );
  }

  return (
    <div className={styles.commentsWrapper}>
      <CommentList
        comments={comments}
        userId={userId}
        getMenuItems={getMenuItems}
        editingId={editingId}
        taskId={taskId}
        onCancel={handleCancel}
      />
      {hasNextPage && (
        <LoadMoreButton
          onClick={fetchNextPage}
          isLoading={isFetchingNextPage}
        />
      )}
      {selectedTaskComment && (
        <DeleteCommentModal
          commentContent={selectedTaskComment.body}
          commentId={selectedTaskComment.id}
          taskId={taskId}
          isOpen={modalType === "delete"}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export const CommentList = ({
  comments,
  depth = 0,
  userId,
  getMenuItems,
  editingId,
  taskId,
  onCancel,
}: CommentListProps) => {
  return (
    <div className={depth > 0 ? styles.repliesWrapper : undefined}>
      <div className={styles.replies}>
        {comments.map((comment, index) => (
          <CommentThreadNode
            key={comment.id}
            comment={comment}
            depth={depth}
            userId={userId}
            getMenuItems={getMenuItems}
            editingId={editingId}
            taskId={taskId}
            onCancel={onCancel}
            isLast={index === comments.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
