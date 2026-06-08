import styles from "./NotificationsListWidget.module.scss";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import type { QueryResult } from "@shared/config/types";
import type { Notification } from "@entities/notification";

interface NotificationsListWidgetProps {
  useNotificationsQuery?: () => QueryResult<Notification>;
  notifications?: Notification[];
  renderCard: (notifications: Notification, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  skeletonItems?: number;
  className?: string;
}

export const NotificationsListWidget = ({
  useNotificationsQuery,
  renderCard,
  notifications: readyNotifications,
  className,
  renderSkeleton,
  skeletonItems,
}: NotificationsListWidgetProps) => {
  const queryResult = useNotificationsQuery?.();

  const notifications = readyNotifications ?? queryResult?.data;
  const isLoading = queryResult?.isLoading ?? false;

  const wrapperClass =
    `${styles.notificationsListWrapper} ${className ?? ""}`.trim();

  if (isLoading && renderSkeleton) {
    return (
      <ListWidgetSkeleton
        renderSkeleton={renderSkeleton}
        items={skeletonItems}
        className={className}
      />
    );
  }

  return (
    <div className={wrapperClass}>
      {notifications?.map((notification, index) =>
        renderCard(notification, index),
      )}
    </div>
  );
};
