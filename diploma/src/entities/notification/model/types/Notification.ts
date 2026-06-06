import type { NotificationType } from "./NotificationType";

export type Notification = {
  id: string;
  type: NotificationType;
  status: "Read" | "Unread";
  message: string;
  createdAt: Date;
};
