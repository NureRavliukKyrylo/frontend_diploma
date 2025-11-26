import { createRoute, Outlet } from "@tanstack/react-router";
import { profileRoutes } from "@shared/routes";
import { indexLayoutRoute } from "../indexLayoutRoute";

export const profileRootRoute = createRoute({
  getParentRoute: () => indexLayoutRoute,
  path: profileRoutes.root,
  component: () => <Outlet />,
});
