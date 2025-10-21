import { createRoute } from "@tanstack/react-router";
import { ForgotPasswordVerificationPage } from "@pages/auth/ForgotPasswordVerificationPage";
import { AuthRoutes } from "@shared/routes";
import { forgotPasswordRoute } from "./forgotPassword";

export const forgotPasswordVerificationRoute = createRoute({
  getParentRoute: () => forgotPasswordRoute,
  path: AuthRoutes.forgotPassword.verification,
  component: () => <ForgotPasswordVerificationPage />,
});
