import { createRoute } from "@tanstack/react-router";
import { authRoute } from "./authRoot";
import { VerificationPage } from "../../../pages/auth";
import { AuthRoutes } from "../../../shared/routes";

export const verificationRoute = createRoute({
  getParentRoute: () => authRoute,
  path: AuthRoutes.verification,
  component: () => <VerificationPage />,
});
