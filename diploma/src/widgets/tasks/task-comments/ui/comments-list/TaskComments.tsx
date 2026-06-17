import { TaskCommentItem, taskQuery } from "@entities/task";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import styles from "./TaskComments.module.scss";
import { LoadMoreButton } from "@shared/ui/buttons";
import type { TaskComment } from "@entities/task/model";
import type { MenuItem } from "@shared/config/types";
import { useTaskComments } from "../../model/useTaskComments";
import { useLayoutEffect, useRef } from "react";
import { DeleteCommentModal, EditCommentForm } from "@features/tasks";
import { ReportButton } from "@features/moderation";
import { ModerationSubjectType } from "@entities/report";
import { useTranslation } from "react-i18next";

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

const CommentList = ({
  comments,
  depth = 0,
  userId,
  getMenuItems,
  editingId,
  taskId,
  onCancel,
}: CommentListProps) => {
  const firstCommentRef = useRef<HTMLDivElement>(null);
  const repliesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!firstCommentRef.current || !repliesRef.current) return;

    const observer = new ResizeObserver(() => {
      const height = firstCommentRef.current!.getBoundingClientRect().height;
      repliesRef.current!.style.setProperty(
        "--comment-wrapper-height",
        `${height}px`,
      );
    });

    observer.observe(firstCommentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={depth > 0 ? styles.repliesWrapper : undefined}
      ref={repliesRef}
    >
      <div className={styles.replies}>
        {comments.map((comment, index) => (
          <div
            key={comment.id}
            ref={index === 0 ? firstCommentRef : undefined}
            className={depth > 0 ? styles.replyItem : undefined}
          >
            <TaskCommentItem
              comment={comment}
              menuItems={
                comment.author.id === userId ? getMenuItems(comment) : []
              }
              editSlot={
                editingId === comment.id ? (
                  <EditCommentForm
                    taskId={taskId}
                    commentId={comment.id}
                    initialBody={comment.body}
                    onCancel={onCancel}
                  />
                ) : null
              }
              reportSlot={
                comment.author.id !== userId ? (
                  <ReportButton
                    subjectType={ModerationSubjectType.Comment}
                    subjectId={comment.id}
                    buttonClassName={styles.reportButton}
                    iconClassName={styles.reportIcon}
                  />
                ) : undefined
              }
            />
            {!!comment.replies?.length && (
              <CommentList
                comments={comment.replies}
                depth={depth + 1}
                userId={userId}
                getMenuItems={getMenuItems}
                editingId={editingId}
                taskId={taskId}
                onCancel={onCancel}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
