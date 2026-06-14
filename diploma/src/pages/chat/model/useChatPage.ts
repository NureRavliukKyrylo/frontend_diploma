import type { Message } from "@entities/chat";
import { profileQuery } from "@entities/user/profile";
import type { MenuItem } from "@shared/config/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

type ModeType = "edit" | "reply" | "report" | "delete";

export const useChatPage = () => {
  const { chatId, ...search } = useSearch({ from: "/_masterLayout/chat/" });
  const { data: user } = useSuspenseQuery(profileQuery.all());
  const navigate = useNavigate({ from: "/chat/" });

  const [openId, setOpenId] = useState<string | null>(null);
  const [mode, setMode] = useState<
    Record<
      ModeType,
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

  const setModeType = (type: ModeType, message: Message) =>
    setMode((prev) => ({ ...prev, [type]: { isActive: true, message } }));

  const clearModeType = (type: ModeType) =>
    setMode((prev) => ({
      ...prev,
      [type]: { isActive: false, message: null },
    }));

  const getMenuItems = (message: Message): MenuItem<ModeType>[] =>
    message.isMine
      ? [
          {
            key: "edit",
            label: "Edit",
            onClick: () => setModeType("edit", message),
            variant: "edit" as const,
          },
          {
            key: "delete",
            label: "Delete",
            onClick: () => setModeType("delete", message),
            variant: "delete" as const,
          },
          {
            key: "reply",
            label: "Reply",
            onClick: () => setModeType("reply", message),
            variant: "reply" as const,
          },
        ]
      : [
          {
            key: "reply",
            label: "Reply",
            onClick: () => setModeType("reply", message),
            variant: "reply" as const,
          },
          {
            key: "report",
            label: "Report",
            onClick: () => setModeType("report", message),
            variant: "report" as const,
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
