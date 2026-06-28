import {
  notificationKeys,
  useNotificationSignalR,
} from "@entities/notification";
import { adminDashboardKeys } from "@entities/admin";
import { NotFoundPage } from "@pages/not-found";
import { useUserStore } from "@entities/user";
import { useSyncUserInfoFromProfile } from "@entities/user/profile";
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
import { filtersKeys } from "@shared/api/filters";
import { useSignalRSend } from "@shared/libs/hooks";
import { projectKeys } from "@entities/project";
import { eventKeys } from "@entities/event";
import { taskKeys } from "@entities/task";
import { offerKeys } from "@entities/offer";
import type { SystemRole } from "@shared/config/types";

export interface RouterContext {
  queryClient: QueryClient;
  auth: {
    isAuthenticated?: boolean;
  };
  role?: SystemRole;
}

function RootComponent() {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const connect = useSignalRStore((s) => s.connect);
  const { i18n } = useTranslation();
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const disconnectAll = useSignalRStore((s) => s.disconnectAll);
  const send = useSignalRSend("notifications");
  const connection = useSignalRStore(
    (s) => s.hubs["notifications"].connection?.state,
  );
  useSyncUserInfoFromProfile();
  useNotificationSignalR();

  useEffect(() => {
    if (!locale) {
      const detected = ["uk", "ru"].some((lang) =>
        navigator.language.startsWith(lang),
      )
        ? "uk"
        : "en";
      setLocale(detected);
      return;
    }

    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
      Promise.all([
        queryClient.invalidateQueries({ queryKey: notificationKeys.all() }),
        queryClient.invalidateQueries({ queryKey: categoryKeys.all() }),
        queryClient.invalidateQueries({ queryKey: skillKeys.all() }),
        queryClient.invalidateQueries({ queryKey: badgesKeys.all() }),
        queryClient.invalidateQueries({ queryKey: filtersKeys.all() }),
        queryClient.invalidateQueries({ queryKey: projectKeys.all() }),
        queryClient.invalidateQueries({ queryKey: eventKeys.all() }),
        queryClient.invalidateQueries({ queryKey: taskKeys.all() }),
        queryClient.invalidateQueries({ queryKey: offerKeys.all() }),
        queryClient.invalidateQueries({ queryKey: adminDashboardKeys.all() }),
      ]);
    }
    send("UpdateLanguage", locale);
  }, [locale]);

  useEffect(() => {
    if (!isAuthenticated) {
      disconnectAll();
      return;
    }
    connect("notifications");
    connect("chats");
  }, [isAuthenticated]);

  useEffect(() => {
    if (connection !== "Connected" || !locale) return;
    send("UpdateLanguage", locale);
  }, [connection]);

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
