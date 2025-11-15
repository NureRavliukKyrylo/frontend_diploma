import { createRoute, Outlet } from "@tanstack/react-router";
import { profileRoutes } from "@shared/routes/profile/profileRoutes";
import { indexLayoutRoute } from "../indexLayoutRoute";

export const profileRoute = createRoute({
  getParentRoute: () => indexLayoutRoute,
  path: profileRoutes.root,
  component: () => <Outlet />,
});
