import { ConfirmationModal } from "@shared/ui/modals";
import type { Message } from "@entities/chat";
import { useDeleteMessage } from "../model/useDeleteMessage";
import styles from "./DeleteMessageModal.module.scss";
import { DeleteModal } from "@shared/assets/images/actions";

interface DeleteMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: Message;
  chatId: string;
}

export const DeleteMessageModal = ({
  isOpen,
  onClose,
  message,
  chatId,
}: DeleteMessageModalProps) => {
  const { deleteMessage, isLoading } = useDeleteMessage(chatId, onClose);

  const preview =
    message.message.length > 20
      ? `${message.message.slice(0, 20)}...`
      : message.message;

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={onClose}
      onConfirm={() => deleteMessage(message.id)}
      confirmText="Delete"
      title="Delete Message"
      text={`Are you sure you want to delete "${preview}"? This action cannot be undone.`}
      cancelText="Cancel"
      confirmButtonClassName={styles.confirmButtonMessage}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
      isLoading={isLoading}
    />
  );
};
