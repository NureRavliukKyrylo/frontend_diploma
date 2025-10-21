import { createRoute } from "@tanstack/react-router";
import { authRoute } from "./authRoot";
import { AuthPage } from "@pages/auth";
import { AuthRoutes } from "@shared/routes";

export const authDefaultRoute = createRoute({
  getParentRoute: () => authRoute,
  path: AuthRoutes.default,
  component: () => <AuthPage />,
});
