import { createLazyFileRoute } from "@tanstack/react-router";
import { ForgotPasswordVerificationPage } from "@pages/verification";

export const Route = createLazyFileRoute(
  "/_authLayout/auth/forgot-password/verification",
)({
  component: ForgotPasswordVerificationPage,
});
