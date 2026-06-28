import {
  chatKeys,
  leaveChat,
  mentionKeys,
} from "@entities/chat";
import { addToast } from "@heroui/react";
import { queryClient } from "@shared/api";
import { getErrorMessage } from "@shared/libs/error-message";
import { ConfirmationModal } from "@shared/ui/modals";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface LeaveChatConfirmationModalProps {
  chatId: string;
  chatName: string;
  isOpen: boolean;
  onClose: () => void;
  onAfterLeave: () => void;
  onPendingChange: (value: boolean) => void;
}

export const LeaveChatConfirmationModal = ({
  chatId,
  chatName,
  isOpen,
  onClose,
  onAfterLeave,
  onPendingChange,
}: LeaveChatConfirmationModalProps) => {
  const { t } = useTranslation(["chat", "common"]);
  const navigate = useNavigate({ from: "/chat/" });
  const leaveMutation = useMutation({
    mutationFn: () => leaveChat(chatId),
    onSuccess: async () => {
      onClose();
      onAfterLeave();
      addToast({ title: t("chat:toasts.leaveChatSuccess"), color: "success" });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: chatKeys.all() }),
        queryClient.invalidateQueries({ queryKey: mentionKeys.all() }),
      ]);
      void navigate({
        search: (prev) => ({ ...prev, chatId: undefined }),
        resetScroll: false,
      });
    },
    onError: (error) => {
      addToast({
        title: t("chat:toasts.leaveChatError"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  useEffect(() => {
    onPendingChange(leaveMutation.isPending);
  }, [leaveMutation.isPending, onPendingChange]);

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={onClose}
      onConfirm={() => leaveMutation.mutate()}
      title={t("chat:modals.leaveChat.title")}
      text={t("chat:modals.leaveChat.text", { name: chatName })}
      confirmText={t("chat:actions.leaveChat")}
      cancelText={t("chat:actions.cancel")}
      isLoading={leaveMutation.isPending}
      maxWidth="520px"
    />
  );
};
