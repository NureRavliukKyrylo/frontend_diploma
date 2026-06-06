import { useUserStore } from "@entities/user";
import { useSignalRStore } from "@shared/config/stores";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";

export interface RouterContext {
  queryClient: QueryClient;
  auth: {
    isAuthenticated?: boolean;
  };
}

function RootComponent() {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const connect = useSignalRStore((s) => s.connect);
  const disconnectAll = useSignalRStore((s) => s.disconnectAll);

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
  component: RootComponent,
});
