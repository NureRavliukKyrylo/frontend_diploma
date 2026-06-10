import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  notificationQuery,
  useNotificationStore,
  type NotificationType,
} from "@entities/notification";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const useNotificationsPage = () => {
  const search = useSearch({ from: "/_masterLayout/notifications/" });
  const navigate = useNavigate({ from: "/notifications/" });

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const activeStatus = search.Status ?? "All";
  const activeType = search.Type;

  const queryParams = {
    PageSize: 15,
    Page: search.Page ?? 1,
    ...(activeStatus === "Unread" && { Status: "Unread" as const }),
    ...(activeType && { Type: activeType }),
  };

  const { data: notifications } = useQuery(notificationQuery.list(queryParams));
  const { data: unreadCountData } = useQuery(notificationQuery.unreadCount());

  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  useEffect(() => {
    if (unreadCountData?.count != null) {
      setUnreadCount(unreadCountData.count);
    }
  }, [unreadCountData?.count]);

  const handleToggleSelect = (id: string) => {
    if (!isSelectMode) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleTypeChange = (type: NotificationType | "All") => {
    navigate({
      search: (prev) => ({
        ...prev,
        Type: type === "All" ? undefined : type,
        Page: undefined,
      }),
    });
  };

  const handleCancel = () => {
    setSelectedIds([]);
    setIsSelectMode(false);
  };

  const handleDeleteSuccess = () => {
    setSelectedIds([]);
    setIsSelectMode(false);
  };

  const handlePageChange = (page: number) => {
    navigate({ search: (prev) => ({ ...prev, Page: page }) });
  };

  const handleStatusChange = (status: "All" | "Unread") => {
    navigate({
      search: (prev) => ({
        ...prev,
        Status: status === "All" ? undefined : status,
        Page: undefined,
      }),
    });
  };

  const useNotificationsQuery = () => {
    const { data } = useSuspenseQuery(notificationQuery.list(queryParams));
    return { data: data.data };
  };

  return {
    notifications,
    unreadCount,
    activeStatus,
    isSelectMode,
    selectedIds,
    search,
    setIsSelectMode,
    handleToggleSelect,
    handleCancel,
    handleDeleteSuccess,
    handlePageChange,
    handleStatusChange,
    useNotificationsQuery,
    activeType,
    handleTypeChange,
  };
};
