export type RelatedEntityTypeChatValue =
  | "event"
  | "private"
  | "task"
  | "project"
  | "organization";

export type Chat = {
  id: string;
  participants: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    roleName: string;
  }[];
  name: string;
  avatarUrl: string | null;
  lastMessageAt: string;
  lastMessage: { message: string; type: "text" | "url" } | null;
  relatedEntityType: RelatedEntityTypeChatValue;
  relatedEntityId: string;
  unreadCount: number;
};
