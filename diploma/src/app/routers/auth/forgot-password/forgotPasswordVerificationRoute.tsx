import { createRoute } from "@tanstack/react-router";
import { ForgotPasswordVerificationPage } from "@pages/verification";
import { AuthRoutes } from "@shared/routes";
import { forgotPasswordRoute } from "./forgotPassword";

export const forgotPasswordVerificationRoute = createRoute({
  getParentRoute: () => forgotPasswordRoute,
  path: AuthRoutes.forgotPassword.verification,
  component: () => <ForgotPasswordVerificationPage />,
});
