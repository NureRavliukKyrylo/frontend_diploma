import { TaskCommentItem, taskQuery } from "@entities/task";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import styles from "./TaskComments.module.scss";
import { LoadMoreButton } from "@shared/ui/buttons";
import type { TaskComment } from "@entities/task/model";
import type { MenuItem } from "@shared/config/types";
import { useTaskComments } from "../../model/useTaskComments";
import { useLayoutEffect, useRef } from "react";

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
}

export const TaskComments = ({
  taskId,
  PageSize,
  userId,
}: TaskCommentsProps) => {
  const { getMenuItems, modalType, selectedTaskComment, handleCloseModal } =
    useTaskComments();

  const {
    data: comments,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(taskQuery.comments(taskId, { PageSize }));

  if (!comments.length) {
    return (
      <div className={styles.emptyState}>
        <h2>No comments yet</h2>
        <p>Be the first one to leave a comment</p>
      </div>
    );
  }

  return (
    <div className={styles.commentsWrapper}>
      <CommentList
        comments={comments}
        userId={userId}
        getMenuItems={getMenuItems}
      />
      {hasNextPage && (
        <LoadMoreButton
          onClick={fetchNextPage}
          isLoading={isFetchingNextPage}
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
                comment.authorUserId === userId ? getMenuItems(comment) : []
              }
            />
            {!!comment.replies?.length && (
              <CommentList
                comments={comment.replies}
                depth={depth + 1}
                userId={userId}
                getMenuItems={getMenuItems}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
