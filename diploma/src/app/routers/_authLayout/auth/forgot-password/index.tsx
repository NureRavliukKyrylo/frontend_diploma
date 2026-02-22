import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordPage } from "@pages/auth";

export const Route = createFileRoute("/_authLayout/auth/forgot-password/")({
  component: ForgotPasswordPage,
});
