import type { Message } from "./Message";

export type MentionFeedItem = {
  chatId: string;
  message: Message;
};

export type MentionSearchResult = {
  id?: string;
  Id?: string;
  messageId?: string;
  MessageId?: string;
  message?: {
    id?: string;
    Id?: string;
  };
  Message?: {
    id?: string;
    Id?: string;
  };
  isRead?: boolean;
  IsRead?: boolean;
  readAt?: string | null;
  ReadAt?: string | null;
  status?: string;
  Status?: string;
  [key: string]: unknown;
};
