import { Avatar } from "@heroui/react";
import styles from "./NotificationItem.module.scss";
import { NOTIFICATION_TYPE_CONFIG } from "../../config";
import type { Notification } from "../../model";
import { formatTimeAgo } from "@shared/libs/date";

interface NotificationItemProps {
  notification: Notification;
  rightContent?: React.ReactNode;
}

export const NotificationItem = ({
  notification,
  rightContent,
}: NotificationItemProps) => {
  const config = NOTIFICATION_TYPE_CONFIG[notification.type];
  const Icon = config.icon;

  return (
    <div
      className={styles.wrapper}
      data-unread={notification.status === "Unread"}
    >
      <div
        className={styles.iconWrapper}
        style={{ background: config.wrapperColor }}
      >
        {notification.relatedAvatar ? (
          <Avatar className={styles.avatar} src={notification.relatedAvatar} />
        ) : (
          <Icon className={styles.icon} style={{ color: config.iconColor }} />
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.title}>{notification.title}</span>
        <span className={styles.message}>{notification.message}</span>
      </div>

      <div className={styles.time}>{formatTimeAgo(notification.createdAt)}</div>

      {rightContent && <div className={styles.right}>{rightContent}</div>}
    </div>
  );
};
