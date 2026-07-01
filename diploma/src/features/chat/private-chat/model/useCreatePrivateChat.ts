import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { useRouter } from "@tanstack/react-router";
import { createPrivateChat } from "../api/createPrivateChat";
import { useTranslation } from "react-i18next";

export const useCreatePrivateChat = () => {
  const router = useRouter();
  const { t } = useTranslation(["chat", "common"]);

  const mutation = useMutation({
    mutationFn: (userId: string) => createPrivateChat(userId),
    onSuccess: ({ id }) => {
      router.navigate({
        to: "/chat",
        search: { chatId: id },
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("chat:toasts.openError"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    createPrivateChat: (userId: string) => mutation.mutate(userId),
    isLoading: mutation.isPending,
  };
};
