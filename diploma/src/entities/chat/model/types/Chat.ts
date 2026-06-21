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
  lastMessage: { message: string; timestamp: string } | null;
  relatedEntityType: RelatedEntityTypeChatValue;
  relatedEntityId: string;
  unreadCount: number;
};
