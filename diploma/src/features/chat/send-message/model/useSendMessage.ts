import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { sendMessage, type SendMessageDto } from "../api/sendMessageApi";
import { messageKeys, useChatScrollStore } from "@entities/chat";
import { useTranslation } from "react-i18next";

export const useSendMessage = (chatId: string, onSuccess?: () => void) => {
  const { t } = useTranslation(["chat", "commob"]);

  const mutation = useMutation({
    mutationFn: (data: SendMessageDto) => sendMessage(chatId, data),
    onSuccess: () => {
      useChatScrollStore.getState().requestScrollToBottom(chatId);
      queryClient.invalidateQueries({ queryKey: messageKeys.list(chatId) });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("chat:toasts.sendError"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    sendMessage: (data: SendMessageDto) => mutation.mutate(data),
    isLoading: mutation.isPending,
  };
};
