import { createRoute } from "@tanstack/react-router";
import { authRoute } from "./authRoot";
import { EmailVerificationPage } from "@pages/auth";
import { AuthRoutes } from "@shared/routes";

export const verificationEmailRoute = createRoute({
  getParentRoute: () => authRoute,
  path: AuthRoutes.verification,
  component: () => <EmailVerificationPage />,
});
