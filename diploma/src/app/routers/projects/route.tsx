import { createRoute, Outlet } from "@tanstack/react-router";
import { indexLayoutRoute } from "../indexLayoutRoute";

export const projectsRootRoute = createRoute({
  getParentRoute: () => indexLayoutRoute,
  path: "projects",
  component: () => <Outlet />,
});
