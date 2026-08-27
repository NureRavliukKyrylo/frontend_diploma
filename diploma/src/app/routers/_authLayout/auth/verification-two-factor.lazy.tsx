import { createLazyFileRoute } from "@tanstack/react-router";
import { TwoFactorVerificationPage } from "@pages/verification";

export const Route = createLazyFileRoute(
  "/_authLayout/auth/verification-two-factor",
)({
  component: TwoFactorVerificationPage,
});
