import { createRoute } from "@tanstack/react-router";
import { ForgotPasswordPage } from "@pages/auth";
import { forgotPasswordRoute } from "./forgotPasswordRoot";

export const forgotPasswordDefaultRoute = createRoute({
  getParentRoute: () => forgotPasswordRoute,
  path: "/",
  component: () => <ForgotPasswordPage />,
});
export { forgotPasswordRoute };
