import { createRoute } from "@tanstack/react-router";
import { authRoute } from "./authRoot";
import { TwoFactorVerificationPage } from "@pages/verification";
import { AuthRoutes } from "@shared/routes";

export const verificationTwoFactorRoute = createRoute({
  getParentRoute: () => authRoute,
  path: AuthRoutes.twoFactor,
  component: () => <TwoFactorVerificationPage />,
});
