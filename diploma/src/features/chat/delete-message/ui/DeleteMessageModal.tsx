import { ConfirmationModal } from "@shared/ui/modals";
import type { Message } from "@entities/chat";
import { useDeleteMessage } from "../model/useDeleteMessage";
import styles from "./DeleteMessageModal.module.scss";
import { DeleteModal } from "@shared/assets/images/actions";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["chat"]);
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
      confirmText={t("chat:actions.delete")}
      title={t("chat:modals.delete.title")}
      text={t("chat:modals.delete.text", { preview })}
      cancelText={t("chat:actions.cancel")}
      confirmButtonClassName={styles.confirmButtonMessage}
      image={DeleteModal}
      imageClassName={styles.imageDelete}
      isLoading={isLoading}
    />
  );
};
