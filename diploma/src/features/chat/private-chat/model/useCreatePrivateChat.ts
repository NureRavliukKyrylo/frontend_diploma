import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { useRouter } from "@tanstack/react-router";
import { createPrivateChat } from "../api/createPrivateChat";

export const useCreatePrivateChat = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (userId: string) => createPrivateChat(userId),
    onSuccess: ({ id }) => {
      router.navigate({
        to: "/chat",
        params: { id },
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to open chat",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    createPrivateChat: (userId: string) => mutation.mutate(userId),
    isLoading: mutation.isPending,
  };
};
