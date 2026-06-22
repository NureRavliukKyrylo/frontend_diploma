import {
  notificationKeys,
  useNotificationSignalR,
} from "@entities/notification";
import { NotFoundPage } from "@pages/not-found";
import { useUserStore } from "@entities/user";
import { useLocaleStore, useSignalRStore } from "@shared/config/stores";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { queryClient } from "@shared/api";
import { categoryKeys } from "@entities/category/model/queries/category-query/categoryQuery";
import { skillKeys } from "@entities/skill";
import { badgesKeys } from "@entities/badge";

export interface RouterContext {
  queryClient: QueryClient;
  auth: {
    isAuthenticated?: boolean;
  };
}

function RootComponent() {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const connect = useSignalRStore((s) => s.connect);
  const { i18n } = useTranslation();
  const locale = useLocaleStore((s) => s.locale);
  const disconnectAll = useSignalRStore((s) => s.disconnectAll);
  useNotificationSignalR();

  useEffect(() => {
    if (i18n.language !== locale && locale) {
      i18n.changeLanguage(locale);
      Promise.all([
        queryClient.invalidateQueries({ queryKey: notificationKeys.all() }),
        queryClient.invalidateQueries({ queryKey: categoryKeys.all() }),
        queryClient.invalidateQueries({ queryKey: skillKeys.all() }),
        queryClient.invalidateQueries({ queryKey: badgesKeys.all() }),
      ]);
    }
  }, [locale]);

  useEffect(() => {
    if (!isAuthenticated) {
      disconnectAll();
      return;
    }
    connect("notifications");
    connect("chats");
  }, [isAuthenticated]);

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  notFoundComponent: NotFoundPage,
  component: RootComponent,
});
