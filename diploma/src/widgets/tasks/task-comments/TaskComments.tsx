import { TaskCommentItem, taskQuery } from "@entities/task";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import styles from "./TaskComments.module.scss";
import { LoadMoreButton } from "@shared/ui/buttons";
import type { TaskComment } from "@entities/task/model";

interface TaskCommentsProps {
  PageSize: number;
  taskId: string;
  avatarUrl?: string;
}

interface CommentListProps {
  comments: TaskComment[];
  avatarUrl?: string;
  depth?: number;
}

export const TaskComments = ({
  avatarUrl,
  taskId,
  PageSize,
}: TaskCommentsProps) => {
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
      <CommentList comments={comments} avatarUrl={avatarUrl} />
      {hasNextPage && (
        <LoadMoreButton
          onClick={fetchNextPage}
          isLoading={isFetchingNextPage}
        />
      )}
    </div>
  );
};

const CommentList = ({ comments, avatarUrl, depth = 0 }: CommentListProps) => (
  <div className={depth > 0 ? styles.repliesWrapper : undefined}>
    {depth > 0 && <div className={styles.threadLine} />}
    <div className={styles.replies}>
      {comments.map((comment) => (
        <div key={comment.id}>
          <TaskCommentItem avatarUrl={avatarUrl} comment={comment} />
          {comment.replyToUserId?.length && (
            <CommentList
              comments={comment.replyToUserId}
              avatarUrl={avatarUrl}
              depth={depth + 1}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);
