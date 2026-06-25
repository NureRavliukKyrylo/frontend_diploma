import type { TaskComment } from "@entities/task/model";
import type { MenuItem } from "@shared/config/types";
import { useLayoutEffect, useRef } from "react";
import styles from "./TaskComments.module.scss";
import { TaskCommentItem } from "@entities/task";
import { EditCommentForm } from "@features/tasks";
import { ReportButton } from "@features/moderation";
import { ModerationSubjectType } from "@entities/report";
import { CommentList } from "./TaskComments";

interface CommentThreadNodeProps {
  comment: TaskComment;
  depth: number;
  userId?: string;
  getMenuItems: (comment: TaskComment) => MenuItem<"edit" | "delete">[];
  editingId: string | null;
  taskId: string;
  onCancel: () => void;
  isLast: boolean;
}

export const CommentThreadNode = ({
  comment,
  depth,
  userId,
  getMenuItems,
  editingId,
  taskId,
  onCancel,
  isLast,
}: CommentThreadNodeProps) => {
  const parentCommentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const parentEl = parentCommentRef.current;
    const containerEl = containerRef.current;

    if (!parentEl || !containerEl) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === parentEl) {
          containerEl.style.setProperty(
            "--parent-comment-height",
            `${entry.contentRect.height}px`,
          );
        }

        if (entry.target === containerEl) {
          const repliesWrapper = containerEl.closest(
            `.${styles.repliesWrapper}`,
          ) as HTMLDivElement;
          if (repliesWrapper) {
            repliesWrapper.style.setProperty(
              "--last-child-offset",
              `${entry.contentRect.height}px`,
            );
          }
        }
      }
    });

    observer.observe(parentEl);

    if (isLast && depth > 0) {
      observer.observe(containerEl);
    }

    return () => observer.disconnect();
  }, [isLast, depth]);

  return (
    <div ref={containerRef}>
      <div
        className={depth > 0 ? styles.replyItem : undefined}
        ref={parentCommentRef}
      >
        <TaskCommentItem
          comment={comment}
          menuItems={comment.author.id === userId ? getMenuItems(comment) : []}
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
            comment.author.id !== userId &&
            comment.canSubmitReport && (
              <ReportButton
                subjectType={ModerationSubjectType.comment}
                subjectId={comment.id}
                buttonClassName={styles.reportButton}
                iconClassName={styles.reportIcon}
              />
            )
          }
        />
      </div>
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
  );
};
