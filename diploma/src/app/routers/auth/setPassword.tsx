import { createRoute } from "@tanstack/react-router";
import { authRoute } from "./authRoot";
import { SetPasswordPage } from "../../../pages/auth";
import { AuthRoutes } from "../../../shared/routes";

export const setPasswordRoute = createRoute({
  getParentRoute: () => authRoute,
  path: AuthRoutes.setPassword,
  component: () => <SetPasswordPage />,
});
