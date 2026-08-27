import { ConfirmationModal } from "@shared/ui/modals";
import { DeleteModal } from "@shared/assets/images/actions";
import styles from "./DeleteCommentModal.module.scss";
import { useDeleteComment } from "../model/useDeleteComment";
import { useTranslation } from "react-i18next";

interface DeleteCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  commentId: string;
  commentContent: string;
}

export const DeleteCommentModal = ({
  isOpen,
  onClose,
  commentId,
  taskId,
  commentContent,
}: DeleteCommentModalProps) => {
  const { t } = useTranslation(["task"]);
  const { deleteComment, errorMessage, isLoading } = useDeleteComment(
    taskId,
    commentId,
    onClose,
  );

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={onClose}
      onConfirm={deleteComment}
      confirmText={t("task:comments.actions.deleteComment")}
      title={t("task:comments.deleteModal.title")}
      text={t("task:comments.deleteModal.textPattern", {
        content: commentContent,
      })}
      cancelText={t("task:comments.actions.cancel")}
      error={errorMessage}
      isLoading={isLoading}
      confirmButtonClassName={styles.confirmButtonComment}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
      maxWidth="700px"
    />
  );
};
