import { useUserStore } from "@entities/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_masterLayout/profile")({
  shouldReload: false,
  beforeLoad: () => {
    const isAuthenticated = useUserStore.getState().isAuthenticated;
    if (!isAuthenticated) {
      throw redirect({ to: "/auth", search: { redirect: location.pathname } });
    }
  },
  component: () => <Outlet />,
});
