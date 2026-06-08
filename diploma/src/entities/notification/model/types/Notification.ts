import type { NotificationType } from "./NotificationType";

export type Notification = {
  id: string;
  type: NotificationType;
  status: "Read" | "Unread";
  title: string;
  message: string;
  createdAt: Date;
  relatedAvatar: string | null;
};
