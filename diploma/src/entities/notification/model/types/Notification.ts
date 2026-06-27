import type { NotificationType } from "./NotificationType";

export type Notification = {
  id: string;
  type: NotificationType;
  status: "Read" | "Unread";
  title: string;
  message: string;
  createdAt: Date;
  relatedAvatarUrl: string | null;
  metadata: {
    requestId?: string;
    bookingId: string;
    status?: "New" | "Applied";
  };
  readAt: string | null;
};
