import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { editMessage, type EditMessageDto } from "../api/editMessageApi";
import { updateMessage, useChatMessagesQuery } from "@entities/chat";
import { useTranslation } from "react-i18next";

export const useEditMessage = (
  chatId: string,
  messageId: string,
  onSuccess?: () => void,
) => {
  const { t } = useTranslation(["chat", "common"]);
  const { queryKey } = useChatMessagesQuery(chatId);

  const mutation = useMutation({
    mutationFn: (data: EditMessageDto) => editMessage(chatId, messageId, data),
    onSuccess: (data) => {
      updateMessage(queryKey, data);
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("chat:toasts.editError"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    editMessage: (data: EditMessageDto) => mutation.mutate(data),
    isLoading: mutation.isPending,
  };
};
