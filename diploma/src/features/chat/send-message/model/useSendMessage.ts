import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { sendMessage, type SendMessageDto } from "../api/sendMessageApi";
import {
  appendMessage,
  useChatMessagesQuery,
  useChatScrollStore,
  type Message,
} from "@entities/chat";
import { useTranslation } from "react-i18next";

export const useSendMessage = (chatId: string, onSuccess?: () => void) => {
  const { t } = useTranslation(["chat", "common"]);
  const { queryKey } = useChatMessagesQuery(chatId);
  const mutation = useMutation({
    mutationFn: (data: SendMessageDto) => sendMessage(chatId, data),
    onSuccess: (newMessage: Message) => {
      useChatScrollStore.getState().requestScrollToBottom(chatId);
      appendMessage(queryKey, newMessage);
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
