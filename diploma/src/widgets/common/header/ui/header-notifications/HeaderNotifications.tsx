import {
  notificationQuery,
  useNotificationStore,
} from "@entities/notification";
import { Link } from "@tanstack/react-router";
import { Bell, MessageSquareText } from "lucide-react";
import styles from "./HeaderNotifications.module.scss";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const HeaderNotifications = () => {
  const { data: unreadCountData } = useSuspenseQuery(
    notificationQuery.unreadCount(),
  );

  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);

  useEffect(() => {
    if (unreadCountData?.count != null) {
      setUnreadCount(unreadCountData.count);
    }
  }, [unreadCountData?.count]);

  return (
    <>
      <span className={styles.tooltip} data-tooltip="Notifications">
        <Link
          to="/notifications"
          className={styles.iconButton}
          aria-label={`Notifications${
            unreadCount > 0 ? ` (${unreadCount} unread)` : ""
          }`}
        >
          <Bell className={styles.icon} strokeWidth={2} />
          {unreadCount > 0 && (
            <span className={styles.badge}>{unreadCount}</span>
          )}
        </Link>
      </span>
      <span className={styles.tooltip} data-tooltip="Messages">
        <Link to="/chat" className={styles.iconButton} aria-label="Messages">
          <MessageSquareText className={styles.icon} strokeWidth={2} />
        </Link>
      </span>
    </>
  );
};
