import { createRoute, Outlet } from "@tanstack/react-router";
import { AuthLayout } from "../../../shared/ui/layouts";
import { rootRoute } from "../__root";
import { AuthRoutes } from "../../../shared/routes";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AuthRoutes.root,
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
});
