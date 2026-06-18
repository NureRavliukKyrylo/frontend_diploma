import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { messageKeys } from "@entities/chat";
import { deleteMessage } from "../api/deleteMessageApi";
import { useTranslation } from "react-i18next";

export const useDeleteMessage = (chatId: string, onSuccess?: () => void) => {
  const { t } = useTranslation(["chat", "common"]);

  const mutation = useMutation({
    mutationFn: (messageId: string) => deleteMessage(chatId, messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messageKeys.list(chatId) });
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
