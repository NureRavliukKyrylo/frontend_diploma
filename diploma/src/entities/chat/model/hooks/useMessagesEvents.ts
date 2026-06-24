import { useSignalREvent } from "@shared/libs/hooks";
import { useCallback } from "react";
import type { Message } from "../types/Message";
import { appendMessage } from "@entities/chat/libs/appendMessage";
import { updateMessage } from "@entities/chat/libs/updateMessage";
import { deleteMessage } from "@entities/chat/libs/deleteMessage";
import type { QueryKey } from "@tanstack/react-query";

interface MessageCreatedPayload {
  chatId: string;
  messageId: string;
  message: Message;
}

interface MessageEditedPayload {
  chatId: string;
  messageId: string;
  message: Message;
}

interface MessageDeletedPayload {
  chatId: string;
  messageId: string;
  isDeleted: boolean;
  isDeletedContentVisible: boolean;
  deletedAt: string;
}

export function useMessageEvents(chatId: string, queryKey: QueryKey) {
  useSignalREvent(
    "chats",
    "chat.message.created",
    useCallback(
      (payload: MessageCreatedPayload) => {
        appendMessage(queryKey, payload.message);
      },
      [chatId],
    ),
  );

  useSignalREvent(
    "chats",
    "chat.message.edited",
    useCallback(
      (payload: MessageEditedPayload) => {
        if (payload.chatId !== chatId) return;
        updateMessage(queryKey, payload.message);
      },
      [chatId],
    ),
  );

  useSignalREvent(
    "chats",
    "message.deleted",
    useCallback(
      (payload: MessageDeletedPayload) => {
        if (payload.chatId !== chatId) return;
        deleteMessage(queryKey, payload.messageId);
      },
      [chatId],
    ),
  );
}
