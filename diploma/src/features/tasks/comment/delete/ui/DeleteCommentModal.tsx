import { ConfirmationModal } from "@shared/ui/modals";
import { DeleteModal } from "@shared/assets/images/actions";
import styles from "./DeleteCommentModal.module.scss";
import { useDeleteComment } from "../model/useDeleteComment";

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
      confirmText="Delete Comment"
      title="Delete Your Comment"
      text={`Are you sure you want to delete your comment? with content: ${commentContent}`}
      cancelText="Cancel"
      error={errorMessage}
      isLoading={isLoading}
      confirmButtonClassName={styles.confirmButtonComment}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
      maxWidth="700px"
    ></ConfirmationModal>
  );
};
