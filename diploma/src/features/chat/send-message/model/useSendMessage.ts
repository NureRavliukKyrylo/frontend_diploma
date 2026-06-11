import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { sendMessage, type SendMessageDto } from "../api/sendMessageApi";
import { messageKeys } from "@entities/chat";

export const useSendMessage = (chatId: string) => {
  const mutation = useMutation({
    mutationFn: (data: SendMessageDto) => sendMessage(chatId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messageKeys.list(chatId) });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to send message",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    sendMessage: (data: SendMessageDto) => mutation.mutate(data),
    isLoading: mutation.isPending,
  };
};
