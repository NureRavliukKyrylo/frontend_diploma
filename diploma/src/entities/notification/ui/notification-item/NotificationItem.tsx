import styles from "./NotificationItem.module.scss";
import { NOTIFICATION_TYPE_CONFIG } from "../../config";
import type { Notification } from "../../model";
import { formatTimeAgo } from "@shared/libs/date";
import { OnlineIcon } from "@shared/assets/icons/info";
import { useTranslation } from "react-i18next";
import { Avatar } from "@shared/ui";

interface NotificationItemProps {
  notification: Notification;
  rightContent?: React.ReactNode;
  actionsContent?: React.ReactNode;
  variant?: "default" | "toast";
}

export const NotificationItem = ({
  notification,
  rightContent,
  variant = "default",
  actionsContent,
}: NotificationItemProps) => {
  const { t } = useTranslation("common");
  const config = NOTIFICATION_TYPE_CONFIG[notification.type];
  const Icon = config.icon;
  const isUnread = notification.status === "Unread";
  const isToast = variant === "toast";

  return (
    <div
      className={`${styles.wrapper} ${isToast ? styles.toast : styles.default}`}
      data-unread={!isToast && isUnread}
    >
      <div
        className={styles.iconWrapper}
        style={{ background: config.wrapperColor }}
      >
        {notification.relatedAvatarUrl ? (
          <Avatar
            className={`styles.avatar `}
            src={notification.relatedAvatarUrl}
          />
        ) : (
          <Icon className={styles.icon} style={{ color: config.iconColor }} />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.topContent}>
          <span className={styles.title}>{notification.title}</span>
          {!isToast && isUnread && <OnlineIcon className={styles.unReadIcon} />}
        </div>
        <span className={styles.message}>{notification.message}</span>
        {actionsContent}
      </div>

      {!isToast && (
        <div className={styles.time}>
          {formatTimeAgo(notification.createdAt, t)}
        </div>
      )}

      {rightContent && <div className={styles.right}>{rightContent}</div>}
    </div>
  );
};
