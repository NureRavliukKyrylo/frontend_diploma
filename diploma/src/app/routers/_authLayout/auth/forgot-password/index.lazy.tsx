import { createLazyFileRoute } from "@tanstack/react-router";
import { ForgotPasswordPage } from "@pages/auth";

export const Route = createLazyFileRoute("/_authLayout/auth/forgot-password/")({
  component: ForgotPasswordPage,
});
