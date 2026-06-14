import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { messageKeys } from "@entities/chat";
import { deleteMessage } from "../api/deleteMessageApi";

export const useDeleteMessage = (chatId: string, onSuccess?: () => void) => {
  const mutation = useMutation({
    mutationFn: (messageId: string) => deleteMessage(chatId, messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messageKeys.list(chatId) });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to delete message",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    deleteMessage: (messageId: string) => mutation.mutate(messageId),
    isLoading: mutation.isPending,
  };
};
