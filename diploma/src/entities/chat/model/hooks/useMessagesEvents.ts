import { useSignalREvent } from "@shared/libs/hooks";
import { useCallback } from "react";
import type { Message } from "../types/Message";
import { appendMessage } from "@entities/chat/libs/appendMessage";
import { updateMessage } from "@entities/chat/libs/updateMessage";
import { deleteMessage } from "@entities/chat/libs/deleteMessage";
import { useGetMessagesQueryKey } from "@entities/chat/libs/getMessagesQueryKey";

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

export function useMessageEvents() {
  const getMessagesQueryKey = useGetMessagesQueryKey();
  useSignalREvent(
    "chats",
    "chat.message.created",
    useCallback(
      (payload: MessageCreatedPayload) => {
        const queryKey = getMessagesQueryKey(payload.chatId);
        appendMessage(queryKey, payload.message, payload.chatId, true);
      },
      [getMessagesQueryKey],
    ),
  );

  useSignalREvent(
    "chats",
    "chat.message.edited",
    useCallback(
      (payload: MessageEditedPayload) => {
        const queryKey = getMessagesQueryKey(payload.chatId);
        updateMessage(queryKey, payload.message);
      },
      [getMessagesQueryKey],
    ),
  );

  useSignalREvent(
    "chats",
    "message.deleted",
    useCallback(
      (payload: MessageDeletedPayload) => {
        const queryKey = getMessagesQueryKey(payload.chatId);
        deleteMessage(queryKey, payload.messageId);
      },
      [getMessagesQueryKey],
    ),
  );
}
