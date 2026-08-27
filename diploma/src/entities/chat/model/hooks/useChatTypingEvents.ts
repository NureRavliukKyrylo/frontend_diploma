import { useSignalREvent } from "@shared/libs/hooks";
import { useCallback } from "react";
import { useChatStore } from "../store/useChatStore";

interface TypingPayload {
  chatId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export function useChatTypingEvents() {
  const setTyping = useChatStore((s) => s.setTyping);

  useSignalREvent(
    "chats",
    "chat.typing.started",
    useCallback(
      ({ chatId, user }: TypingPayload) => setTyping(chatId, user),
      [setTyping],
    ),
  );

  useSignalREvent(
    "chats",
    "chat.typing.stopped",
    useCallback(
      ({ chatId }: Pick<TypingPayload, "chatId">) => setTyping(chatId, null),
      [setTyping],
    ),
  );
}
