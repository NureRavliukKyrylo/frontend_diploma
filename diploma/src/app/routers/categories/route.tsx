import { createRoute, Outlet } from "@tanstack/react-router";
import { indexLayoutRoute } from "../indexLayoutRoute";

export const categoriesRootRoute = createRoute({
  getParentRoute: () => indexLayoutRoute,
  path: "categories",
  component: () => <Outlet />,
});
