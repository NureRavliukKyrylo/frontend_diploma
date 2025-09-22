import { createRoute, Outlet } from "@tanstack/react-router";
import { AuthLayout } from "../../../shared/layouts/auth";
import { rootRoute } from "../__root";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "auth",
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
});
