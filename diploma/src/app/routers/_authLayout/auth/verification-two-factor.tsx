import { createFileRoute } from "@tanstack/react-router";
import { TwoFactorVerificationPage } from "@pages/verification";

export const Route = createFileRoute(
  "/_authLayout/auth/verification-two-factor",
)({
  component: TwoFactorVerificationPage,
});
