import type {
  ChatSearchParams,
  RelatedEntityTypeChatValue,
} from "@entities/chat";
import { toggleArrayParam } from "@shared/libs/search-params";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const useChatSidebar = () => {
  const search = useSearch({ from: "/_masterLayout/chat/" });
  const navigate = useNavigate({ from: "/chat/" });

  const nav = (updater: (prev: ChatSearchParams) => ChatSearchParams) =>
    navigate({
      search: (prev) => updater(prev as ChatSearchParams),
      resetScroll: false,
    });

  return {
    onSearchChange: (value: string) =>
      nav((prev) => ({ ...prev, Search: value || undefined, Page: 1 })),

    onChatTypeChange: (type: RelatedEntityTypeChatValue) =>
      nav((prev) => ({
        ...prev,
        RelatedEntityType: toggleArrayParam(prev.RelatedEntityType, type),
        Page: 1,
      })),
    search,
  };
};
