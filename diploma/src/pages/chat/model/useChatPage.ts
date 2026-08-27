import type { Message, MessageModeType } from "@entities/chat";
import { profileQuery } from "@entities/user/profile";
import type { MenuItem } from "@shared/config/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import type { TFunction } from "i18next";
import { useState } from "react";

export const useChatPage = () => {
  const { chatId, ...search } = useSearch({ from: "/_masterLayout/chat/" });
  const { data: user } = useSuspenseQuery(profileQuery.all());
  const navigate = useNavigate({ from: "/chat/" });

  const [openId, setOpenId] = useState<string | null>(null);
  const [mode, setMode] = useState<
    Record<
      MessageModeType,
      {
        isActive: boolean;
        message: Message | null;
      }
    >
  >({
    edit: { isActive: false, message: null },
    reply: { isActive: false, message: null },
    report: { isActive: false, message: null },
    delete: { isActive: false, message: null },
  });

  const handleClickChat = (chatId: string) => {
    navigate({
      search: (prev) => ({ ...prev, chatId: chatId }),
      resetScroll: false,
    });
  };

  const setModeType = (type: MessageModeType, message: Message) =>
    setMode((prev) => ({ ...prev, [type]: { isActive: true, message } }));

  const clearModeType = (type: MessageModeType) =>
    setMode((prev) => ({
      ...prev,
      [type]: { isActive: false, message: null },
    }));

  const getMenuItems = (
    message: Message,
    t: TFunction,
  ): MenuItem<MessageModeType>[] =>
    message.isMine
      ? [
          {
            key: "edit",
            label: t("chat:actions.edit"),
            onClick: () => setModeType("edit", message),
            variant: "edit" as const,
          },
          {
            key: "delete",
            label: t("chat:actions.delete"),
            onClick: () => setModeType("delete", message),
            variant: "delete" as const,
          },
          {
            key: "reply",
            label: t("chat:actions.reply"),
            onClick: () => setModeType("reply", message),
            variant: "reply" as const,
          },
        ]
      : message.canSubmitReport
        ? [
            {
              key: "reply",
              label: t("chat:actions.reply"),
              onClick: () => setModeType("reply", message),
              variant: "reply" as const,
            },
            {
              key: "report",
              label: t("chat:actions.report"),
              onClick: () => setModeType("report", message),
              variant: "report" as const,
            },
          ]
        : [
            {
              key: "reply",
              label: t("chat:actions.reply"),
              onClick: () => setModeType("reply", message),
              variant: "reply" as const,
            },
          ];

  return {
    chatId,
    search,
    user,
    openId,
    setOpenId,
    handleClickChat,
    getMenuItems,
    clearModeType,
    mode,
  };
};
