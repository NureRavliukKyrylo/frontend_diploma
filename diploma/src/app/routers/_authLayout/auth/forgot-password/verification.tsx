import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordVerificationPage } from "@pages/verification";

export const Route = createFileRoute(
  "/_authLayout/auth/forgot-password/verification",
)({
  component: ForgotPasswordVerificationPage,
});
