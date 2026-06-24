import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { useChatMessagesQuery } from "@entities/chat";
import { useTranslation } from "react-i18next";
import { deleteMessage } from "../api/deleteMessageApi";
import { deleteMessage as deleteMessageCache } from "@entities/chat";

export const useDeleteMessage = (chatId: string, onSuccess?: () => void) => {
  const { t } = useTranslation(["chat", "common"]);
  const { queryKey } = useChatMessagesQuery(chatId);

  const mutation = useMutation({
    mutationFn: (messageId: string) => deleteMessage(chatId, messageId),
    onSuccess: (_, messageId) => {
      deleteMessageCache(queryKey, messageId);
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("chat:toasts.deleteError"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    deleteMessage: (messageId: string) => mutation.mutate(messageId),
    isLoading: mutation.isPending,
  };
};
