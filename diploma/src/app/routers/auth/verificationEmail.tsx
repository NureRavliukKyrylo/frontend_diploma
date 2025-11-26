import { createRoute } from "@tanstack/react-router";
import { authRoute } from "./route";
import { EmailVerificationPage } from "@pages/verification";
import { AuthRoutes } from "@shared/routes";

export const verificationEmailRoute = createRoute({
  getParentRoute: () => authRoute,
  path: AuthRoutes.verification,
  component: () => <EmailVerificationPage />,
});
