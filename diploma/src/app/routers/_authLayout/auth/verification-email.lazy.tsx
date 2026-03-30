import { createLazyFileRoute } from "@tanstack/react-router";
import { EmailVerificationPage } from "@pages/verification";

export const Route = createLazyFileRoute(
  "/_authLayout/auth/verification-email",
)({
  component: EmailVerificationPage,
});
