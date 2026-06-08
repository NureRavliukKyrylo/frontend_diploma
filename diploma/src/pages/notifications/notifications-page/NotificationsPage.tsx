import { NotificationsListWidget } from "@widgets/notifications";
import { NotificationItem, notificationQuery } from "@entities/notification";
import { useSuspenseQuery } from "@tanstack/react-query";

export const NotificationsPage = () => {
  return (
    <NotificationsListWidget
      renderCard={(notification) => (
        <NotificationItem notification={notification} />
      )}
      useNotificationsQuery={() => {
        const { data } = useSuspenseQuery(
          notificationQuery.list({ PageSize: 9 }),
        );
        return { data: data.data };
      }}
    />
  );
};
