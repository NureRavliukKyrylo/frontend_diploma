import type { MentionFeedItem, MentionSearchResult } from "../model";

const readString = (...values: unknown[]) =>
  values.find(
    (value): value is string => typeof value === "string" && value.length > 0,
  ) ?? null;

export const getMentionMessageId = (mention: MentionSearchResult) =>
  readString(
    mention.messageId,
    mention.MessageId,
    mention.id,
    mention.Id,
    mention.message?.id,
    mention.message?.Id,
    mention.Message?.id,
    mention.Message?.Id,
  );

export const isUnreadMention = (mention: MentionSearchResult) => {
  const explicitRead = mention.isRead ?? mention.IsRead;
  if (typeof explicitRead === "boolean") return !explicitRead;

  if ("readAt" in mention || "ReadAt" in mention) {
    return !mention.readAt && !mention.ReadAt;
  }

  const status = readString(mention.status, mention.Status);
  if (status) return status.toLowerCase() !== "read";

  return true;
};

export const getMentionFeedMessageId = (mention: MentionFeedItem) =>
  mention.message?.id ?? null;

export const isUnreadMentionFeedItem = (mention: MentionFeedItem) =>
  mention.message?.readStatus !== "Read";
