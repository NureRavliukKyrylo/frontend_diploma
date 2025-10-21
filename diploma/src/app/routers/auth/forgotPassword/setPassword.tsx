import { createRoute } from "@tanstack/react-router";
import { SetPasswordPage } from "@pages/auth";
import { AuthRoutes } from "@shared/routes";
import { forgotPasswordRoute } from "./forgotPassword";

export const setPasswordRoute = createRoute({
  getParentRoute: () => forgotPasswordRoute,
  path: AuthRoutes.forgotPassword.setPassword,
  component: () => <SetPasswordPage />,
});
