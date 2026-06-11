import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { editMessage, type EditMessageDto } from "../api/editMessageApi";
import { messageKeys } from "@entities/chat";

export const useEditMessage = (chatId: string, messageId: string) => {
  const mutation = useMutation({
    mutationFn: (data: EditMessageDto) => editMessage(chatId, messageId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messageKeys.list(chatId) });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to edit message",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    editMessage: (data: EditMessageDto) => mutation.mutate(data),
    isLoading: mutation.isPending,
  };
};
