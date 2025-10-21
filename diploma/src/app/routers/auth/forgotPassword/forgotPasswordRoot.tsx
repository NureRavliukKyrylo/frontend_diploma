import { createRoute, Outlet } from "@tanstack/react-router";
import { authRoute } from "../authRoot";
import { AuthRoutes } from "@shared/routes";

export const forgotPasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: AuthRoutes.forgotPassword.root,
  component: () => <Outlet />,
});
