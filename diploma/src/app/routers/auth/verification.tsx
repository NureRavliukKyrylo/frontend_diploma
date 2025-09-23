import { createRoute } from "@tanstack/react-router";
import { authRoute } from "./index";
import { VerificationPage } from "../../../pages/auth";

export const verificationRoute = createRoute({
  getParentRoute: () => authRoute,
  path: "verification",
  component: () => <VerificationPage />,
});
